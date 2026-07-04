'use client';

/** Analyse-Dashboard: Fehlerarten, Problembegriffe, Verlauf, Fragetyp-Statistik, Export. */

import { useEffect, useState } from 'react';

const ERROR_LABELS: Record<string, string> = {
  knowledge_gap: 'Wissenslücke', confusion: 'Verwechslung', application: 'Anwendungsfehler',
  careless: 'Flüchtigkeitsfehler', unsure_correct: 'Richtig, aber unsicher',
};
const TYPE_LABELS: Record<string, string> = {
  single_choice: 'Single Choice', multiple_choice: 'Multiple Choice', true_false: 'Richtig/Falsch',
  cloze: 'Lückentext', open: 'Offene Frage', transfer: 'Transfer', assignment: 'Zuordnung',
  image_open: 'Bild (offen)', image_choice: 'Bild (Auswahl)', image_assignment: 'Bild (Zuordnung)',
};

export default function AnalysePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/overview').then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Lade Analyse …</div>;

  const errs = data.errors;
  const maxCat = Math.max(1, ...errs.byCategory.map((e: any) => e.count));
  const history = data.readinessHistory ?? [];
  const trendLabel = errs.improvementTrend === 'improving' ? '↗ Du verbesserst dich' : errs.improvementTrend === 'declining' ? '↘ Fehlerquote steigt' : errs.improvementTrend === 'flat' ? '→ stabil' : 'noch zu wenige Daten';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1>Analyse</h1>
          <p className="page-sub">Fehler werden nicht nur gezählt, sondern kategorisiert – inklusive Trend und Problembegriffen.</p>
        </div>
        <a className="btn" href="/api/export" download>⭳ Lernbericht exportieren</a>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <h2>Fehlerarten</h2>
          {errs.byCategory.length === 0 && <div className="empty-state small">Noch keine Fehler erfasst – beantworte zuerst einige Fragen.</div>}
          {errs.byCategory.map((e: any) => (
            <div key={e.category} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }} className="small">
                <span>{ERROR_LABELS[e.category] ?? e.category}</span><span className="dim">{e.count}×</span>
              </div>
              <div className="progress-track"><div className="progress-fill warn" style={{ width: `${(e.count / maxCat) * 100}%` }} /></div>
            </div>
          ))}
          <div className="small" style={{ marginTop: 10 }}>Trend: <strong>{trendLabel}</strong> · {errs.resolvedCount} frühere Fehler inzwischen stabil korrigiert ✓</div>
        </div>

        <div className="card">
          <h2>Wiederkehrende Problembegriffe</h2>
          {errs.problemTerms.length === 0 && <div className="empty-state small">Keine Problembegriffe – gut so!</div>}
          {errs.problemTerms.map((t: any, i: number) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <strong>{t.term}</strong> <span className="badge danger">{t.count}× falsch</span>
              {t.confusedWith.length > 0 && <div className="small dim">verwechselt mit: {t.confusedWith.join(', ')}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Fehler je Kapitel</h2>
        {errs.byChapter.length === 0 ? <div className="empty-state small">Noch keine Daten.</div> : (
          <table className="data">
            <thead><tr><th>Kapitel</th><th>Fehler</th><th>Häufigste Fehlerart</th></tr></thead>
            <tbody>
              {errs.byChapter.map((c: any) => {
                const ch = data.chapters.find((x: any) => x.id === c.chapterId);
                return (
                  <tr key={c.chapterId}>
                    <td>Kapitel {ch?.index}: {ch?.title}</td>
                    <td>{c.count}</td>
                    <td>{c.topCategory ? ERROR_LABELS[c.topCategory] : '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Leistung nach Fragetyp</h2>
        {Object.keys(data.techniques).length === 0 ? <div className="empty-state small">Noch keine Daten.</div> : (
          <table className="data">
            <thead><tr><th>Fragetyp</th><th>Versuche</th><th>Trefferquote</th><th>Ø Zeit</th><th>Unsicher-Anteil</th></tr></thead>
            <tbody>
              {Object.entries(data.techniques).map(([type, t]: [string, any]) => (
                <tr key={type}>
                  <td>{TYPE_LABELS[type] ?? type}</td>
                  <td>{t.attempts}</td>
                  <td><span className={`badge ${t.accuracy >= 70 ? 'success' : t.accuracy >= 40 ? 'warn' : 'danger'}`}>{t.accuracy} %</span></td>
                  <td>{Math.round(t.avgMs / 1000)} s</td>
                  <td>{t.lowConfidenceShare} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Verlauf: Fortschritt & Prüfungsbereitschaft</h2>
        {history.length < 2 ? <div className="empty-state small">Der Verlauf erscheint, sobald mehr Daten vorliegen.</div> : (
          <svg viewBox="0 0 600 180" style={{ width: '100%', height: 'auto' }} role="img" aria-label="Verlauf von Lernfortschritt und Prüfungsbereitschaft">
            {[0, 25, 50, 75, 100].map((y) => (
              <g key={y}>
                <line x1="30" x2="595" y1={160 - y * 1.5} y2={160 - y * 1.5} stroke="var(--border)" strokeWidth="1" />
                <text x="2" y={164 - y * 1.5} fontSize="9" fill="var(--text-dim)">{y}%</text>
              </g>
            ))}
            <polyline fill="none" stroke="var(--accent)" strokeWidth="2.5"
              points={history.map((h: any, i: number) => `${30 + (i / Math.max(1, history.length - 1)) * 565},${160 - h.progress * 1.5}`).join(' ')} />
            <polyline fill="none" stroke="var(--success)" strokeWidth="2.5" strokeDasharray="5 4"
              points={history.map((h: any, i: number) => `${30 + (i / Math.max(1, history.length - 1)) * 565},${160 - h.readiness * 1.5}`).join(' ')} />
            <g fontSize="11">
              <rect x="40" y="8" width="12" height="4" fill="var(--accent)" />
              <text x="57" y="13" fill="var(--text-dim)">Lernfortschritt</text>
              <rect x="160" y="8" width="12" height="4" fill="var(--success)" />
              <text x="177" y="13" fill="var(--text-dim)">Prüfungsbereitschaft</text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
