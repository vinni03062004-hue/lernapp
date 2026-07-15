import { NextRequest, NextResponse } from 'next/server';
import { questionSolution } from '@/lib/session-service';
import { loadState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Lösung/Erklärung einer Frage (für Prüfungs-Review nach Abschluss). */
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!id) return NextResponse.json({ error: 'id fehlt.' }, { status: 400 });

    // Katalogfrage?
    try {
      return NextResponse.json({ solution: questionSolution(id) });
    } catch {
      // sonst evtl. KI-generierte Frage aus der Session
      if (sessionId) {
        const state = await loadState();
        const session = state.sessions.find((s) => s.id === sessionId);
        const q = session?.generatedQuestions?.find((x) => x.id === id);
        if (q) {
          return NextResponse.json({
            solution: { id: q.id, explanation: q.explanation, source: q.source, modelAnswer: q.modelAnswer },
          });
        }
      }
      return NextResponse.json({ error: 'Lösung nicht gefunden.' }, { status: 404 });
    }
  } catch (err) {
    console.error('[api/solution]', err);
    return NextResponse.json({ error: 'Lösung nicht gefunden.' }, { status: 404 });
  }
}
