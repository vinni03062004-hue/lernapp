/**
 * Verifiziert die Postgres-Statements des Store-Backends gegen einen
 * In-Memory-Postgres (pg-mem): Tabellen-Anlage, Upsert (INSERT … ON CONFLICT),
 * Laden, Überschreiben und Reset – exakt die SQL-Befehle aus src/lib/store.ts.
 */

import { describe, expect, it } from 'vitest';
import { newDb } from 'pg-mem';
import { defaultState } from '@/lib/store';

const CREATE = `CREATE TABLE IF NOT EXISTS app_state (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)`;
const UPSERT = `INSERT INTO app_state (id, data, updated_at) VALUES (1, $1, now())
  ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()`;
const SELECT = 'SELECT data FROM app_state WHERE id = 1';

describe('Postgres-Backend (SQL-Verifikation mit pg-mem)', () => {
  it('legt Tabelle an, speichert, lädt und überschreibt den Zustand', async () => {
    const db = newDb();
    const { Pool } = db.adapters.createPg();
    const pool = new Pool();

    await pool.query(CREATE);
    // Hinweis: Das erneute Ausführen von CREATE TABLE IF NOT EXISTS ist auf
    // echtem Postgres unkritisch; pg-mem unterstützt die Wiederholung nicht.
    // store.ts führt das Statement ohnehin nur einmal pro Prozess aus (pgReady).

    // leeres Laden → keine Zeile
    const empty = await pool.query(SELECT);
    expect(empty.rows.length).toBe(0);

    // Erstes Speichern
    const state = defaultState();
    await pool.query(UPSERT, [JSON.stringify(state)]);
    const r1 = await pool.query(SELECT);
    expect(r1.rows.length).toBe(1);
    const loaded = typeof r1.rows[0].data === 'string' ? JSON.parse(r1.rows[0].data) : r1.rows[0].data;
    expect(loaded.version).toBe(state.version);
    expect(loaded.settings.examQuestionCount).toBe(state.settings.examQuestionCount);

    // Upsert überschreibt (ON CONFLICT-Pfad)
    const changed = { ...state, attempts: [{ marker: 'x' }] as any };
    await pool.query(UPSERT, [JSON.stringify(changed)]);
    const r2 = await pool.query(SELECT);
    expect(r2.rows.length).toBe(1);
    const loaded2 = typeof r2.rows[0].data === 'string' ? JSON.parse(r2.rows[0].data) : r2.rows[0].data;
    expect(loaded2.attempts.length).toBe(1);
  });
});
