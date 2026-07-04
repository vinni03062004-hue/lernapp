import { describe, expect, it } from 'vitest';
import { emptyMastery, interleave, selectQuestions, updateMastery } from '@/lib/scheduler';
import { defaultState } from '@/lib/store';
import { Question } from '@/lib/types';

const q = (id: string, chapterId: string, type: Question['type'] = 'single_choice'): Question => ({
  id, chapterId, type, goal: 'fact', difficulty: 1, prompt: '', explanation: '', source: '',
  options: ['a', 'b'], correctOptions: [0],
});

describe('Adaptive Engine (Spacing & Mastery)', () => {
  it('erhöht Intervall nach korrekter Antwort (Spacing)', () => {
    const now = Date.now();
    let m = emptyMastery(q('x', 'k1'), now);
    m = updateMastery(m, true, 1, 'high', now);
    const firstInterval = m.intervalH;
    m = updateMastery(m, true, 1, 'high', now);
    expect(m.intervalH).toBeGreaterThan(firstInterval);
    expect(m.dueAt).toBeGreaterThan(now);
  });

  it('setzt Intervall nach Fehler zurück und markiert offenen Fehler', () => {
    const now = Date.now();
    let m = emptyMastery(q('x', 'k1'), now);
    m = updateMastery(m, true, 1, 'high', now);
    m = updateMastery(m, false, 0, 'high', now);
    expect(m.openError).toBe(true);
    expect(m.streak).toBe(0);
    expect(m.intervalH).toBeLessThan(1);
  });

  it('rehabilitiert Fehler erst nach 2 korrekten Antworten in Folge', () => {
    const now = Date.now();
    let m = emptyMastery(q('x', 'k1'), now);
    m = updateMastery(m, false, 0, 'medium', now);
    m = updateMastery(m, true, 1, 'medium', now);
    expect(m.openError).toBe(true);
    expect(m.errorResolved).toBe(false);
    m = updateMastery(m, true, 1, 'medium', now);
    expect(m.openError).toBe(false);
    expect(m.errorResolved).toBe(true);
  });

  it('dämpft Mastery-Anstieg bei niedriger Sicherheit (Zufallstreffer)', () => {
    const now = Date.now();
    const confident = updateMastery(emptyMastery(q('a', 'k1'), now), true, 1, 'high', now);
    const unsure = updateMastery(emptyMastery(q('b', 'k1'), now), true, 1, 'low', now);
    expect(unsure.mastery).toBeLessThan(confident.mastery);
  });

  it('Interleaving verhindert lange Kapitel-Läufe', () => {
    const qs = [q('1', 'kA'), q('2', 'kA'), q('3', 'kA'), q('4', 'kB'), q('5', 'kA'), q('6', 'kB')];
    const result = interleave(qs, 2);
    for (let i = 2; i < result.length; i++) {
      const same = result[i].chapterId === result[i - 1].chapterId && result[i].chapterId === result[i - 2].chapterId;
      // Ein Lauf von 3 ist nur erlaubt, wenn kein anderes Kapitel mehr übrig war
      if (same) {
        const remaining = result.slice(i).some((x) => x.chapterId !== result[i].chapterId);
        expect(remaining).toBe(false);
      }
    }
  });

  it('Fehlerfokus wählt nur offene Fehler und instabile Fragen', () => {
    const state = defaultState();
    const qs = [q('e1', 'k1'), q('e2', 'k1'), q('n1', 'k1')];
    const now = Date.now();
    state.mastery['e1'] = { ...emptyMastery(qs[0], now), attempts: 2, openError: true };
    state.mastery['n1'] = { ...emptyMastery(qs[2], now), attempts: 3, mastery: 0.9 };
    const picked = selectQuestions(qs, state, { mode: 'error_focus', chapterIds: [], count: 5 }, now);
    expect(picked.map((x) => x.id)).toContain('e1');
    expect(picked.map((x) => x.id)).not.toContain('n1');
  });

  it('Prüfungsmodus mischt offene und geschlossene Formate gemäß openShare', () => {
    const state = defaultState();
    const qs: Question[] = [
      ...[1, 2, 3, 4, 5, 6].map((i) => q(`c${i}`, 'k1')),
      ...[1, 2, 3, 4].map((i) => ({ ...q(`o${i}`, 'k1'), type: 'open' as const, rubric: [{ point: 'x', keywords: ['x'] }] })),
    ];
    const picked = selectQuestions(qs, state, { mode: 'exam', chapterIds: [], count: 8, openShare: 0.5 }, Date.now());
    const openCount = picked.filter((x) => x.type === 'open').length;
    expect(openCount).toBeGreaterThanOrEqual(3);
    expect(picked.length).toBe(8);
  });

  it('Bild-Modi wählen ausschließlich Bildfragen', () => {
    const state = defaultState();
    const qs: Question[] = [q('t1', 'k1'), { ...q('i1', 'k1'), type: 'image_choice' as const, figureId: 'f' }];
    const picked = selectQuestions(qs, state, { mode: 'image_learn', chapterIds: [], count: 5, imageOnly: true }, Date.now());
    expect(picked.every((x) => x.type.startsWith('image_'))).toBe(true);
  });
});
