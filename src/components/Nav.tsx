'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links: { href: string; label: string; icon: string; section?: string }[] = [
  { href: '/', label: 'Übersicht', icon: '◈' },
  { href: '/kapitel', label: 'Kapitel', icon: '≣', section: 'Lernen' },
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

interface ProfileRef { id: string; name: string; avatar?: string; updatedAt?: number }

function setProfileCookie(id: string) {
  document.cookie = `profile=${encodeURIComponent(id)}; path=/; max-age=31536000; samesite=lax`;
}
// Muss mit sanitizeProfile() in store.ts übereinstimmen.
function sanitizeId(v: string): string {
  return (v || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || 'profil';
}

/** Bild auf 96x96 (cover) verkleinern und als Data-URL zurückgeben (klein halten). */
function resizeToDataUrl(file: File, size = 96): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('kein Canvas');
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Bild konnte nicht geladen werden.')); };
    img.src = url;
  });
}

function Avatar({ profile, size = 30 }: { profile: ProfileRef | undefined; size?: number }) {
  const av = profile?.avatar;
  const common: React.CSSProperties = {
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-subtle)', color: 'var(--text)', overflow: 'hidden',
    fontSize: size * 0.5, fontWeight: 700,
  };
  if (av && (av.startsWith('data:') || av.startsWith('http'))) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={av} alt="" style={{ ...common, objectFit: 'cover' }} />;
  }
  if (av) return <span style={common}>{av}</span>;
  return <span style={common}>{(profile?.name ?? '?').charAt(0).toUpperCase()}</span>;
}

export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [profiles, setProfiles] = useState<ProfileRef[]>([{ id: 'default', name: 'Standard' }]);
  const [current, setCurrent] = useState<string>('default');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  useEffect(() => {
    fetch('/api/profiles')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.profiles) && d.profiles.length) setProfiles(d.profiles);
        if (d.current) setCurrent(d.current);
      })
      .catch(() => {});
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { window.localStorage.setItem('theme', next); } catch {}
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ theme: next }) }).catch(() => {});
  }

  function switchProfile(id: string) {
    if (id === current || busy) return;
    setProfileCookie(id);
    window.location.reload();
  }

  async function createProfile() {
    if (busy) return;
    const name = (window.prompt('Name des neuen Profils (z. B. dein Vorname):', '') ?? '').trim();
    if (!name) return;
    let id = sanitizeId(name);
    const ids = new Set(profiles.map((p) => p.id));
    if (ids.has(id)) { let n = 2; while (ids.has(`${id}-${n}`)) n++; id = `${id}-${n}`; }
    setBusy(true);
    try {
      const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create', id, name }) });
      if (res.ok) { setProfileCookie(id); window.location.reload(); return; }
      const d = await res.json().catch(() => ({}));
      window.alert(d.error ?? 'Profil konnte nicht angelegt werden.');
    } catch { window.alert('Profil konnte nicht angelegt werden.'); }
    finally { setBusy(false); }
  }

  async function renameProfile() {
    if (busy) return;
    const cur = profiles.find((p) => p.id === current);
    const name = (window.prompt('Neuer Anzeigename für dieses Profil:', cur?.name ?? '') ?? '').trim();
    if (!name) return;
    setBusy(true);
    try {
      const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'rename', id: current, name }) });
      if (res.ok) { window.location.reload(); return; }
      window.alert('Umbenennen fehlgeschlagen.');
    } catch { window.alert('Umbenennen fehlgeschlagen.'); }
    finally { setBusy(false); }
  }

  async function deleteCurrent() {
    if (busy || current === 'default') return;
    const cur = profiles.find((p) => p.id === current);
    if (!window.confirm(`Profil "${cur?.name ?? current}" wirklich löschen? Der gesamte Fortschritt dieses Profils geht verloren.`)) return;
    setBusy(true);
    try {
      const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: current }) });
      if (res.ok) { setProfileCookie('default'); window.location.reload(); return; }
      window.alert('Löschen fehlgeschlagen.');
    } catch { window.alert('Löschen fehlgeschlagen.'); }
    finally { setBusy(false); }
  }

  async function onAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || busy) return;
    if (!file.type.startsWith('image/')) { window.alert('Bitte eine Bilddatei wählen.'); return; }
    setBusy(true);
    try {
      const dataUrl = await resizeToDataUrl(file);
      const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'avatar', id: current, avatar: dataUrl }) });
      if (res.ok) { window.location.reload(); return; }
      window.alert('Avatar konnte nicht gespeichert werden.');
    } catch { window.alert('Bild konnte nicht verarbeitet werden.'); }
    finally { setBusy(false); }
  }

  const currentProfile = profiles.find((p) => p.id === current);

  return (
    <aside className="sidebar">
      <div className="brand">
        Konsumentenverhalten
        <small>Lernapp · Online-Marketing</small>
      </div>
      {links.map((l) => (
        <span key={l.href} style={{ display: 'contents' }}>
          {l.section && <div className="nav-section">{l.section}</div>}
          <Link className={`nav-link ${pathname === l.href.split('?')[0] && (l.href.includes('?') ? false : true) ? 'active' : ''}`} href={l.href}>
            <span aria-hidden>{l.icon}</span> {l.label}
          </Link>
        </span>
      ))}

      <div style={{ marginTop: 'auto', paddingTop: 16 }}>
        <div className="nav-section" style={{ marginTop: 0 }}>Profil</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <button
            onClick={() => fileRef.current?.click()}
            title="Avatar-Bild ändern"
            disabled={busy}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'relative', lineHeight: 0 }}
          >
            <Avatar profile={currentProfile} size={34} />
          </button>
          <div style={{ minWidth: 0 }}>
            <div className="small dim">Aktiv</div>
            <strong style={{ color: 'var(--text)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentProfile?.name ?? current}
            </strong>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={onAvatarFile} style={{ display: 'none' }} />

        <select value={current} onChange={(e) => switchProfile(e.target.value)} style={{ width: '100%' }} aria-label="Profil wählen" disabled={busy}>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.name}{p.id === 'default' ? ' (Standard)' : ''}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          <button className="btn small" onClick={createProfile} disabled={busy}>＋ Neu</button>
          <button className="btn small" onClick={renameProfile} disabled={busy}>✎ Name</button>
          <button className="btn small" onClick={() => fileRef.current?.click()} disabled={busy}>Avatar</button>
          <button className="btn small" onClick={deleteCurrent} disabled={busy || current === 'default'}>Löschen</button>
        </div>

        <button className="btn small" onClick={toggleTheme} style={{ marginTop: 12 }} aria-label="Design umschalten">
          {theme === 'dark' ? '☀ Helles Design' : '☾ Dunkles Design'}
        </button>
      </div>
    </aside>
  );
}
