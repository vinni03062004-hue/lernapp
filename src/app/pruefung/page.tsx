'use client';

/**
 * Prüfungsmodus (und Bild-Prüfmodus via ?bilder=1):
 * kein Feedback während der Beantwortung, Gesamtbewertung am Ende,
 * konfigurierbares Prüfungsprofil (Fragenzahl, Freitextanteil, Zeitlimit).
 */

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SessionPlayer } from '@/components/SessionPlayer';

function PruefungInner() {
  const params = useSearchParams();
  const imageMode = params.get('bilder') === '1';
  const [chapters, setChapters] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [count, setCount] = useState(12);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then((d) => setChapters(d.chapters ?? [])).catch(() => {});
    fetch('/api/overview').then((r) => r.json()).then((d) => {
      if (d.settings) {
        setCount(d.settings.examQuestionCount ?? 12);
        setTimeLimit(d.settings.examTimeLimitMin ?? null);
      }
    }).catch(() => {});
  }, []);

  if (started) {
    return (
      <div>
        <h1>{imageMode ? 'Bild-Prüfmodus' : 'Prüfungsmodus'}</h1>
        <p className="page-sub">Kein Feedback während der Beantwortung – die Auswertung folgt am Ende.</p>
        <SessionPlayer mode={imageMode ? 'image_exam' : 'exam'} chapterIds={selected} count={count} timeLimitMin={timeLimit} />
      </div>
    );
  }

  return (
    <div>
      <h1>{imageMode ? 'Bild-Prüfmodus' : 'Prüfungsmodus'}</h1>
      <p className="page-sub">
        {imageMode
          ? 'Simuliert eine Prüfung ausschließlich mit bild- und diagrammbezogenen Aufgaben: Abbildungen erklären, Prinzipien darlegen, Elemente zuordnen.'
          : 'Simuliert eine echte Prüfungssituation: Multiple Choice und freie Aufgaben kombiniert, verschiedene Schwierigkeitsstufen, Auswertung mit Fehleranalyse und Empfehlungen am Ende.'}
      </p>
      <div className="card">
        <h2>Prüfungsprofil</h2>
        <div className="grid cols-3">
          <div>
            <label className="small dim">Anzahl Fragen</label>
            <select value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))}>
              {[8, 12, 16, 20, 25].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="small dim">Zeitlimit</label>
            <select value={timeLimit === null ? '' : String(timeLimit)} onChange={(e) => setTimeLimit(e.target.value === '' ? null : parseInt(e.target.value, 10))}>
              <option value="">Kein Zeitlimit</option>
              {[10, 15, 20, 30, 45, 60].map((n) => <option key={n} value={n}>{n} Minuten</option>)}
            </select>
          </div>
        </div>
        <h3 style={{ marginTop: 18 }}>Kapitel (leer = alle)</h3>
        <div className="grid cols-3">
          {chapters.map((c) => (
            <button key={c.id} className={`option-row ${selected.includes(c.id) ? 'selected' : ''}`} style={{ marginTop: 0 }}
              onClick={() => setSelected((s) => (s.includes(c.id) ? s.filter((x) => x !== c.id) : [...s, c.id]))}>
              <span className="badge">{c.index}</span> {c.title}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex' }}>
          <button className="btn primary" style={{ marginLeft: 'auto' }} onClick={() => setStarted(true)}>Prüfung starten →</button>
        </div>
      </div>
    </div>
  );
}

export default function PruefungPage() {
  return (
    <Suspense fallback={<div className="card"><span className="spinner" /></div>}>
      <PruefungInner />
    </Suspense>
  );
}
