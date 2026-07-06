'use client';

/**
 * Erklärmodus & Fach-Chatbot.
 * Antworten kommen von der KI (bzw. dem Offline-Wissensmodell) und werden gegen
 * die Quellen geprüft. Zusätzlich lassen sich "Modelle & Abbildungen" gezielt
 * erklären; die eigene Chat-Nachricht dazu ist antippbar und öffnet die
 * Abbildung als Bild in einem Popup.
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface FigureRef {
  file: string;
  title: string;
}

function ErklaerenInner() {
  const params = useSearchParams();
  const chapterParam = params.get('chapter');
  const [content, setContent] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>(chapterParam ?? '');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const [modalFigure, setModalFigure] = useState<FigureRef | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then((d) => {
      setContent(d);
      setMessages(d.chatHistory ?? []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Esc schließt das Popup
  useEffect(() => {
    if (!modalFigure) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalFigure(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalFigure]);

  async function ask(q?: string, figure?: FigureRef) {
    const text = (q ?? query).trim();
    if (!text || busy) return;
    setBusy(true);
    setQuery('');
    setMessages((m) => [...m, { role: 'user', content: text, figure, timestamp: Date.now() }]);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, chat: true }),
      });
      const data = await res.json();
      if (data.answer) {
        const a = data.answer;
        const parts: string[] = [a.core];
        const extras = [a.simple, a.detailed, a.example ? `Beispiel: ${a.example}` : '', a.mnemonic ? `Merksatz: ${a.mnemonic}` : ''];
        for (const extra of extras) {
          if (extra && !parts.some((p) => p.includes(extra) || extra.includes(p))) parts.push(extra);
        }
        setMessages((m) => [...m, { role: 'assistant', content: parts.join('\n\n'), sources: a.sources, uncertain: a.uncertain, timestamp: Date.now() }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: data.error ?? 'Fehler bei der Antwort.', uncertain: true, timestamp: Date.now() }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Die Anfrage ist fehlgeschlagen. Bitte erneut versuchen.', uncertain: true, timestamp: Date.now() }]);
    } finally {
      setBusy(false);
    }
  }

  const chapterConcepts = content?.concepts?.filter((c: any) => !selectedChapter || c.chapterId === selectedChapter) ?? [];
  const chapterFigures = content?.figures?.filter((f: any) => !selectedChapter || f.chapterId === selectedChapter) ?? [];
  // Nachschlagewerk: Titel (kleingeschrieben) -> Abbildung, damit auch aus dem
  // Verlauf geladene Nachrichten antippbar werden.
  const figByTitle: Record<string, FigureRef> = {};
  for (const f of content?.figures ?? []) figByTitle[(f.title as string).trim().toLowerCase()] = { file: f.file, title: f.title };

  function figureForMessage(m: any): FigureRef | null {
    if (m.role !== 'user') return null;
    if (m.figure) return m.figure as FigureRef;
    return figByTitle[(m.content ?? '').trim().toLowerCase()] ?? null;
  }

  return (
    <div>
      <h1>Erklärmodus & Fach-Chatbot</h1>
      <p className="page-sub">
        Antworten basieren auf dem Wissensmodell deines Modul-PDFs. Modelle und Abbildungen kannst du gezielt erklären
        lassen – tippe deine Nachricht dazu im Chat an, um die Abbildung als Bild zu öffnen.
      </p>

      <div className="grid cols-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h2>Chat</h2>
          <div className="chat-log" ref={logRef}>
            {messages.length === 0 && (
              <div className="empty-state small">
                Stelle eine Frage zum Modul, z. B. „Was ist der Unterschied zwischen Evoked Set und Consideration Set?“
              </div>
            )}
            {messages.map((m, i) => {
              const fig = figureForMessage(m);
              return (
                <div key={i} className={`chat-msg ${m.role}`}>
                  {fig ? (
                    <button
                      onClick={() => setModalFigure(fig)}
                      title="Modell als Bild öffnen"
                      style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                    >
                      {m.content} <span aria-hidden>▦</span>
                    </button>
                  ) : (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                  )}
                  {m.role === 'assistant' && (
                    <div style={{ marginTop: 6 }}>
                      {m.uncertain && <span className="badge warn" style={{ marginRight: 6 }}>⚠ unsichere Evidenz</span>}
                      {m.sources?.map((s: string, j: number) => (
                        <div key={j} className="source-ref">⌘ {s}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {busy && <div className="chat-msg assistant"><span className="spinner" /></div>}
          </div>
          <form style={{ display: 'flex', gap: 8, marginTop: 12 }}
            onSubmit={(e) => { e.preventDefault(); ask(); }}>
            <input type="text" value={query} placeholder="Frage zum Konsumentenverhalten …"
              onChange={(e) => setQuery(e.target.value)} aria-label="Frage eingeben" />
            <button className="btn primary" type="submit" disabled={busy || !query.trim()}>Fragen</button>
          </form>
        </div>

        <div className="card">
          <h2>Begriffe nach Kapitel</h2>
          <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} style={{ marginBottom: 12 }}>
            <option value="">Alle Kapitel</option>
            {content?.chapters?.map((c: any) => (
              <option key={c.id} value={c.id}>Kapitel {c.index}: {c.title}</option>
            ))}
          </select>
          <div style={{ maxHeight: 260, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chapterConcepts.map((c: any) => (
              <button key={c.id} className="btn small" onClick={() => ask(c.term)} title={c.definition}>
                {c.term}
              </button>
            ))}
          </div>

          <h2 style={{ marginTop: 18 }}>Modelle &amp; Abbildungen</h2>
          <div style={{ maxHeight: 260, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chapterFigures.map((f: any) => (
              <button key={f.id} className="btn small" onClick={() => ask(f.title, { file: f.file, title: f.title })}
                title="Erklären lassen – danach im Chat antippbar als Bild">
                <span aria-hidden>▦</span> {f.title}
              </button>
            ))}
            {chapterFigures.length === 0 && <span className="small dim">Keine Abbildungen in diesem Kapitel.</span>}
          </div>
          <p className="small dim" style={{ marginTop: 10 }}>
            Klicke ein Modell zum Erklären. Deine Nachricht dazu wird im Chat antippbar (▦) und öffnet die Abbildung als Bild.
          </p>
        </div>
      </div>

      {/* Popup mit dem Modell als Bild */}
      {modalFigure && (
        <div
          onClick={() => setModalFigure(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}
        >
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 12, maxWidth: 'min(900px, 96vw)', maxHeight: '90vh', overflow: 'auto', padding: 16, position: 'relative' }}>
            <button onClick={() => setModalFigure(null)} aria-label="Schließen"
              style={{ position: 'absolute', top: 8, right: 8, border: 'none', background: '#eee', color: '#16181d', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
              ×
            </button>
            <strong style={{ color: '#16181d', display: 'block', marginBottom: 10, paddingRight: 40 }}>{modalFigure.title}</strong>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/kv/${modalFigure.file}`} alt={modalFigure.title} style={{ maxWidth: '100%', display: 'block' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ErklaerenPage() {
  return (
    <Suspense fallback={<div className="card"><span className="spinner" /></div>}>
      <ErklaerenInner />
    </Suspense>
  );
}
