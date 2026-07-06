import { NextRequest, NextResponse } from 'next/server';
import { defaultState, deleteProfile, getProfile, listProfiles, loadStateFor, sanitizeProfile, saveStateFor } from '@/lib/store';

export const dynamic = 'force-dynamic';

/**
 * Profilverwaltung (getrennte Speicherstände je Profil).
 *  - GET                         → { profiles: [{id,name,updatedAt}], current }
 *  - POST { action: 'create', id, name }  → neues Profil mit Anzeigenamen
 *  - POST { action: 'rename', id, name }  → Anzeigenamen ändern (ID bleibt)
 *  - POST { action: 'delete', id }        → Profil löschen ("default" geschützt)
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body?.action;

    if (action === 'create') {
      const id = sanitizeProfile(body.id);
      const name = String(body.name ?? '').trim().slice(0, 60) || id;
      const existing = await listProfiles();
      if (existing.some((p) => p.id === id)) {
        return NextResponse.json({ error: 'Profil-ID existiert bereits.', id }, { status: 409 });
      }
      const st = defaultState();
      st.settings.profileName = name;
      await saveStateFor(id, st);
      return NextResponse.json({ ok: true, id, name });
    }

    if (action === 'rename') {
      const id = sanitizeProfile(body.id);
      const name = String(body.name ?? '').trim().slice(0, 60);
      if (!name) return NextResponse.json({ error: 'Name darf nicht leer sein.' }, { status: 400 });
      const st = await loadStateFor(id);
      st.settings.profileName = name;
      await saveStateFor(id, st);
      return NextResponse.json({ ok: true, id, name });
    }

    if (action === 'avatar') {
      const id = sanitizeProfile(body.id);
      const avatar = typeof body.avatar === 'string' ? body.avatar : '';
      if (avatar.length > 200000) {
        return NextResponse.json({ error: 'Avatar ist zu groß.' }, { status: 413 });
      }
      const st = await loadStateFor(id);
      st.settings.avatar = avatar || undefined;
      await saveStateFor(id, st);
      return NextResponse.json({ ok: true, id });
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
