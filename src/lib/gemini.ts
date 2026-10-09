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
  /** Denk-Budget (Tokens). 0 = "Thinking" aus (schneller, kein abgeschnittenes JSON). */
  thinkingBudget?: number;
  /** optionaler Timeout (ms) für lange Antworten, z. B. Prüfungsgenerierung */
  timeoutMs?: number;
}

export function geminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

/**
 * Modellname aus GEMINI_MODEL (oder Standard) – tolerant gegenüber Schreibweisen
 * wie „Gemini 3.5 Flash Lite“ oder „models/gemini-3.5-flash-lite“.
 */
export function normalizeModelName(raw: string | undefined): string {
  const fallback = LearningConfig.ai.model;
  if (!raw || !raw.trim()) return fallback;
  let m = raw.trim().replace(/^models\//i, '');
  if (/^gemini[\s-]/i.test(m)) m = m.toLowerCase().replace(/\s+/g, '-');
  return m;
}

function modelName(): string {
  return normalizeModelName(process.env.GEMINI_MODEL);
}

/**
 * Denk-Einstellung passend zur Modellgeneration:
 *  - Gemini 2.x: thinkingBudget (0 = Denken aus)
 *  - Gemini 3 und neuer: thinkingLevel – „Denken aus“ gibt es dort nicht.
 *    Flash-Lite unterstützt „minimal“ (schnellste Stufe), die übrigen Modelle „low“.
 * Ein thinkingBudget von 0 führt bei Gemini-3-Modellen zu HTTP 400 (INVALID_ARGUMENT).
 */
export function thinkingConfigFor(model: string, budget: number | undefined): Record<string, unknown> | undefined {
  if (typeof budget !== 'number') return undefined;
  const m = model.toLowerCase();
  if (/^gemini-(1|2)(\.|-)/.test(m)) return { thinkingBudget: budget };
  if (/^gemini-/.test(m)) {
    if (budget === 0) return { thinkingLevel: m.includes('flash-lite') ? 'minimal' : 'low' };
    return { thinkingLevel: budget > 8000 ? 'high' : 'low' };
  }
  return undefined; // unbekannte Modellfamilie: Standard des Modells verwenden
}

async function callGemini(
  url: string,
  apiKey: string,
  body: Record<string, unknown>,
  timeoutMs: number
): Promise<{ ok: true; text: string | null } | { ok: false; status: number; detail: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
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
    if (!res.ok) return { ok: false, status: res.status, detail: await res.text().catch(() => '') };
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const text = Array.isArray(parts)
      ? parts
          .filter((p: any) => p && typeof p.text === 'string' && !p.thought)
          .map((p: any) => p.text)
          .join('')
          .trim()
      : '';
    return { ok: true, text: text || null };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Ruft die Gemini-API und gibt den reinen Antworttext zurück.
 * Gibt null zurück bei fehlendem Key, HTTP-Fehler, Timeout oder leerer Antwort.
 * Lehnt das Modell die Denk-Einstellung ab (HTTP 400), wird einmal ohne sie wiederholt.
 */
export async function geminiGenerate(reqData: GeminiRequest): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = modelName();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: reqData.maxTokens ?? 700,
    temperature: reqData.temperature ?? 0.4,
  };
  if (reqData.json) generationConfig.responseMimeType = 'application/json';
  const thinking = thinkingConfigFor(model, reqData.thinkingBudget);
  if (thinking) generationConfig.thinkingConfig = thinking;

  const body = {
    systemInstruction: { parts: [{ text: reqData.system }] },
    contents: reqData.turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    generationConfig,
  };
  const timeoutMs = reqData.timeoutMs ?? LearningConfig.ai.timeoutMs;

  try {
    let r = await callGemini(url, apiKey, body, timeoutMs);
    if (!r.ok && r.status === 400 && generationConfig.thinkingConfig) {
      // z. B. neues Modell mit anderer Denk-Steuerung → ohne Denk-Einstellung erneut versuchen
      console.warn('[gemini] HTTP 400 mit thinkingConfig', JSON.stringify(generationConfig.thinkingConfig), '– neuer Versuch ohne.', r.detail.slice(0, 300));
      delete generationConfig.thinkingConfig;
      r = await callGemini(url, apiKey, body, timeoutMs);
    }
    if (!r.ok) {
      const hint =
        r.status === 404 ? ` – Modell „${model}“ nicht gefunden (GEMINI_MODEL prüfen)` :
        r.status === 429 ? ' – Kontingent/Rate-Limit erreicht' :
        r.status === 403 ? ' – API-Key ungültig oder ohne Berechtigung' : '';
      console.error('[gemini] API-Fehler HTTP', r.status + hint, r.detail.slice(0, 500));
      return null;
    }
    return r.text;
  } catch (err) {
    console.error('[gemini] Fehler, nutze Fallback:', err);
    return null;
  }
}
