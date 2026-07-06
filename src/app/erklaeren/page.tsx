'use client';

/**
 * Erklärmodus & Fach-Chatbot (offline, wissensbasiert).
 * Antworten stammen aus dem PDF-Wissensmodell; schwache Evidenz wird
 * als "unsicher" markiert, Quellen werden angezeigt.
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function ErklaerenInner() {
  const params = useSearchParams();
  const chapterParam = params.get('chapter');
  const [content, setContent] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>(chapterParam ?? '');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
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

  async function ask(q?: string) {
    const text = (q ?? query).trim();
    if (!text || busy) return;
    setBusy(true);
    setQuery('');
    setMessages((m) => [...m, { role: 'user', content: text, timestamp: Date.now() }]);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, chat: true }),
      });
      const data = await res.json();
      if (data.answer) {
        const a = data.answer;
        // Bausteine zusammensetzen, Dubletten vermeiden (z. B. Definition doppelt)
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

  return (
    <div>
      <h1>Erklärmodus & Fach-Chatbot</h1>
      <p className="page-sub">
        Antworten basieren auf dem Wissensmodell deines Modul-PDFs und werden doppelt gegen die Quellen geprüft.
        Bei schwacher Evidenz erscheint eine Unsicherheits-Kennzeichnung.
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
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                {m.role === 'assistant' && (
                  <div style={{ marginTop: 6 }}>
                    {m.uncertain && <span className="badge warn" style={{ marginRight: 6 }}>⚠ unsichere Evidenz</span>}
                    {m.sources?.map((s: string, j: number) => (
                      <div key={j} className="source-ref">⌘ {s}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
          <div style={{ maxHeight: 420, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {chapterConcepts.map((c: any) => (
              <button key={c.id} className="btn small" onClick={() => ask(c.term)} title={c.definition}>
                {c.term}
              </button>
            ))}
          </div>
          <p className="small dim" style={{ marginTop: 10 }}>Klicke auf einen Begriff, um ihn dir erklären zu lassen – mit Definition, Einordnung, Beispiel und Quelle.</p>
        </div>
      </div>
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
