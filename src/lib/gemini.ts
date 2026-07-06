/**
 * Gemini-API-Client (Google Generative Language API).
 *
 * Gemeinsamer Zugang für KI-Bewertung (ai-grading) und Fach-Chatbot
 * (ai-explain). Aktiv, sobald die Umgebungsvariable GEMINI_API_KEY gesetzt ist
 * (lokal in .env.local, auf Vercel unter Settings → Environment Variables).
 *
 * Robustheit: Timeout + jeder Fehler führt zu null, sodass die aufrufende
 * Stelle auf ihren regelbasierten/Offline-Fallback zurückfallen kann.
 */

import { LearningConfig } from '@/config/learning';

export interface GeminiTurn {
  role: 'user' | 'model';
  text: string;
}

export interface GeminiRequest {
  /** System-Instruktion (Rolle/Regeln) */
  system: string;
  /** Gesprächsverlauf inkl. aktueller Nutzerfrage (chronologisch) */
  turns: GeminiTurn[];
  /** true → Antwort als reines JSON erzwingen (für die Bewertung) */
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
}

export function geminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

function modelName(): string {
  return process.env.GEMINI_MODEL ?? LearningConfig.ai.model;
}

/**
 * Ruft die Gemini-API und gibt den reinen Antworttext zurück.
 * Gibt null zurück bei fehlendem Key, HTTP-Fehler, Timeout oder leerer Antwort.
 */
export async function geminiGenerate(reqData: GeminiRequest): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName())}:generateContent`;

  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: reqData.maxTokens ?? 700,
    temperature: reqData.temperature ?? 0.4,
  };
  if (reqData.json) generationConfig.responseMimeType = 'application/json';

  const body = {
    systemInstruction: { parts: [{ text: reqData.system }] },
    contents: reqData.turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    generationConfig,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LearningConfig.ai.timeoutMs);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Key im Header statt in der URL – taucht so nicht in Logs auf.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.error('[gemini] API-Fehler HTTP', res.status, await res.text().catch(() => ''));
      return null;
    }
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const text = Array.isArray(parts)
      ? parts.map((p) => (p && p.text) ? p.text : '').join('').trim()
      : '';
    return text || null;
  } catch (err) {
    console.error('[gemini] Fehler, nutze Fallback:', err);
    return null;
  }
}
