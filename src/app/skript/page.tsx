'use client';

/**
 * Lernskript – der Stoff des aktiven Moduls zum Lernen, Abfragen und Nachlesen.
 * Rein aus den hinterlegten Inhalten, KEIN KI-Aufruf (verbraucht kein Kontingent).
 *
 *  - Begriffe:     ein Kapitel pro Reiter, Unterkapitel in Skriptreihenfolge;
 *                  Begriff + Kurzdefinition, Aufzählungen als Stichpunkte.
 *                  Details (Skript-Definition, Beispiel, Abgrenzung, Prüfungsfokus)
 *                  nur auf Antippen.
 *  - Karteikarten: aktives Abfragen – Begriff → Bedeutung aufdecken,
 *                  „Gewusst“ / „Nochmal“ (Nochmal-Karten kommen in der Runde wieder).
 *  - Skript:       ausführliche Abschnitte wie im PDF, eingeklappt.
 */

import { useEffect, useMemo, useState } from 'react';
import { normalize } from '@/lib/normalize';

type View = 'begriffe' | 'karten' | 'skript';

interface Hit {
  key: string;
  kind: 'Begriff' | 'Abschnitt' | 'Abbildung';
  label: string;
  meta: string;
  snippet?: string;
  chapterId: string;
  target: string;
  view: View;
  rank: number;
}

interface SectionGroup {
  id: string;
  title: string;
  conceptIds: string[];
}
interface SubGroup {
  key: string;
  title: string;
  sections: SectionGroup[];
}

const VIEWS: { id: View; label: string }[] = [
  { id: 'begriffe', label: 'Begriffe' },
  { id: 'karten', label: 'Karteikarten' },
  { id: 'skript', label: 'Skript' },
];

/** Fließtext eines Blocks (für Suche + Trefferausschnitt). */
function blockText(b: any, conceptMap: Record<string, any>): string {
  switch (b?.kind) {
    case 'text':
    case 'merke':
    case 'exam':
      return b.text ?? '';
    case 'example':
      return `${b.title ?? ''} ${b.text ?? ''}`;
    case 'list':
      return `${b.title ?? ''} ${(b.items ?? []).join(' ')}`;
    case 'table':
      return `${b.title ?? ''} ${(b.rows ?? []).map((r: string[]) => r.join(' – ')).join('; ')}`;
    case 'proscons':
      return `${b.title ?? ''} ${(b.pros ?? []).join(' ')} ${(b.cons ?? []).join(' ')}`;
    case 'definitions':
      return (b.conceptIds ?? [])
        .map((id: string) => (conceptMap[id] ? `${conceptMap[id].term}: ${conceptMap[id].definition}` : ''))
        .join(' ');
    default:
      return '';
  }
}

function snippetAround(text: string, query: string): string {
  const t = text.replace(/\s+/g, ' ').trim();
  const i = t.toLowerCase().indexOf(query.trim().toLowerCase());
  if (i < 0) return t.length > 140 ? `${t.slice(0, 140)} …` : t;
  let start = Math.max(0, i - 50);
  if (start > 0) {
    const sp = t.indexOf(' ', start);
    if (sp >= 0 && sp < i) start = sp + 1;
  }
  const end = Math.min(t.length, i + query.length + 90);
  return `${start > 0 ? '… ' : ''}${t.slice(start, end)}${end < t.length ? ' …' : ''}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** aktives Profil (Cookie, vom Client gesetzt) – für getrennten Karteikarten-Fortschritt */
function profileId(): string {
  try {
    const m = document.cookie.match(/(?:^|;\s*)profile=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : 'default';
  } catch {
    return 'default';
  }
}

export default function SkriptPage() {
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState('');
  const [view, setView] = useState<View>('begriffe');
  const [chapterId, setChapterId] = useState<string>('');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [modalFigure, setModalFigure] = useState<any>(null);
  const [flash, setFlash] = useState<string | null>(null);

  // Karteikarten
  const [deck, setDeck] = useState<'chapter' | 'all'>('chapter');
  const [mixed, setMixed] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [roundStats, setRoundStats] = useState({ known: 0, again: 0 });
  const [deckKey, setDeckKey] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (!d || d.error) {
          setError(d?.error ?? 'Inhalte konnten nicht geladen werden.');
          return;
        }
        setContent(d);
        setChapterId(d.chapters?.[0]?.id ?? '');
      })
      .catch(() => setError('Inhalte konnten nicht geladen werden.'));
  }, []);

  useEffect(() => {
    if (!modalFigure) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalFigure(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalFigure]);

  const chapters: any[] = useMemo(() => content?.chapters ?? [], [content]);
  const concepts: any[] = useMemo(() => content?.concepts ?? [], [content]);
  const figures: any[] = useMemo(() => content?.figures ?? [], [content]);
  const imageDir: string = content?.imageDir ?? 'kv';
  const moduleId: string = content?.moduleId ?? 'modul';

  const conceptMap = useMemo(() => Object.fromEntries(concepts.map((c) => [c.id, c])), [concepts]);
  const conceptByTerm = useMemo(() => {
    const m: Record<string, any> = {};
    for (const c of concepts) m[normalize(c.term)] = c;
    return m;
  }, [concepts]);
  const figureMap = useMemo(() => Object.fromEntries(figures.map((f) => [f.id, f])), [figures]);
  const chapterMap = useMemo(() => Object.fromEntries(chapters.map((c) => [c.id, c])), [chapters]);

  /** Begriffe je Kapitel in Skriptreihenfolge, gruppiert nach Unterkapitel → Abschnitt. */
  const groupsByChapter = useMemo(() => {
    const out: Record<string, SubGroup[]> = {};
    for (const ch of chapters) {
      const sections: any[] = ch.sections ?? [];
      if (!sections.length) {
        const ids = concepts.filter((c) => c.chapterId === ch.id).map((c) => c.id);
        out[ch.id] = ids.length ? [{ key: ch.id, title: '', sections: [{ id: ch.id, title: '', conceptIds: ids }] }] : [];
        continue;
      }
      const subs: SubGroup[] = [];
      for (const s of sections) {
        const ids: string[] = [];
        for (const b of s.blocks ?? []) {
          if (b.kind !== 'definitions') continue;
          for (const id of b.conceptIds ?? []) if (conceptMap[id] && !ids.includes(id)) ids.push(id);
        }
        if (!ids.length) continue;
        const key = s.sub ?? ch.id;
        let sub = subs.find((x) => x.key === key);
        if (!sub) {
          const title = (ch.subchapters ?? []).find((t: string) => t.startsWith(`${key} `)) ?? key;
          sub = { key, title, sections: [] };
          subs.push(sub);
        }
        sub.sections.push({ id: s.id, title: s.title, conceptIds: ids });
      }
      // Begriffe ohne Skriptabschnitt (falls vorhanden) am Ende ergänzen
      const placed = new Set(subs.flatMap((x) => x.sections.flatMap((s) => s.conceptIds)));
      const rest = concepts.filter((c) => c.chapterId === ch.id && !placed.has(c.id)).map((c) => c.id);
      if (rest.length) subs.push({ key: `${ch.id}-rest`, title: 'Weitere Begriffe', sections: [{ id: `${ch.id}-rest`, title: '', conceptIds: rest }] });
      out[ch.id] = subs;
    }
    return out;
  }, [chapters, concepts, conceptMap]);

  const orderedIdsByChapter = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const ch of chapters) m[ch.id] = (groupsByChapter[ch.id] ?? []).flatMap((g) => g.sections.flatMap((s) => s.conceptIds));
    return m;
  }, [chapters, groupsByChapter]);

  const currentChapter = chapterMap[chapterId] ?? chapters[0];

  // ---------- Suche ----------
  const hits: Hit[] = useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return [];
    const out: Hit[] = [];
    const chIndex = (id: string) => chapterMap[id]?.index ?? 99;
    for (const c of concepts) {
      const head = normalize([c.term, ...(c.synonyms ?? [])].join(' '));
      const body = normalize([c.short ?? '', c.definition, ...(c.points ?? []), c.context ?? '', c.example ?? ''].join(' '));
      if (head.includes(q) || body.includes(q)) {
        const ch = chapterMap[c.chapterId];
        out.push({
          key: `c-${c.id}`, kind: 'Begriff', label: c.term,
          meta: ch ? `Kapitel ${ch.index} · ${ch.title}` : '',
          snippet: snippetAround(c.short ?? c.definition, query),
          chapterId: c.chapterId, target: `def-${c.id}`, view: 'begriffe',
          rank: chIndex(c.chapterId) * 10 + (head.includes(q) ? 0 : 3),
        });
      }
    }
    for (const ch of chapters) {
      for (const s of ch.sections ?? []) {
        const txt = (s.blocks ?? []).map((b: any) => blockText(b, conceptMap)).join(' ');
        if (normalize(`${s.title} ${txt}`).includes(q)) {
          out.push({
            key: `s-${s.id}`, kind: 'Abschnitt', label: `${s.sub ? `${s.sub} · ` : ''}${s.title}`,
            meta: `Kapitel ${ch.index} · PDF S. ${s.pdfPages}`,
            snippet: snippetAround(txt, query),
            chapterId: ch.id, target: `sec-${s.id}`, view: 'skript',
            rank: ch.index * 10 + 5,
          });
        }
      }
    }
    for (const f of figures) {
      if (normalize(`${f.title} ${f.caption ?? ''} ${f.explanationSimple ?? ''}`).includes(q)) {
        out.push({
          key: `f-${f.id}`, kind: 'Abbildung', label: f.title, meta: `Kapitel ${chIndex(f.chapterId)} · PDF S. ${f.pdfPage}`,
          snippet: snippetAround(f.caption ?? '', query),
          chapterId: f.chapterId, target: `fig-${f.id}`, view: 'skript', rank: chIndex(f.chapterId) * 10 + 7,
        });
      }
    }
    return out.sort((a, b) => a.rank - b.rank).slice(0, 40);
  }, [query, concepts, chapters, figures, chapterMap, conceptMap]);

  const hitsByChapter = useMemo(() => {
    const groups: { ch: any; items: Hit[] }[] = [];
    for (const h of hits) {
      const ch = chapterMap[h.chapterId];
      let g = groups.find((x) => x.ch?.id === ch?.id);
      if (!g) {
        g = { ch, items: [] };
        groups.push(g);
      }
      g.items.push(h);
    }
    return groups;
  }, [hits, chapterMap]);

  // ---------- Karteikarten: Stapel + Fortschritt ----------
  const deckIds: string[] = useMemo(() => {
    if (deck === 'all') return chapters.flatMap((c) => orderedIdsByChapter[c.id] ?? []);
    return orderedIdsByChapter[currentChapter?.id ?? ''] ?? [];
  }, [deck, chapters, orderedIdsByChapter, currentChapter]);
  const storageKey = `lernskript-karten:${moduleId}`;

  // Fortschritt (gewusste Begriffe) je Profil + Modul laden
  useEffect(() => {
    if (!content) return;
    try {
      const raw = window.localStorage.getItem(`${storageKey}:${profileId()}`);
      setKnown(new Set(raw ? (JSON.parse(raw) as string[]) : []));
    } catch {
      setKnown(new Set());
    }
  }, [content, storageKey]);

  function saveKnown(next: Set<string>) {
    setKnown(next);
    try {
      window.localStorage.setItem(`${storageKey}:${profileId()}`, JSON.stringify([...next]));
    } catch {
      /* Speicher nicht verfügbar – Fortschritt gilt dann nur für diese Sitzung */
    }
  }

  function startRound(onlyOpen: boolean) {
    const pool = onlyOpen ? deckIds.filter((id) => !known.has(id)) : deckIds;
    const ids = pool.length ? pool : deckIds;
    setQueue(mixed ? shuffle(ids) : ids);
    setRevealed(false);
    setRoundStats({ known: 0, again: 0 });
  }

  // neuer Stapel (Kapitel/Modus gewechselt) → Runde mit den noch nicht gewussten Karten
  const currentDeckKey = `${deck}:${currentChapter?.id ?? ''}:${mixed ? 'mix' : 'ord'}:${deckIds.length}`;
  useEffect(() => {
    if (view !== 'karten' || !content) return;
    if (deckKey === currentDeckKey) return;
    setDeckKey(currentDeckKey);
    startRound(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, content, currentDeckKey]);

  function answer(gotIt: boolean) {
    const [id, ...rest] = queue;
    if (!id) return;
    const next = new Set(known);
    if (gotIt) {
      next.add(id);
      setQueue(rest);
      setRoundStats((s) => ({ ...s, known: s.known + 1 }));
    } else {
      next.delete(id);
      // „Nochmal“: Karte kommt in dieser Runde nach ~3 anderen Karten erneut
      const pos = Math.min(rest.length, 3);
      setQueue([...rest.slice(0, pos), id, ...rest.slice(pos)]);
      setRoundStats((s) => ({ ...s, again: s.again + 1 }));
    }
    saveKnown(next);
    setRevealed(false);
  }

  // Tastatur: Leertaste/Enter = aufdecken, → oder J = gewusst, ← oder N = nochmal
  useEffect(() => {
    if (view !== 'karten') return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (!queue.length) return;
      // Leertaste/Enter auf einem Button löst dessen Klick aus – nicht doppelt behandeln
      if (!revealed && tag !== 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && (e.key === 'ArrowRight' || e.key.toLowerCase() === 'j')) {
        answer(true);
      } else if (revealed && (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'n')) {
        answer(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---------- Navigation ----------
  function scrollToTarget(target: string) {
    window.setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setFlash(target);
      window.setTimeout(() => setFlash((f) => (f === target ? null : f)), 1800);
    }, 60);
  }

  function selectChapter(id: string) {
    setChapterId(id);
    setExpanded({});
  }

  function jumpToConcept(c: any) {
    if (!c) return;
    setQuery('');
    setView('begriffe');
    setChapterId(c.chapterId);
    setExpanded((e) => ({ ...e, [c.id]: true }));
    scrollToTarget(`def-${c.id}`);
  }

  function openHit(h: Hit) {
    setQuery('');
    setChapterId(h.chapterId);
    if (h.view === 'begriffe') {
      const cid = h.target.replace(/^def-/, '');
      setView('begriffe');
      setExpanded((e) => ({ ...e, [cid]: true }));
    } else {
      setView('skript');
      if (h.target.startsWith('sec-')) setOpenSections((o) => ({ ...o, [h.target.slice(4)]: true }));
      if (h.target.startsWith('fig-')) {
        const fid = h.target.slice(4);
        const sec = (chapterMap[h.chapterId]?.sections ?? []).find((s: any) =>
          (s.blocks ?? []).some((b: any) => b.kind === 'figure' && b.figureId === fid)
        );
        if (sec) setOpenSections((o) => ({ ...o, [sec.id]: true }));
      }
    }
    scrollToTarget(h.target);
  }

  // ---------- Begriffskarte ----------
  function hasDetails(c: any): boolean {
    return !!(c.short || c.context || c.example || c.mnemonic || c.confusableWith?.length || c.examRelevance);
  }

  function renderTerm(c: any) {
    if (!c) return null;
    const anchor = `def-${c.id}`;
    const isOpen = !!expanded[c.id];
    const details = hasDetails(c);
    const toggle = () => {
      if (details) setExpanded((e) => ({ ...e, [c.id]: !e[c.id] }));
    };
    return (
      <div key={c.id} id={anchor} className={`lk-term${isOpen ? ' open' : ''}${details ? ' has-details' : ''}${flash === anchor ? ' flash' : ''}`}>
        <div className="lk-term-main" onClick={toggle}>
          <div className="lk-term-row">
            <span className="lk-term-name">{c.term}</span>
            {details && (
              <button
                type="button" className="lk-more" aria-expanded={isOpen}
                aria-label={isOpen ? 'Details ausblenden' : 'Details anzeigen'}
                onClick={(e) => { e.stopPropagation(); toggle(); }}
              >
                {isOpen ? '−' : '+'}
              </button>
            )}
          </div>
          <div className="lk-term-def">{c.short ?? c.definition}</div>
          {c.points?.length > 0 && (
            <ul className="lk-points">{c.points.map((p: string, i: number) => <li key={i}>{p}</li>)}</ul>
          )}
        </div>
        {isOpen && (
          <div className="lk-details">
            {c.short && <div className="lk-detail"><span className="sk-label">Skript-Definition</span>{c.definition}</div>}
            {c.context && <div className="lk-detail"><span className="sk-label">Einordnung</span>{c.context}</div>}
            {c.example && <div className="lk-detail"><span className="sk-label">Beispiel</span>{c.example}</div>}
            {c.mnemonic && <div className="lk-detail"><span className="sk-label">Merkhilfe</span>{c.mnemonic}</div>}
            {c.confusableWith?.length > 0 && (
              <div className="lk-detail">
                <span className="sk-label">Nicht verwechseln mit</span>
                {c.confusableWith.map((t: string, i: number) => {
                  const target = conceptByTerm[normalize(t)];
                  return (
                    <span key={t}>
                      {i > 0 && ', '}
                      {target ? (
                        <button type="button" className="sk-link" onClick={(e) => { e.stopPropagation(); jumpToConcept(target); }}>{t}</button>
                      ) : (
                        t
                      )}
                    </span>
                  );
                })}
              </div>
            )}
            {c.examRelevance && <div className="lk-detail lk-exam"><span className="sk-label">Prüfungsfokus</span>{c.examRelevance}</div>}
          </div>
        )}
      </div>
    );
  }

  // ---------- Abbildung ----------
  function renderFigure(f: any) {
    const anchor = `fig-${f.id}`;
    return (
      <figure key={f.id} id={anchor} className={`sk-figure${flash === anchor ? ' flash' : ''}`}>
        <div className="figure-frame" style={{ position: 'relative', cursor: 'zoom-in', margin: '0 0 8px' }} onClick={() => setModalFigure(f)}>
          <button type="button" className="lk-zoom" aria-label="Abbildung vergrößern" title="Vergrößern" onClick={(e) => { e.stopPropagation(); setModalFigure(f); }}>
            ⤢
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${imageDir}/${f.file}`} alt={f.caption ?? f.title} loading="lazy" />
        </div>
        <figcaption>
          <strong>{f.title}</strong> <span className="dim">· PDF S. {f.pdfPage}</span>
          {f.explanationSimple && <div style={{ marginTop: 3 }}>{f.explanationSimple}</div>}
        </figcaption>
        {(f.elements?.length > 0 || f.misconceptions?.length > 0 || (f.explanationExpert && f.explanationExpert !== f.explanationSimple)) && (
          <details className="sk-details">
            <summary>Abbildung erklärt</summary>
            {f.explanationExpert && f.explanationExpert !== f.explanationSimple && <p style={{ margin: '0 0 6px' }}>{f.explanationExpert}</p>}
            {f.elements?.length > 0 && (
              <ul style={{ margin: '0 0 6px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {f.elements.map((e: any, i: number) => <li key={i}><strong>{e.label}:</strong> {e.meaning}</li>)}
              </ul>
            )}
            {f.misconceptions?.length > 0 && (
              <div className="sk-callout exam" style={{ margin: '6px 0 0' }}>
                <span className="sk-label">Typische Fehler</span>
                <ul style={{ margin: 0, paddingLeft: 18 }}>{f.misconceptions.map((m: string, i: number) => <li key={i}>{m}</li>)}</ul>
              </div>
            )}
          </details>
        )}
      </figure>
    );
  }

  // ---------- Skript-Blöcke ----------
  function renderBlock(b: any, key: number) {
    switch (b?.kind) {
      case 'text':
        return <p key={key} className="sk-text">{b.text}</p>;
      case 'list': {
        const items = (b.items ?? []).map((it: string, i: number) => <li key={i}>{it}</li>);
        return (
          <div key={key} className="sk-list">
            {b.title && <div className="sk-block-title">{b.title}</div>}
            {b.ordered ? <ol>{items}</ol> : <ul>{items}</ul>}
          </div>
        );
      }
      case 'definitions':
        return <div key={key} className="lk-terms">{(b.conceptIds ?? []).map((id: string) => renderTerm(conceptMap[id]))}</div>;
      case 'table':
        return (
          <div key={key} className="sk-table-wrap">
            {b.title && <div className="sk-block-title">{b.title}</div>}
            <div className="sk-table-scroll">
              <table className="sk-table">
                <thead>
                  <tr>{(b.columns ?? []).map((c: string, i: number) => <th key={i}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {(b.rows ?? []).map((r: string[], i: number) => (
                    <tr key={i}>{r.map((cell, j) => <td key={j} data-label={b.columns?.[j] ?? ''}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'proscons':
        return (
          <div key={key} className="sk-pc">
            {b.title && <div className="sk-block-title">{b.title}</div>}
            <div className="sk-pc-grid">
              <div className="sk-pc-col pro">
                <div className="sk-pc-head">Vorteile</div>
                <ul>{(b.pros ?? []).map((p: string, i: number) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div className="sk-pc-col con">
                <div className="sk-pc-head">Nachteile</div>
                <ul>{(b.cons ?? []).map((p: string, i: number) => <li key={i}>{p}</li>)}</ul>
              </div>
            </div>
          </div>
        );
      case 'example':
        return (
          <div key={key} className="sk-callout example">
            <span className="sk-label">Beispiel{b.title ? ` · ${b.title}` : ''}</span>
            {b.text}
          </div>
        );
      case 'merke':
        return (
          <div key={key} className="sk-callout merke">
            <span className="sk-label">Merke</span>
            {b.text}
          </div>
        );
      case 'exam':
        return (
          <details key={key} className="sk-details sk-examtip">
            <summary>Prüfungstipp</summary>
            <div>{b.text}</div>
          </details>
        );
      case 'figure':
        return figureMap[b.figureId] ? renderFigure(figureMap[b.figureId]) : null;
      default:
        return null;
    }
  }

  function renderChapterPager(ch: any) {
    const i = chapters.findIndex((c) => c.id === ch.id);
    const prev = chapters[i - 1];
    const next = chapters[i + 1];
    if (!prev && !next) return null;
    const go = (c: any) => {
      selectChapter(c.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
      <div className="lk-pager">
        {prev ? <button type="button" className="btn small" onClick={() => go(prev)}>← Kapitel {prev.index}</button> : <span />}
        {next ? <button type="button" className="btn small primary" onClick={() => go(next)}>Kapitel {next.index} →</button> : <span />}
      </div>
    );
  }

  function renderChapterHead(ch: any, meta: string) {
    return (
      <div className="lk-chapter-head">
        <span className="badge accent">Kapitel {ch.index}</span>
        <h2>{ch.title}</h2>
        <div className="sk-meta">{meta}</div>
      </div>
    );
  }

  // ---------- Ansicht: Begriffe ----------
  function renderBegriffe(ch: any) {
    const subs = groupsByChapter[ch.id] ?? [];
    const total = orderedIdsByChapter[ch.id]?.length ?? 0;
    return (
      <div className="card">
        {renderChapterHead(ch, `${total} Begriffe · PDF S. ${ch.pdfPages}`)}
        {subs.length === 0 && <div className="empty-state small">Keine Begriffe in diesem Kapitel.</div>}
        {subs.map((sub) => (
          <section key={sub.key} className="lk-sub">
            {sub.title && <h3 className="lk-sub-title">{sub.title}</h3>}
            {sub.sections.map((s) => (
              <div key={s.id} className="lk-group">
                {s.title && <div className="lk-group-title">{s.title}</div>}
                <div className="lk-terms">{s.conceptIds.map((id) => renderTerm(conceptMap[id]))}</div>
              </div>
            ))}
          </section>
        ))}
        {renderChapterPager(ch)}
      </div>
    );
  }

  // ---------- Ansicht: Skript ----------
  function renderSkript(ch: any) {
    const sections: any[] = ch.sections ?? [];
    if (!sections.length) {
      // Module ohne strukturiertes Skript: Kernaussagen + Abbildungen
      const fs = figures.filter((f) => f.chapterId === ch.id);
      return (
        <div className="card">
          {renderChapterHead(ch, `PDF S. ${ch.pdfPages}`)}
          {ch.keyIdeas?.length > 0 && <ul className="lk-keyideas">{ch.keyIdeas.map((k: string, i: number) => <li key={i}>{k}</li>)}</ul>}
          {fs.map((f) => renderFigure(f))}
          {renderChapterPager(ch)}
        </div>
      );
    }
    const allOpen = sections.every((s) => openSections[s.id]);
    return (
      <div className="card">
        {renderChapterHead(ch, `${sections.length} Abschnitte · PDF S. ${ch.pdfPages}`)}
        <div className="lk-skript-tools">
          <button
            type="button" className="btn small"
            onClick={() =>
              setOpenSections((o) => {
                const n = { ...o };
                sections.forEach((s) => (n[s.id] = !allOpen));
                return n;
              })
            }
          >
            {allOpen ? 'Alle zuklappen' : 'Alle aufklappen'}
          </button>
        </div>
        {ch.keyIdeas?.length > 0 && (
          <details className="sk-details sk-overview">
            <summary>Auf einen Blick ({ch.keyIdeas.length} Kernaussagen)</summary>
            <ul className="lk-keyideas">{ch.keyIdeas.map((k: string, i: number) => <li key={i}>{k}</li>)}</ul>
          </details>
        )}
        {sections.map((s) => {
          const anchor = `sec-${s.id}`;
          const isOpen = !!openSections[s.id];
          return (
            <section key={s.id} id={anchor} className={`lk-sec${isOpen ? ' open' : ''}${flash === anchor ? ' flash' : ''}`}>
              <button type="button" className="lk-sec-head" aria-expanded={isOpen} onClick={() => setOpenSections((o) => ({ ...o, [s.id]: !o[s.id] }))}>
                {s.sub && <span className="badge">{s.sub}</span>}
                <span className="lk-sec-title">{s.title}</span>
                <span className="lk-sec-page">S. {s.pdfPages}</span>
                <span className="lk-chev" aria-hidden>{isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && <div className="lk-sec-body">{(s.blocks ?? []).map((b: any, i: number) => renderBlock(b, i))}</div>}
            </section>
          );
        })}
        {renderChapterPager(ch)}
      </div>
    );
  }

  // ---------- Ansicht: Karteikarten ----------
  function renderKarten() {
    const knownInDeck = deckIds.filter((id) => known.has(id)).length;
    const pct = deckIds.length ? Math.round((knownInDeck / deckIds.length) * 100) : 0;
    const c = conceptMap[queue[0]];
    const ch = c ? chapterMap[c.chapterId] : null;
    return (
      <div className="card">
        <div className="lk-deck-bar">
          <div className="sk-seg" role="group" aria-label="Stapel">
            <button type="button" aria-pressed={deck === 'chapter'} onClick={() => setDeck('chapter')}>Kapitel {currentChapter?.index}</button>
            <button type="button" aria-pressed={deck === 'all'} onClick={() => setDeck('all')}>Alle Kapitel</button>
          </div>
          <label className="lk-check">
            <input type="checkbox" checked={mixed} onChange={(e) => setMixed(e.target.checked)} /> gemischt
          </label>
        </div>
        <div className="lk-progress">
          <div className="progress-track"><div className="progress-fill green" style={{ width: `${pct}%` }} /></div>
          <div className="sk-meta">{knownInDeck} von {deckIds.length} Begriffen sitzen ({pct} %)</div>
        </div>

        {c ? (
          <>
            <div
              className={`lk-card${revealed ? ' revealed' : ''}`}
              onClick={() => !revealed && setRevealed(true)}
              role={revealed ? undefined : 'button'}
              tabIndex={revealed ? undefined : 0}
              aria-label={revealed ? undefined : `Karte „${c.term}“ aufdecken`}
            >
              <div className="lk-card-meta">Kapitel {ch?.index} · noch {queue.length} in dieser Runde</div>
              <div className="lk-card-term">{c.term}</div>
              {!revealed ? (
                <div className="lk-card-hint">Erst selbst erklären – dann tippen zum Aufdecken</div>
              ) : (
                <div className="lk-card-back">
                  <div className="lk-term-def">{c.short ?? c.definition}</div>
                  {c.points?.length > 0 && <ul className="lk-points">{c.points.map((p: string, i: number) => <li key={i}>{p}</li>)}</ul>}
                  {c.example && <div className="lk-detail"><span className="sk-label">Beispiel</span>{c.example}</div>}
                </div>
              )}
            </div>
            {revealed ? (
              <div className="lk-answer">
                <button key="again" type="button" className="btn lk-again" onClick={() => answer(false)}>Nochmal</button>
                <button key="got" type="button" className="btn primary lk-got" onClick={() => answer(true)}>Gewusst</button>
              </div>
            ) : (
              <div className="lk-answer">
                <button key="reveal" type="button" className="btn primary" onClick={() => setRevealed(true)}>Aufdecken</button>
              </div>
            )}
            <div className="sk-meta lk-round">Diese Runde: {roundStats.known} gewusst · {roundStats.again}× nochmal</div>
          </>
        ) : (
          <div className="lk-done">
            <div className="lk-done-icon" aria-hidden>✓</div>
            <strong>{knownInDeck === deckIds.length ? 'Alle Begriffe dieses Stapels sitzen!' : 'Runde geschafft!'}</strong>
            <div className="sk-meta">{roundStats.known} gewusst{roundStats.again ? ` · ${roundStats.again}× wiederholt` : ''}</div>
            <div className="lk-answer">
              {knownInDeck < deckIds.length && (
                <button type="button" className="btn primary" onClick={() => startRound(true)}>Offene Begriffe abfragen</button>
              )}
              <button type="button" className="btn" onClick={() => startRound(false)}>Alle nochmal</button>
            </div>
          </div>
        )}
        <div className="lk-reset">
          <button
            type="button" className="sk-link small"
            onClick={() => {
              const next = new Set(known);
              deckIds.forEach((id) => next.delete(id));
              saveKnown(next);
              setQueue(mixed ? shuffle(deckIds) : deckIds);
              setRevealed(false);
              setRoundStats({ known: 0, again: 0 });
            }}
          >
            Fortschritt dieses Stapels zurücksetzen
          </button>
        </div>
      </div>
    );
  }

  // ---------- Seite ----------
  const searching = normalize(query).length >= 2;

  return (
    <div>
      <h1>Lernskript</h1>
      <p className="page-sub">
        {content?.moduleTitle ? `${content.moduleTitle}: ` : ''}alle Begriffe aus dem Skript – kurz, nach Kapiteln geordnet, zum Lernen und Abfragen.
      </p>
      {error && <div className="feedback-box bad" style={{ marginBottom: 12 }}>{error}</div>}

      {!content ? (
        !error && <div className="card"><span className="spinner" /> Lädt …</div>
      ) : (
        <>
          <div className="sk-toolbar">
            <div className="sk-seg" role="group" aria-label="Ansicht">
              {VIEWS.map((v) => (
                <button key={v.id} type="button" aria-pressed={view === v.id && !searching} onClick={() => { setView(v.id); setQuery(''); }}>
                  {v.label}
                </button>
              ))}
            </div>
            <div className="sk-search">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Begriff suchen …" aria-label="Im Lernskript suchen" />
              {query && <button type="button" className="sk-clear" aria-label="Suche leeren" onClick={() => setQuery('')}>×</button>}
            </div>
          </div>

          {!searching && (
            <nav className="lk-tabs" aria-label="Kapitel">
              {chapters.map((c) => (
                <button
                  key={c.id} type="button"
                  className={`lk-tab${c.id === currentChapter?.id ? ' active' : ''}`}
                  aria-current={c.id === currentChapter?.id ? 'true' : undefined}
                  onClick={() => selectChapter(c.id)}
                >
                  <span className="lk-tab-num">{c.index}</span>
                  <span className="lk-tab-title">{c.title}</span>
                </button>
              ))}
            </nav>
          )}

          {searching ? (
            <div className="card">
              <h2 style={{ marginBottom: 10 }}>{hits.length === 0 ? 'Keine Treffer' : `${hits.length}${hits.length === 40 ? '+' : ''} Treffer`}</h2>
              {hits.length === 0 && <div className="small dim">Tipp: Wortstamm verwenden (z. B. „preis“ statt „Preispolitik“).</div>}
              {hitsByChapter.map((g) => (
                <div key={g.ch?.id ?? 'x'} className="lk-hit-group">
                  {g.ch && <div className="lk-group-title">Kapitel {g.ch.index} · {g.ch.title}</div>}
                  {g.items.map((h) => (
                    <button key={h.key} type="button" className="sk-hit" onClick={() => openHit(h)}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className={`badge${h.kind === 'Begriff' ? ' accent' : ''}`}>{h.kind}</span>
                        <strong>{h.label}</strong>
                      </div>
                      {h.snippet && <div className="small" style={{ marginTop: 4, lineHeight: 1.5 }}>{h.snippet}</div>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : currentChapter ? (
            view === 'begriffe' ? renderBegriffe(currentChapter) : view === 'karten' ? renderKarten() : renderSkript(currentChapter)
          ) : null}
        </>
      )}

      {modalFigure && (
        <div
          onClick={() => setModalFigure(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}
        >
          <div
            role="dialog" aria-modal="true" aria-label={modalFigure.title}
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 12, maxWidth: 'min(1000px, 97vw)', maxHeight: '92vh', overflow: 'auto', padding: 16, position: 'relative' }}
          >
            <button
              type="button" onClick={() => setModalFigure(null)} aria-label="Schließen"
              style={{ position: 'absolute', top: 8, right: 8, border: 'none', background: '#eee', color: '#16181d', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
            >
              ×
            </button>
            <strong style={{ color: '#16181d', display: 'block', marginBottom: 10, paddingRight: 40 }}>{modalFigure.title}</strong>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/${imageDir}/${modalFigure.file}`} alt={modalFigure.title} style={{ maxWidth: '100%', display: 'block' }} />
          </div>
        </div>
      )}
    </div>
  );
}
