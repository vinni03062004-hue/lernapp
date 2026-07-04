/**
 * Lernfortschritt & Prüfungsbereitschaft.
 *
 * Beide Werte sind bewusst getrennt und transparent berechnet.
 * Gewichte: config/learning.ts (progressWeights / readinessWeights).
 *
 * Lernfortschritt  = Wie viel des Stoffs wurde aktiv bearbeitet und mindestens
 *                    auf Mindestniveau beherrscht?
 * Prüfungsbereitschaft = ehrliche Schätzung der Prüfungsleistung. Enthält
 *   Trefferquote, Stabilität über Sitzungen und Zeit, Leistung bei schweren
 *   Fragen, Korrektur früherer Fehler und Kapitelabdeckung. Wird gedämpft,
 *   wenn MC deutlich besser läuft als Freitext (kein künstlich hoher Wert).
 */

import { LearningConfig } from '@/config/learning';
import { AnswerAttempt, Chapter, Question, UserState } from './types';

export interface ProgressBreakdown {
  progress: number; // 0..100
  components: {
    coverage: number;
    correctness: number;
    review: number;
    stability: number;
  };
}

export interface ReadinessBreakdown {
  readiness: number; // 0..100
  components: {
    recentAccuracy: number;
    stability: number;
    hardQuestions: number;
    errorRecovery: number;
    chapterCoverage: number;
    mcOpenGapApplied: boolean;
  };
  explanation: string[];
}

export function computeProgress(questions: Question[], state: UserState): ProgressBreakdown {
  const w = LearningConfig.progressWeights;
  const total = questions.length || 1;

  const attempted = questions.filter((q) => (state.mastery[q.id]?.attempts ?? 0) > 0);
  const coverage = attempted.length / total;

  const atLevel = attempted.filter((q) => (state.mastery[q.id]?.mastery ?? 0) >= LearningConfig.masteryMinLevel);
  const correctness = attempted.length > 0 ? atLevel.length / attempted.length : 0;

  const reviewed = attempted.filter((q) => (state.mastery[q.id]?.attempts ?? 0) >= 2);
  const review = attempted.length > 0 ? reviewed.length / attempted.length : 0;

  const core = questions.filter((q) => q.difficulty >= 2);
  const stableCore = core.filter((q) => (state.mastery[q.id]?.streak ?? 0) >= 2);
  const stability = core.length > 0 ? stableCore.length / core.length : 0;

  const progress = 100 * (w.coverage * coverage + w.correctness * correctness + w.review * review + w.stability * stability);
  return {
    progress: round1(progress),
    components: { coverage: round1(coverage * 100), correctness: round1(correctness * 100), review: round1(review * 100), stability: round1(stability * 100) },
  };
}

export function computeReadiness(questions: Question[], chapters: Chapter[], state: UserState): ReadinessBreakdown {
  const w = LearningConfig.readinessWeights;
  const attempts = state.attempts;
  const explanation: string[] = [];

  // 1) aktuelle Trefferquote (letzte 30 Versuche, score-gewichtet)
  const recent = attempts.slice(-30);
  const recentAccuracy = recent.length > 0 ? avg(recent.map((a) => a.score)) : 0;

  // 2) Stabilität: Leistung über mehrere Sitzungen + nach Zeitabstand.
  //    Wir werten Versuche, die >= 20h nach dem vorherigen Versuch derselben
  //    Frage lagen (echter Abruf nach Verzögerung).
  const delayed = delayedRetrievals(attempts);
  const sessionsWithActivity = new Set(attempts.map((a) => a.sessionId)).size;
  const sessionFactor = Math.min(1, sessionsWithActivity / 3); // ab 3 Sitzungen voll
  const stability = delayed.length > 0 ? avg(delayed.map((a) => a.score)) * sessionFactor : 0;

  // 3) schwere / transferorientierte Fragen
  const hard = attempts.filter((a) => a.difficulty >= 3 || a.goal === 'application');
  const hardQuestions = hard.length > 0 ? avg(hard.map((a) => a.score)) : 0;

  // 4) Korrekturquote früherer Fehler
  const everWrong = Object.values(state.mastery).filter((m) => m.openError || m.errorResolved);
  const resolved = everWrong.filter((m) => m.errorResolved);
  const errorRecovery = everWrong.length > 0 ? resolved.length / everWrong.length : attempts.length > 0 ? 1 : 0;

  // 5) Kapitelabdeckung
  const activeChapters = chapters.filter((c) =>
    questions.some((q) => q.chapterId === c.id && (state.mastery[q.id]?.attempts ?? 0) > 0)
  );
  const chapterCoverage = chapters.length > 0 ? activeChapters.length / chapters.length : 0;

  let readiness =
    100 *
    (w.recentAccuracy * recentAccuracy +
      w.stability * stability +
      w.hardQuestions * hardQuestions +
      w.errorRecovery * errorRecovery +
      w.chapterCoverage * chapterCoverage);

  // MC-vs-Freitext-Dämpfung
  const mcAtt = attempts.filter((a) => ['single_choice', 'multiple_choice', 'true_false', 'image_choice'].includes(a.questionType));
  const openAtt = attempts.filter((a) => ['open', 'transfer', 'image_open'].includes(a.questionType));
  let mcOpenGapApplied = false;
  if (mcAtt.length >= 5 && openAtt.length >= 3) {
    const gap = avg(mcAtt.map((a) => a.score)) - avg(openAtt.map((a) => a.score));
    if (gap > LearningConfig.mcVsOpenPenalty.gapThreshold) {
      readiness *= LearningConfig.mcVsOpenPenalty.factor;
      mcOpenGapApplied = true;
      explanation.push('Deine Multiple-Choice-Leistung ist deutlich besser als deine Freitext-Leistung – die Bereitschaft wurde daher vorsichtiger geschätzt. Übe mehr freie Antworten.');
    }
  }

  if (delayed.length === 0 && attempts.length > 0) {
    explanation.push('Noch keine Wiederholungen mit Zeitabstand – die Stabilität deines Wissens ist noch nicht belegt. Wiederhole Inhalte an einem späteren Tag.');
  }
  if (chapterCoverage < 1 && attempts.length > 0) {
    explanation.push(`Erst ${activeChapters.length} von ${chapters.length} Kapiteln bearbeitet.`);
  }

  return {
    readiness: round1(Math.max(0, Math.min(100, readiness))),
    components: {
      recentAccuracy: round1(recentAccuracy * 100),
      stability: round1(stability * 100),
      hardQuestions: round1(hardQuestions * 100),
      errorRecovery: round1(errorRecovery * 100),
      chapterCoverage: round1(chapterCoverage * 100),
      mcOpenGapApplied,
    },
    explanation,
  };
}

/** Versuche, die >= 20h nach dem letzten Versuch derselben Frage erfolgten. */
function delayedRetrievals(attempts: AnswerAttempt[]): AnswerAttempt[] {
  const lastSeen: Record<string, number> = {};
  const delayed: AnswerAttempt[] = [];
  const sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
  for (const a of sorted) {
    const prev = lastSeen[a.questionId];
    if (prev !== undefined && a.timestamp - prev >= 20 * 3600_000) delayed.push(a);
    lastSeen[a.questionId] = a.timestamp;
  }
  return delayed;
}

/** Kapitelstatus inkl. Abschlusskriterien (stabil, nicht nach einmal richtig). */
export interface ChapterStatus {
  chapterId: string;
  masteryPct: number;      // Beherrschungsgrad in %
  attemptedShare: number;  // bearbeiteter Anteil
  openGaps: number;        // unbearbeitete + instabile Fragen
  repeatErrors: number;    // Fragen mit offenem Fehler
  lastActivity: number | null;
  completed: boolean;
  completionHint: string;
}

export function chapterStatus(chapter: Chapter, questions: Question[], state: UserState): ChapterStatus {
  const qs = questions.filter((q) => q.chapterId === chapter.id);
  const cfg = LearningConfig.chapterCompletion;
  const total = qs.length || 1;
  const attempted = qs.filter((q) => (state.mastery[q.id]?.attempts ?? 0) > 0);
  const masteryAvg = avg(qs.map((q) => state.mastery[q.id]?.mastery ?? 0));
  const openErrors = qs.filter((q) => state.mastery[q.id]?.openError);
  const unstable = qs.filter((q) => (state.mastery[q.id]?.attempts ?? 0) > 0 && (state.mastery[q.id]?.mastery ?? 0) < LearningConfig.masteryMinLevel);
  const lastActivity = Math.max(0, ...qs.map((q) => state.mastery[q.id]?.lastAttemptAt ?? 0)) || null;

  const shareOk = attempted.length / total >= cfg.minQuestionShare;
  const accuracyOk = masteryAvg >= cfg.minAccuracy * 1.0 - 0.2; // Mastery ~ geglättete Trefferquote
  const attemptedAccuracy = attempted.length > 0 ? avg(attempted.map((q) => state.mastery[q.id]?.mastery ?? 0)) : 0;
  const accOk = attemptedAccuracy >= cfg.minAccuracy - 0.15;
  const errorsOk = !cfg.requireErrorsResolved || openErrors.length === 0;
  const completed = shareOk && accOk && errorsOk && accuracyOk;

  let hint = '';
  if (!shareOk) hint = `Bearbeite mindestens ${Math.round(cfg.minQuestionShare * 100)} % der Fragen (aktuell ${Math.round((attempted.length / total) * 100)} %).`;
  else if (!errorsOk) hint = `${openErrors.length} frühere Fehlerfrage(n) müssen erneut korrekt beantwortet werden.`;
  else if (!accOk || !accuracyOk) hint = 'Beherrschung noch unter der Abschlussschwelle – wiederhole instabile Fragen.';
  else hint = 'Kapitel stabil abgeschlossen.';

  return {
    chapterId: chapter.id,
    masteryPct: round1(masteryAvg * 100),
    attemptedShare: round1((attempted.length / total) * 100),
    openGaps: unstable.length + (total - attempted.length),
    repeatErrors: openErrors.length,
    lastActivity,
    completed,
    completionHint: hint,
  };
}

function avg(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}
function round1(x: number): number {
  return Math.round(x * 10) / 10;
}
