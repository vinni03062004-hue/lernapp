import { NextResponse } from 'next/server';
import { LearningConfig } from '@/config/learning';
import { getModule } from '@/content';
import { loadState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/**
 * Debug-/Admin-Bereich: Inhaltsvalidierung, Bildprüfkette,
 * gemeldete Fragen, Konfiguration.
 */
export async function GET() {
  try {
    const mod = getModule();
    const state = await loadState();

    // Inhaltsvalidierung (Konsistenz-Checks über das Wissensmodell)
    const issues: string[] = [];
    const chapterIds = new Set(mod.chapters.map((c) => c.id));
    const conceptIds = new Set(mod.concepts.map((c) => c.id));
    const figureIds = new Set(mod.figures.map((f) => f.id));
    const qIds = new Set<string>();
    for (const q of mod.questions) {
      if (qIds.has(q.id)) issues.push(`Doppelte Fragen-ID: ${q.id}`);
      qIds.add(q.id);
      if (!chapterIds.has(q.chapterId)) issues.push(`Frage ${q.id}: unbekanntes Kapitel ${q.chapterId}`);
      for (const cid of q.conceptIds ?? []) {
        if (!conceptIds.has(cid)) issues.push(`Frage ${q.id}: unbekanntes Konzept ${cid}`);
      }
      if (q.figureId && !figureIds.has(q.figureId)) issues.push(`Frage ${q.id}: unbekannte Abbildung ${q.figureId}`);
      if (['single_choice', 'multiple_choice', 'image_choice'].includes(q.type)) {
        if (!q.options || !q.correctOptions?.length) issues.push(`Frage ${q.id}: Optionen/Lösung fehlen`);
        else if (q.correctOptions.some((i) => i < 0 || i >= q.options!.length)) issues.push(`Frage ${q.id}: Lösungsindex außerhalb der Optionen`);
      }
      if (q.type === 'cloze' && !q.clozeAnswers?.length) issues.push(`Frage ${q.id}: clozeAnswers fehlen`);
      if (['assignment', 'image_assignment'].includes(q.type) && !q.pairs?.length) issues.push(`Frage ${q.id}: pairs fehlen`);
      if (['open', 'transfer', 'image_open'].includes(q.type) && !q.rubric?.length) issues.push(`Frage ${q.id}: Rubrik fehlt`);
    }
    const figuresUncertain = mod.figures.filter(
      (f) => f.validation.uncertain || !f.validation.technical || !f.validation.semantic || !f.validation.didactic || !f.validation.validated
    );
    const figuresWithoutQuestions = mod.figures.filter((f) => !mod.questions.some((q) => q.figureId === f.id));

    return NextResponse.json({
      content: {
        chapters: mod.chapters.length,
        concepts: mod.concepts.length,
        questions: mod.questions.length,
        figures: mod.figures.length,
        imageQuestions: mod.questions.filter((q) => q.type.startsWith('image_')).length,
        validationIssues: issues,
        figuresUncertain: figuresUncertain.map((f) => ({ id: f.id, title: f.title, note: f.validation.note })),
        figuresWithoutQuestions: figuresWithoutQuestions.map((f) => ({ id: f.id, title: f.title })),
      },
      state: {
        attempts: state.attempts.length,
        sessions: state.sessions.length,
        masteryEntries: Object.keys(state.mastery).length,
        flaggedQuestions: state.flaggedQuestions,
        lastSavedAt: state.updatedAt,
      },
      config: LearningConfig,
    });
  } catch (err) {
    console.error('[api/debug]', err);
    return NextResponse.json({ error: 'Debug-Daten konnten nicht geladen werden.' }, { status: 500 });
  }
}
