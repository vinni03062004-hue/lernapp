import { NextRequest, NextResponse } from 'next/server';
import { questionSolution } from '@/lib/session-service';

export const dynamic = 'force-dynamic';

/** Lösung/Erklärung einer Frage (für Prüfungs-Review nach Abschluss). */
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id fehlt.' }, { status: 400 });
    return NextResponse.json({ solution: questionSolution(id) });
  } catch (err) {
    console.error('[api/solution]', err);
    return NextResponse.json({ error: 'Lösung nicht gefunden.' }, { status: 404 });
  }
}
