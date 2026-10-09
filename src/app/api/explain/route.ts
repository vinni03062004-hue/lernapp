import { NextRequest, NextResponse } from 'next/server';
import { getModule } from '@/content';
import { aiExplain, ChatTurn } from '@/lib/ai-explain';
import { answerFromKnowledge, buildKnowledgeBase } from '@/lib/retrieval';
import { loadState, saveState } from '@/lib/store';
import { LearningModule } from '@/lib/types';

export const dynamic = 'force-dynamic';
// KI-Aufruf (Gemini) – etwas mehr Laufzeit als der Plattform-Standard erlauben
export const maxDuration = 30;

// Wissensbasis einmal pro Prozess UND Modul aufbauen (Inhalte sind statisch).
// Wichtig: pro Modul getrennt cachen – sonst antwortet der Chat nach einem
// Modulwechsel mit dem Wissen des zuerst geladenen Moduls.
const kbCache = new Map<string, ReturnType<typeof buildKnowledgeBase>>();
function getKb(mod: LearningModule) {
  let kb = kbCache.get(mod.id);
  if (!kb) {
    kb = buildKnowledgeBase(mod);
    kbCache.set(mod.id, kb);
  }
  return kb;
}

/**
 * Erklärmodus & Fach-Chatbot.
 * Body: { query, chat?: boolean }
 * Primär KI-Antwort (Gemini) mit Gesprächsverlauf; Fallback: Offline-Retrieval.
 * Antworten sind quellengebunden; schwache Evidenz wird als "unsicher" markiert.
 */
export async function POST(req: NextRequest) {
  try {
    const { query, chat } = await req.json();
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return NextResponse.json({ error: 'Bitte eine Frage eingeben.' }, { status: 400 });
    }
    const mod = getModule();
    const q = query.trim();

    // Im Chat-Modus: Zustand + bisherigen Verlauf laden, damit die KI auf
    // Nachfragen eingehen kann.
    const state = chat ? await loadState() : null;
    const history: ChatTurn[] = state
      ? state.chatHistory.map((m) => ({ role: m.role, content: m.content }))
      : [];

    // KI-Antwort (Gemini, mit Verlauf), Fallback: Offline-Retrieval
    const kb = getKb(mod);
    const moduleLabel = `"${mod.title}" (Studiengang ${mod.studyProgram})`;
    const answer = (await aiExplain(q, kb, history, moduleLabel)) ?? answerFromKnowledge(mod, kb, q);

    if (chat && state) {
      const now = Date.now();
      state.chatHistory.push({ role: 'user', content: q, timestamp: now });
      const parts = [answer.core];
      if (answer.simple && !answer.core.includes(answer.simple) && !answer.simple.includes(answer.core)) parts.push(answer.simple);
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
