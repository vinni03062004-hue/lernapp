import { NextRequest, NextResponse } from 'next/server';
import { loadState, resetState, saveState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Einstellungen ändern. Body: Teilmenge von settings; { reset: true } setzt alles zurück. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.reset === true) {
      const fresh = await resetState();
      return NextResponse.json({ ok: true, settings: fresh.settings });
    }
    const state = await loadState();
    if (body.theme === 'light' || body.theme === 'dark') state.settings.theme = body.theme;
    if (typeof body.examQuestionCount === 'number') state.settings.examQuestionCount = Math.max(4, Math.min(40, Math.round(body.examQuestionCount)));
    if (typeof body.examOpenShare === 'number') state.settings.examOpenShare = Math.max(0, Math.min(1, body.examOpenShare));
    if (body.examTimeLimitMin === null || typeof body.examTimeLimitMin === 'number') {
      state.settings.examTimeLimitMin = body.examTimeLimitMin === null ? null : Math.max(1, Math.min(180, Math.round(body.examTimeLimitMin)));
    }
    await saveState(state);
    return NextResponse.json({ ok: true, settings: state.settings });
  } catch (err) {
    console.error('[api/settings]', err);
    return NextResponse.json({ error: 'Einstellungen konnten nicht gespeichert werden.' }, { status: 500 });
  }
}
