import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session-service';

export const dynamic = 'force-dynamic';

/** Neue Lernsession erstellen. Body: { mode, chapterIds, count?, openShare? } */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode = body.mode;
    const validModes = ['learn', 'mixed', 'error_focus', 'exam', 'image_learn', 'image_exam'];
    if (!validModes.includes(mode)) {
      return NextResponse.json({ error: 'Ungültiger Modus.' }, { status: 400 });
    }
    const chapterIds: string[] = Array.isArray(body.chapterIds) ? body.chapterIds : [];
    const count = typeof body.count === 'number' ? Math.max(1, Math.min(40, body.count)) : undefined;
    const openShare = typeof body.openShare === 'number' ? Math.max(0, Math.min(1, body.openShare)) : undefined;
    const result = await createSession({ mode, chapterIds, count, openShare });
    if (result.questions.length === 0) {
      return NextResponse.json({ error: 'Keine passenden Fragen gefunden (z. B. keine offenen Fehler im Fehlerfokus-Modus).' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error('[api/session]', err);
    return NextResponse.json({ error: 'Session konnte nicht erstellt werden.' }, { status: 500 });
  }
}
