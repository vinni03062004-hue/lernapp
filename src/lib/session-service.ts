/**
 * Session-Service: erstellt und beendet Lernsessions serverseitig.
 * Fragen werden für den Client "sanitisiert" (keine Lösungen im Payload
 * während der Beantwortung – Bewertung erfolgt serverseitig).
 */

import { randomUUID } from 'crypto';
import { LearningConfig } from '@/config/learning';
import { getModule } from '@/content';
import { selectQuestions, shuffle } from './scheduler';
import { generateExamQuestions } from './ai-exam';
import { loadState, saveState } from './store';
import { ExamResult, Question, StudyMode, StudySession } from './types';

export interface ClientQuestion {
  id: string;
  chapterId: string;
  chapterTitle: string;
  type: Question['type'];
  goal: Question['goal'];
  difficulty: Question['difficulty'];
  prompt: string;
  options?: { origIndex: number; text: string }[];
  /** Anzahl Lücken bei cloze */
  clozeCount?: number;
  /** Zuordnung: linke Begriffe + gemischte rechte Optionen (origIndex für die Antwort) */
  assignmentLeft?: string[];
  assignmentRight?: { origIndex: number; text: string }[];
  figure?: { file: string; title: string; caption: string; chapterTitle: string; pdfPage: number };
  isOpen: boolean;
}

export function sanitizeQuestion(q: Question): ClientQuestion {
  const mod = getModule();
  const chapter = mod.chapters.find((c) => c.id === q.chapterId);
  const fig = q.figureId ? mod.figures.find((f) => f.id === q.figureId) : undefined;
  const cq: ClientQuestion = {
    id: q.id,
    chapterId: q.chapterId,
    chapterTitle: chapter ? `Kapitel ${chapter.index}: ${chapter.title}` : '',
    type: q.type,
    goal: q.goal,
    difficulty: q.difficulty,
    prompt: q.prompt,
    isOpen: ['open', 'transfer', 'image_open'].includes(q.type),
  };
  // Auswahloptionen gemischt anzeigen (gegen Positions-Auswendiglernen);
  // jede Option behält ihren Original-Index -> Bewertung bleibt korrekt.
  if (q.options) cq.options = shuffle(q.options.map((text, i) => ({ origIndex: i, text })));
  if (q.clozeAnswers) cq.clozeCount = q.clozeAnswers.length;
  if (q.pairs) {
    cq.assignmentLeft = q.pairs.map((p) => p.left);
    cq.assignmentRight = shuffle(q.pairs.map((p, i) => ({ origIndex: i, text: p.right })));
  }
  if (fig) {
    cq.figure = {
      file: fig.file,
      title: fig.title,
      caption: fig.caption,
      chapterTitle: chapter ? `Kapitel ${chapter.index}: ${chapter.title}` : '',
      pdfPage: fig.pdfPage,
    };
  }
  return cq;
}

export interface CreateSessionInput {
  mode: StudyMode;
  chapterIds: string[];
  count?: number;
  openShare?: number;
}

export async function createSession(input: CreateSessionInput): Promise<{ session: StudySession; questions: ClientQuestion[] }> {
  const mod = getModule();
  const state = await loadState();
  const count = input.count ?? (input.mode === 'exam' ? state.settings.examQuestionCount : LearningConfig.session.defaultLength);
  const imageOnly = input.mode === 'image_learn' || input.mode === 'image_exam';

  const openShare = input.openShare ?? state.settings.examOpenShare;
  let generated: import('./types').Question[] = [];
  let questions;

  if (input.mode === 'exam') {
    // Prüfmodus: frische, gegen das Skript geprüfte KI-Transferfragen für den
    // Freitext-Anteil; der Rest kommt geschlossen (MC etc.) aus dem rotierenden
    // Katalog. Fällt die KI aus, normale Katalog-Auswahl.
    const nGen = Math.max(1, Math.round(count * openShare));
    generated = await generateExamQuestions(mod, input.chapterIds, nGen);
    if (generated.length > 0) {
      const nClosed = Math.max(0, count - generated.length);
      const closed = selectQuestions(mod.questions, state, {
        mode: 'exam', chapterIds: input.chapterIds, count: nClosed, openShare: 0, imageOnly: false,
      });
      questions = shuffle([...generated, ...closed]);
    } else {
      questions = selectQuestions(mod.questions, state, {
        mode: input.mode, chapterIds: input.chapterIds, count, openShare, imageOnly,
      });
    }
  } else {
    questions = selectQuestions(mod.questions, state, {
      mode: input.mode, chapterIds: input.chapterIds, count, openShare, imageOnly,
    });
  }

  const session: StudySession = {
    id: randomUUID(),
    mode: input.mode,
    chapterIds: input.chapterIds,
    startedAt: Date.now(),
    questionIds: questions.map((q) => q.id),
    attemptIds: [],
    generatedQuestions: generated.length ? generated : undefined,
  };
  state.sessions.push(session);
  if (state.sessions.length > 200) state.sessions.shift();
  await saveState(state);

  return { session, questions: questions.map(sanitizeQuestion) };
}

/** Beendet eine Session; im Prüfungsmodus wird das Gesamtergebnis berechnet. */
export async function finishSession(sessionId: string): Promise<{ session: StudySession; examResult?: ExamResult }> {
  const mod = getModule();
  const state = await loadState();
  const session = state.sessions.find((s) => s.id === sessionId);
  if (!session) throw new Error('Session nicht gefunden');
  session.finishedAt = Date.now();

  let examResult: ExamResult | undefined;
  if (session.mode === 'exam' || session.mode === 'image_exam') {
    const attempts = state.attempts.filter((a) => a.sessionId === sessionId);
    const perQuestion = session.questionIds.map((qid) => {
      const att = attempts.filter((a) => a.questionId === qid).pop();
      const q = mod.questions.find((x) => x.id === qid);
      // "nur auswendig": Faktenfrage korrekt, aber zugehörige Verständnis-/
      // Transferfragen desselben Konzepts historisch < Schwelle
      let memorizedOnly = false;
      if (att?.correct && q && q.goal === 'fact' && q.conceptIds?.length) {
        const related = state.attempts.filter(
          (a) =>
            a.questionId !== qid &&
            ['understanding', 'application'].includes(a.goal) &&
            mod.questions.find((x) => x.id === a.questionId)?.conceptIds?.some((c) => q.conceptIds!.includes(c))
        );
        if (related.length > 0) {
          const avgScore = related.reduce((s, a) => s + a.score, 0) / related.length;
          memorizedOnly = avgScore < LearningConfig.exam.memorizedOnlyThreshold;
        }
      }
      return {
        questionId: qid,
        score: att?.score ?? 0,
        memorizedOnly,
        correct: att?.correct ?? false,
        rubricMisses: att?.rubricMisses ?? [],
        answer: att?.answer ?? '',
        questionType: q?.type,
      };
    });
    const totalScore = perQuestion.length > 0 ? perQuestion.reduce((s, p) => s + p.score, 0) / perQuestion.length : 0;
    const byDifficulty: Record<string, number> = {};
    for (const d of [1, 2, 3]) {
      const atts = attempts.filter((a) => a.difficulty === d);
      if (atts.length > 0) byDifficulty[`Stufe ${d}`] = Math.round((atts.reduce((s, a) => s + a.score, 0) / atts.length) * 100);
    }
    const recommendations: string[] = [];
    const wrongChapters = new Set(attempts.filter((a) => !a.correct).map((a) => a.chapterId));
    for (const chId of wrongChapters) {
      const ch = mod.chapters.find((c) => c.id === chId);
      if (ch) recommendations.push(`Kapitel ${ch.index} (${ch.title}) gezielt wiederholen.`);
    }
    const memorized = perQuestion.filter((p) => p.memorizedOnly).length;
    if (memorized > 0) recommendations.push(`${memorized} Frage(n) wurden vermutlich nur auswendig beantwortet – übe die zugehörigen Verständnis- und Transferfragen.`);
    const openAtts = attempts.filter((a) => ['open', 'transfer', 'image_open'].includes(a.questionType));
    if (openAtts.length > 0) {
      const openAvg = openAtts.reduce((s, a) => s + a.score, 0) / openAtts.length;
      if (openAvg < 0.6) recommendations.push('Freitextantworten sind noch unsicher – formuliere Kernpunkte aktiv in eigenen Worten.');
    }
    if (recommendations.length === 0) recommendations.push('Starke Leistung – wiederhole den Stoff in ein paar Tagen erneut, um die Stabilität zu sichern.');
    examResult = { totalScore, perQuestion, byDifficulty, recommendations };
    session.examResult = examResult;
  }

  await saveState(state);
  return { session, examResult };
}

/** Lösung/Erklärung einer Frage (für Feedback nach Beantwortung bzw. Prüfungs-Review). */
export function questionSolution(questionId: string) {
  const mod = getModule();
  const q = mod.questions.find((x) => x.id === questionId);
  if (!q) throw new Error('Frage nicht gefunden');
  return {
    id: q.id,
    explanation: q.explanation,
    source: q.source,
    modelAnswer: q.modelAnswer,
    correctOptions: q.correctOptions,
    correctBool: q.correctBool,
    clozeAnswers: q.clozeAnswers,
    pairs: q.pairs,
  };
}
