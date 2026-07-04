import { NextResponse } from 'next/server';
import { getModule } from '@/content';
import { loadState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Statische Inhalte: Kapitel, Konzepte, Abbildungen (für Erklärmodus & Bild-Modi). */
export async function GET() {
  try {
    const mod = getModule();
    const state = await loadState();
    return NextResponse.json({
      chapters: mod.chapters,
      concepts: mod.concepts,
      figures: mod.figures,
      chatHistory: state.chatHistory.slice(-50),
    });
  } catch (err) {
    console.error('[api/content]', err);
    return NextResponse.json({ error: 'Inhalte konnten nicht geladen werden.' }, { status: 500 });
  }
}
