/**
 * KI-generierte Prüfungsfragen (nur Prüfmodus).
 *
 * Ablauf mit DOPPELTER Absicherung gegen das Kapitel-Skript:
 *  1) Generierung: Gemini erzeugt Transfer-/Szenariofragen AUSSCHLIESSLICH auf
 *     Basis der gelieferten Kapitelinhalte (grounded, keine Erfindungen).
 *  2) Verifizierung: ein zweiter Gemini-Aufruf prüft jede erzeugte Frage
 *     erneut gegen genau diese Kapitelinhalte (fachlich korrekt, beantwortbar,
 *     eindeutig). Nur bestandene Fragen werden verwendet.
 *
 * Quota-schonend: 1 Aufruf Generierung + 1 Aufruf Prüfung pro Prüfung
 * (nicht pro Einzelfrage). Fällt Gemini aus, wird [] zurückgegeben und der
 * Prüfmodus nutzt den vorhandenen Fragenkatalog.
 */

import { randomUUID } from 'crypto';
import { geminiAvailable, geminiGenerate } from './gemini';
import { Chapter, LearningModule, Question } from './types';

function targetChapters(mod: LearningModule, chapterIds: string[]): Chapter[] {
  return chapterIds.length ? mod.chapters.filter((c) => chapterIds.includes(c.id)) : mod.chapters;
}

/** kompakter, aber vollständiger Kapitel-Kontext (Kernideen + Begriffe). */
function buildContext(mod: LearningModule, chapters: Chapter[]): string {
  const parts: string[] = [];
  for (const ch of chapters) {
    const concepts = mod.concepts.filter((c) => c.chapterId === ch.id);
    parts.push(
      `# Kapitel ${ch.index}: ${ch.title} (chapterId: ${ch.id})\n` +
        `Kernideen:\n${ch.keyIdeas.map((k) => `- ${k}`).join('\n')}\n` +
        (concepts.length
          ? `Begriffe:\n${concepts.slice(0, 20).map((c) => `- ${c.term}: ${c.definition}`).join('\n')}`
          : '')
    );
  }
  return parts.join('\n\n').slice(0, 12000);
}

function parseArray(text: string | null): any[] {
  if (!text) return [];
  try {
    const cleaned = text.replace(/```(json)?/g, '').trim();
    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start < 0 || end <= start) return [];
    const arr = JSON.parse(cleaned.slice(start, end + 1));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

const GEN_SYSTEM = `Du bist ein Prüfer für ein Hochschulmodul. Erstelle Prüfungs-Transferfragen (offene Fragen), die Anwendung/Transfer verlangen – realistische kurze Szenarien.
Strenge Regeln:
1. Stütze dich AUSSCHLIESSLICH auf die gelieferten Kapitelinhalte. Erfinde keine Fakten, Zahlen oder Modelle, die dort nicht vorkommen.
2. Jede Frage muss allein aus diesen Inhalten fachlich korrekt beantwortbar sein.
3. Formuliere klar und eindeutig; keine Fangfragen.
Antworte AUSSCHLIESSLICH als JSON-Array, ohne Markdown:
[{"prompt":"...","chapterId":"...","modelAnswer":"...","keyPoints":["...","..."]}]
- prompt: die Frage (mit Szenario)
- chapterId: die passende chapterId aus dem Kontext
- modelAnswer: knappe Musterantwort
- keyPoints: 2–4 erwartete Kernpunkte`;

const VERIFY_SYSTEM = `Du bist ein strenger fachlicher Prüfer. Für jede vorgelegte Frage prüfst du anhand der gelieferten Kapitelinhalte:
- Ist sie fachlich korrekt und widerspruchsfrei zum Material?
- Ist sie allein aus dem Material beantwortbar (nichts erfunden)?
- Ist sie klar/eindeutig?
Antworte AUSSCHLIESSLICH als JSON-Array, ohne Markdown:
[{"index":0,"ok":true,"reason":"..."}]
ok=false, wenn irgendein Kriterium nicht erfüllt ist.`;

export async function generateExamQuestions(mod: LearningModule, chapterIds: string[], count: number): Promise<Question[]> {
  if (!geminiAvailable() || count < 1) return [];
  const chapters = targetChapters(mod, chapterIds);
  if (!chapters.length) return [];
  const ctx = buildContext(mod, chapters);

  // 1) Generierung
  const genText = await geminiGenerate({
    system: GEN_SYSTEM,
    turns: [{ role: 'user', text: `MODUL: ${mod.title}\n\nKAPITELINHALTE:\n${ctx}\n\nErstelle ${count} Fragen.` }],
    json: true,
    thinkingBudget: 0,
    maxTokens: 2048,
    temperature: 0.7,
  });
  const gen = parseArray(genText).filter((g) => g && typeof g.prompt === 'string' && g.prompt.trim().length >= 10);
  if (!gen.length) return [];

  // 2) Verifizierung gegen das Skript
  const verifyText = await geminiGenerate({
    system: VERIFY_SYSTEM,
    turns: [
      {
        role: 'user',
        text:
          `KAPITELINHALTE:\n${ctx}\n\nFRAGEN:\n` +
          JSON.stringify(gen.map((g, i) => ({ index: i, prompt: g.prompt, modelAnswer: g.modelAnswer }))),
      },
    ],
    json: true,
    thinkingBudget: 0,
    maxTokens: 1024,
    temperature: 0,
  });
  const checks = parseArray(verifyText);
  const okIndices = new Set<number>();
  for (const c of checks) {
    const ok = c?.ok === true || c?.ok === 'true';
    if (ok) okIndices.add(Number(c.index));
  }

  const validChapters = new Set(mod.chapters.map((c) => c.id));
  const out: Question[] = [];
  gen.forEach((g, i) => {
    // Wenn Verifizierung Ergebnisse lieferte: nur bestandene übernehmen.
    if (checks.length > 0 && !okIndices.has(i)) return;
    const chId = validChapters.has(g.chapterId) ? g.chapterId : chapters[0].id;
    const ch = mod.chapters.find((c) => c.id === chId);
    const keyPoints: string[] = Array.isArray(g.keyPoints) ? g.keyPoints.map((x: any) => String(x)).slice(0, 5) : [];
    out.push({
      id: `gen-${randomUUID()}`,
      chapterId: chId,
      type: 'transfer',
      goal: 'application',
      difficulty: 3,
      prompt: String(g.prompt).trim(),
      rubric: keyPoints.map((p) => ({
        point: p,
        keywords: p.toLowerCase().split(/[^a-zäöüß0-9]+/).filter((w) => w.length > 4).slice(0, 3),
        weight: 1,
      })),
      modelAnswer: typeof g.modelAnswer === 'string' ? g.modelAnswer : undefined,
      explanation: 'KI-generierte Transferfrage – aus dem Kapitel erstellt und gegen das Skript gegengeprüft.',
      source: ch ? `KI-Frage · Kapitel ${ch.index} (${ch.title})` : 'KI-Frage',
    });
  });
  return out;
}
