/**
 * Adaptive Engine: Spaced Repetition, Mastery-Updates und Frageauswahl
 * (Retrieval Practice + Spacing + Interleaving als Kernmechanik).
 *
 * Transparentes, SM-2-angelehntes Schema – alle Parameter in config/learning.ts.
 */

import { LearningConfig } from '@/config/learning';
import { Confidence, MasteryState, Question, StudyMode, UserState } from './types';

export function emptyMastery(q: Question, now: number): MasteryState {
  return {
    questionId: q.id,
    chapterId: q.chapterId,
    mastery: 0,
    streak: 0,
    attempts: 0,
    correctCount: 0,
    lastResult: null,
    lastScore: 0,
    lastAttemptAt: null,
    dueAt: now,
    intervalH: 0,
    openError: false,
    errorResolved: false,
  };
}

/**
 * Aktualisiert den Mastery-Zustand nach einer Antwort.
 * - korrekt: Streak +1, Intervall eine Stufe hoch (Spacing),
 *   bei niedriger Sicherheit nur gedämpfte Anhebung (Zufallstreffer abfedern).
 * - falsch: Streak 0, Intervall zurück auf Stufe 0, offener Fehler.
 * - Ein offener Fehler gilt erst als "rehabilitiert" (errorResolved),
 *   wenn die Frage 2× in Folge korrekt beantwortet wurde.
 */
export function updateMastery(
  state: MasteryState,
  correct: boolean,
  score: number,
  confidence: Confidence,
  now: number
): MasteryState {
  const cfg = LearningConfig.spacing;
  const s = { ...state };
  s.attempts += 1;
  s.lastResult = correct;
  s.lastScore = score;
  s.lastAttemptAt = now;

  if (correct) {
    s.correctCount += 1;
    s.streak += 1;
    let gain = score;
    if (confidence === 'low') gain *= cfg.lowConfidenceFactor;
    s.mastery = clamp01(s.mastery + cfg.masteryAlpha * (gain - s.mastery));
    // Spacing: nächste Intervallstufe
    const stage = Math.min(nextStage(s.intervalH), cfg.intervalsH.length - 1);
    s.intervalH = cfg.intervalsH[stage];
    s.dueAt = now + s.intervalH * 3600_000;
    if (s.openError && s.streak >= 2) {
      s.openError = false;
      s.errorResolved = true;
    }
  } else {
    s.streak = 0;
    s.mastery = clamp01(s.mastery + cfg.masteryAlpha * (score * 0.5 - s.mastery));
    s.intervalH = cfg.intervalsH[0];
    s.dueAt = now + s.intervalH * 3600_000;
    s.openError = true;
    s.errorResolved = false;
  }
  return s;
}

function nextStage(currentIntervalH: number): number {
  const idx = LearningConfig.spacing.intervalsH.findIndex((h) => h >= currentIntervalH - 1e-9);
  return idx < 0 ? 0 : idx + 1;
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

// ---------------------------------------------------------------------------
// Frageauswahl
// ---------------------------------------------------------------------------

export interface SelectionOptions {
  mode: StudyMode;
  chapterIds: string[];
  count: number;
  /** Prüfungsprofil: Anteil offener Aufgaben */
  openShare?: number;
  imageOnly?: boolean;
}

/**
 * Stellt eine Lernsession zusammen:
 * - fällige Wiederholungen (Spacing) zuerst,
 * - offene Fehlerfragen priorisiert,
 * - neue (unbearbeitete) Fragen,
 * - Interleaving: Kapitel- und Fragetyp-Durchmischung im Mischmodus.
 */
/** Rotation: zuletzt NICHT gesehene Fragen zuerst (Zufall bei Gleichstand),
 *  damit sich Fragen erst wiederholen, wenn der Katalog durch ist. */
function freshestOrder(qs: Question[], state: UserState): Question[] {
  return shuffle(qs).sort(
    (a, b) => (state.mastery[a.id]?.lastAttemptAt ?? 0) - (state.mastery[b.id]?.lastAttemptAt ?? 0)
  );
}

export function selectQuestions(
  all: Question[],
  state: UserState,
  opts: SelectionOptions,
  now: number = Date.now()
): Question[] {
  const cfg = LearningConfig.session;
  const inScope = all.filter((q) => {
    if (opts.chapterIds.length > 0 && !opts.chapterIds.includes(q.chapterId)) return false;
    const isImage = q.type.startsWith('image_');
    if (opts.imageOnly) {
      // Bild-Prüfmodus: ausschließlich Abbildungen frei erklären (image_open);
      // Bild-Lernmodus behält alle Bildfragetypen.
      if (opts.mode === 'image_exam') return q.type === 'image_open';
      return isImage;
    }
    // Bildfragen erscheinen auch in normalen Modi, aber nur vereinzelt
    return true;
  });

  if (opts.mode === 'exam' || opts.mode === 'image_exam') {
    return selectExam(inScope, state, opts, now);
  }

  if (opts.mode === 'mixed') {
    // Breite Rotation über den GESAMTEN Katalog (zuletzt nicht gesehene zuerst),
    // damit man viele verschiedene Fragen bekommt statt immer die "fälligen".
    return interleave(freshestOrder(inScope, state).slice(0, opts.count), cfg.maxSameChapterRun);
  }

  if (opts.mode === 'error_focus') {
    // Alle offenen Fehler + instabilen Fragen, aber rotierend (zuletzt nicht
    // gesehene zuerst), damit nicht immer dieselben in gleicher Reihenfolge kommen.
    const errorQs = inScope.filter((q) => state.mastery[q.id]?.openError);
    const unstable = inScope.filter(
      (q) => !state.mastery[q.id]?.openError && (state.mastery[q.id]?.attempts ?? 0) > 0 && (state.mastery[q.id]?.mastery ?? 0) < LearningConfig.masteryMinLevel
    );
    const pool = freshestOrder([...errorQs, ...unstable], state);
    return interleave(pool.slice(0, opts.count), cfg.maxSameChapterRun);
  }

  // Lern-/Misch-/Bild-Lernmodus
  const due = inScope.filter((q) => {
    const m = state.mastery[q.id];
    return m && m.attempts > 0 && m.dueAt <= now;
  });
  const errors = inScope.filter((q) => state.mastery[q.id]?.openError && !due.includes(q));
  const fresh = inScope.filter((q) => !state.mastery[q.id] || state.mastery[q.id].attempts === 0);
  const rest = inScope.filter((q) => !due.includes(q) && !errors.includes(q) && !fresh.includes(q));

  const nDue = Math.round(opts.count * cfg.dueShare);
  const nErr = Math.round(opts.count * cfg.errorShare);
  const nNew = opts.count - Math.min(nDue, due.length) - Math.min(nErr, errors.length);

  const picked: Question[] = [
    ...shuffle(due).slice(0, nDue),
    ...shuffle(errors).slice(0, nErr),
    ...shuffle(fresh).slice(0, Math.max(0, nNew)),
  ];
  // auffüllen
  for (const pool of [fresh, due, errors, rest]) {
    for (const q of shuffle(pool)) {
      if (picked.length >= opts.count) break;
      if (!picked.includes(q)) picked.push(q);
    }
  }
  // Endauswahl nochmals mischen: Auch innerhalb eines Kapitels erscheinen die
  // Fragen jede Session in neuer Reihenfolge (kein vorhersagbares Muster aus
  // "fällig → Fehler → neu"); Interleaving verhindert Kapitel-Blöcke im Mischmodus.
  return interleave(shuffle(picked.slice(0, opts.count)), cfg.maxSameChapterRun);
}

function selectExam(pool: Question[], state: UserState, opts: SelectionOptions, now: number): Question[] {
  const openShare = opts.openShare ?? LearningConfig.exam.defaultOpenShare;
  const isOpen = (q: Question) => ['open', 'transfer', 'image_open'].includes(q.type);
  // Rotation: zuerst zufällig mischen, dann nach "zuletzt gesehen" sortieren –
  // noch nie gestellte (lastAttemptAt 0) und am längsten zurückliegende Fragen
  // zuerst. So wiederholt sich eine Frage erst, wenn der Katalog durch ist.
  const freshest = (qs: Question[]) =>
    shuffle(qs).sort(
      (a, b) => (state.mastery[a.id]?.lastAttemptAt ?? 0) - (state.mastery[b.id]?.lastAttemptAt ?? 0)
    );
  const openQs = freshest(pool.filter(isOpen));
  const closedQs = freshest(pool.filter((q) => !isOpen(q)));
  const nOpen = Math.round(opts.count * openShare);
  const picked = [...openQs.slice(0, nOpen), ...closedQs.slice(0, opts.count - Math.min(nOpen, openQs.length))];
  // Schwierigkeitsmix: leichte zuerst, schwere später – aber durchmischt nach Kapitel
  for (const q of [...openQs, ...closedQs]) {
    if (picked.length >= opts.count) break;
    if (!picked.includes(q)) picked.push(q);
  }
  return interleave(shuffle(picked.slice(0, opts.count)), LearningConfig.session.maxSameChapterRun);
}

/** Interleaving: verhindert lange Läufe desselben Kapitels. */
export function interleave(qs: Question[], maxRun: number): Question[] {
  const result: Question[] = [];
  const remaining = [...qs];
  while (remaining.length > 0) {
    let idx = 0;
    if (result.length >= maxRun) {
      const lastChapters = result.slice(-maxRun).map((q) => q.chapterId);
      const allSame = lastChapters.every((c) => c === lastChapters[0]);
      if (allSame) {
        const alt = remaining.findIndex((q) => q.chapterId !== lastChapters[0]);
        if (alt >= 0) idx = alt;
      }
    }
    result.push(remaining.splice(idx, 1)[0]);
  }
  return result;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
