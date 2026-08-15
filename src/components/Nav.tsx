'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [current, setCurrent] = useState<ProfileRef>({ id: 'default', name: 'Standard' });
  const [mods, setMods] = useState<ModulesInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [correcting, setCorrecting] = useState(false);
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    fetch('/api/modules').then((r) => r.json()).then(setMods).catch(() => {});
  }, []);

  // Klick außerhalb schließt das Panel
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

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
      const d = await fetch('/api/modules').then((r) => r.json());
      setMods(d);
    } catch {} finally { setBusy(false); }
  }

  function switchModule(id: string) {
    if (busy || !mods) return;
    if (id === mods.current.moduleId) { setOpen(false); return; }
    setModuleCookie(id);
    window.location.href = '/';
  }

  const activeProgram = mods?.profile.studyProgram ?? mods?.current.studyProgram ?? null;
  const programObj = mods?.studyPrograms.find((p) => p.program === activeProgram);
  const moduleTitle = mods?.current.title ?? 'Konsumentenverhalten';
  const programLabel = mods?.current.studyProgram ?? 'Online-Marketing';
  const showProgramPicker = mods ? (!mods.profile.studyProgram || correcting) : false;

  return (
    <aside className="sidebar">
      <div className="brand-switch" ref={panelRef} style={{ position: 'relative' }}>
        <button
          type="button"
          className="brand brand-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', display: 'block' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{moduleTitle}</span>
            <span aria-hidden style={{ opacity: 0.6, fontSize: 12, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
          </span>
          <small>{programLabel} · Modul wechseln</small>
        </button>

        {open && mods && (
          <div className="module-panel" style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 40, marginTop: 6,
            background: 'var(--bg-card, #16181d)', border: '1px solid var(--border, #2a2e37)',
            borderRadius: 10, padding: 12, boxShadow: '0 12px 30px rgba(0,0,0,.35)',
          }}>
            <div className="small dim" style={{ textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Studiengang</div>
            {showProgramPicker ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                {mods.studyPrograms.map((p) => (
                  <button key={p.program} className="btn small" disabled={busy}
                    onClick={() => chooseProgram(p.program)}
                    style={{ justifyContent: 'flex-start', fontWeight: p.program === activeProgram ? 700 : 400 }}>
                    {p.program === activeProgram ? '● ' : '○ '}{p.program}
                  </button>
                ))}
                {correcting && (
                  <button className="btn small" onClick={() => setCorrecting(false)} disabled={busy}>Abbrechen</button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                <strong style={{ fontSize: 14 }}>{activeProgram}</strong>
                {mods.profile.canCorrect ? (
                  <button className="btn small" onClick={() => setCorrecting(true)} disabled={busy}>korrigieren</button>
                ) : (
                  <span className="small dim" title="Nach einmaliger Korrektur gesperrt">🔒 fixiert</span>
                )}
              </div>
            )}

            <div className="small dim" style={{ textTransform: 'uppercase', letterSpacing: '.06em', margin: '4px 0 6px' }}>Module</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(programObj?.modules ?? mods.studyPrograms.flatMap((p) => p.modules)).map((m) => {
                const active = m.id === mods.current.moduleId;
                return (
                  <button key={m.id} className="btn small" disabled={busy}
                    onClick={() => switchModule(m.id)}
                    style={{ justifyContent: 'flex-start', fontWeight: active ? 700 : 400, borderColor: active ? 'var(--accent, #6ea8fe)' : undefined }}>
                    {active ? '● ' : '○ '}{m.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
