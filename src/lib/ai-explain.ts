/**
 * KI-Antworten für Erklärmodus & Fach-Chatbot über die Gemini-API (Google).
 *
 * Aktiv, sobald GEMINI_API_KEY gesetzt ist. Die KI erhält:
 *  - den bisherigen GESPRÄCHSVERLAUF (damit sie auf Nachfragen eingeht und
 *    ein echtes Gespräch führt), und
 *  - die relevantesten Wissenseinheiten aus dem PDF-Wissensmodell als
 *    UNTERSTÜTZENDEN Kontext (RAG).
 * Sie antwortet primär auf die tatsächliche Frage; Skript-Auszüge sind Beleg,
 * kein Zwang. Fallback: Offline-Retrieval (retrieval.ts).
 */

import { geminiAvailable, geminiGenerate, GeminiTurn } from './gemini';
import { ExplainAnswer, KnowledgeUnit, retrieve } from './retrieval';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Du bist der Fach-Tutor einer Lernapp für das Hochschulmodul "Konsumentenverhalten" (Online-Marketing).
Du führst ein Gespräch mit einem Studierenden.

So antwortest du:
1. Beantworte IMMER die konkrete, zuletzt gestellte Frage bzw. gehe auf die letzte Nachricht des Studierenden ein. Beziehe dich auf den bisherigen Gesprächsverlauf (Nachfragen, "und was ist mit …?", "erklär das einfacher" usw.).
2. Nutze die mitgelieferten Skript-Auszüge als Beleg und Orientierung, WENN sie zur Frage passen. Sie sind Kontext, kein Pflichtprogramm – liste sie nicht stumpf auf und referiere nicht einfach ganze Kapitel.
3. Wenn die Skript-Auszüge nicht zur Frage passen, antworte trotzdem fachlich korrekt aus deinem Marketing-/Konsumentenverhaltens-Wissen und kennzeichne das mit "Zusatzwissen:".
4. Struktur: kurze Kernaussage zuerst, dann eine verständliche Erklärung, optional ein Beispiel oder Merksatz. Klar, studierendenfreundlich, auf Deutsch.
5. Erfinde keine Skriptinhalte und keine Seitenzahlen. Maximal ~180 Wörter.`;

export async function aiExplain(
  query: string,
  units: KnowledgeUnit[],
  history: ChatTurn[] = []
): Promise<ExplainAnswer | null> {
  if (!geminiAvailable()) return null;

  const hits = retrieve(query, units, 4);
  const context =
    hits.length > 0
      ? hits.map((h, i) => `[Quelle ${i + 1}: ${h.unit.source}]\n${h.unit.text}`).join('\n\n')
      : '(keine passenden Skript-Auszüge gefunden – nutze dein Fachwissen und kennzeichne es als Zusatzwissen)';

  // Gesprächsverlauf → Gemini-Turns (assistant = "model"). Nur die letzten
  // Nachrichten, um Kontext knapp zu halten; die aktuelle Frage kommt zuletzt.
  const turns: GeminiTurn[] = [];
  for (const m of history.slice(-10)) {
    const text = (m.content ?? '').trim();
    if (!text) continue;
    turns.push({ role: m.role === 'assistant' ? 'model' : 'user', text });
  }
  // Sicherstellen, dass der Verlauf mit einer User-Nachricht beginnt
  // (Gemini erwartet als erste Rolle "user").
  while (turns.length > 0 && turns[0].role !== 'user') turns.shift();

  turns.push({
    role: 'user',
    text: `SKRIPT-AUSZÜGE (unterstützender Kontext, nur nutzen wenn passend):\n${context}\n\nAKTUELLE FRAGE DES STUDIERENDEN:\n${query}`,
  });

  const text = await geminiGenerate({
    system: SYSTEM_PROMPT,
    turns,
    maxTokens: 1400,
    temperature: 0.4,
    thinkingBudget: 0, // 2.5-Flash: Thinking aus -> vollständige Antwort, kein Abschneiden
  });
  if (!text) return null;

  return {
    // Vollständige Antwort als Kernantwort; die UI zeigt sie mit Absätzen.
    core: text,
    simple: '',
    sources: hits.map((h) => h.unit.source),
    // Mit KI-Antwort keine "unsichere Evidenz"-Warnung, außer es gab gar
    // keine passenden Skriptstellen.
    uncertain: hits.length === 0,
    noEvidence: hits.length === 0,
  };
}
