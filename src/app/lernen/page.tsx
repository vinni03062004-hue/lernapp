'use client';

/**
 * Lernmodus / Mischmodus / Fehlerfokus.
 * Query-Parameter: ?chapter=k3 (Kapitelmodus), ?mode=mixed|error_focus
 */

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SessionPlayer } from '@/components/SessionPlayer';

function LernenInner() {
  const params = useSearchParams();
  const chapter = params.get('chapter');
  const modeParam = params.get('mode');
  const mode = modeParam === 'mixed' ? 'mixed' : modeParam === 'error_focus' ? 'error_focus' : 'learn';

  const [chapters, setChapters] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>(chapter ? [chapter] : []);
  const [started, setStarted] = useState(!!chapter || mode !== 'learn');
  const [count, setCount] = useState(10);

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then((d) => setChapters(d.chapters ?? [])).catch(() => {});
  }, []);

  // Bei Wechsel über die Navigation (nur Query ändert sich, z. B. /lernen ->
  // /lernen?mode=mixed) baut Next.js die Seite nicht neu auf. Darum setzen wir
  // den Zustand hier passend zum aktuellen Modus/Kapitel zurück.
  useEffect(() => {
    setSelected(chapter ? [chapter] : []);
    setStarted(!!chapter || mode !== 'learn');
  }, [mode, chapter]);

  const titles: Record<string, string> = {
    learn: 'Lernmodus', mixed: 'Mischmodus (Interleaving)', error_focus: 'Fehlerfokus',
  };
  const subs: Record<string, string> = {
    learn: 'Aktiver Abruf mit direktem Feedback. Falsche Antworten werden am Ende der Session erneut geprüft und adaptiv wiederholt.',
    mixed: 'Fragen aus allen Kapiteln gezielt gemischt – realistische Prüfungsvorbereitung statt Blocklernen.',
    error_focus: 'Trainiert gezielt deine offenen Fehler und instabilen Inhalte.',
  };

  if (started) {
    return (
      <div>
        <h1>{titles[mode]}</h1>
        <p className="page-sub">{subs[mode]}</p>
        <SessionPlayer key={`${mode}-${selected.join(',')}-${count}`} mode={mode as any} chapterIds={mode === 'learn' ? selected : []} count={count} />
      </div>
    );
  }

  return (
    <div>
      <h1>Lernmodus</h1>
      <p className="page-sub">{subs.learn}</p>
      <div className="card">
        <h2>Kapitel wählen</h2>
        <div className="grid cols-3">
          {chapters.map((c) => (
            <button key={c.id}
              className={`option-row ${selected.includes(c.id) ? 'selected' : ''}`} style={{ marginTop: 0 }}
              onClick={() => setSelected((s) => (s.includes(c.id) ? s.filter((x) => x !== c.id) : [...s, c.id]))}>
              <span className="badge">{c.index}</span> {c.title}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <label className="small dim">Fragen pro Session:</label>
          <select style={{ width: 90 }} value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))}>
            {[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <button className="btn primary" style={{ marginLeft: 'auto' }} onClick={() => setStarted(true)}>
            {selected.length === 0 ? 'Alle Kapitel lernen →' : `${selected.length} Kapitel lernen →`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LernenPage() {
  return (
    <Suspense fallback={<div className="card"><span className="spinner" /></div>}>
      <LernenInner />
    </Suspense>
  );
}
