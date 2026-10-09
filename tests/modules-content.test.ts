import { describe, expect, it } from 'vitest';
import { getModuleById, MODULE_IDS } from '@/content';
import { answerFromKnowledge, buildKnowledgeBase, retrieve } from '@/lib/retrieval';
import { buildExamContext, pickFocusConcepts } from '@/lib/ai-exam';
import { scoreAnswer } from '@/lib/scoring';
import { cardOverrides, overviewIds } from '@/content/marketing1/lernkarten';
import { LearningModule, Question } from '@/lib/types';

const OPEN_TYPES = ['open', 'transfer', 'image_open'];

/** Allgemeine Integritätsprüfung – gilt für JEDES Modul. */
describe.each(MODULE_IDS)('Modul %s: Integrität', (id) => {
  const mod = getModuleById(id) as LearningModule;
  const chapterIds = new Set(mod.chapters.map((c) => c.id));
  const conceptIds = new Set(mod.concepts.map((c) => c.id));
  const figureIds = new Set(mod.figures.map((f) => f.id));

  it('IDs sind eindeutig (Fragen, Begriffe, Abbildungen)', () => {
    expect(new Set(mod.questions.map((q) => q.id)).size).toBe(mod.questions.length);
    expect(conceptIds.size).toBe(mod.concepts.length);
    expect(figureIds.size).toBe(mod.figures.length);
  });

  it('alle Verweise zeigen auf existierende Kapitel/Begriffe/Abbildungen', () => {
    const bad: string[] = [];
    for (const c of mod.concepts) if (!chapterIds.has(c.chapterId)) bad.push(`Begriff ${c.id} → ${c.chapterId}`);
    for (const f of mod.figures) if (!chapterIds.has(f.chapterId)) bad.push(`Abbildung ${f.id} → ${f.chapterId}`);
    for (const q of mod.questions) {
      if (!chapterIds.has(q.chapterId)) bad.push(`Frage ${q.id} → ${q.chapterId}`);
      for (const cid of q.conceptIds ?? []) if (!conceptIds.has(cid)) bad.push(`Frage ${q.id} → ${cid}`);
      if (q.figureId && !figureIds.has(q.figureId)) bad.push(`Frage ${q.id} → ${q.figureId}`);
      if (q.type.startsWith('image_') && !q.figureId) bad.push(`Bildfrage ${q.id} ohne Abbildung`);
    }
    expect(bad, bad.join(' | ')).toEqual([]);
  });

  it('Fragen sind wohlgeformt (Lösungen, Lücken, Zuordnungen, Rubriken)', () => {
    const bad: string[] = [];
    for (const q of mod.questions) {
      if (['single_choice', 'image_choice'].includes(q.type)) {
        if (!(q.options && q.options.length > 1 && q.correctOptions?.length === 1 && q.correctOptions[0] < q.options.length)) bad.push(`${q.id} SC`);
      }
      if (q.type === 'multiple_choice') {
        if (!(q.options && q.options.length > 1 && (q.correctOptions?.length ?? 0) >= 1 && q.correctOptions!.every((i) => i >= 0 && i < q.options!.length))) bad.push(`${q.id} MC`);
      }
      if (q.type === 'true_false' && typeof q.correctBool !== 'boolean') bad.push(`${q.id} TF`);
      if (q.type === 'cloze') {
        const gaps = (q.prompt.match(/_{3,}/g) ?? []).length;
        if (gaps === 0 || gaps !== (q.clozeAnswers ?? []).length) bad.push(`${q.id} Lücken ${gaps}/${q.clozeAnswers?.length}`);
      }
      if (['assignment', 'image_assignment'].includes(q.type) && (q.pairs ?? []).length < 2) bad.push(`${q.id} Zuordnung`);
      if (OPEN_TYPES.includes(q.type)) {
        if ((q.rubric?.length ?? 0) < 2) bad.push(`${q.id} Rubrik`);
        for (const r of q.rubric ?? []) if (!r.keywords.length) bad.push(`${q.id} Rubrik ohne Stichwort`);
      }
      if (!q.prompt?.trim()) bad.push(`${q.id} ohne Fragetext`);
    }
    expect(bad, bad.join(' | ')).toEqual([]);
  });

  it('Musterlösungen bestehen die eigene Bewertung (Choice/Lücke/Zuordnung)', () => {
    const bad: string[] = [];
    for (const q of mod.questions) {
      let answer: string | null = null;
      if (['single_choice', 'image_choice', 'multiple_choice'].includes(q.type)) answer = (q.correctOptions ?? []).join(',');
      if (q.type === 'true_false') answer = String(q.correctBool);
      if (q.type === 'cloze') answer = JSON.stringify((q.clozeAnswers ?? []).map((a) => a[0]));
      if (['assignment', 'image_assignment'].includes(q.type)) answer = JSON.stringify((q.pairs ?? []).map((_, i) => i));
      if (answer !== null && !scoreAnswer(q, answer).correct) bad.push(q.id);
    }
    expect(bad, bad.join(', ')).toEqual([]);
  });
});

/** Marketing 1: vollständiges Lernskript + Abdeckung aller Skriptbegriffe. */
describe('Marketing 1: Lernskript und Abdeckung', () => {
  const mod = getModuleById('marketing1') as LearningModule;
  const conceptIds = new Set(mod.concepts.map((c) => c.id));
  const figureIds = new Set(mod.figures.map((f) => f.id));
  const sections = mod.chapters.flatMap((c) => (c.sections ?? []).map((s) => ({ ch: c, s })));

  it('jedes Kapitel hat ein strukturiertes Lernskript mit korrekten Seitenangaben', () => {
    const pages: Record<string, string> = { m1: '1–6', m2: '6–10', m3: '11–16', m4: '16–20', m5: '20–24' };
    for (const ch of mod.chapters) {
      expect(ch.sections?.length ?? 0, ch.id).toBeGreaterThanOrEqual(8);
      expect(ch.pdfPages, ch.id).toBe(pages[ch.id]);
      expect(ch.keyIdeas.length, ch.id).toBeGreaterThanOrEqual(6);
    }
  });

  it('Abschnitte: eindeutige IDs, gültige Verweise, vollständige Tabellen', () => {
    expect(new Set(sections.map(({ s }) => s.id)).size).toBe(sections.length);
    const bad: string[] = [];
    for (const { s } of sections) {
      if (!s.blocks.length) bad.push(`${s.id} leer`);
      for (const b of s.blocks) {
        if (b.kind === 'definitions') for (const id of b.conceptIds) if (!conceptIds.has(id)) bad.push(`${s.id} → ${id}`);
        if (b.kind === 'figure' && !figureIds.has(b.figureId)) bad.push(`${s.id} → ${b.figureId}`);
        if (b.kind === 'table') for (const r of b.rows) if (r.length !== b.columns.length) bad.push(`${s.id} Tabellenzeile ${r.length}/${b.columns.length}`);
        if (b.kind === 'proscons' && (!b.pros.length || !b.cons.length)) bad.push(`${s.id} Vor-/Nachteile unvollständig`);
      }
    }
    expect(bad, bad.join(' | ')).toEqual([]);
  });

  it('jeder Begriff steht genau einmal im Lernskript, jede Abbildung ist eingebettet', () => {
    const count = new Map<string, number>();
    const figs = new Set<string>();
    for (const { s } of sections) {
      for (const b of s.blocks) {
        if (b.kind === 'definitions') for (const id of b.conceptIds) count.set(id, (count.get(id) ?? 0) + 1);
        if (b.kind === 'figure') figs.add(b.figureId);
      }
    }
    const missing = mod.concepts.filter((c) => !count.has(c.id)).map((c) => c.id);
    const twice = [...count.entries()].filter(([, n]) => n > 1).map(([id]) => id);
    expect(missing, `nicht im Skript: ${missing.join(', ')}`).toEqual([]);
    expect(twice, `mehrfach im Skript: ${twice.join(', ')}`).toEqual([]);
    expect(mod.figures.filter((f) => !figs.has(f.id)).map((f) => f.id)).toEqual([]);
  });

  it('Lernkarten: jede Karte ist kurz (max. 160 Zeichen + Stichpunkte), Overrides passen zu Begriffen', () => {
    expect(Object.keys(cardOverrides).filter((id) => !conceptIds.has(id))).toEqual([]);
    expect([...overviewIds].filter((id) => !conceptIds.has(id))).toEqual([]);
    const tooLong = mod.concepts.filter((c) => (c.short ?? c.definition).length > 160).map((c) => c.id);
    expect(tooLong, `zu lang: ${tooLong.join(', ')}`).toEqual([]);
    for (const c of mod.concepts) {
      for (const p of c.points ?? []) {
        expect(p.trim().length, c.id).toBeGreaterThan(1);
        expect(p.length, `${c.id}: ${p}`).toBeLessThanOrEqual(110);
      }
    }
  });

  it('nur Skriptinhalte: keine eigenen Merkhilfen, Prüfungshinweise oder „typischen Fehler“', () => {
    expect(mod.concepts.filter((c) => c.mnemonic || c.examRelevance).map((c) => c.id)).toEqual([]);
    expect(sections.filter(({ s }) => s.blocks.some((b) => b.kind === 'exam')).map(({ s }) => s.id)).toEqual([]);
    expect(mod.figures.filter((f) => f.misconceptions?.length).map((f) => f.id)).toEqual([]);
  });

  it('jeder Skriptbegriff wird mindestens einmal abgefragt', () => {
    const asked = new Set(mod.questions.flatMap((q) => q.conceptIds ?? []));
    const notAsked = mod.concepts.filter((c) => !asked.has(c.id)).map((c) => c.id);
    expect(notAsked, `nicht abgefragt: ${notAsked.join(', ')}`).toEqual([]);
  });

  it('jedes Kapitel hat genug Prüfungsfragen, davon viele offene (IU-Klausurstil)', () => {
    for (const ch of mod.chapters) {
      const qs = mod.questions.filter((q) => q.chapterId === ch.id && !q.type.startsWith('image_'));
      const open = qs.filter((q) => ['open', 'transfer'].includes(q.type));
      expect(qs.length, ch.id).toBeGreaterThanOrEqual(45);
      expect(open.length, ch.id).toBeGreaterThanOrEqual(15);
      for (const q of open) expect(q.modelAnswer?.length ?? 0, q.id).toBeGreaterThan(80);
    }
  });

  it('jede Abbildung hat mindestens zwei Bildfragen', () => {
    for (const f of mod.figures) {
      expect(mod.questions.filter((q) => q.figureId === f.id).length, f.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('Retrieval nutzt Begriffe und Skript-Abschnitte des Moduls', () => {
    const kb = buildKnowledgeBase(mod);
    expect(kb.filter((u) => u.kind === 'section').length).toBe(sections.length);
    const hits = retrieve('Was versteht man unter Preisabfolge, Skimming und Penetration?', kb);
    expect(hits[0].unit.title.toLowerCase()).toContain('preisabfolge');
    expect(hits[0].unit.source).toMatch(/PDF S\. 18/);
    const a = answerFromKnowledge(mod, kb, 'Unterschied Absatzhelfer Absatzmittler Eigentum');
    expect(a.noEvidence).toBe(false);
    expect(`${a.core} ${a.simple} ${a.detailed ?? ''}`.toLowerCase()).toContain('eigentum');
    const none = answerFromKnowledge(mod, kb, 'Quantenphysik Photonen Verschränkung');
    expect(none.noEvidence).toBe(true);
    expect(none.core).toContain('Marketing 1');
  });

  it('KI-Prüfung: Fokusbegriffe gleichmäßig aus den gewählten Kapiteln, Kontext enthält Skripttext', () => {
    const chapters = mod.chapters.filter((c) => ['m2', 'm4'].includes(c.id));
    const focus = pickFocusConcepts(mod, chapters, 6);
    expect(focus.length).toBe(6);
    expect(new Set(focus.map((c) => c.id)).size).toBe(6);
    expect(focus.every((c) => ['m2', 'm4'].includes(c.chapterId))).toBe(true);
    expect(focus.filter((c) => c.chapterId === 'm2').length).toBe(3);
    const ctx = buildExamContext(mod, focus, chapters);
    for (const c of focus) expect(ctx).toContain(c.id);
    expect(ctx).toContain('SKRIPT-ABSCHNITTE');
    expect(ctx.length).toBeLessThanOrEqual(30010);
    // kürzlich geprüfte Begriffe werden seltener gezogen
    const all = mod.concepts.filter((c) => c.chapterId === 'm4').map((c) => c.id);
    const avoid = all.slice(0, all.length - 5);
    let hitsAvoided = 0;
    for (let i = 0; i < 40; i++) {
      hitsAvoided += pickFocusConcepts(mod, [mod.chapters[3]], 3, avoid).filter((c) => avoid.includes(c.id)).length;
    }
    expect(hitsAvoided / (40 * 3)).toBeLessThan(0.9);
  });
});

describe('Bewertung: Zuordnung mit gleichen Zielwerten', () => {
  it('wertet Antworten mit identischem Zieltext als richtig', () => {
    const q: Question = {
      id: 'dup', chapterId: 'm5', type: 'assignment', goal: 'distinction', difficulty: 2,
      prompt: '', explanation: '', source: '',
      pairs: [
        { left: 'Rabatte an den Handel', right: 'Push-Strategie' },
        { left: 'SEO beim Endkunden', right: 'Pull-Strategie' },
        { left: 'Regalplatzierung durch den Handel', right: 'Push-Strategie' },
      ],
    };
    // Option „Push-Strategie“ ist im UI nur einmal sichtbar (Index 0) – beide Push-Zeilen wählen sie
    expect(scoreAnswer(q, JSON.stringify([0, 1, 0])).correct).toBe(true);
    expect(scoreAnswer(q, JSON.stringify([2, 1, 2])).correct).toBe(true);
    expect(scoreAnswer(q, JSON.stringify([1, 0, 0])).score).toBeCloseTo(1 / 3);
  });
});
