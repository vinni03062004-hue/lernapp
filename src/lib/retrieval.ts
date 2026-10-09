/**
 * Offline-Retrieval für Erklärmodus und Fach-Chatbot.
 *
 * Die Wissensbasis besteht aus dem strukturierten Wissensmodell des Moduls
 * (Konzepte, Kapitel-Kernaussagen, Lernskript-Abschnitte, Bildbeschreibungen).
 * Anfragen werden über ein TF-IDF-ähnliches Stichwort-Scoring gegen diese
 * Einheiten gematcht.
 *
 * Quellenprüflogik (Erweiterungs-Spezifikation, "doppelte Prüfung"):
 * 1. Prüfung: Treffer im PDF-Wissensmodell (Konzepte/Kapitel/Abschnitte).
 * 2. Prüfung: Konsistenz-Gegencheck – stützen mindestens zwei unabhängige
 *    Wissenseinheiten (z. B. Konzept + Abschnitt oder zweites Konzept) die
 *    Antwort? Wenn nicht → Unsicherheitsmarker im UI.
 * Antworten unterhalb der Ähnlichkeitsschwelle werden als unsicher markiert.
 */

import { LearningConfig } from '@/config/learning';
import { Concept, LearningModule, ScriptBlock, ScriptSection } from './types';
import { stems } from './normalize';

export interface KnowledgeUnit {
  id: string;
  kind: 'concept' | 'chapter' | 'figure' | 'section';
  title: string;
  text: string;
  chapterId: string;
  source: string; // menschenlesbarer Quellenverweis
  /** vorbereitete Stichwort-Stämme */
  terms: Set<string>;
}

export interface RetrievalHit {
  unit: KnowledgeUnit;
  score: number;
}

export interface ExplainAnswer {
  /** kurze Kernantwort */
  core: string;
  /** einfache Erklärung */
  simple: string;
  /** ausführliche/fachliche Erklärung */
  detailed?: string;
  example?: string;
  mnemonic?: string;
  sources: string[];
  uncertain: boolean;
  /** true, wenn Antwort nicht aus PDF-Wissen belegt werden konnte */
  noEvidence: boolean;
}

/** Abschnitte werden leicht abgewertet, damit bei Gleichstand die präzisere Begriffseinheit gewinnt. */
const SECTION_SCORE_FACTOR = 0.9;

/** Ein Skript-Block als Klartext. Prüfungstipps (didaktisch, kein Skriptinhalt) nur auf Wunsch. */
export function blockPlainText(
  b: ScriptBlock,
  conceptMap: Map<string, Concept>,
  opts: { includeExamTips?: boolean } = {}
): string {
  switch (b.kind) {
    case 'text':
      return b.text;
    case 'list':
      return [b.title ? `${b.title}:` : '', ...b.items.map((i) => `- ${i}`)].filter(Boolean).join('\n');
    case 'definitions':
      return b.conceptIds
        .map((id) => conceptMap.get(id))
        .filter((c): c is Concept => !!c)
        .map((c) => {
          const pts = c.points?.length ? ` (${c.points.join('; ')})` : '';
          const extra = [c.context, c.example ? `Beispiel: ${c.example}` : ''].filter(Boolean).join(' ');
          return `${c.term}: ${c.definition}${pts}${extra ? ` ${extra}` : ''}`;
        })
        .join('\n');
    case 'table':
      return [
        b.title ? `${b.title}:` : '',
        ...b.rows.map((r) => r.map((cell, j) => `${b.columns[j] ?? ''}: ${cell}`).join(' | ')),
      ]
        .filter(Boolean)
        .join('\n');
    case 'proscons':
      return [
        b.title ? `${b.title}:` : '',
        `Vorteile: ${b.pros.join('; ')}`,
        `Nachteile: ${b.cons.join('; ')}`,
      ]
        .filter(Boolean)
        .join('\n');
    case 'example':
      return `Beispiel${b.title ? ` (${b.title})` : ''}: ${b.text}`;
    case 'merke':
      return `Merke: ${b.text}`;
    case 'exam':
      return opts.includeExamTips ? `Prüfungshinweis: ${b.text}` : '';
    case 'figure':
      return '';
    default:
      return '';
  }
}

/** Ein Lernskript-Abschnitt als Klartext (für Retrieval, KI-Kontext, Podcast). */
export function sectionPlainText(
  mod: LearningModule,
  section: ScriptSection,
  opts: { includeExamTips?: boolean } = {}
): string {
  const conceptMap = new Map(mod.concepts.map((c) => [c.id, c]));
  const body = section.blocks.map((b) => blockPlainText(b, conceptMap, opts)).filter(Boolean).join('\n');
  return `${section.sub ? `${section.sub} ` : ''}${section.title}\n${body}`;
}

/** Abschnitt (falls vorhanden), in dem ein Begriff im Lernskript definiert wird. */
function sectionIndex(mod: LearningModule): Map<string, { section: ScriptSection; chapterIndex: number; chapterTitle: string }> {
  const m = new Map<string, { section: ScriptSection; chapterIndex: number; chapterTitle: string }>();
  for (const ch of mod.chapters) {
    for (const s of ch.sections ?? []) {
      for (const b of s.blocks) {
        if (b.kind !== 'definitions') continue;
        for (const id of b.conceptIds) if (!m.has(id)) m.set(id, { section: s, chapterIndex: ch.index, chapterTitle: ch.title });
      }
    }
  }
  return m;
}

export function buildKnowledgeBase(mod: LearningModule): KnowledgeUnit[] {
  const units: KnowledgeUnit[] = [];
  const secOf = sectionIndex(mod);
  for (const c of mod.concepts) {
    const text = [c.term, c.definition, ...(c.points ?? []), c.context ?? '', c.example ?? '', (c.synonyms ?? []).join(' ')]
      .filter(Boolean)
      .join('. ');
    const sec = secOf.get(c.id);
    units.push({
      id: `concept:${c.id}`,
      kind: 'concept',
      title: c.term,
      text,
      chapterId: c.chapterId,
      source: sec
        ? `Kapitel ${sec.chapterIndex} (${sec.chapterTitle}) – ${sec.section.title}, PDF S. ${sec.section.pdfPages}`
        : sourceForChapter(mod, c.chapterId),
      terms: new Set(stems(text)),
    });
  }
  for (const ch of mod.chapters) {
    const text = [ch.title, ...ch.keyIdeas].join('. ');
    units.push({
      id: `chapter:${ch.id}`,
      kind: 'chapter',
      title: `Kapitel ${ch.index}: ${ch.title}`,
      text,
      chapterId: ch.id,
      source: `Kapitel ${ch.index} (${ch.title}), PDF S. ${ch.pdfPages}`,
      terms: new Set(stems(text)),
    });
  }
  for (const ch of mod.chapters) {
    for (const s of ch.sections ?? []) {
      const text = sectionPlainText(mod, s);
      units.push({
        id: `section:${s.id}`,
        kind: 'section',
        title: s.title,
        text,
        chapterId: ch.id,
        source: `Kapitel ${ch.index} (${ch.title}) – ${s.title}, PDF S. ${s.pdfPages}`,
        terms: new Set(stems(text)),
      });
    }
  }
  for (const f of mod.figures) {
    const text = [f.title, f.caption, f.explanationSimple, f.explanationExpert, ...f.elements.map((e) => `${e.label}: ${e.meaning}`)].join('. ');
    units.push({
      id: `figure:${f.id}`,
      kind: 'figure',
      title: `Abbildung: ${f.title}`,
      text,
      chapterId: f.chapterId,
      source: `Abbildung „${f.title}“, PDF S. ${f.pdfPage}`,
      terms: new Set(stems(text)),
    });
  }
  return units;
}

/** Stichwort-Overlap-Scoring mit IDF-Gewichtung über die Wissensbasis. */
export function retrieve(query: string, units: KnowledgeUnit[], topK: number = LearningConfig.retrieval.topK): RetrievalHit[] {
  const qTerms = stems(query);
  if (qTerms.length === 0) return [];
  const uniq = [...new Set(qTerms)];
  // Dokumentfrequenz je Term
  const df: Record<string, number> = {};
  for (const t of uniq) {
    df[t] = units.filter((u) => u.terms.has(t)).length;
  }
  const n = units.length;
  const hits: RetrievalHit[] = [];
  for (const u of units) {
    let score = 0;
    let matched = 0;
    for (const t of uniq) {
      if (u.terms.has(t)) {
        matched++;
        const idf = Math.log(1 + n / (1 + (df[t] ?? 0)));
        score += idf;
      }
    }
    if (matched === 0) continue;
    // Titel-Treffer boosten (exakter Begriff gefragt)
    const titleStems = new Set(stems(u.title));
    const titleMatches = qTerms.filter((t) => titleStems.has(t)).length;
    score += titleMatches * 1.5;
    // normieren auf Query-Länge
    score = score / Math.sqrt(uniq.length);
    if (u.kind === 'section') score *= SECTION_SCORE_FACTOR;
    hits.push({ unit: u, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, topK);
}

/** Beispielbegriffe für den Hinweis bei fehlender Evidenz (aus dem aktiven Modul). */
function exampleTerms(mod: LearningModule): string[] {
  const out: string[] = [];
  for (const ch of mod.chapters) {
    const c = mod.concepts.find((x) => x.chapterId === ch.id && x.term.length <= 22 && !out.includes(x.term));
    if (c) out.push(c.term);
    if (out.length >= 3) break;
  }
  return out;
}

/**
 * Beantwortet eine Erklär-/Chatbot-Frage aus dem Wissensmodell.
 * Antwortformat gemäß Spezifikation: Kernantwort, einfache Erklärung,
 * optional Detail/Beispiel/Merksatz, Quellenbezug, Unsicherheitsmarker.
 */
export function answerFromKnowledge(mod: LearningModule, units: KnowledgeUnit[], query: string): ExplainAnswer {
  const hits = retrieve(query, units);
  if (hits.length === 0) {
    const ex = exampleTerms(mod);
    return {
      core: `Dazu habe ich im Modul ${mod.title} keine belastbare Textstelle gefunden.`,
      simple: `Formuliere die Frage anders oder nutze einen Fachbegriff aus dem Skript${
        ex.length ? ` (z. B. ${ex.map((t) => `„${t}“`).join(', ')})` : ''
      }.`,
      sources: [],
      uncertain: true,
      noEvidence: true,
    };
  }
  const best = hits[0];
  const maxScore = best.score;
  // Doppelte Quellenprüfung: stützt eine zweite, unabhängige Einheit die Antwort?
  const secondSupport = hits.length > 1 && hits[1].score >= maxScore * 0.4;
  const uncertain = maxScore < LearningConfig.retrieval.uncertainBelow * 3 || !secondSupport;
  const sources = dedupe(hits.map((h) => h.unit.source));

  if (best.unit.kind === 'concept') {
    const c = mod.concepts.find((x) => `concept:${x.id}` === best.unit.id)!;
    return {
      core: `${c.term}: ${c.definition}`,
      // Nur echten Zusatzkontext liefern – sonst würde die Definition doppelt erscheinen
      simple: c.context ?? '',
      detailed: c.examRelevance ? `Prüfungsrelevanz: ${c.examRelevance}` : undefined,
      example: c.example,
      mnemonic: c.mnemonic,
      sources,
      uncertain,
      noEvidence: false,
    };
  }
  if (best.unit.kind === 'figure') {
    const f = mod.figures.find((x) => `figure:${x.id}` === best.unit.id)!;
    return {
      core: `${f.title}: ${f.caption}`,
      simple: f.explanationSimple,
      detailed: f.explanationExpert,
      sources,
      uncertain,
      noEvidence: false,
    };
  }
  if (best.unit.kind === 'section') {
    const lines = best.unit.text.split('\n').slice(1).filter(Boolean);
    const simple = lines.slice(0, 3).join('\n');
    const rest = lines.slice(3).join('\n');
    return {
      core: best.unit.title,
      simple,
      detailed: rest ? (rest.length > 700 ? `${rest.slice(0, 700)} …` : rest) : undefined,
      sources,
      uncertain,
      noEvidence: false,
    };
  }
  const ch = mod.chapters.find((x) => `chapter:${x.id}` === best.unit.id)!;
  return {
    core: `Kapitel ${ch.index} – ${ch.title}`,
    simple: ch.keyIdeas.slice(0, 3).join(' '),
    detailed: ch.keyIdeas.join(' '),
    sources,
    uncertain,
    noEvidence: false,
  };
}

function sourceForChapter(mod: LearningModule, chapterId: string): string {
  const ch = mod.chapters.find((c) => c.id === chapterId);
  return ch ? `Kapitel ${ch.index} (${ch.title}), PDF S. ${ch.pdfPages}` : 'Modul-PDF';
}

function dedupe<T>(xs: T[]): T[] {
  return [...new Set(xs)];
}
