import { NextRequest, NextResponse } from 'next/server';
import { getActiveModuleId, getModuleById, listStudyPrograms } from '@/content';
import { getProfile, loadStateFor, saveStateFor } from '@/lib/store';

export const dynamic = 'force-dynamic';

/**
 * Modul-/Studiengang-Steuerung.
 *  GET  → { studyPrograms, current, profile:{ studyProgram, changes, canCorrect } }
 *  POST { action:'setStudyProgram', program }
 *
 * Regeln (vom Nutzer vorgegeben):
 *  - Module/Studiengänge sind GLOBAL; jedes Profil kann alle sehen und wählen.
 *  - Der Speicherstand ist pro Profil UND Modul getrennt (siehe store.ts).
 *  - Ein Profil wählt seinen Studiengang. Es darf ihn EINMAL korrigieren,
 *    danach ist er gesperrt (nur noch Modulwechsel innerhalb des Studiengangs).
 *  Das aktive Modul selbst wird über das Cookie "module" gewählt (Client setzt es).
 */
export async function GET() {
  try {
    const profileId = await getProfile();
    const meta = await loadStateFor(profileId);
    const activeId = getActiveModuleId();
    const active = getModuleById(activeId)!;
    const studyProgram = meta.settings?.studyProgram;
    const changes = meta.settings?.studyProgramChanges ?? 0;
    return NextResponse.json({
      studyPrograms: listStudyPrograms(),
      current: { moduleId: active.id, title: active.title, studyProgram: active.studyProgram },
      profile: {
        id: profileId,
        studyProgram: studyProgram ?? null,
        changes,
        canCorrect: !!studyProgram && changes < 1,
        locked: !!studyProgram && changes >= 1,
      },
    });
  } catch (err) {
    console.error('[api/modules GET]', err);
    return NextResponse.json({ error: 'Module konnten nicht geladen werden.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body?.action !== 'setStudyProgram') {
      return NextResponse.json({ error: 'Unbekannte Aktion.' }, { status: 400 });
    }
    const program = String(body.program ?? '').trim();
    const valid = listStudyPrograms().some((p) => p.program === program);
    if (!program || !valid) {
      return NextResponse.json({ error: 'Unbekannter Studiengang.' }, { status: 400 });
    }

    const profileId = await getProfile();
    const meta = await loadStateFor(profileId);
    const cur = meta.settings?.studyProgram;
    const changes = meta.settings?.studyProgramChanges ?? 0;

    if (!cur) {
      meta.settings.studyProgram = program;
      meta.settings.studyProgramChanges = 0;
    } else if (cur === program) {
      // keine Änderung
    } else if (changes < 1) {
      meta.settings.studyProgram = program;
      meta.settings.studyProgramChanges = changes + 1;
    } else {
      return NextResponse.json(
        { error: 'Der Studiengang ist bereits gesperrt und kann nicht mehr geändert werden.' },
        { status: 409 }
      );
    }
    await saveStateFor(profileId, meta);
    const newChanges = meta.settings.studyProgramChanges ?? 0;
    return NextResponse.json({
      ok: true,
      studyProgram: meta.settings.studyProgram,
      changes: newChanges,
      canCorrect: newChanges < 1,
      locked: newChanges >= 1,
    });
  } catch (err) {
    console.error('[api/modules POST]', err);
    return NextResponse.json({ error: 'Aktion fehlgeschlagen.' }, { status: 500 });
  }
}
