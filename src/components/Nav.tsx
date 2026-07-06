'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {}
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ theme: next }) }).catch(() => {});
  }

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
        <button className="btn small" onClick={toggleTheme} aria-label="Design umschalten">
          {theme === 'dark' ? '☀ Helles Design' : '☾ Dunkles Design'}
        </button>
      </div>
    </aside>
  );
}
