/**
 * Persistenz mit zwei austauschbaren Backends – PRO PROFIL getrennt
 * (Mehrbenutzer auf derselben Instanz).
 *
 * 1. Postgres: aktiv, sobald DATABASE_URL/POSTGRES_URL gesetzt ist. Pro Profil
 *    eine JSONB-Zeile in app_state_v2 (Spalte "profile").
 * 2. JSON-Datei: data/state-<profil>.json (lokaler Fallback).
 *
 * Das aktive Profil steckt im Cookie "profile" (vom Client gesetzt). Fehlt es,
 * gilt "default" – dorthin wird der frühere Einzel-Stand migriert.
 *
 * Profil-ID vs. Name: Die ID ist der stabile Speicher-Schlüssel (bereinigt).
 * Der ANZEIGENAME liegt in settings.profileName und ist frei editierbar, ohne
 * die ID/Daten zu verändern.
 */

import fs from 'fs';
import path from 'path';
import { LearningConfig } from '@/config/learning';
import { UserState } from './types';
import { MODULE_IDS, DEFAULT_MODULE_ID } from '@/content';

const DATA_DIR = path.join(process.cwd(), 'data');
const STATE_VERSION = 1;

const DB_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '';
const usePostgres = DB_URL.length > 0;

/** Profil-ID säubern (nur a-z, 0-9, _ und -, max. 40 Zeichen). */
export function sanitizeProfile(v?: string | null): string {
  if (!v) return 'default';
  const s = String(v).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  return s || 'default';
}

/** Aktives Profil aus dem Request-Cookie lesen (dyn. Import wegen Tests). */
export async function getProfile(): Promise<string> {
  try {
    const { cookies } = await import('next/headers');
    return sanitizeProfile(cookies().get('profile')?.value);
  } catch {
    return 'default';
  }
}

/** Aktives Modul aus dem Request-Cookie "module" lesen. */
export async function getModuleId(): Promise<string> {
  try {
    const { cookies } = await import('next/headers');
    const v = cookies().get('module')?.value;
    if (v && MODULE_IDS.includes(v)) return v;
  } catch {
    // kein Request-Kontext (Tests)
  }
  return DEFAULT_MODULE_ID;
}

/** Speicher-Schlüssel: Fortschritt ist pro Profil UND Modul getrennt. */
function storageKey(profile: string, moduleId: string): string {
  return `${profile}::${moduleId}`;
}

/** Basis-Profil-ID aus einem Speicher-Schlüssel (Teil vor "::"). */
function baseProfile(key: string): string {
  const i = key.indexOf('::');
  return i < 0 ? key : key.slice(0, i);
}

function isEmptyState(st: UserState): boolean {
  return (
    (st.attempts?.length ?? 0) === 0 &&
    (st.sessions?.length ?? 0) === 0 &&
    Object.keys(st.mastery ?? {}).length === 0
  );
}

export function defaultState(): UserState {
  const now = Date.now();
  return {
    version: STATE_VERSION,
    createdAt: now,
    updatedAt: now,
    attempts: [],
    sessions: [],
    mastery: {},
    errorPatterns: {},
    readinessHistory: [],
    techniqueStats: { byType: {} },
    chatHistory: [],
    podcastScripts: {},
    flaggedQuestions: [],
    settings: {
      theme: 'dark',
      examQuestionCount: LearningConfig.exam.defaultQuestionCount,
      examTimeLimitMin: LearningConfig.exam.defaultTimeLimitMin,
      examOpenShare: LearningConfig.exam.defaultOpenShare,
    },
  };
}

function migrate(parsed: any): UserState {
  if (!parsed || typeof parsed !== 'object') return defaultState();
  if (parsed.version !== STATE_VERSION) {
    return { ...defaultState(), ...parsed, version: STATE_VERSION };
  }
  return parsed as UserState;
}

// ---------------------------------------------------------------------------
// Postgres-Backend (pro Profil)
// ---------------------------------------------------------------------------

let pgPool: any = null;
let pgReady: Promise<void> | null = null;

async function getPool() {
  if (!pgPool) {
    const { Pool } = await import('pg');
    pgPool = new Pool({
      connectionString: DB_URL,
      max: 3,
      ssl: DB_URL.includes('localhost') ? undefined : { rejectUnauthorized: false },
    });
  }
  if (!pgReady) {
    pgReady = (async () => {
      await pgPool.query(
        `CREATE TABLE IF NOT EXISTS app_state_v2 (
           profile TEXT PRIMARY KEY,
           data JSONB NOT NULL,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`
      );
      // Einmalige, best-effort Migration des früheren Einzel-Stands -> "default".
      try {
        await pgPool.query(
          `INSERT INTO app_state_v2 (profile, data)
           SELECT 'default', data FROM app_state WHERE id = 1
           ON CONFLICT (profile) DO NOTHING`
        );
      } catch {
        // alte Tabelle existiert nicht – nichts zu migrieren.
      }
    })();
  }
  await pgReady;
  return pgPool;
}

async function pgLoad(profile: string): Promise<UserState> {
  try {
    const pool = await getPool();
    const res = await pool.query('SELECT data FROM app_state_v2 WHERE profile = $1', [profile]);
    if (res.rows.length === 0) return defaultState();
    return migrate(res.rows[0].data);
  } catch (err) {
    console.error('[store/pg] Zustand konnte nicht gelesen werden:', err);
    return defaultState();
  }
}

async function pgSave(profile: string, state: UserState): Promise<void> {
  const pool = await getPool();
  await pool.query(
    `INSERT INTO app_state_v2 (profile, data, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (profile) DO UPDATE SET data = $2, updated_at = now()`,
    [profile, JSON.stringify(state)]
  );
}

async function pgList(): Promise<{ id: string; name: string; avatar?: string; updatedAt: number }[]> {
  try {
    const pool = await getPool();
    const res = await pool.query(
      `SELECT profile, updated_at,
              data->'settings'->>'profileName' AS name,
              data->'settings'->>'avatar' AS avatar
         FROM app_state_v2 ORDER BY updated_at DESC`
    );
    return res.rows.map((r: any) => ({
      id: r.profile,
      name: r.name || r.profile,
      avatar: r.avatar || undefined,
      updatedAt: r.updated_at ? new Date(r.updated_at).getTime() : 0,
    }));
  } catch (err) {
    console.error('[store/pg] Profilliste fehlgeschlagen:', err);
    return [];
  }
}

async function pgDelete(profile: string): Promise<void> {
  const pool = await getPool();
  await pool.query('DELETE FROM app_state_v2 WHERE profile = $1', [profile]);
}

// ---------------------------------------------------------------------------
// Datei-Backend (pro Profil)
// ---------------------------------------------------------------------------

function stateFile(profile: string): string {
  return path.join(DATA_DIR, `state-${profile}.json`);
}

function fileLoad(profile: string): UserState {
  try {
    const f = stateFile(profile);
    if (!fs.existsSync(f)) return defaultState();
    return migrate(JSON.parse(fs.readFileSync(f, 'utf-8')));
  } catch (err) {
    console.error('[store/file] Zustand konnte nicht gelesen werden, starte leer:', err);
    return defaultState();
  }
}

function fileSave(profile: string, state: UserState): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const f = stateFile(profile);
  const tmp = f + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 1), 'utf-8');
  fs.renameSync(tmp, f);
}

function fileList(): { id: string; name: string; avatar?: string; updatedAt: number }[] {
  try {
    if (!fs.existsSync(DATA_DIR)) return [];
    return fs
      .readdirSync(DATA_DIR)
      .filter((n) => n.startsWith('state-') && n.endsWith('.json'))
      .map((n) => {
        const id = n.slice('state-'.length, -'.json'.length);
        let name = id;
        let avatar: string | undefined;
        let updatedAt = 0;
        try {
          const parsed = JSON.parse(fs.readFileSync(path.join(DATA_DIR, n), 'utf-8'));
          name = parsed?.settings?.profileName || id;
          avatar = parsed?.settings?.avatar || undefined;
          updatedAt = parsed?.updatedAt ?? 0;
        } catch {}
        return { id, name, avatar, updatedAt };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

function fileDelete(profile: string): void {
  const f = stateFile(profile);
  if (fs.existsSync(f)) fs.unlinkSync(f);
}

// ---------------------------------------------------------------------------
// Öffentliche API
// ---------------------------------------------------------------------------

/** Zustand eines EXPLIZITEN Profils laden. */
export async function loadStateFor(profile: string): Promise<UserState> {
  const p = sanitizeProfile(profile);
  return usePostgres ? pgLoad(p) : fileLoad(p);
}

/** Zustand eines EXPLIZITEN Profils speichern. */
export async function saveStateFor(profile: string, state: UserState): Promise<void> {
  state.updatedAt = Date.now();
  const p = sanitizeProfile(profile);
  try {
    if (usePostgres) await pgSave(p, state);
    else fileSave(p, state);
  } catch (err) {
    console.error('[store] Zustand konnte nicht gespeichert werden:', err);
    throw err;
  }
}

/** Zustand des AKTIVEN Profils UND Moduls (aus Cookies) laden. */
export async function loadState(): Promise<UserState> {
  const profile = await getProfile();
  const moduleId = await getModuleId();
  const key = storageKey(profile, moduleId);
  const existing = usePostgres ? await pgLoad(key) : fileLoad(key);
  // Migrate-on-read: Der frühere Einzel-Stand lag unter dem reinen Profil-
  // Schlüssel und gehörte zum Standardmodul (Konsumentenverhalten).
  if (isEmptyState(existing) && moduleId === DEFAULT_MODULE_ID) {
    const legacy = usePostgres ? await pgLoad(profile) : fileLoad(profile);
    if (!isEmptyState(legacy)) {
      if (usePostgres) await pgSave(key, legacy);
      else fileSave(key, legacy);
      return legacy;
    }
  }
  return existing;
}

/** Zustand des AKTIVEN Profils UND Moduls (aus Cookies) speichern. */
export async function saveState(state: UserState): Promise<void> {
  state.updatedAt = Date.now();
  const key = storageKey(await getProfile(), await getModuleId());
  try {
    if (usePostgres) await pgSave(key, state);
    else fileSave(key, state);
  } catch (err) {
    console.error('[store] Zustand konnte nicht gespeichert werden:', err);
    throw err;
  }
}

/** Alle vorhandenen Profile (für die Auswahl). "default" ist immer dabei.
 *  Speicher-Schlüssel enthalten das Modul ("profil::modul"); hier wird auf die
 *  Basis-Profil-ID zusammengefasst. Name/Avatar stammen bevorzugt aus dem
 *  Meta-Datensatz (reiner Profilschlüssel ohne "::"). */
export async function listProfiles(): Promise<{ id: string; name: string; avatar?: string; updatedAt: number }[]> {
  const raw = usePostgres ? await pgList() : fileList();
  const map = new Map<string, { id: string; name: string; avatar?: string; updatedAt: number; hasMeta: boolean }>();
  for (const r of raw) {
    const base = baseProfile(r.id);
    const isMeta = r.id === base;
    const cleanName = r.name && !r.name.includes('::') ? r.name : base;
    const cur = map.get(base);
    if (!cur) {
      map.set(base, { id: base, name: isMeta ? cleanName : (cleanName || base), avatar: r.avatar, updatedAt: r.updatedAt, hasMeta: isMeta });
    } else {
      cur.updatedAt = Math.max(cur.updatedAt, r.updatedAt);
      if (isMeta) { cur.name = cleanName; cur.avatar = r.avatar; cur.hasMeta = true; }
      else if (!cur.hasMeta) {
        if (!cur.name || cur.name === base) cur.name = cleanName;
        if (!cur.avatar) cur.avatar = r.avatar;
      }
    }
  }
  const list = Array.from(map.values())
    .map(({ hasMeta, ...v }) => v)
    .sort((a, b) => b.updatedAt - a.updatedAt);
  if (!list.some((p) => p.id === 'default')) {
    list.push({ id: 'default', name: 'Standard', updatedAt: 0 });
  }
  return list;
}

/** Profil löschen ("default" ist geschützt) – inkl. aller Modul-Speicherstände. */
export async function deleteProfile(profile: string): Promise<void> {
  const p = sanitizeProfile(profile);
  if (p === 'default') return;
  if (usePostgres) {
    const pool = await getPool();
    await pool.query("DELETE FROM app_state_v2 WHERE profile = $1 OR profile LIKE $1 || '::%'", [p]);
  } else {
    fileDelete(p);
    try {
      if (fs.existsSync(DATA_DIR)) {
        for (const n of fs.readdirSync(DATA_DIR)) {
          if (n.startsWith(`state-${p}::`) && n.endsWith('.json')) fs.unlinkSync(path.join(DATA_DIR, n));
        }
      }
    } catch {}
  }
}

/** Zustand NUR des AKTIVEN Profils+Moduls zurücksetzen (Name + Avatar bleiben erhalten). */
export async function resetState(): Promise<UserState> {
  const profile = await getProfile();
  const moduleId = await getModuleId();
  const key = storageKey(profile, moduleId);
  const prev = await loadStateFor(profile); // Meta-Datensatz (Name/Avatar)
  const fresh = defaultState();
  if (prev.settings?.profileName) fresh.settings.profileName = prev.settings.profileName;
  if (prev.settings?.avatar) fresh.settings.avatar = prev.settings.avatar;
  if (usePostgres) await pgSave(key, fresh);
  else fileSave(key, fresh);
  return fresh;
}

/** Für Statusanzeigen: welches Backend ist aktiv? */
export function storageBackend(): 'postgres' | 'file' {
  return usePostgres ? 'postgres' : 'file';
}
