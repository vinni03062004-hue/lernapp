/**
 * Zentraler Service: verarbeitet eine Antwort serverseitig.
 * Bewertet, klassifiziert Fehler, aktualisiert Mastery/Spacing,
 * Fehler-Muster und Bereitschafts-Historie – als eine Transaktion
 * auf dem persistierten Zustand.
 */

import { randomUUID } from 'crypto';
import { aiGradeFreetext } from './ai-grading';
import { classifyAttempt } from './errors';
import { getModule } from '@/content';
import { computeProgress, computeReadiness } from './progress';
import { emptyMastery, updateMastery } from './scheduler';
import { scoreAnswer } from './scoring';
import { loadState, saveState } from './store';
import { AnswerAttempt, Confidence, StudyMode, UserState } from './types';

export interface SubmitAttemptInput {
  questionId: string;
  answer: string;
  confidence: Confidence;
  responseMs: number;
  mode: StudyMode;
  sessionId: string;
}

export interface SubmitAttemptResult {
  attempt: AnswerAttempt;
  feedback: string;
  explanation: string;
  source: string;
  modelAnswer?: string;
  rubricMisses: string[];
  errorLabel: string | null;
  mastery: number;
  nextDueInH: number;
}

export async function submitAttempt(input: SubmitAttemptInput): Promise<SubmitAttemptResult> {
  const mod = getModule();
  const question = mod.questions.find((q) => q.id === input.questionId);
  if (!question) throw new Error(`Frage ${input.questionId} nicht gefunden`);

  const state = await loadState();
  const now = Date.now();

  // Bewertung: zuerst regelbasiert per Rubrik.
  let result = scoreAnswer(question, input.answer);
  // KI-Bewertung nur bei Bedarf: Wenn die Rubrik die offene Antwort schon klar
  // als richtig erkennt, sparen wir den API-Aufruf. Nur wenn sie als falsch/
  // teilweise gilt (Risiko: korrekte, aber anders formulierte Antwort wird zu
  // Unrecht abgewertet), prüft Gemini semantisch gegen.
  if (['open', 'transfer', 'image_open'].includes(question.type) && !result.correct) {
    const aiResult = await aiGradeFreetext(question, input.answer);
    if (aiResult) result = aiResult;
  }

  // gewählte Option (für Verwechslungserkennung)
  let chosenOptionText: string | undefined;
  if (['single_choice', 'image_choice'].includes(question.type) && question.options) {
    const idx = parseInt(input.answer, 10);
    if (!isNaN(idx)) chosenOptionText = question.options[idx];
  }

  const prevMastery = state.mastery[question.id];
  const classification = classifyAttempt({
    question,
    concepts: mod.concepts,
    correct: result.correct,
    score: result.score,
    confidence: input.confidence,
    responseMs: input.responseMs,
    mastery: prevMastery,
    chosenOptionText,
  });

  const attempt: AnswerAttempt = {
    id: randomUUID(),
    questionId: question.id,
    chapterId: question.chapterId,
    questionType: question.type,
    goal: question.goal,
    difficulty: question.difficulty,
    mode: input.mode,
    sessionId: input.sessionId,
    answer: input.answer,
    score: result.score,
    correct: result.correct,
    rubricHits: result.rubricHits,
    rubricMisses: result.rubricMisses,
    confidence: input.confidence,
    errorCategory: classification.category,
    confusedWith: classification.confusedWith,
    responseMs: input.responseMs,
    timestamp: now,
  };
  state.attempts.push(attempt);

  // Mastery + Spacing
  const m0 = prevMastery ?? emptyMastery(question, now);
  const m1 = updateMastery(m0, result.correct, result.score, input.confidence, now);
  state.mastery[question.id] = m1;

  // Fehler-Muster (Problembegriffe)
  if (classification.category && classification.category !== 'unsure_correct') {
    for (const cid of question.conceptIds ?? []) {
      const concept = mod.concepts.find((c) => c.id === cid);
      if (!concept) continue;
      const key = concept.term;
      const p = state.errorPatterns[key] ?? {
        conceptTerm: concept.term,
        chapterId: question.chapterId,
        count: 0,
        categories: {},
        lastAt: now,
        confusedWith: {},
      };
      p.count += 1;
      p.lastAt = now;
      p.categories[classification.category] = (p.categories[classification.category] ?? 0) + 1;
      if (classification.confusedWith) {
        p.confusedWith[classification.confusedWith] = (p.confusedWith[classification.confusedWith] ?? 0) + 1;
      }
      state.errorPatterns[key] = p;
    }
  }

  // Session-Verknüpfung
  const session = state.sessions.find((s) => s.id === input.sessionId);
  if (session) session.attemptIds.push(attempt.id);

  // Bereitschafts-Snapshot (max. 1 pro 5 Minuten, um die Historie klein zu halten)
  snapshotReadiness(state);

  await saveState(state);

  return {
    attempt,
    feedback: result.feedback,
    explanation: question.explanation,
    source: question.source,
    modelAnswer: question.modelAnswer,
    rubricMisses: result.rubricMisses,
    errorLabel: classification.category,
    mastery: m1.mastery,
    nextDueInH: m1.intervalH,
  };
}

function snapshotReadiness(state: UserState): void {
  const mod = getModule();
  const last = state.readinessHistory[state.readinessHistory.length - 1];
  const now = Date.now();
  if (last && now - last.timestamp < 5 * 60_000) {
    state.readinessHistory.pop();
  }
  const readiness = computeReadiness(mod.questions, mod.chapters, state);
  const progress = computeProgress(mod.questions, state);
  state.readinessHistory.push({
    timestamp: now,
    readiness: readiness.readiness,
    progress: progress.progress,
    components: readiness.components as unknown as Record<string, number>,
  });
  if (state.readinessHistory.length > 500) state.readinessHistory.shift();
}
