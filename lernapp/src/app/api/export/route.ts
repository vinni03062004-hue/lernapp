import { NextResponse } from 'next/server';
import { getModule } from '@/content';
import { analyzeErrors } from '@/lib/analytics';
import { chapterStatus, computeProgress, computeReadiness } from '@/lib/progress';
import { ERROR_LABELS } from '@/lib/errors';
import { loadState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/** Lernbericht als Markdown-Download. */
export async function GET() {
  try {
    const mod = getModule();
    const state = await loadState();
    const progress = computeProgress(mod.questions, state);
    const readiness = computeReadiness(mod.questions, mod.chapters, state);
    const errors = analyzeErrors(mod.chapters, state);

    const lines: string[] = [];
    lines.push(`# Lernbericht – ${mod.title} (${mod.studyProgram})`);
    lines.push(`Erstellt am ${new Date().toLocaleString('de-DE')}`);
    lines.push('');
    lines.push(`## Gesamtstatus`);
    lines.push(`- Lernfortschritt: **${progress.progress} %** (Abdeckung ${progress.components.coverage} %, Korrektheit ${progress.components.correctness} %, Wiederholung ${progress.components.review} %, Stabilität ${progress.components.stability} %)`);
    lines.push(`- Prüfungsbereitschaft: **${readiness.readiness} %** (Trefferquote ${readiness.components.recentAccuracy} %, Stabilität ${readiness.components.stability} %, schwere Fragen ${readiness.components.hardQuestions} %, Fehlerkorrektur ${readiness.components.errorRecovery} %, Kapitelabdeckung ${readiness.components.chapterCoverage} %)`);
    for (const e of readiness.explanation) lines.push(`- Hinweis: ${e}`);
    lines.push('');
    lines.push(`## Kapitelstatus`);
    for (const c of mod.chapters) {
      const s = chapterStatus(c, mod.questions, state);
      lines.push(`- Kapitel ${c.index} (${c.title}): ${s.masteryPct} % beherrscht, ${s.attemptedShare} % bearbeitet, ${s.repeatErrors} offene Fehler – ${s.completed ? '✅ abgeschlossen' : s.completionHint}`);
    }
    lines.push('');
    lines.push(`## Fehlerschwerpunkte`);
    if (errors.byCategory.length === 0) lines.push('- Noch keine Fehler erfasst.');
    for (const e of errors.byCategory) lines.push(`- ${ERROR_LABELS[e.category]}: ${e.count}×`);
    if (errors.problemTerms.length > 0) {
      lines.push('');
      lines.push('### Wiederkehrende Problembegriffe');
      for (const t of errors.problemTerms) {
        lines.push(`- ${t.term} (${t.count}×)${t.confusedWith.length ? ` – verwechselt mit: ${t.confusedWith.join(', ')}` : ''}`);
      }
    }
    lines.push('');
    lines.push(`_${state.attempts.length} beantwortete Fragen in ${state.sessions.length} Sessions._`);

    return new NextResponse(lines.join('\n'), {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': 'attachment; filename="lernbericht-konsumentenverhalten.md"',
      },
    });
  } catch (err) {
    console.error('[api/export]', err);
    return NextResponse.json({ error: 'Export fehlgeschlagen.' }, { status: 500 });
  }
}
