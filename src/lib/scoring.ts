/**
 * Bewertungsengine.
 *
 * - Choice-Fragen: exakt regelbasiert.
 * - Lückentext: normalisierter, tippfehlertoleranter Vergleich.
 * - Zuordnung: Teilpunkte pro korrektem Paar.
 * - Freitext (open/transfer): rubrikbasierte semantische Bewertung –
 *   erwartete Kernpunkte werden über Stichwortmengen (stamm-/synonymtolerant)
 *   erkannt, Teilpunkte werden vergeben, fehlende Kernpunkte zurückgemeldet.
 */

import { LearningConfig } from '@/config/learning';
import { Question } from './types';
import { containsKeyword, fuzzyEquals, stems } from './normalize';

export interface ScoreResult {
  /** 0..1 */
  score: number;
  correct: boolean;
  /** getroffene Rubrikpunkte (Freitext) */
  rubricHits: string[];
  /** fehlende Rubrikpunkte (Freitext) */
  rubricMisses: string[];
  /** Rückmeldetext-Baustein zur Qualität der Antwort */
  feedback: string;
}

/** Bewertet eine Antwort. `answer` ist die serialisierte Nutzerantwort. */
export function scoreAnswer(question: Question, answer: string): ScoreResult {
  switch (question.type) {
    case 'single_choice':
    case 'image_choice':
      return scoreSingleChoice(question, answer);
    case 'multiple_choice':
      return scoreMultipleChoice(question, answer);
    case 'true_false':
      return scoreTrueFalse(question, answer);
    case 'cloze':
      return scoreCloze(question, answer);
    case 'assignment':
    case 'image_assignment':
      return scoreAssignment(question, answer);
    case 'open':
    case 'transfer':
    case 'image_open':
      return scoreFreetext(question, answer);
    default:
      return { score: 0, correct: false, rubricHits: [], rubricMisses: [], feedback: 'Unbekannter Fragetyp.' };
  }
}

function scoreSingleChoice(q: Question, answer: string): ScoreResult {
  const chosen = parseInt(answer, 10);
  const correctIdx = q.correctOptions?.[0] ?? -1;
  const correct = chosen === correctIdx;
  return {
    score: correct ? 1 : 0,
    correct,
    rubricHits: [],
    rubricMisses: [],
    feedback: correct ? 'Richtig.' : `Nicht richtig – korrekt wäre: „${q.options?.[correctIdx] ?? ''}“.`,
  };
}

function scoreMultipleChoice(q: Question, answer: string): ScoreResult {
  const chosen = new Set(
    answer
      .split(',')
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n))
  );
  const correctSet = new Set(q.correctOptions ?? []);
  const total = q.options?.length ?? 0;
  // Teilpunkte: +1 für jede korrekt getroffene Entscheidung (gewählt & richtig,
  // nicht gewählt & falsch), normiert auf Optionsanzahl.
  let hits = 0;
  for (let i = 0; i < total; i++) {
    const shouldPick = correctSet.has(i);
    const picked = chosen.has(i);
    if (shouldPick === picked) hits++;
  }
  const score = total > 0 ? hits / total : 0;
  const exact = score === 1;
  return {
    score: exact ? 1 : Math.max(0, score * 0.6), // Teiltreffer zählen abgeschwächt
    correct: exact,
    rubricHits: [],
    rubricMisses: [],
    feedback: exact ? 'Alle Optionen korrekt bewertet.' : 'Nicht alle Optionen korrekt gewählt.',
  };
}

function scoreTrueFalse(q: Question, answer: string): ScoreResult {
  const val = answer === 'true';
  const correct = val === q.correctBool;
  return {
    score: correct ? 1 : 0,
    correct,
    rubricHits: [],
    rubricMisses: [],
    feedback: correct ? 'Richtig.' : `Die Aussage ist ${q.correctBool ? 'wahr' : 'falsch'}.`,
  };
}

function scoreCloze(q: Question, answer: string): ScoreResult {
  const inputs: string[] = safeParseArray(answer);
  const gaps = q.clozeAnswers ?? [];
  let hits = 0;
  const misses: string[] = [];
  gaps.forEach((accepted, i) => {
    const input = inputs[i] ?? '';
    if (accepted.some((a) => fuzzyEquals(input, a))) hits++;
    else misses.push(accepted[0]);
  });
  const score = gaps.length > 0 ? hits / gaps.length : 0;
  return {
    score,
    correct: score >= 0.999,
    rubricHits: [],
    rubricMisses: misses,
    feedback:
      score >= 0.999
        ? 'Alle Lücken korrekt.'
        : `${hits} von ${gaps.length} Lücken korrekt.${misses.length ? ` Erwartet u. a.: ${misses.join(', ')}.` : ''}`,
  };
}

function scoreAssignment(q: Question, answer: string): ScoreResult {
  // answer: JSON-Array der gewählten rechten Indizes je linker Position
  const chosen: number[] = safeParseArray(answer).map((v: any) => parseInt(String(v), 10));
  const pairs = q.pairs ?? [];
  let hits = 0;
  pairs.forEach((_, i) => {
    if (chosen[i] === i) hits++;
  });
  const score = pairs.length > 0 ? hits / pairs.length : 0;
  return {
    score,
    correct: score >= 0.999,
    rubricHits: [],
    rubricMisses: [],
    feedback: score >= 0.999 ? 'Alle Zuordnungen korrekt.' : `${hits} von ${pairs.length} Zuordnungen korrekt.`,
  };
}

/**
 * Rubrikbasierte Freitextbewertung mit Teilpunkten.
 * Unterscheidet: fachlich richtig / teilweise richtig / richtig aber
 * unvollständig / fachlich falsch – gemäß Spezifikation.
 */
export function scoreFreetext(q: Question, answer: string): ScoreResult {
  const text = answer ?? '';
  const rubric = q.rubric ?? [];
  if (text.trim().length < LearningConfig.freetext.minLength) {
    return {
      score: 0,
      correct: false,
      rubricHits: [],
      rubricMisses: rubric.map((r) => r.point),
      feedback: 'Die Antwort ist zu knapp, um sie inhaltlich zu bewerten. Versuche, die Kernpunkte in ganzen Sätzen zu nennen.',
    };
  }
  const hits: string[] = [];
  const misses: string[] = [];
  let gained = 0;
  let totalWeight = 0;
  for (const r of rubric) {
    const w = r.weight ?? 1;
    totalWeight += w;
    const hit = r.keywords.some((kw) => containsKeyword(text, kw));
    if (hit) {
      hits.push(r.point);
      gained += w;
    } else {
      misses.push(r.point);
    }
  }
  let score = totalWeight > 0 ? gained / totalWeight : 0;

  // Paraphrasen-Fallback: Wer die Musterantwort inhaltlich trifft, aber
  // andere Formulierungen als die Rubrik-Stichwörter nutzt, bekommt über
  // die Ähnlichkeit zur Musterantwort trotzdem Punkte (Wortstamm-Overlap).
  if (q.modelAnswer) {
    const modelStems = new Set(stems(q.modelAnswer));
    if (modelStems.size >= 4) {
      const answerStems = new Set(stems(text));
      let hitCount = 0;
      modelStems.forEach((s) => {
        if (answerStems.has(s)) hitCount++;
      });
      const overlap = hitCount / modelStems.size;
      const overlapScore = overlap * LearningConfig.freetext.modelAnswerWeight;
      if (overlapScore > score) score = overlapScore;
    }
  }

  const { correctThreshold, partialThreshold } = LearningConfig.freetext;
  const correct = score >= correctThreshold;
  let feedback: string;
  if (score >= 0.999) feedback = 'Sehr gut – alle erwarteten Kernpunkte enthalten.';
  else if (correct) feedback = 'Fachlich richtig, aber unvollständig – es fehlen noch Kernpunkte.';
  else if (score >= partialThreshold) feedback = 'Teilweise richtig – wichtige Kernpunkte fehlen.';
  else feedback = 'Die zentralen Kernpunkte wurden nicht getroffen.';
  return { score, correct, rubricHits: hits, rubricMisses: misses, feedback };
}

function safeParseArray(s: string): any[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
