import { describe, expect, it } from 'vitest';
import { scoreAnswer } from '@/lib/scoring';
import { Question } from '@/lib/types';

const base = { chapterId: 'k1', goal: 'fact' as const, difficulty: 1 as const, explanation: '', source: '' };

describe('Bewertungsengine', () => {
  it('bewertet Single Choice exakt', () => {
    const q: Question = { ...base, id: 'sc', type: 'single_choice', prompt: '', options: ['A', 'B', 'C'], correctOptions: [1] };
    expect(scoreAnswer(q, '1').correct).toBe(true);
    expect(scoreAnswer(q, '0').correct).toBe(false);
    expect(scoreAnswer(q, '0').score).toBe(0);
  });

  it('bewertet Multiple Choice mit abgeschwächten Teilpunkten', () => {
    const q: Question = { ...base, id: 'mc', type: 'multiple_choice', prompt: '', options: ['A', 'B', 'C', 'D'], correctOptions: [0, 1] };
    expect(scoreAnswer(q, '0,1').correct).toBe(true);
    expect(scoreAnswer(q, '0,1').score).toBe(1);
    const partial = scoreAnswer(q, '0');
    expect(partial.correct).toBe(false);
    expect(partial.score).toBeGreaterThan(0);
    expect(partial.score).toBeLessThan(1);
  });

  it('bewertet Richtig/Falsch', () => {
    const q: Question = { ...base, id: 'tf', type: 'true_false', prompt: '', correctBool: false };
    expect(scoreAnswer(q, 'false').correct).toBe(true);
    expect(scoreAnswer(q, 'true').correct).toBe(false);
  });

  it('bewertet Lückentext tippfehlertolerant und mit Umlaut-Normalisierung', () => {
    const q: Question = { ...base, id: 'cl', type: 'cloze', prompt: '', clozeAnswers: [['Aktivierung'], ['Aufmerksamkeit']] };
    expect(scoreAnswer(q, JSON.stringify(['aktivierung', 'aufmerksamkeit'])).correct).toBe(true);
    // Ein Tippfehler wird toleriert
    expect(scoreAnswer(q, JSON.stringify(['Aktivirung', 'Aufmerksamkeit'])).correct).toBe(true);
    // Halb richtig = Teilpunkte
    const half = scoreAnswer(q, JSON.stringify(['Aktivierung', 'falsch']));
    expect(half.score).toBe(0.5);
    expect(half.correct).toBe(false);
  });

  it('bewertet Zuordnungen mit Teilpunkten', () => {
    const q: Question = {
      ...base, id: 'as', type: 'assignment', prompt: '',
      pairs: [{ left: 'A', right: 'a' }, { left: 'B', right: 'b' }, { left: 'C', right: 'c' }],
    };
    expect(scoreAnswer(q, JSON.stringify([0, 1, 2])).correct).toBe(true);
    expect(scoreAnswer(q, JSON.stringify([0, 2, 1])).score).toBeCloseTo(1 / 3);
  });

  it('bewertet Freitext rubrikbasiert mit Teilpunkten und fehlenden Kernpunkten', () => {
    const q: Question = {
      ...base, id: 'op', type: 'open', prompt: '',
      rubric: [
        { point: 'Nutzen', keywords: ['praktisch', 'nutzen'] },
        { point: 'Emotion', keywords: ['emotion', 'gefuehl'] },
      ],
    };
    const full = scoreAnswer(q, 'Utilitaristischer Konsum stellt den praktischen Nutzen in den Vordergrund, hedonistischer die Emotionen.');
    expect(full.correct).toBe(true);
    expect(full.score).toBe(1);
    const half = scoreAnswer(q, 'Es geht vor allem um den praktischen Nutzen eines Produktes für den Alltag.');
    expect(half.score).toBe(0.5);
    expect(half.rubricMisses).toContain('Emotion');
    const tooShort = scoreAnswer(q, 'Nutzen');
    expect(tooShort.score).toBe(0);
  });

  it('erkennt Synonyme über Wortstämme', () => {
    const q: Question = {
      ...base, id: 'op2', type: 'open', prompt: '',
      rubric: [{ point: 'Wiederholung', keywords: ['wiederhol'] }],
    };
    expect(scoreAnswer(q, 'Man sollte die Inhalte mehrfach wiederholen, am besten mit Abstand.').score).toBe(1);
    expect(scoreAnswer(q, 'Die Wiederholungen sollten zeitlich verteilt stattfinden.').score).toBe(1);
  });
});
