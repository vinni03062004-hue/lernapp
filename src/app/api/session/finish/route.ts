import { NextRequest, NextResponse } from 'next/server';
import { finishSession } from '@/lib/session-service';

export const dynamic = 'force-dynamic';

/** Session beenden; Prüfungsmodus: Gesamtbewertung. Body: { sessionId } */
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: 'sessionId fehlt.' }, { status: 400 });
    const result = await finishSession(sessionId);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[api/session/finish]', err);
    return NextResponse.json({ error: 'Session konnte nicht beendet werden.' }, { status: 500 });
  }
}
