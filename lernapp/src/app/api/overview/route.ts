import { NextResponse } from 'next/server';
import { getModule } from '@/content';
import { analyzeErrors, buildRecommendations, techniqueBreakdown } from '@/lib/analytics';
import { chapterStatus, computeProgress, computeReadiness } from '@/lib/progress';
import { loadState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Gesamtübersicht: Fortschritt, Bereitschaft, Kapitelstatus, Empfehlungen, Fehleranalyse. */
export async function GET() {
  try {
    const mod = getModule();
    const state = await loadState();
    const progress = computeProgress(mod.questions, state);
    const readiness = computeReadiness(mod.questions, mod.chapters, state);
    const chapters = mod.chapters.map((c) => ({
      ...c,
      questionCount: mod.questions.filter((q) => q.chapterId === c.id).length,
      figureCount: mod.figures.filter((f) => f.chapterId === c.id).length,
      status: chapterStatus(c, mod.questions, state),
    }));
    const recommendations = buildRecommendations(mod.chapters, mod.questions, state);
    const errors = analyzeErrors(mod.chapters, state);
    const techniques = techniqueBreakdown(state);
    const openErrorCount = Object.values(state.mastery).filter((m) => m.openError).length;
    return NextResponse.json({
      module: { id: mod.id, title: mod.title, studyProgram: mod.studyProgram },
      progress,
      readiness,
      chapters,
      recommendations,
      errors,
      techniques,
      openErrorCount,
      attemptsTotal: state.attempts.length,
      readinessHistory: state.readinessHistory.slice(-60),
      settings: state.settings,
      lastSavedAt: state.updatedAt,
    });
  } catch (err) {
    console.error('[api/overview]', err);
    return NextResponse.json({ error: 'Übersicht konnte nicht geladen werden.' }, { status: 500 });
  }
}
