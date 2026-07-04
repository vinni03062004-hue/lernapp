'use client';

/**
 * Bild-Lernmodus: Galerie aller Abbildungen (exakt wie im PDF) mit
 * Kapitelname, Bildtitel, Erklärung in einfacher und fachlicher Sprache,
 * Bildelementen und typischen Fehlinterpretationen – plus Übungssession
 * mit bildbezogenen Fragen.
 */

import { useEffect, useState } from 'react';
import { SessionPlayer } from '@/components/SessionPlayer';

export default function BilderPage() {
  const [content, setContent] = useState<any>(null);
  const [openFigure, setOpenFigure] = useState<string | null>(null);
  const [training, setTraining] = useState(false);
  const [chapterFilter, setChapterFilter] = useState('');

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then(setContent).catch(() => {});
  }, []);

  if (training) {
    return (
      <div>
        <h1>Bild-Lernmodus · Übung</h1>
        <p className="page-sub">Bildbezogene Fragen mit direktem Feedback und geprüften Lösungen.</p>
        <SessionPlayer mode="image_learn" chapterIds={chapterFilter ? [chapterFilter] : []} count={8} />
      </div>
    );
  }

  if (!content) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Lade Abbildungen …</div>;

  const figures = content.figures.filter((f: any) => !chapterFilter || f.chapterId === chapterFilter);
  const chapterOf = (id: string) => content.chapters.find((c: any) => c.id === id);

  return (
    <div>
      <h1>Bild-Lernmodus</h1>
      <p className="page-sub">
        Alle {content.figures.length} Abbildungen aus dem Modul-PDF – mit Erklärungen, Bildelementen und typischen Fehlinterpretationen.
        Jede Abbildung hat die vierstufige Prüfkette durchlaufen (technisch · semantisch · didaktisch · validiert).
      </p>
      <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <select style={{ maxWidth: 340 }} value={chapterFilter} onChange={(e) => setChapterFilter(e.target.value)}>
          <option value="">Alle Kapitel</option>
          {content.chapters.map((c: any) => (
            <option key={c.id} value={c.id}>Kapitel {c.index}: {c.title}</option>
          ))}
        </select>
        <button className="btn primary" style={{ marginLeft: 'auto' }} onClick={() => setTraining(true)}>▸ Bildfragen üben</button>
      </div>

      {figures.map((f: any) => {
        const ch = chapterOf(f.chapterId);
        const open = openFigure === f.id;
        return (
          <div key={f.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <div>
                <span className="badge accent">Kapitel {ch?.index}: {ch?.title}</span>
                <h2 style={{ margin: '8px 0 2px' }}>{f.title}</h2>
                <div className="small dim">{f.caption} · PDF S. {f.pdfPage}</div>
              </div>
              <span className="badge success" title="Bildprüfkette: technisch, semantisch, didaktisch, validiert">✓ 4-fach geprüft</span>
            </div>
            <div className="figure-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/kv/${f.file}`} alt={f.caption} loading="lazy" />
            </div>
            <button className="btn small" onClick={() => setOpenFigure(open ? null : f.id)} aria-expanded={open}>
              {open ? '▾ Erklärung einklappen' : '▸ Erklärung anzeigen'}
            </button>
            {open && (
              <div style={{ marginTop: 14 }}>
                <h3>Einfach erklärt</h3>
                <p>{f.explanationSimple}</p>
                <h3>Fachlich erklärt</h3>
                <p>{f.explanationExpert}</p>
                <h3>Bildelemente</h3>
                <table className="data">
                  <thead><tr><th>Element</th><th>Bedeutung</th></tr></thead>
                  <tbody>
                    {f.elements.map((el: any, i: number) => (
                      <tr key={i}><td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{el.label}</td><td>{el.meaning}</td></tr>
                    ))}
                  </tbody>
                </table>
                {f.misconceptions?.length > 0 && (
                  <div className="feedback-box partial" style={{ marginTop: 14 }}>
                    <strong>Typische Fehlinterpretationen:</strong>
                    <ul style={{ margin: '6px 0 0' }}>{f.misconceptions.map((m: string, i: number) => <li key={i}>{m}</li>)}</ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
