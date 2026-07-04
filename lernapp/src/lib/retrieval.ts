/**
 * Offline-Retrieval für Erklärmodus und Fach-Chatbot.
 *
 * Die Wissensbasis besteht aus dem strukturierten Wissensmodell des Moduls
 * (Konzepte, Kapitel-Kernaussagen, Bildbeschreibungen). Anfragen werden über
 * ein TF-IDF-ähnliches Stichwort-Scoring gegen diese Einheiten gematcht.
 *
 * Quellenprüflogik (Erweiterungs-Spezifikation, "doppelte Prüfung"):
 * 1. Prüfung: Treffer im PDF-Wissensmodell (Konzepte/Kapitel).
 * 2. Prüfung: Konsistenz-Gegencheck – stützen mindestens zwei unabhängige
 *    Wissenseinheiten (z. B. Konzept + Kapitel-Kernaussage oder zweites
 *    Konzept) die Antwort? Wenn nicht → Unsicherheitsmarker im UI.
 * Antworten unterhalb der Ähnlichkeitsschwelle werden als unsicher markiert.
 */

import { LearningConfig } from '@/config/learning';
import { LearningModule } from './types';
import { stems } from './normalize';

export interface KnowledgeUnit {
  id: string;
  kind: 'concept' | 'chapter' | 'figure';
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

export function buildKnowledgeBase(mod: LearningModule): KnowledgeUnit[] {
  const units: KnowledgeUnit[] = [];
  for (const c of mod.concepts) {
    const text = [c.term, c.definition, c.context ?? '', c.example ?? '', (c.synonyms ?? []).join(' ')].join('. ');
    units.push({
      id: `concept:${c.id}`,
      kind: 'concept',
      title: c.term,
      text,
      chapterId: c.chapterId,
      source: sourceForChapter(mod, c.chapterId),
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
  // Dokumentfrequenz je Term
  const df: Record<string, number> = {};
  for (const t of new Set(qTerms)) {
    df[t] = units.filter((u) => u.terms.has(t)).length;
  }
  const n = units.length;
  const hits: RetrievalHit[] = [];
  for (const u of units) {
    let score = 0;
    let matched = 0;
    for (const t of new Set(qTerms)) {
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
    score = score / Math.sqrt(new Set(qTerms).size);
    hits.push({ unit: u, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, topK);
}

/**
 * Beantwortet eine Erklär-/Chatbot-Frage aus dem Wissensmodell.
 * Antwortformat gemäß Spezifikation: Kernantwort, einfache Erklärung,
 * optional Detail/Beispiel/Merksatz, Quellenbezug, Unsicherheitsmarker.
 */
export function answerFromKnowledge(mod: LearningModule, units: KnowledgeUnit[], query: string): ExplainAnswer {
  const hits = retrieve(query, units);
  if (hits.length === 0) {
    return {
      core: 'Dazu habe ich im Modul Konsumentenverhalten keine belastbare Textstelle gefunden.',
      simple: 'Formuliere die Frage anders oder nutze einen Fachbegriff aus dem Skript (z. B. „Aktivierung“, „Involvement“, „Evoked Set“).',
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

  if (best.unit.kind === 'concept') {
    const c = mod.concepts.find((x) => `concept:${x.id}` === best.unit.id)!;
    return {
      core: `${c.term}: ${c.definition}`,
      simple: c.context ? c.context : c.definition,
      detailed: c.examRelevance ? `Prüfungsrelevanz: ${c.examRelevance}` : undefined,
      example: c.example,
      mnemonic: c.mnemonic,
      sources: dedupe(hits.map((h) => h.unit.source)),
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
      sources: dedupe(hits.map((h) => h.unit.source)),
      uncertain,
      noEvidence: false,
    };
  }
  const ch = mod.chapters.find((x) => `chapter:${x.id}` === best.unit.id)!;
  return {
    core: `Kapitel ${ch.index} – ${ch.title}`,
    simple: ch.keyIdeas.slice(0, 3).join(' '),
    detailed: ch.keyIdeas.join(' '),
    sources: dedupe(hits.map((h) => h.unit.source)),
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
