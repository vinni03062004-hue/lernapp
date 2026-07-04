import { NextRequest, NextResponse } from 'next/server';
import { loadState, saveState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Frage als problematisch melden. Body: { questionId, reason } */
export async function POST(req: NextRequest) {
  try {
    const { questionId, reason } = await req.json();
    if (!questionId) return NextResponse.json({ error: 'questionId fehlt.' }, { status: 400 });
    const state = await loadState();
    state.flaggedQuestions.push({ questionId, reason: String(reason ?? '').slice(0, 500), at: Date.now() });
    await saveState(state);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/flag]', err);
    return NextResponse.json({ error: 'Meldung konnte nicht gespeichert werden.' }, { status: 500 });
  }
}
