/**
 * Persistenz mit zwei austauschbaren Backends (Repository-Pattern):
 *
 * 1. Postgres (Neon/Vercel Postgres): aktiv, sobald die Umgebungsvariable
 *    DATABASE_URL oder POSTGRES_URL gesetzt ist. Der komplette Zustand wird
 *    als eine JSONB-Zeile gespeichert – ideal für Serverless-Hosting (Vercel),
 *    wo das Dateisystem flüchtig ist.
 * 2. JSON-Datei (data/state.json): Fallback für den lokalen Betrieb ohne
 *    Setup. Atomares Schreiben (tmp-Datei + rename) gegen Datenverlust.
 */

import fs from 'fs';
import path from 'path';
import { LearningConfig } from '@/config/learning';
import { UserState } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const STATE_VERSION = 1;

const DB_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '';
const usePostgres = DB_URL.length > 0;

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
// Postgres-Backend (Neon / Vercel Postgres)
// ---------------------------------------------------------------------------

let pgPool: any = null;
let pgReady: Promise<void> | null = null;

async function getPool() {
  if (!pgPool) {
    // dynamischer Import, damit lokal ohne DATABASE_URL kein pg benötigt wird
    const { Pool } = await import('pg');
    pgPool = new Pool({
      connectionString: DB_URL,
      max: 3,
      ssl: DB_URL.includes('localhost') ? undefined : { rejectUnauthorized: false },
    });
  }
  if (!pgReady) {
    pgReady = pgPool
      .query(
        `CREATE TABLE IF NOT EXISTS app_state (
           id INTEGER PRIMARY KEY,
           data JSONB NOT NULL,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`
      )
      .then(() => undefined);
  }
  await pgReady;
  return pgPool;
}

async function pgLoad(): Promise<UserState> {
  try {
    const pool = await getPool();
    const res = await pool.query('SELECT data FROM app_state WHERE id = 1');
    if (res.rows.length === 0) return defaultState();
    return migrate(res.rows[0].data);
  } catch (err) {
    console.error('[store/pg] Zustand konnte nicht gelesen werden:', err);
    return defaultState();
  }
}

async function pgSave(state: UserState): Promise<void> {
  const pool = await getPool();
  await pool.query(
    `INSERT INTO app_state (id, data, updated_at) VALUES (1, $1, now())
     ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`,
    [JSON.stringify(state)]
  );
}

// ---------------------------------------------------------------------------
// Datei-Backend (lokaler Betrieb)
// ---------------------------------------------------------------------------

function fileLoad(): UserState {
  try {
    if (!fs.existsSync(STATE_FILE)) return defaultState();
    return migrate(JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')));
  } catch (err) {
    console.error('[store/file] Zustand konnte nicht gelesen werden, starte leer:', err);
    return defaultState();
  }
}

function fileSave(state: UserState): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = STATE_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 1), 'utf-8');
  fs.renameSync(tmp, STATE_FILE);
}

// ---------------------------------------------------------------------------
// Öffentliche API (async – Backend-unabhängig)
// ---------------------------------------------------------------------------

export async function loadState(): Promise<UserState> {
  return usePostgres ? pgLoad() : fileLoad();
}

export async function saveState(state: UserState): Promise<void> {
  state.updatedAt = Date.now();
  try {
    if (usePostgres) await pgSave(state);
    else fileSave(state);
  } catch (err) {
    console.error('[store] Zustand konnte nicht gespeichert werden:', err);
    throw err;
  }
}

/** Zustand zurücksetzen (Einstellungen/Debug). */
export async function resetState(): Promise<UserState> {
  const fresh = defaultState();
  await saveState(fresh);
  return fresh;
}

/** Für Statusanzeigen: welches Backend ist aktiv? */
export function storageBackend(): 'postgres' | 'file' {
  return usePostgres ? 'postgres' : 'file';
}
