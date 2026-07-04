'use client';

/** Einstellungen (Prüfungsprofil) + Debug-/Admin-Bereich (Qualitätskontrolle). */

import { useEffect, useState } from 'react';

export default function EinstellungenPage() {
  const [settings, setSettings] = useState<any>(null);
  const [debug, setDebug] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    fetch('/api/overview').then((r) => r.json()).then((d) => setSettings(d.settings)).catch(() => {});
    fetch('/api/debug').then((r) => r.json()).then(setDebug).catch(() => {});
  }, []);

  async function save(patch: any) {
    const res = await fetch('/api/settings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch),
    });
    const d = await res.json();
    if (d.settings) {
      setSettings(d.settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function resetAll() {
    await save({ reset: true });
    setConfirmReset(false);
    window.location.href = '/';
  }

  if (!settings) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Lade Einstellungen …</div>;

  return (
    <div>
      <h1>Einstellungen</h1>
      <p className="page-sub">Prüfungsprofil und Qualitätskontrolle. {saved && <span className="toast-saved">✓ Gespeichert</span>}</p>

      <div className="card">
        <h2>Prüfungsprofil</h2>
        <div className="grid cols-3">
          <div>
            <label className="small dim">Fragen pro Prüfung</label>
            <select value={settings.examQuestionCount} onChange={(e) => save({ examQuestionCount: parseInt(e.target.value, 10) })}>
              {[8, 12, 16, 20, 25].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="small dim">Freitext-Anteil</label>
            <select value={String(settings.examOpenShare)} onChange={(e) => save({ examOpenShare: parseFloat(e.target.value) })}>
              <option value="0.2">20 % (MC-lastig)</option>
              <option value="0.35">35 % (ausgewogen)</option>
              <option value="0.5">50 % (freitextlastig)</option>
              <option value="0.7">70 % (Klausurtraining)</option>
            </select>
          </div>
          <div>
            <label className="small dim">Standard-Zeitlimit</label>
            <select value={settings.examTimeLimitMin === null ? '' : String(settings.examTimeLimitMin)}
              onChange={(e) => save({ examTimeLimitMin: e.target.value === '' ? null : parseInt(e.target.value, 10) })}>
              <option value="">Kein Limit</option>
              {[10, 15, 20, 30, 45, 60].map((n) => <option key={n} value={n}>{n} Minuten</option>)}
            </select>
          </div>
        </div>
      </div>

      {debug && (
        <div className="card">
          <h2>Debug & Qualitätskontrolle</h2>
          <div className="grid cols-3">
            <div><div className="big-number">{debug.content.questions}</div><div className="small dim">Fragen im Katalog</div></div>
            <div><div className="big-number">{debug.content.figures}</div><div className="small dim">Abbildungen (4-fach geprüft)</div></div>
            <div><div className="big-number">{debug.content.concepts}</div><div className="small dim">Konzepte im Wissensmodell</div></div>
          </div>
          <div style={{ marginTop: 14 }}>
            {debug.content.validationIssues.length === 0 ? (
              <div className="feedback-box ok"><strong>✓ Inhaltsvalidierung bestanden</strong> – keine Konsistenzprobleme in Fragen, Kapiteln, Konzepten oder Bildern gefunden.</div>
            ) : (
              <div className="feedback-box bad">
                <strong>Validierungsprobleme:</strong>
                <ul>{debug.content.validationIssues.map((v: string, i: number) => <li key={i}>{v}</li>)}</ul>
              </div>
            )}
            {debug.content.figuresUncertain.length > 0 && (
              <div className="feedback-box partial" style={{ marginTop: 10 }}>
                <strong>Als „unsicher“ markierte Abbildungen:</strong>
                <ul>{debug.content.figuresUncertain.map((f: any, i: number) => <li key={i}>{f.title}{f.note ? ` – ${f.note}` : ''}</li>)}</ul>
              </div>
            )}
          </div>
          <div className="small dim" style={{ marginTop: 10 }}>
            Nutzerdaten: {debug.state.attempts} Antworten · {debug.state.sessions} Sessions · {debug.state.masteryEntries} Mastery-Einträge ·
            zuletzt gespeichert {new Date(debug.state.lastSavedAt).toLocaleString('de-DE')}
          </div>
          {debug.state.flaggedQuestions.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h3>Gemeldete Fragen</h3>
              <ul className="small">
                {debug.state.flaggedQuestions.map((f: any, i: number) => (
                  <li key={i}>{f.questionId} – {new Date(f.at).toLocaleString('de-DE')}</li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ marginTop: 14 }}>
            <button className="btn small" onClick={() => setShowConfig(!showConfig)}>{showConfig ? '▾ Konfiguration ausblenden' : '▸ Gewichte & Schwellenwerte anzeigen'}</button>
            {showConfig && (
              <pre className="small" style={{ background: 'var(--bg-subtle)', padding: 14, borderRadius: 8, overflowX: 'auto', marginTop: 10 }}>
                {JSON.stringify(debug.config, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <h2>Daten</h2>
        <p className="small dim">Der Lernstand wird lokal in <code>data/state.json</code> gespeichert und übersteht Neustarts der App.</p>
        {!confirmReset ? (
          <button className="btn danger" onClick={() => setConfirmReset(true)}>Lernstand zurücksetzen …</button>
        ) : (
          <div className="feedback-box bad">
            <strong>Wirklich alle Antworten, Fortschritte und Fehlerdaten löschen?</strong>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button className="btn danger" onClick={resetAll}>Ja, alles zurücksetzen</button>
              <button className="btn" onClick={() => setConfirmReset(false)}>Abbrechen</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
