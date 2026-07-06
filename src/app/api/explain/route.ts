import { NextRequest, NextResponse } from 'next/server';
import { getModule } from '@/content';
import { aiExplain } from '@/lib/ai-explain';
import { answerFromKnowledge, buildKnowledgeBase } from '@/lib/retrieval';
import { loadState, saveState } from '@/lib/store';

export const dynamic = 'force-dynamic';

// Wissensbasis einmal pro Prozess aufbauen (Inhalte sind statisch)
let kb: ReturnType<typeof buildKnowledgeBase> | null = null;
function getKb() {
  if (!kb) kb = buildKnowledgeBase(getModule());
  return kb;
}

/**
 * Erklärmodus & Fach-Chatbot (offline, wissensbasiert).
 * Body: { query, chat?: boolean }
 * Antworten sind quellengebunden; schwache Evidenz wird als "unsicher" markiert.
 */
export async function POST(req: NextRequest) {
  try {
    const { query, chat } = await req.json();
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return NextResponse.json({ error: 'Bitte eine Frage eingeben.' }, { status: 400 });
    }
    const mod = getModule();
    // KI-Antwort (Claude API, quellengebunden), Fallback: Offline-Retrieval
    const answer = (await aiExplain(query.trim(), getKb())) ?? answerFromKnowledge(mod, getKb(), query.trim());

    if (chat) {
      const state = await loadState();
      const now = Date.now();
      state.chatHistory.push({ role: 'user', content: query.trim(), timestamp: now });
      const parts = [answer.core];
      if (answer.simple && answer.simple !== answer.core) parts.push(answer.simple);
      state.chatHistory.push({
        role: 'assistant',
        content: parts.join('\n\n'),
        sources: answer.sources,
        uncertain: answer.uncertain,
        timestamp: now + 1,
      });
      if (state.chatHistory.length > 200) state.chatHistory.splice(0, state.chatHistory.length - 200);
      await saveState(state);
    }

    return NextResponse.json({ answer });
  } catch (err) {
    console.error('[api/explain]', err);
    return NextResponse.json({ error: 'Erklärung konnte nicht erstellt werden.' }, { status: 500 });
  }
}
