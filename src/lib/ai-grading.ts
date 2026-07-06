/**
 * KI-Bewertung für Freitextantworten über die Gemini-API (Google).
 *
 * Aktiv, sobald die Umgebungsvariable GEMINI_API_KEY gesetzt ist
 * (lokal in .env.local, auf Vercel unter Settings → Environment Variables).
 *
 * Die KI bewertet die Antwort fachlich-semantisch: Auch korrekte Antworten,
 * die anders formuliert sind oder über den PDF-Wortlaut hinausgehen, werden
 * als richtig gewertet, solange sie die Frage fachlich korrekt beantworten.
 *
 * Aufruf-Politik: Diese Funktion wird bewusst nur dann genutzt, wenn die
 * regelbasierte Rubrik (scoring.ts) eine offene Antwort NICHT bereits als
 * richtig erkennt (siehe attempt-service.ts) – so werden API-Aufrufe gespart.
 *
 * Robustheit: Timeout + jeder Fehler führt zum Fallback auf die
 * regelbasierte Rubrik-Bewertung – die App bleibt immer nutzbar.
 */

import { LearningConfig } from '@/config/learning';
import { geminiAvailable, geminiGenerate } from './gemini';
import { ScoreResult } from './scoring';
import { Question } from './types';

export function aiGradingAvailable(): boolean {
  return geminiAvailable();
}

const SYSTEM_PROMPT = `Du bist ein fairer, fachkundiger Prüfer für das Hochschulmodul "Konsumentenverhalten" (Online-Marketing).
Bewerte die Antwort eines Studierenden auf eine offene Frage.

Bewertungsregeln:
1. Bewerte die FACHLICHE SUBSTANZ, nicht den Wortlaut. Paraphrasen, Synonyme und eigene Formulierungen sind vollwertig.
2. Auch korrekte Aussagen, die NICHT in den erwarteten Kernpunkten oder der Musterantwort stehen, zählen positiv, wenn sie die Frage fachlich richtig beantworten.
3. Vergib Teilpunkte: score ist eine Zahl von 0 bis 1 (0 = fachlich falsch/kein Bezug, 0.5 = teilweise richtig, 1 = vollständig richtig).
4. Falsche Aussagen in der Antwort senken den Score und werden im Feedback benannt.
5. Sei wohlwollend bei knappen, aber korrekten Antworten; sei streng bei fachlichen Fehlern.
6. Feedback: 1–3 Sätze auf Deutsch, konstruktiv, direkt an den Studierenden gerichtet.

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in exakt diesem Format, ohne Markdown:
{"score": 0.0, "feedback": "...", "erfuellte_punkte": ["..."], "fehlende_punkte": ["..."]}`;

function buildUserPrompt(q: Question, answer: string): string {
  const parts = [
    `FRAGE: ${q.prompt}`,
    q.rubric?.length ? `ERWARTETE KERNPUNKTE (Orientierung, nicht abschließend):\n${q.rubric.map((r) => `- ${r.point}`).join('\n')}` : '',
    q.modelAnswer ? `MUSTERANTWORT (eine mögliche korrekte Antwort):\n${q.modelAnswer}` : '',
    q.explanation ? `FACHLICHER KONTEXT:\n${q.explanation}` : '',
    `ANTWORT DES STUDIERENDEN:\n${answer}`,
  ];
  return parts.filter(Boolean).join('\n\n');
}

function extractJson(text: string): any | null {
  try {
    const cleaned = text.replace(/```(json)?/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) return null;
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

function clamp01(x: number): number {
  return Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0;
}

function toStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)).slice(0, 10) : [];
}

/**
 * Bewertet eine Freitextantwort per Gemini-API.
 * Gibt null zurück, wenn kein API-Key gesetzt ist oder ein Fehler auftritt
 * (dann greift die regelbasierte Bewertung).
 */
export async function aiGradeFreetext(question: Question, answer: string): Promise<ScoreResult | null> {
  if (!geminiAvailable()) return null;
  if (answer.trim().length < LearningConfig.freetext.minLength) return null; // zu kurz → regelbasiert

  const text = await geminiGenerate({
    system: SYSTEM_PROMPT,
    turns: [{ role: 'user', text: buildUserPrompt(question, answer) }],
    json: true,
    maxTokens: 600,
    temperature: 0.1,
  });
  if (!text) return null;

  const json = extractJson(text);
  if (!json || typeof json.score === 'undefined') {
    console.error('[ai-grading] Unerwartetes Antwortformat:', text.slice(0, 200));
    return null;
  }

  const score = clamp01(Number(json.score));
  const correct = score >= LearningConfig.freetext.correctThreshold;
  let feedback = String(json.feedback ?? '').trim();
  if (!feedback) {
    feedback = correct ? 'Fachlich richtig.' : score > 0.3 ? 'Teilweise richtig.' : 'Die zentralen Punkte wurden nicht getroffen.';
  }
  return {
    score,
    correct,
    rubricHits: toStringArray(json.erfuellte_punkte),
    rubricMisses: toStringArray(json.fehlende_punkte),
    feedback: `${feedback} (KI-bewertet)`,
  };
}
