'use client';

/**
 * Anpassbarer Comic-Avatar (reines SVG, keine Bild-Uploads).
 * Zustand = kleines Index-Objekt, als JSON-String in settings.avatar gespeichert.
 */

import { useId } from 'react';

export interface AvatarConfig {
  bg: number; skin: number; hair: number; hairColor: number; eyes: number; mouth: number; acc: number;
}

export const BG = ['#4361ee', '#e07a5f', '#3d405b', '#5b8e7d', '#8cb369', '#bc4b51', '#6d6875', '#f4a259', '#2a9d8f', '#9b5de5'];
export const SKIN = ['#ffdbac', '#f1c27d', '#e0ac69', '#c68642', '#8d5524'];
export const HAIRCOL = ['#2c1b18', '#4b2e2b', '#a55728', '#d9b382', '#e8e8e8', '#b0413e', '#2b2b52'];

export const AVATAR_ATTRS: { key: keyof AvatarConfig; label: string; count: number }[] = [
  { key: 'bg', label: 'Hintergrund', count: BG.length },
  { key: 'skin', label: 'Hautton', count: SKIN.length },
  { key: 'hair', label: 'Frisur', count: 6 },
  { key: 'hairColor', label: 'Haarfarbe', count: HAIRCOL.length },
  { key: 'eyes', label: 'Augen', count: 3 },
  { key: 'mouth', label: 'Mund', count: 3 },
  { key: 'acc', label: 'Extra', count: 4 },
];

export const DEFAULT_AVATAR: AvatarConfig = { bg: 0, skin: 0, hair: 1, hairColor: 0, eyes: 1, mouth: 0, acc: 0 };

export function randomAvatar(): AvatarConfig {
  const r = (n: number) => Math.floor(Math.random() * n);
  return { bg: r(BG.length), skin: r(SKIN.length), hair: r(6), hairColor: r(HAIRCOL.length), eyes: r(3), mouth: r(3), acc: r(4) };
}

export function parseAvatar(v?: string | null): AvatarConfig | null {
  if (!v) return null;
  try {
    const o = JSON.parse(v);
    if (o && typeof o === 'object' && typeof o.bg === 'number') {
      return { bg: o.bg | 0, skin: o.skin | 0, hair: o.hair | 0, hairColor: o.hairColor | 0, eyes: o.eyes | 0, mouth: o.mouth | 0, acc: o.acc | 0 };
    }
  } catch {}
  return null;
}

export function serializeAvatar(c: AvatarConfig): string {
  return JSON.stringify(c);
}

function hairEl(style: number, col: string) {
  switch (style % 6) {
    case 0:
      return null;
    case 1:
      return <path d="M22,52 Q22,24 50,24 Q78,24 78,52 Q66,40 50,40 Q34,40 22,52 Z" fill={col} />;
    case 2:
      return (
        <g fill={col}>
          <circle cx="30" cy="36" r="11" /><circle cx="42" cy="28" r="11" />
          <circle cx="58" cy="28" r="11" /><circle cx="70" cy="36" r="11" />
          <path d="M22,50 Q50,34 78,50 L78,44 Q50,30 22,44 Z" />
        </g>
      );
    case 3:
      return <path d="M20,50 Q20,24 50,24 Q80,24 80,50 L80,78 L72,78 L72,52 Q60,42 50,42 Q40,42 28,52 L28,78 L20,78 Z" fill={col} />;
    case 4:
      return (
        <g fill={col}>
          <circle cx="50" cy="18" r="10" />
          <path d="M22,52 Q22,26 50,26 Q78,26 78,52 Q66,40 50,40 Q34,40 22,52 Z" />
        </g>
      );
    default:
      return (
        <g fill={col}>
          <polygon points="26,44 32,18 40,42" /><polygon points="40,42 50,16 60,42" />
          <polygon points="60,42 68,18 74,44" />
          <path d="M24,50 Q50,40 76,50 L76,46 Q50,36 24,46 Z" />
        </g>
      );
  }
}

function eyesEl(style: number) {
  switch (style % 3) {
    case 0:
      return <g fill="#2a2a2a"><circle cx="39" cy="54" r="4" /><circle cx="61" cy="54" r="4" /></g>;
    case 1:
      return (
        <g>
          <circle cx="39" cy="54" r="6" fill="#fff" stroke="#2a2a2a" strokeWidth="1.5" />
          <circle cx="61" cy="54" r="6" fill="#fff" stroke="#2a2a2a" strokeWidth="1.5" />
          <circle cx="40" cy="55" r="3" fill="#2a2a2a" /><circle cx="62" cy="55" r="3" fill="#2a2a2a" />
        </g>
      );
    default:
      return (
        <g stroke="#2a2a2a" strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d="M34,55 Q39,49 44,55" /><path d="M56,55 Q61,49 66,55" />
        </g>
      );
  }
}

function mouthEl(style: number) {
  switch (style % 3) {
    case 0:
      return <path d="M40,66 Q50,75 60,66" stroke="#7a3b2e" strokeWidth="3" fill="none" strokeLinecap="round" />;
    case 1:
      return <path d="M39,64 Q50,76 61,64 Z" fill="#fff" stroke="#7a3b2e" strokeWidth="2" />;
    default:
      return <line x1="42" y1="68" x2="58" y2="68" stroke="#7a3b2e" strokeWidth="3" strokeLinecap="round" />;
  }
}

function accEl(style: number, hairCol: string) {
  switch (style % 4) {
    case 0:
      return null;
    case 1:
      return (
        <g stroke="#222" strokeWidth="2" fill="rgba(255,255,255,0.25)">
          <circle cx="39" cy="54" r="8" /><circle cx="61" cy="54" r="8" />
          <line x1="47" y1="54" x2="53" y2="54" />
        </g>
      );
    case 2:
      return (
        <g>
          <path d="M20,36 Q50,10 80,36 Z" fill="#e63946" />
          <rect x="18" y="34" width="64" height="7" rx="3.5" fill="#c1121f" />
          <circle cx="50" cy="14" r="4" fill="#fff" />
        </g>
      );
    default:
      return <path d="M38,63 Q50,58 62,63 Q50,69 38,63 Z" fill={hairCol} />;
  }
}

export function ComicAvatar({ config, size = 40 }: { config?: AvatarConfig | null; size?: number }) {
  const c = config ?? DEFAULT_AVATAR;
  const clip = useId().replace(/:/g, '');
  const bg = BG[c.bg % BG.length];
  const skin = SKIN[c.skin % SKIN.length];
  const hair = HAIRCOL[c.hairColor % HAIRCOL.length];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Profil-Avatar" style={{ display: 'block', flexShrink: 0 }}>
      <defs><clipPath id={clip}><circle cx="50" cy="50" r="50" /></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="100" height="100" fill={bg} />
        <circle cx="24" cy="56" r="7" fill={skin} />
        <circle cx="76" cy="56" r="7" fill={skin} />
        <circle cx="50" cy="55" r="30" fill={skin} />
        {hairEl(c.hair, hair)}
        {eyesEl(c.eyes)}
        {mouthEl(c.mouth)}
        {accEl(c.acc, hair)}
      </g>
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
    </svg>
  );
}
