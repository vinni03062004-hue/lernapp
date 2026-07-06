import { NextRequest, NextResponse } from 'next/server';
import { defaultState, deleteProfile, getProfile, listProfiles, loadStateFor, sanitizeProfile, saveStateFor } from '@/lib/store';

export const dynamic = 'force-dynamic';

/**
 * Profilverwaltung (getrennte Speicherstände je Profil).
 *  - GET                              → { profiles: [{id,name,avatar,updatedAt}], current }
 *  - POST { action:'create', id, name, avatar? }
 *  - POST { action:'update', id, name?, avatar? }   (Name/Avatar ändern, ID bleibt)
 *  - POST { action:'delete', id }                    ("default" geschützt)
 * Das aktive Profil wird über das Cookie "profile" gewählt (Client setzt es).
 */
export async function GET() {
  try {
    const [profiles, current] = await Promise.all([listProfiles(), getProfile()]);
    return NextResponse.json({ profiles, current });
  } catch (err) {
    console.error('[api/profiles GET]', err);
    return NextResponse.json({ error: 'Profile konnten nicht geladen werden.' }, { status: 500 });
  }
}

function cleanName(v: unknown): string {
  return String(v ?? '').trim().slice(0, 60);
}
function cleanAvatar(v: unknown): string | undefined {
  const s = typeof v === 'string' ? v : '';
  if (!s || s.length > 2000) return undefined;
  return s;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body?.action;

    if (action === 'create') {
      const id = sanitizeProfile(body.id);
      const name = cleanName(body.name) || id;
      const existing = await listProfiles();
      if (existing.some((p) => p.id === id)) {
        return NextResponse.json({ error: 'Profil-ID existiert bereits.', id }, { status: 409 });
      }
      const st = defaultState();
      st.settings.profileName = name;
      st.settings.avatar = cleanAvatar(body.avatar);
      await saveStateFor(id, st);
      return NextResponse.json({ ok: true, id, name });
    }

    if (action === 'update') {
      const id = sanitizeProfile(body.id);
      const st = await loadStateFor(id);
      if (body.name !== undefined) {
        const name = cleanName(body.name);
        if (!name) return NextResponse.json({ error: 'Name darf nicht leer sein.' }, { status: 400 });
        st.settings.profileName = name;
      }
      if (body.avatar !== undefined) st.settings.avatar = cleanAvatar(body.avatar);
      await saveStateFor(id, st);
      return NextResponse.json({ ok: true, id, name: st.settings.profileName });
    }

    if (action === 'delete') {
      const id = sanitizeProfile(body.id);
      if (id === 'default') {
        return NextResponse.json({ error: 'Das Standard-Profil kann nicht gelöscht werden.' }, { status: 400 });
      }
      await deleteProfile(id);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unbekannte Aktion.' }, { status: 400 });
  } catch (err) {
    console.error('[api/profiles POST]', err);
    return NextResponse.json({ error: 'Profil-Aktion fehlgeschlagen.' }, { status: 500 });
  }
}
