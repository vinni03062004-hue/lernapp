import { describe, expect, it } from 'vitest';
import { chapterStatus, computeProgress, computeReadiness } from '@/lib/progress';
import { emptyMastery, updateMastery } from '@/lib/scheduler';
import { defaultState } from '@/lib/store';
import { AnswerAttempt, Chapter, Question } from '@/lib/types';

const chapters: Chapter[] = [
  { id: 'k1', index: 1, title: 'Eins', subchapters: [], keyIdeas: [], pdfPages: '1' },
  { id: 'k2', index: 2, title: 'Zwei', subchapters: [], keyIdeas: [], pdfPages: '2' },
];
const q = (id: string, chapterId: string, difficulty: 1 | 2 | 3 = 2): Question => ({
  id, chapterId, type: 'single_choice', goal: 'fact', difficulty, prompt: '', explanation: '', source: '',
  options: ['a', 'b'], correctOptions: [0],
});
const questions = [q('q1', 'k1'), q('q2', 'k1'), q('q3', 'k2', 3), q('q4', 'k2', 1)];

function attempt(id: string, questionId: string, chapterId: string, score: number, extra: Partial<AnswerAttempt> = {}): AnswerAttempt {
  return {
    id, questionId, chapterId, questionType: 'single_choice', goal: 'fact', difficulty: 2,
    mode: 'learn', sessionId: 's1', answer: '', score, correct: score >= 0.65,
    confidence: 'medium', errorCategory: null, responseMs: 5000, timestamp: Date.now(), ...extra,
  };
}

describe('Lernfortschritt & Prüfungsbereitschaft', () => {
  it('sind 0 ohne Aktivität', () => {
    const state = defaultState();
    expect(computeProgress(questions, state).progress).toBe(0);
    expect(computeReadiness(questions, chapters, state).readiness).toBe(0);
  });

  it('Fortschritt steigt mit Abdeckung, ist aber ohne Wiederholung unvollständig', () => {
    const state = defaultState();
    const now = Date.now();
    for (const qq of questions) {
      state.mastery[qq.id] = updateMastery(emptyMastery(qq, now), true, 1, 'high', now);
      state.attempts.push(attempt(`a-${qq.id}`, qq.id, qq.chapterId, 1));
    }
    const p = computeProgress(questions, state);
    expect(p.components.coverage).toBe(100);
    // Volle Abdeckung liefert die 40 %-Komponente; Korrektheit/Stabilität
    // erfordern wiederholtes Können (Mastery >= Schwelle) und bleiben zunächst niedrig.
    expect(p.progress).toBeGreaterThanOrEqual(40);
    expect(p.progress).toBeLessThan(100); // keine Wiederholung, keine Streaks >= 2
  });

  it('Bereitschaft wird gedämpft, wenn MC deutlich besser als Freitext läuft', () => {
    const stateA = defaultState();
    const stateB = defaultState();
    const now = Date.now();
    // Beide: gute MC-Leistung, Kapitel abgedeckt
    for (let i = 0; i < 6; i++) {
      stateA.attempts.push(attempt(`m${i}`, `q${(i % 4) + 1}`, i % 2 ? 'k1' : 'k2', 1));
      stateB.attempts.push(attempt(`m${i}`, `q${(i % 4) + 1}`, i % 2 ? 'k1' : 'k2', 1));
    }
    // A: Freitext ebenfalls gut; B: Freitext schwach
    for (let i = 0; i < 4; i++) {
      stateA.attempts.push(attempt(`oA${i}`, 'q1', 'k1', 0.9, { questionType: 'open' }));
      stateB.attempts.push(attempt(`oB${i}`, 'q1', 'k1', 0.2, { questionType: 'open', correct: false }));
    }
    const rA = computeReadiness(questions, chapters, stateA);
    const rB = computeReadiness(questions, chapters, stateB);
    expect(rB.readiness).toBeLessThan(rA.readiness);
    expect(rB.components.mcOpenGapApplied).toBe(true);
  });

  it('Kapitel gilt NICHT nach einmaligem Richtig als abgeschlossen', () => {
    const state = defaultState();
    const now = Date.now();
    // nur eine von zwei Fragen einmal richtig
    state.mastery['q1'] = updateMastery(emptyMastery(questions[0], now), true, 1, 'high', now);
    const s = chapterStatus(chapters[0], questions, state);
    expect(s.completed).toBe(false);
  });

  it('Kapitel mit offenem Fehler ist nicht abgeschlossen', () => {
    const state = defaultState();
    const now = Date.now();
    for (const qq of questions.filter((x) => x.chapterId === 'k1')) {
      let m = emptyMastery(qq, now);
      for (let i = 0; i < 4; i++) m = updateMastery(m, true, 1, 'high', now);
      state.mastery[qq.id] = m;
    }
    // ein offener Fehler
    state.mastery['q1'] = updateMastery(state.mastery['q1'], false, 0, 'high', now);
    const s = chapterStatus(chapters[0], questions, state);
    expect(s.completed).toBe(false);
    expect(s.repeatErrors).toBe(1);
  });

  it('stabil beherrschtes Kapitel wird abgeschlossen', () => {
    const state = defaultState();
    const now = Date.now();
    for (const qq of questions.filter((x) => x.chapterId === 'k1')) {
      let m = emptyMastery(qq, now);
      for (let i = 0; i < 5; i++) m = updateMastery(m, true, 1, 'high', now);
      state.mastery[qq.id] = m;
    }
    const s = chapterStatus(chapters[0], questions, state);
    expect(s.completed).toBe(true);
  });
});
