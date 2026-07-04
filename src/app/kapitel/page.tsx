'use client';

/** Kapitelmodus: Beherrschungsgrad, Lücken, Fehler, letzte Aktivität, Empfehlung. */

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function KapitelPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/overview').then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Lade Kapitel …</div>;

  return (
    <div>
      <h1>Kapitelübersicht</h1>
      <p className="page-sub">Ein Kapitel gilt erst als abgeschlossen, wenn es stabil beherrscht wird – nicht nach einmaligem Richtig.</p>
      {data.chapters.map((c: any) => (
        <div key={c.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>Kapitel {c.index}: {c.title}</h2>
            {c.status.completed
              ? <span className="badge success">✓ stabil abgeschlossen</span>
              : <span className="badge">{c.status.masteryPct} % beherrscht</span>}
          </div>
          <div className="small dim" style={{ margin: '4px 0 10px' }}>{c.subchapters.join(' · ')} — PDF S. {c.pdfPages}</div>
          <div className="progress-track">
            <div className={`progress-fill ${c.status.completed ? 'green' : c.status.repeatErrors > 0 ? 'warn' : ''}`} style={{ width: `${c.status.masteryPct}%` }} />
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }} className="small dim">
            <span>{c.status.attemptedShare} % bearbeitet</span>
            <span>{c.status.openGaps} offene Lücken</span>
            <span style={{ color: c.status.repeatErrors > 0 ? 'var(--danger)' : undefined }}>{c.status.repeatErrors} wiederholt falsche Fragen</span>
            <span>Letzte Aktivität: {c.status.lastActivity ? new Date(c.status.lastActivity).toLocaleString('de-DE') : 'noch keine'}</span>
          </div>
          <div className="small" style={{ marginTop: 8, color: c.status.completed ? 'var(--success)' : 'var(--warn)' }}>→ {c.status.completionHint}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <Link className="btn small primary" href={`/lernen?chapter=${c.id}`}>Kapitel lernen</Link>
            <Link className="btn small" href={`/erklaeren?chapter=${c.id}`}>Erklären lassen</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
