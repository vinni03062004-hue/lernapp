'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ComicAvatar, parseAvatar } from './Avatar';

const links: { href: string; label: string; icon: string; section?: string }[] = [
  { href: '/', label: 'Übersicht', icon: '◈' },
  { href: '/kapitel', label: 'Kapitel', icon: '≣', section: 'Lernen' },
  { href: '/skript', label: 'Lernskript', icon: '▤' },
  { href: '/lernen', label: 'Lernmodus', icon: '▸' },
  { href: '/lernen?mode=mixed', label: 'Mischmodus', icon: '⤨' },
  { href: '/lernen?mode=error_focus', label: 'Fehlerfokus', icon: '⚑' },
  { href: '/bilder', label: 'Bild-Lernmodus', icon: '▦' },
  { href: '/pruefung', label: 'Prüfungsmodus', icon: '✎', section: 'Prüfen' },
  { href: '/pruefung?bilder=1', label: 'Bild-Prüfmodus', icon: '▣' },
  { href: '/erklaeren', label: 'Erklärmodus & Chat', icon: '✦', section: 'Verstehen' },
  { href: '/analyse', label: 'Analyse', icon: '∿', section: 'Auswertung' },
  { href: '/einstellungen', label: 'Einstellungen', icon: '⚙' },
];

interface ProfileRef { id: string; name: string; avatar?: string }
interface ModuleRef { id: string; title: string }
interface StudyProgram { program: string; modules: ModuleRef[] }
interface ModulesInfo {
  studyPrograms: StudyProgram[];
  current: { moduleId: string; title: string; studyProgram: string };
  profile: { id: string; studyProgram: string | null; changes: number; canCorrect: boolean; locked: boolean };
}

function setModuleCookie(id: string) {
  document.cookie = `module=${encodeURIComponent(id)}; path=/; max-age=31536000; samesite=lax`;
}

export function Nav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [current, setCurrent] = useState<ProfileRef>({ id: 'default', name: 'Standard' });
  const [mods, setMods] = useState<ModulesInfo | null>(null);
  const [modsError, setModsError] = useState(false);
  const [open, setOpen] = useState(false);
  const [correcting, setCorrecting] = useState(false);
  const [busy, setBusy] = useState(false);

  const loadMods = useCallback(async () => {
    setModsError(false);
    try {
      const r = await fetch('/api/modules');
      const d = await r.json();
      if (d && d.current && Array.isArray(d.studyPrograms)) setMods(d);
      else setModsError(true);
    } catch {
      setModsError(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  useEffect(() => {
    fetch('/api/profiles')
      .then((r) => r.json())
      .then((d) => {
        const cur = Array.isArray(d.profiles) ? d.profiles.find((p: ProfileRef) => p.id === d.current) : null;
        if (cur) setCurrent(cur);
      })
      .catch(() => {});
    loadMods();
  }, [loadMods]);

  // Body-Scroll sperren + Escape schließt, solange das Sheet offen ist
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeSheet(); }
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function openSheet() {
    setOpen(true);
    if (!mods) loadMods(); // falls der erste Abruf noch lief oder scheiterte
  }
  function closeSheet() { setOpen(false); setCorrecting(false); }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { window.localStorage.setItem('theme', next); } catch {}
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ theme: next }) }).catch(() => {});
  }

  async function chooseProgram(program: string) {
    if (busy) return;
    setBusy(true);
    try {
      await fetch('/api/modules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'setStudyProgram', program }) });
      setCorrecting(false);
      await loadMods();
    } catch {} finally { setBusy(false); }
  }

  function switchModule(id: string) {
    if (busy || !mods) return;
    if (id === mods.current.moduleId) { closeSheet(); return; }
    setModuleCookie(id);
    window.location.href = '/';
  }

  const activeProgram = mods?.profile.studyProgram ?? mods?.current.studyProgram ?? null;
  const programObj = mods?.studyPrograms.find((p) => p.program === activeProgram);
  const moduleTitle = mods?.current.title ?? 'Konsumentenverhalten';
  const programLabel = mods?.current.studyProgram ?? 'Online-Marketing';
  const showProgramPicker = mods ? (!mods.profile.studyProgram || correcting) : false;
  const moduleList = programObj?.modules ?? mods?.studyPrograms.flatMap((p) => p.modules) ?? [];

  // Overlay wird per Portal an <body> gehaengt -> entkommt jedem Overflow-/
  // Stacking-Kontext (wichtig fuer die mobile Top-Leiste mit overflow-x:auto).
  const overlay = open ? (
    <div className="module-overlay" role="dialog" aria-modal="true" aria-label="Modul wechseln" onClick={closeSheet}>
      <div className="module-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ms-head">
          <h3>Modul wechseln</h3>
          <button className="ms-close" onClick={closeSheet} aria-label="Schließen">✕</button>
        </div>

        {!mods ? (
          modsError ? (
            <div style={{ padding: '8px 2px' }}>
              <p className="small dim" style={{ marginTop: 0 }}>Module konnten nicht geladen werden.</p>
              <button className="btn small" onClick={loadMods}>Erneut versuchen</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 2px' }}>
              <span className="spinner" /> <span className="small dim">Module werden geladen …</span>
            </div>
          )
        ) : (
          <>
            <div className="ms-section">
              <div className="ms-label">Studiengang</div>
              {showProgramPicker ? (
                <div>
                  {mods.studyPrograms.map((p) => {
                    const active = p.program === activeProgram;
                    return (
                      <button key={p.program} className={`module-option ${active ? 'active' : ''}`} disabled={busy}
                        onClick={() => chooseProgram(p.program)}>
                        <span className="mo-dot" aria-hidden />
                        <span className="mo-text">{p.program}</span>
                        {active && <span className="mo-check" aria-hidden>✓</span>}
                      </button>
                    );
                  })}
                  {correcting && (
                    <button className="btn small" style={{ marginTop: 8 }} onClick={() => setCorrecting(false)} disabled={busy}>Abbrechen</button>
                  )}
                  {!mods.profile.studyProgram && (
                    <p className="small dim" style={{ margin: '8px 2px 0' }}>Nach der Wahl kannst du den Studiengang noch einmal korrigieren, danach ist er fixiert.</p>
                  )}
                </div>
              ) : (
                <div className="ms-program">
                  <strong>{activeProgram}</strong>
                  {mods.profile.canCorrect ? (
                    <button className="btn small" onClick={() => setCorrecting(true)} disabled={busy}>korrigieren</button>
                  ) : (
                    <span className="ms-lock" title="Nach einmaliger Korrektur fixiert">🔒 fixiert</span>
                  )}
                </div>
              )}
            </div>

            <div className="ms-section">
              <div className="ms-label">Module in diesem Studiengang</div>
              {moduleList.map((m) => {
                const active = m.id === mods.current.moduleId;
                return (
                  <button key={m.id} className={`module-option ${active ? 'active' : ''}`} disabled={busy}
                    onClick={() => switchModule(m.id)}>
                    <span className="mo-dot" aria-hidden />
                    <span className="mo-text">{m.title}</span>
                    {active && <span className="mo-check" aria-hidden>✓</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;

  return (
    <aside className="sidebar">
      <div className="brand-switch">
        <button type="button" className="module-trigger" onClick={openSheet} aria-haspopup="dialog" aria-expanded={open}>
          <span className="mt-top">
            <span className="mt-title">{moduleTitle}</span>
            <span className="mt-chevron" aria-hidden>▾</span>
          </span>
          <span className="mt-sub">{programLabel} · Modul wechseln</span>
        </button>
      </div>

      {mounted && overlay ? createPortal(overlay, document.body) : null}

      {links.map((l) => (
        <span key={l.href} style={{ display: 'contents' }}>
          {l.section && <div className="nav-section">{l.section}</div>}
          <Link className={`nav-link ${pathname === l.href.split('?')[0] && (l.href.includes('?') ? false : true) ? 'active' : ''}`} href={l.href}>
            <span aria-hidden>{l.icon}</span> {l.label}
          </Link>
        </span>
      ))}

      <div className="nav-footer">
        <div className="nav-section" style={{ marginTop: 0 }}>Profil</div>
        <Link className={`nav-link ${pathname === '/profile' ? 'active' : ''}`} href="/profile"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ComicAvatar config={parseAvatar(current.avatar)} size={20} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.name}</span>
        </Link>
        <button className="btn small nav-theme" onClick={toggleTheme} aria-label="Design umschalten">
          {theme === 'dark' ? '☀ Helles Design' : '☾ Dunkles Design'}
        </button>
      </div>
    </aside>
  );
}
