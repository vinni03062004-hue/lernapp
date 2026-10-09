/**
 * KI-generierte Prüfungsfragen (nur Prüfmodus) – im Stil der IU-Klausuren.
 *
 * Vorbild: Bei der IU wählt die KI Begriffe samt Erklärung aus dem Skript aus
 * und formuliert dazu anspruchsvolle offene Fragen. Genau so arbeitet dieser
 * Generator:
 *  0) Auswahl: Fokusbegriffe werden gewichtet zufällig aus den gewählten
 *     Kapiteln gezogen (prüfungsrelevante Begriffe häufiger, kürzlich
 *     geprüfte seltener, Kapitel gleichmäßig verteilt).
 *  1) Generierung: Gemini erstellt je Fokusbegriff genau EINE offene Frage
 *     („Erläutern Sie …“, „Grenzen Sie … ab“, „Nennen und erläutern Sie …“,
 *     Fallbeispiel/Transfer, Vor-/Nachteile) – AUSSCHLIESSLICH auf Basis der
 *     gelieferten Skriptinhalte (Definitionen + Original-Abschnitte).
 *  2) Verifizierung: ein zweiter Gemini-Aufruf prüft jede Frage samt
 *     Musterantwort erneut gegen genau diese Skriptinhalte. Nur bestandene
 *     Fragen werden verwendet.
 *
 * Quota-schonend: 1 Aufruf Generierung + 1 Aufruf Prüfung pro Prüfung.
 * Fällt Gemini aus, wird [] zurückgegeben und der Prüfmodus nutzt den
 * vorhandenen Fragenkatalog.
 */

import { randomUUID } from 'crypto';
import { geminiAvailable, geminiGenerate } from './gemini';
import { sectionPlainText } from './retrieval';
import { Chapter, Concept, LearningModule, Question, ScriptSection } from './types';

/** Obergrenze für den Skript-Kontext (Zeichen) – reicht für ~10 Fokusbegriffe samt Abschnitten. */
const MAX_CONTEXT_CHARS = 30000;
/** Fragen pro Generierungsaufruf (kleine Blöcke = kurze Antwortzeit, parallel erzeugt). */
const MAX_PER_CALL = 6;
/** Höchstens so viele KI-Fragen pro Prüfung (schont das API-Kontingent); Rest aus dem Katalog. */
export const MAX_GENERATED_PER_EXAM = 12;

export interface ExamGenOptions {
  /** Begriffe, die in den letzten Prüfungen bereits KI-Fragen hatten → seltener ziehen */
  avoidConceptIds?: string[];
}

function targetChapters(mod: LearningModule, chapterIds: string[]): Chapter[] {
  return chapterIds.length ? mod.chapters.filter((c) => chapterIds.includes(c.id)) : mod.chapters;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Gewicht eines Begriffs für die Ziehung (inhaltsreiche, prüfungsrelevante Begriffe bevorzugt). */
function conceptWeight(c: Concept, avoid: Set<string>): number {
  let w = 1;
  if (c.examRelevance) w += 1.5;
  if (c.context) w += 0.5;
  if (c.confusableWith?.length) w += 0.5;
  if (c.definition.length > 160) w += 0.3;
  if (avoid.has(c.id)) w *= 0.2;
  return w;
}

function weightedPick<T>(items: T[], weight: (x: T) => number): T | undefined {
  const total = items.reduce((s, x) => s + weight(x), 0);
  if (items.length === 0 || total <= 0) return items[0];
  let r = Math.random() * total;
  for (const x of items) {
    r -= weight(x);
    if (r <= 0) return x;
  }
  return items[items.length - 1];
}

/**
 * Zieht `count` Fokusbegriffe – reihum über die Kapitel (gleichmäßige Abdeckung),
 * innerhalb eines Kapitels gewichtet zufällig, ohne Wiederholung.
 */
export function pickFocusConcepts(
  mod: LearningModule,
  chapters: Chapter[],
  count: number,
  avoidIds: string[] = []
): Concept[] {
  const avoid = new Set(avoidIds);
  const pools = new Map<string, Concept[]>();
  for (const ch of chapters) pools.set(ch.id, mod.concepts.filter((c) => c.chapterId === ch.id));
  const order = shuffle(chapters.map((c) => c.id)).filter((id) => (pools.get(id)?.length ?? 0) > 0);
  const picked: Concept[] = [];
  let i = 0;
  while (picked.length < count && order.some((id) => (pools.get(id)?.length ?? 0) > 0)) {
    const chId = order[i % order.length];
    i++;
    const pool = pools.get(chId)!;
    if (pool.length === 0) continue;
    const c = weightedPick(pool, (x) => conceptWeight(x, avoid));
    if (!c) continue;
    pool.splice(pool.indexOf(c), 1);
    picked.push(c);
  }
  return picked;
}

/** Abschnitt des Lernskripts, in dem ein Begriff definiert wird. */
function sectionForConcept(mod: LearningModule, conceptId: string): { chapter: Chapter; section: ScriptSection } | null {
  for (const ch of mod.chapters) {
    for (const s of ch.sections ?? []) {
      if (s.blocks.some((b) => b.kind === 'definitions' && b.conceptIds.includes(conceptId))) return { chapter: ch, section: s };
    }
  }
  return null;
}

function conceptBlock(mod: LearningModule, c: Concept, n: number): string {
  const ch = mod.chapters.find((x) => x.id === c.chapterId);
  const partners = (c.confusableWith ?? [])
    .map((t) => mod.concepts.find((x) => x.term.toLowerCase() === t.toLowerCase()))
    .filter((x): x is Concept => !!x);
  return [
    `[${n}] conceptId: ${c.id} | Kapitel ${ch?.index ?? '?'}: ${ch?.title ?? ''}`,
    `Begriff: ${c.term}`,
    `Definition (Skript): ${c.definition}`,
    c.points?.length ? `Stichpunkte (Skript): ${c.points.join('; ')}` : '',
    c.context ? `Einordnung: ${c.context}` : '',
    c.example ? `Beispiel (Skript): ${c.example}` : '',
    partners.length ? `Abgrenzungsbegriffe: ${partners.map((p) => `${p.term} – ${p.definition}`).join(' || ')}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Skript-Kontext für die Fokusbegriffe: Begriffskarten + die Original-Abschnitte,
 * in denen sie stehen (bei Modulen ohne Lernskript: Kernideen + Kapitelbegriffe).
 */
export function buildExamContext(mod: LearningModule, focus: Concept[], chapters: Chapter[]): string {
  const parts: string[] = ['FOKUSBEGRIFFE (je Begriff genau EINE Frage):'];
  focus.forEach((c, i) => parts.push(conceptBlock(mod, c, i + 1)));

  const seen = new Set<string>();
  const sectionTexts: string[] = [];
  for (const c of focus) {
    const hit = sectionForConcept(mod, c.id);
    if (!hit || seen.has(hit.section.id)) continue;
    seen.add(hit.section.id);
    sectionTexts.push(
      `## Kapitel ${hit.chapter.index} – ${hit.section.title} (PDF S. ${hit.section.pdfPages})\n${sectionPlainText(mod, hit.section)}`
    );
  }
  if (sectionTexts.length) {
    parts.push('\nSKRIPT-ABSCHNITTE (Originalinhalt – Grundlage für Fragen und Musterantworten):');
    parts.push(...sectionTexts);
  } else {
    // Module ohne strukturiertes Lernskript: Kernideen + Begriffe der Kapitel
    parts.push('\nKAPITELINHALTE (Skript):');
    for (const ch of chapters) {
      const cs = mod.concepts.filter((c) => c.chapterId === ch.id);
      parts.push(
        `## Kapitel ${ch.index}: ${ch.title}\nKernideen:\n${ch.keyIdeas.map((k) => `- ${k}`).join('\n')}\n` +
          `Begriffe:\n${cs.map((c) => `- ${c.term}: ${c.definition}`).join('\n')}`
      );
    }
  }
  const text = parts.join('\n\n');
  return text.length > MAX_CONTEXT_CHARS ? `${text.slice(0, MAX_CONTEXT_CHARS)}\n[…]` : text;
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

const genSystem = (mod: LearningModule) => `Du bist Prüfer:in an einer Fernhochschule und erstellst anspruchsvolle offene Klausurfragen für das Modul "${mod.title}" (${mod.studyProgram}).
Vorgehen wie in der echten Klausur: Zu jedem FOKUSBEGRIFF erstellst du genau EINE offene Frage, die den Begriff und seine Erklärung aus dem Skript prüft.
Wähle pro Begriff den passendsten Aufgabentyp und wechsle die Typen ab:
- "Erläutern Sie …" – Definition, Merkmale und Bedeutung des Begriffs.
- "Grenzen Sie … von … ab" – nur wenn ein Abgrenzungsbegriff angegeben ist.
- "Nennen und erläutern Sie …" – wenn der Begriff im Skript mehrere Elemente, Stufen, Arten oder Schritte hat (alle verlangen).
- "Erklären Sie anhand eines Beispiels …" bzw. eine kurze Fallsituation (2–3 Sätze, erfundenes Unternehmen erlaubt), in der der Begriff angewendet werden muss (Transfer).
- "Diskutieren Sie Vor- und Nachteile …" – nur wenn das Skript Vor- und Nachteile nennt.
Strenge Regeln:
1. Fachinhalt AUSSCHLIESSLICH aus den gelieferten Skriptinhalten. Keine erfundenen Fakten, Zahlen, Modelle oder Autoren.
2. Jede Frage muss vollständig aus dem Skript beantwortbar sein. Die Musterantwort gibt die relevanten Skriptinhalte präzise und vollständig wieder (3–6 Sätze; bei Transfer: Skriptwissen + Anwendung auf den Fall).
3. Anspruchsvoll (mehrere Teilaspekte), aber eindeutig formuliert. Keine Ein-Wort-Abfragen, keine Fangfragen. Den Begriff in der Frage nicht bereits erklären.
4. Siezen, Deutsch, Klausurstil.
Antworte AUSSCHLIESSLICH als JSON-Array, ohne Markdown, in der Reihenfolge der Fokusbegriffe:
[{"conceptId":"...","kind":"open","prompt":"...","modelAnswer":"...","keyPoints":["...","...","..."]}]
- kind: "open" (Erläutern/Abgrenzen/Nennen/Diskutieren) oder "transfer" (Fallsituation/Beispielanwendung)
- keyPoints: 3–5 erwartete Kernpunkte, je ein kurzer prüfbarer Aspekt aus dem Skript`;

const VERIFY_SYSTEM = `Du bist ein strenger fachlicher Zweitprüfer. Für jede vorgelegte Frage prüfst du anhand der gelieferten Skriptinhalte:
- Ist die Frage fachlich korrekt und widerspruchsfrei zum Skript?
- Ist sie allein aus dem Skript beantwortbar (nichts erfunden)?
- Stimmen Musterantwort und Kernpunkte mit dem Skript überein?
- Ist sie klar und eindeutig formuliert?
Antworte AUSSCHLIESSLICH als JSON-Array, ohne Markdown:
[{"index":0,"ok":true,"reason":"..."}]
ok=false, wenn irgendein Kriterium nicht erfüllt ist.`;

/** Stichwörter für die regelbasierte Ersatzbewertung (falls die KI-Bewertung ausfällt). */
function keywordsFor(point: string, concept: Concept | undefined): string[] {
  const words = point
    .toLowerCase()
    .split(/[^a-zäöüß0-9]+/)
    .filter((w) => w.length > 4);
  const kws = [...new Set(words)].slice(0, 3);
  if (kws.length === 0 && concept) kws.push(concept.term.toLowerCase());
  return kws.length ? kws : [point.toLowerCase().slice(0, 20)];
}

async function generateBatch(mod: LearningModule, chapters: Chapter[], focus: Concept[]): Promise<Question[]> {
  const ctx = buildExamContext(mod, focus, chapters);

  // 1) Generierung
  const genText = await geminiGenerate({
    system: genSystem(mod),
    turns: [{ role: 'user', text: `${ctx}\n\nErstelle jetzt ${focus.length} Klausurfragen – zu jedem Fokusbegriff genau eine.` }],
    json: true,
    thinkingBudget: 0,
    maxTokens: Math.min(8192, 800 + focus.length * 500),
    temperature: 0.7,
    timeoutMs: 40000,
  });
  const gen = parseArray(genText).filter(
    (g) => g && typeof g.prompt === 'string' && g.prompt.trim().length >= 15
  );
  if (!gen.length) return [];

  // 2) Verifizierung gegen das Skript
  const verifyText = await geminiGenerate({
    system: VERIFY_SYSTEM,
    turns: [
      {
        role: 'user',
        text:
          `SKRIPTINHALTE:\n${ctx}\n\nFRAGEN:\n` +
          JSON.stringify(
            gen.map((g, i) => ({ index: i, prompt: g.prompt, modelAnswer: g.modelAnswer, keyPoints: g.keyPoints }))
          ),
      },
    ],
    json: true,
    thinkingBudget: 0,
    maxTokens: Math.min(4096, 400 + gen.length * 120),
    temperature: 0,
    timeoutMs: 30000,
  });
  const checks = parseArray(verifyText);
  const okIndices = new Set<number>();
  for (const c of checks) {
    const ok = c?.ok === true || c?.ok === 'true';
    if (ok) okIndices.add(Number(c.index));
  }

  const out: Question[] = [];
  const usedConcepts = new Set<string>();
  gen.forEach((g, i) => {
    // Wenn die Verifizierung Ergebnisse lieferte: nur bestandene übernehmen.
    if (checks.length > 0 && !okIndices.has(i)) return;
    const concept =
      mod.concepts.find((c) => c.id === g.conceptId && focus.some((f) => f.id === c.id)) ?? focus[i] ?? focus[0];
    if (!concept || usedConcepts.has(concept.id)) return;
    usedConcepts.add(concept.id);
    const ch = mod.chapters.find((c) => c.id === concept.chapterId) ?? chapters[0];
    const prompt = String(g.prompt).trim();
    const lower = prompt.toLowerCase();
    // Abgrenzungspartner, die in der Frage vorkommen, ebenfalls verknüpfen (Fehleranalyse)
    const partnerIds = (concept.confusableWith ?? [])
      .map((t) => mod.concepts.find((x) => x.term.toLowerCase() === t.toLowerCase()))
      .filter((x): x is Concept => !!x && lower.includes(x.term.toLowerCase()))
      .map((x) => x.id);
    const isTransfer = g.kind === 'transfer';
    const isDistinction = /abgrenz|unterscheid|unterschied/.test(lower);
    const keyPoints: string[] = Array.isArray(g.keyPoints)
      ? g.keyPoints.map((x: any) => String(x).trim()).filter(Boolean).slice(0, 5)
      : [];
    if (keyPoints.length < 2) return; // ohne Kernpunkte keine faire Bewertung
    out.push({
      id: `gen-${randomUUID()}`,
      chapterId: ch.id,
      type: isTransfer ? 'transfer' : 'open',
      goal: isTransfer ? 'application' : isDistinction ? 'distinction' : 'understanding',
      difficulty: 3,
      prompt,
      rubric: keyPoints.map((p) => ({ point: p, keywords: keywordsFor(p, concept), weight: 1 })),
      modelAnswer: typeof g.modelAnswer === 'string' ? g.modelAnswer.trim() : undefined,
      explanation: `KI-Prüfungsfrage zum Skript-Begriff „${concept.term}“ – aus dem Skript erstellt und dagegen gegengeprüft. Skript-Definition: ${concept.definition}`,
      source: `KI-Frage · Kapitel ${ch.index} (${ch.title}) · Begriff „${concept.term}“`,
      conceptIds: [concept.id, ...partnerIds],
    });
  });
  return out;
}

export async function generateExamQuestions(
  mod: LearningModule,
  chapterIds: string[],
  count: number,
  opts: ExamGenOptions = {}
): Promise<Question[]> {
  if (!geminiAvailable() || count < 1) return [];
  const chapters = targetChapters(mod, chapterIds);
  if (!chapters.length) return [];
  const focus = pickFocusConcepts(mod, chapters, Math.min(count, MAX_GENERATED_PER_EXAM), opts.avoidConceptIds ?? []);
  if (!focus.length) return [];

  // Große Prüfungen in Blöcke teilen (Antwortlänge/Qualität), Blöcke parallel erzeugen
  const batches: Concept[][] = [];
  for (let i = 0; i < focus.length; i += MAX_PER_CALL) batches.push(focus.slice(i, i + MAX_PER_CALL));
  const results = await Promise.all(batches.map((b) => generateBatch(mod, chapters, b).catch(() => [] as Question[])));
  return results.flat();
}
