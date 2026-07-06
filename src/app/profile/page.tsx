'use client';

/**
 * Profil-Verwaltung: auswählen, hinzufügen, bearbeiten (Name + Comic-Avatar),
 * löschen (mit "BESTÄTIGEN"-Eingabe). Getrennte Speicherstände je Profil.
 * Mobil-optimiert (Karten mit umbrechendem Grid).
 */

import { useEffect, useState } from 'react';
import { AVATAR_ATTRS, AvatarConfig, ComicAvatar, DEFAULT_AVATAR, parseAvatar, randomAvatar, serializeAvatar } from '@/components/Avatar';

interface ProfileRef { id: string; name: string; avatar?: string; updatedAt?: number }

function setProfileCookie(id: string) {
  document.cookie = `profile=${encodeURIComponent(id)}; path=/; max-age=31536000; samesite=lax`;
}
function sanitizeId(v: string): string {
  return (v || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || 'profil';
}

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<ProfileRef[]>([]);
  const [current, setCurrent] = useState<string>('default');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Editor: null = zu, 'new' = neu, sonst Profil-ID
  const [editing, setEditing] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftAvatar, setDraftAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);

  async function reload() {
    try {
      const d = await fetch('/api/profiles').then((r) => r.json());
      if (Array.isArray(d.profiles)) setProfiles(d.profiles);
      if (d.current) setCurrent(d.current);
    } catch { setError('Profile konnten nicht geladen werden.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { reload(); }, []);

  function startNew() {
    setEditing('new');
    setDraftName('');
    setDraftAvatar(randomAvatar());
  }
  function startEdit(p: ProfileRef) {
    setEditing(p.id);
    setDraftName(p.name === 'Standard' && p.id === 'default' ? '' : p.name);
    setDraftAvatar(parseAvatar(p.avatar) ?? randomAvatar());
  }
  function cycle(key: keyof AvatarConfig, delta: number) {
    const attr = AVATAR_ATTRS.find((a) => a.key === key)!;
    setDraftAvatar((a) => ({ ...a, [key]: (a[key] + delta + attr.count) % attr.count }));
  }

  async function saveEditor() {
    if (busy) return;
    const name = draftName.trim();
    if (!name) { setError('Bitte einen Namen eingeben.'); return; }
    setBusy(true);
    setError('');
    try {
      if (editing === 'new') {
        let id = sanitizeId(name);
        const ids = new Set(profiles.map((p) => p.id));
        if (ids.has(id)) { let n = 2; while (ids.has(`${id}-${n}`)) n++; id = `${id}-${n}`; }
        const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create', id, name, avatar: serializeAvatar(draftAvatar) }) });
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? 'Anlegen fehlgeschlagen.'); }
      } else if (editing) {
        const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update', id: editing, name, avatar: serializeAvatar(draftAvatar) }) });
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? 'Speichern fehlgeschlagen.'); }
      }
      setEditing(null);
      await reload();
    } catch (e: any) { setError(e.message ?? 'Fehler.'); }
    finally { setBusy(false); }
  }

  function switchTo(id: string) {
    if (id === current || busy) return;
    setProfileCookie(id);
    window.location.href = '/';
  }

  async function removeProfile(p: ProfileRef) {
    if (busy || p.id === 'default') return;
    const typed = window.prompt(`Wenn Sie das Profil „${p.name}" löschen möchten, müssen Sie BESTÄTIGEN eingeben:`);
    if (typed == null) return;
    if (typed.trim() !== 'BESTÄTIGEN') { setError('Löschen abgebrochen – es wurde nicht „BESTÄTIGEN" eingegeben.'); return; }
    if (!window.confirm(`Profil „${p.name}" endgültig löschen? Der gesamte Fortschritt geht verloren.`)) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id: p.id }) });
      if (!res.ok) throw new Error('Löschen fehlgeschlagen.');
      if (p.id === current) { setProfileCookie('default'); window.location.href = '/'; return; }
      await reload();
    } catch (e: any) { setError(e.message ?? 'Fehler.'); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <h1>Profile</h1>
      <p className="page-sub">
        Jedes Profil hat einen eigenen, getrennten Speicherstand (Fortschritt, Prüfungen, Chat). Wähle ein Profil,
        lege ein neues an oder passe Name und Avatar an.
      </p>

      {error && <div className="feedback-box bad" style={{ marginBottom: 12 }}>{error}</div>}

      {loading ? (
        <div className="card"><span className="spinner" /> Profile werden geladen …</div>
      ) : (
        <>
          <div className="grid cols-3" style={{ alignItems: 'start' }}>
            {profiles.map((p) => (
              <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ComicAvatar config={parseAvatar(p.avatar)} size={52} />
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</strong>
                    {p.id === current && <span className="badge success">Aktiv</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn small primary" onClick={() => switchTo(p.id)} disabled={busy || p.id === current}>
                    {p.id === current ? 'Ausgewählt' : 'Auswählen'}
                  </button>
                  <button className="btn small" onClick={() => startEdit(p)} disabled={busy}>Bearbeiten</button>
                  <button className="btn small" onClick={() => removeProfile(p)} disabled={busy || p.id === 'default'}>Löschen</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button className="btn primary" onClick={startNew} disabled={busy}>＋ Neues Profil</button>
          </div>
        </>
      )}

      {editing !== null && (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>{editing === 'new' ? 'Neues Profil' : 'Profil bearbeiten'}</h2>
          <div className="grid cols-2" style={{ alignItems: 'start' }}>
            <div>
              <label className="small dim">Name</label>
              <input type="text" value={draftName} placeholder="z. B. dein Vorname"
                onChange={(e) => setDraftName(e.target.value)} maxLength={60} style={{ width: '100%', marginTop: 4 }} />

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {AVATAR_ATTRS.map((a) => (
                  <div key={a.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="small" style={{ flex: 1 }}>{a.label}</span>
                    <button className="btn small" onClick={() => cycle(a.key, -1)} aria-label={`${a.label} zurück`}>◀</button>
                    <span className="small dim" style={{ width: 34, textAlign: 'center' }}>{(draftAvatar[a.key] % a.count) + 1}/{a.count}</span>
                    <button className="btn small" onClick={() => cycle(a.key, 1)} aria-label={`${a.label} weiter`}>▶</button>
                  </div>
                ))}
                <button className="btn small" onClick={() => setDraftAvatar(randomAvatar())} style={{ marginTop: 4 }}>🎲 Zufällig</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <ComicAvatar config={draftAvatar} size={140} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn primary" onClick={saveEditor} disabled={busy}>{busy ? 'Speichert …' : 'Speichern'}</button>
                <button className="btn" onClick={() => setEditing(null)} disabled={busy}>Abbrechen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
