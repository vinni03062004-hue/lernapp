import { describe, expect, it } from 'vitest';
import { classifyAttempt } from '@/lib/errors';
import { answerFromKnowledge, buildKnowledgeBase, retrieve } from '@/lib/retrieval';
import { emptyMastery } from '@/lib/scheduler';
import { getModule } from '@/content';
import { Question } from '@/lib/types';

const mod = getModule();

const q = (over: Partial<Question> = {}): Question => ({
  id: 'x', chapterId: 'k1', type: 'single_choice', goal: 'fact', difficulty: 1,
  prompt: '', explanation: '', source: '', options: ['a'], correctOptions: [0], ...over,
});

describe('Fehlerklassifikation', () => {
  it('korrekt + unsicher → unsure_correct', () => {
    const r = classifyAttempt({ question: q(), concepts: [], correct: true, score: 1, confidence: 'low', responseMs: 5000, mastery: undefined });
    expect(r.category).toBe('unsure_correct');
  });

  it('korrekt + sicher → kein Fehler', () => {
    const r = classifyAttempt({ question: q(), concepts: [], correct: true, score: 1, confidence: 'high', responseMs: 5000, mastery: undefined });
    expect(r.category).toBeNull();
  });

  it('erkennt Verwechslung über confusableWith', () => {
    const question = q({ conceptIds: ['c-evoked-set'] });
    const r = classifyAttempt({
      question, concepts: mod.concepts, correct: false, score: 0, confidence: 'medium',
      responseMs: 9000, mastery: undefined, chosenOptionText: 'Das Consideration Set ist die Menge aller bekannten Alternativen',
    });
    expect(r.category).toBe('confusion');
    expect(r.confusedWith?.toLowerCase()).toContain('consideration');
  });

  it('schnelle sichere Falschantwort auf beherrschte Frage → Flüchtigkeitsfehler', () => {
    const m = { ...emptyMastery(q(), Date.now()), mastery: 0.9 };
    const r = classifyAttempt({ question: q(), concepts: [], correct: false, score: 0, confidence: 'high', responseMs: 2000, mastery: m });
    expect(r.category).toBe('careless');
  });

  it('Standard-Falschantwort → Wissenslücke', () => {
    const r = classifyAttempt({ question: q(), concepts: [], correct: false, score: 0, confidence: 'low', responseMs: 20000, mastery: undefined });
    expect(r.category).toBe('knowledge_gap');
  });
});

describe('Retrieval (Erklärmodus/Chatbot)', () => {
  const kb = buildKnowledgeBase(mod);

  it('findet das richtige Konzept für eine Begriffsfrage', () => {
    const hits = retrieve('Was ist das Evoked Set?', kb);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].unit.title.toLowerCase()).toContain('evoked');
  });

  it('beantwortet Fragen mit Quellenangabe', () => {
    const a = answerFromKnowledge(mod, kb, 'Erkläre die Lambda-Hypothese');
    expect(a.noEvidence).toBe(false);
    expect(a.core.toLowerCase()).toContain('lambda');
    expect(a.sources.length).toBeGreaterThan(0);
  });

  it('markiert themenfremde Fragen als ohne Evidenz', () => {
    const a = answerFromKnowledge(mod, kb, 'Quantenphysik Photonen Verschränkung');
    expect(a.noEvidence).toBe(true);
    expect(a.uncertain).toBe(true);
  });

  it('findet auch Bildwissen (Maslow-Pyramide)', () => {
    const hits = retrieve('Maslow Bedürfnispyramide Ebenen', kb);
    expect(hits.some((h) => h.unit.kind === 'figure' || h.unit.title.toLowerCase().includes('maslow'))).toBe(true);
  });
});

describe('Inhaltsvalidierung des Wissensmodells', () => {
  it('alle Fragen referenzieren existierende Kapitel', () => {
    const chapterIds = new Set(mod.chapters.map((c) => c.id));
    for (const question of mod.questions) expect(chapterIds.has(question.chapterId)).toBe(true);
  });

  it('alle Fragen-IDs sind eindeutig', () => {
    const ids = mod.questions.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Choice-Fragen haben gültige Lösungsindizes', () => {
    for (const question of mod.questions) {
      if (['single_choice', 'multiple_choice', 'image_choice'].includes(question.type)) {
        expect(question.options?.length ?? 0).toBeGreaterThan(1);
        expect(question.correctOptions?.length ?? 0).toBeGreaterThan(0);
        for (const idx of question.correctOptions ?? []) {
          expect(idx).toBeGreaterThanOrEqual(0);
          expect(idx).toBeLessThan(question.options!.length);
        }
      }
    }
  });

  it('offene Fragen haben Rubriken mit Stichworten', () => {
    for (const question of mod.questions) {
      if (['open', 'transfer', 'image_open'].includes(question.type)) {
        expect(question.rubric?.length ?? 0).toBeGreaterThanOrEqual(2);
        for (const r of question.rubric ?? []) expect(r.keywords.length).toBeGreaterThan(0);
      }
    }
  });

  it('Bildfragen referenzieren existierende Abbildungen', () => {
    const figIds = new Set(mod.figures.map((f) => f.id));
    for (const question of mod.questions) {
      if (question.type.startsWith('image_')) {
        expect(question.figureId).toBeDefined();
        expect(figIds.has(question.figureId!)).toBe(true);
      }
    }
  });

  it('alle Abbildungen haben die 4-fache Prüfkette bestanden und besitzen Erklärungen', () => {
    for (const f of mod.figures) {
      expect(f.validation.technical).toBe(true);
      expect(f.validation.semantic).toBe(true);
      expect(f.validation.didactic).toBe(true);
      expect(f.validation.validated).toBe(true);
      expect(f.explanationSimple.length).toBeGreaterThan(30);
      expect(f.explanationExpert.length).toBeGreaterThan(30);
      expect(f.elements.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('jedes Kapitel hat Fragen und jedes Kapitel mit Abbildungen hat Bildfragen-Abdeckung', () => {
    for (const c of mod.chapters) {
      const qs = mod.questions.filter((x) => x.chapterId === c.id);
      expect(qs.length).toBeGreaterThanOrEqual(5);
    }
    // Mindestens 60 % der Abbildungen haben eigene Fragen
    const withQuestions = mod.figures.filter((f) => mod.questions.some((x) => x.figureId === f.id));
    expect(withQuestions.length / mod.figures.length).toBeGreaterThan(0.6);
  });

  it('Fragen decken verschiedene kognitive Niveaus ab', () => {
    const goals = new Set(mod.questions.map((x) => x.goal));
    expect(goals.has('fact')).toBe(true);
    expect(goals.has('understanding')).toBe(true);
    expect(goals.has('application')).toBe(true);
    expect(goals.has('distinction')).toBe(true);
  });
});
