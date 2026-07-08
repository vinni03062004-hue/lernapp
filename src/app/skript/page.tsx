'use client';

/**
 * Lernskript – aufbereiteter, gut lesbarer Überblick über den gesamten Stoff.
 * Rein aus den vorhandenen Inhalten (Kapitel-Kernideen, Begriffe, Abbildungen),
 * KEIN KI-Aufruf → verbraucht kein Kontingent. Zum schnellen Durchlesen & Merken.
 */

import { useEffect, useMemo, useState } from 'react';

export default function SkriptPage() {
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        setContent(d);
        // alle Kapitel standardmäßig aufgeklappt
        const o: Record<string, boolean> = {};
        (d.chapters ?? []).forEach((c: any) => (o[c.id] = true));
        setOpen(o);
      })
      .catch(() => setError('Inhalte konnten nicht geladen werden.'));
  }, []);

  const chapters = content?.chapters ?? [];
  const conceptsByChapter = useMemo(() => {
    const m: Record<string, any[]> = {};
    for (const c of content?.concepts ?? []) (m[c.chapterId] ??= []).push(c);
    return m;
  }, [content]);
  const figuresByChapter = useMemo(() => {
    const m: Record<string, any[]> = {};
    for (const f of content?.figures ?? []) (m[f.chapterId] ??= []).push(f);
    return m;
  }, [content]);

  function setAll(v: boolean) {
    const o: Record<string, boolean> = {};
    chapters.forEach((c: any) => (o[c.id] = v));
    setOpen(o);
  }
  function jump(id: string) {
    setOpen((o) => ({ ...o, [id]: true }));
    setTimeout(() => document.getElementById(`kap-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  }

  return (
    <div>
      <h1>Lernskript</h1>
      <p className="page-sub">
        Der ganze Stoff aufbereitet zum schnellen Durchlesen und Merken – ohne KI, ohne Anfragen zu verbrauchen.
      </p>
      {error && <div className="feedback-box bad" style={{ marginBottom: 12 }}>{error}</div>}

      {!content ? (
        <div className="card"><span className="spinner" /> Lädt …</div>
      ) : (
        <>
          {/* Inhaltsverzeichnis */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ margin: 0 }}>Inhalt</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn small" onClick={() => setAll(true)}>Alle ausklappen</button>
                <button className="btn small" onClick={() => setAll(false)}>Alle einklappen</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {chapters.map((c: any) => (
                <button key={c.id} className="btn small" onClick={() => jump(c.id)}>
                  <span className="badge">{c.index}</span> {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* Kapitel */}
          {chapters.map((c: any) => {
            const isOpen = open[c.id];
            const concepts = conceptsByChapter[c.id] ?? [];
            const figures = figuresByChapter[c.id] ?? [];
            return (
              <div key={c.id} id={`kap-${c.id}`} className="card" style={{ marginTop: 14, scrollMarginTop: 12 }}>
                <button
                  onClick={() => setOpen((o) => ({ ...o, [c.id]: !o[c.id] }))}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0, display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span className="badge accent" style={{ fontSize: 15 }}>{c.index}</span>
                  <span style={{ flex: 1 }}>
                    <strong style={{ fontSize: 18 }}>{c.title}</strong>
                    {c.subchapters?.length > 0 && (
                      <div className="small dim" style={{ marginTop: 2 }}>{c.subchapters.join(' · ')}</div>
                    )}
                  </span>
                  <span aria-hidden style={{ fontSize: 18 }}>{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && (
                  <div style={{ marginTop: 14 }}>
                    {/* Kernideen */}
                    {c.keyIdeas?.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div className="nav-section" style={{ margin: '0 0 6px', padding: 0 }}>Kernideen</div>
                        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {c.keyIdeas.map((k: string, i: number) => <li key={i} style={{ lineHeight: 1.5 }}>{k}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* Begriffe / Glossar */}
                    {concepts.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div className="nav-section" style={{ margin: '0 0 6px', padding: 0 }}>Begriffe</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {concepts.map((k: any) => (
                            <div key={k.id} style={{ background: 'var(--bg-subtle)', borderRadius: 10, padding: '10px 12px' }}>
                              <div style={{ lineHeight: 1.5 }}>
                                <strong style={{ color: 'var(--accent)' }}>{k.term}</strong> — {k.definition}
                              </div>
                              {k.example && <div className="small" style={{ marginTop: 4 }}><em>Beispiel:</em> {k.example}</div>}
                              {k.mnemonic && <div className="small" style={{ marginTop: 4 }}>🧠 <em>Merke:</em> {k.mnemonic}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Abbildungen */}
                    {figures.length > 0 && (
                      <div>
                        <div className="nav-section" style={{ margin: '0 0 6px', padding: 0 }}>Abbildungen</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                          {figures.map((f: any) => (
                            <div key={f.id}>
                              <div style={{ fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
                              <div className="figure-frame" style={{ marginBottom: 6 }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`/images/kv/${f.file}`} alt={f.caption} />
                              </div>
                              {f.explanationSimple && <div className="small">{f.explanationSimple}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
