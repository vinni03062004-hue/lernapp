/**
 * KI-Antworten für Erklärmodus & Fach-Chatbot über die Claude API.
 *
 * Aktiv, sobald ANTHROPIC_API_KEY gesetzt ist. Die KI erhält die relevanten
 * Wissenseinheiten aus dem PDF-Wissensmodell als Kontext (RAG) und antwortet
 * quellengebunden; darüber hinausgehendes Fachwissen wird als Zusatzwissen
 * gekennzeichnet. Fallback: Offline-Retrieval (retrieval.ts).
 */

import { LearningConfig } from '@/config/learning';
import { ExplainAnswer, KnowledgeUnit, retrieve } from './retrieval';

const SYSTEM_PROMPT = `Du bist der Fach-Tutor einer Lernapp für das Hochschulmodul "Konsumentenverhalten" (Online-Marketing).
Beantworte die Frage des Studierenden fachlich korrekt, klar und studierendenfreundlich auf Deutsch.

Regeln:
1. Stütze dich PRIMÄR auf die mitgelieferten Auszüge aus dem Modul-Skript (PDF-Wissen).
2. Wenn du darüber hinausgehendes Fachwissen ergänzt, kennzeichne es klar mit "Zusatzwissen:".
3. Struktur: kurze Kernantwort (1–2 Sätze), dann eine verständliche Erklärung, optional ein Beispiel oder Merksatz.
4. Halte dich fachlich an die Marketing-/Konsumentenverhaltens-Lehre; erfinde keine Skriptinhalte.
5. Maximal ~180 Wörter.`;

export async function aiExplain(query: string, units: KnowledgeUnit[]): Promise<ExplainAnswer | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const hits = retrieve(query, units, 4);
  const context =
    hits.length > 0
      ? hits.map((h, i) => `[Quelle ${i + 1}: ${h.unit.source}]\n${h.unit.text}`).join('\n\n')
      : '(keine passenden Skript-Auszüge gefunden)';

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LearningConfig.ai.timeoutMs);
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.AI_GRADING_MODEL ?? LearningConfig.ai.model,
        max_tokens: 700,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `SKRIPT-AUSZÜGE:\n${context}\n\nFRAGE DES STUDIERENDEN:\n${query}`,
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.error('[ai-explain] API-Fehler HTTP', res.status);
      return null;
    }
    const data = await res.json();
    const text: string = (data?.content?.[0]?.text ?? '').trim();
    if (!text) return null;

    const [first, ...restParts] = text.split('\n\n');
    return {
      core: first,
      simple: restParts.join('\n\n') || first,
      sources: hits.map((h) => h.unit.source),
      uncertain: hits.length === 0,
      noEvidence: hits.length === 0,
    };
  } catch (err) {
    console.error('[ai-explain] Fehler, nutze Offline-Fallback:', err);
    return null;
  }
}
