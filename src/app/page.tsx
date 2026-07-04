'use client';

/** Übersicht: Lernfortschritt, Prüfungsbereitschaft, Empfehlungen, Kapitel. */

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/overview')
      .then((r) => r.json())
      .then((d) => (d.error ? setError(d.error) : setData(d)))
      .catch(() => setError('Übersicht konnte nicht geladen werden.'));
  }, []);

  if (error) return <div className="card feedback-box bad">{error}</div>;
  if (!data) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Lade Übersicht …</div>;

  const p = data.progress;
  const r = data.readiness;

  return (
    <div>
      <h1>Modul {data.module.title}</h1>
      <p className="page-sub">{data.module.studyProgram} · {data.attemptsTotal} beantwortete Fragen · Stand gespeichert ✓</p>

      <div className="grid cols-2">
        <div className="card">
          <h2>Lernfortschritt</h2>
          <div className="big-number">{p.progress} %</div>
          <div className="progress-track" style={{ margin: '10px 0 14px' }}>
            <div className="progress-fill" style={{ width: `${p.progress}%` }} />
          </div>
          <div className="small dim">
            Stoffabdeckung {p.components.coverage} % · Korrektheit {p.components.correctness} % · Wiederholung {p.components.review} % · Stabilität {p.components.stability} %
          </div>
        </div>
        <div className="card">
          <h2>Prüfungsbereitschaft</h2>
          <div className="big-number">{r.readiness} %</div>
          <div className="progress-track" style={{ margin: '10px 0 14px' }}>
            <div className={`progress-fill ${r.readiness >= 75 ? 'green' : r.readiness >= 40 ? '' : 'warn'}`} style={{ width: `${r.readiness}%` }} />
          </div>
          <div className="small dim">
            Trefferquote {r.components.recentAccuracy} % · Stabilität {r.components.stability} % · schwere Fragen {r.components.hardQuestions} % · Fehlerkorrektur {r.components.errorRecovery} % · Kapitelabdeckung {r.components.chapterCoverage} %
          </div>
          {r.explanation.map((e: string, i: number) => (
            <div key={i} className="small" style={{ marginTop: 8, color: 'var(--warn)' }}>⚠ {e}</div>
          ))}
        </div>
      </div>

      {data.recommendations.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>Empfohlene nächste Schritte</h2>
          <div className="grid cols-2">
            {data.recommendations.map((rec: any, i: number) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '13px 15px' }}>
                <span className={`badge ${rec.kind === 'warning' ? 'warn' : rec.kind === 'next_unit' ? 'accent' : ''}`}>
                  {rec.kind === 'next_unit' ? 'Nächste Einheit' : rec.kind === 'warning' ? 'Hinweis' : rec.kind === 'technique' ? 'Lerntechnik' : 'Kapitel'}
                </span>
                <div style={{ fontWeight: 600, margin: '6px 0 3px' }}>{rec.title}</div>
                <div className="small dim">{rec.detail}</div>
                {rec.href && <div style={{ marginTop: 8 }}><Link className="btn small primary" href={rec.href}>Los geht’s →</Link></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Schnellstart</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn primary" href="/lernen">▸ Lernmodus</Link>
          <Link className="btn" href="/lernen?mode=mixed">⤨ Mischmodus</Link>
          <Link className="btn" href="/lernen?mode=error_focus">⚑ Fehlerfokus ({data.openErrorCount})</Link>
          <Link className="btn" href="/bilder">▦ Bild-Lernmodus</Link>
          <Link className="btn" href="/pruefung">✎ Prüfung simulieren</Link>
          <Link className="btn" href="/erklaeren">✦ Etwas erklären lassen</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Kapitel</h2>
        <div className="grid cols-2">
          {data.chapters.map((c: any) => (
            <Link key={c.id} href={`/lernen?chapter=${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '13px 15px', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <strong>Kapitel {c.index}: {c.title}</strong>
                  {c.status.completed ? <span className="badge success">✓ stabil</span> : c.status.repeatErrors > 0 ? <span className="badge danger">{c.status.repeatErrors} Fehler offen</span> : null}
                </div>
                <div className="progress-track" style={{ margin: '9px 0 7px' }}>
                  <div className={`progress-fill ${c.status.completed ? 'green' : ''}`} style={{ width: `${c.status.masteryPct}%` }} />
                </div>
                <div className="small dim">{c.status.masteryPct} % beherrscht · {c.status.attemptedShare} % bearbeitet · {c.questionCount} Fragen{c.figureCount > 0 ? ` · ${c.figureCount} Abbildungen` : ''}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
