/**
 * Analytics & Handlungsempfehlungen.
 *
 * Das Dashboard zeigt keine bloßen Zahlen, sondern leitet konkrete nächste
 * Schritte ab (Spezifikation: "Dashboard mit Handlungsempfehlungen").
 * Zusätzlich: Statistik je Fragetyp/Lerntechnik zur Personalisierung.
 */

import { LearningConfig } from '@/config/learning';
import { chapterStatus } from './progress';
import { Chapter, ErrorCategory, Question, UserState } from './types';

export interface Recommendation {
  kind: 'next_unit' | 'warning' | 'technique' | 'chapter';
  title: string;
  detail: string;
  /** Deep-Link in die App */
  href?: string;
}

export function buildRecommendations(chapters: Chapter[], questions: Question[], state: UserState): Recommendation[] {
  const recs: Recommendation[] = [];
  const statuses = chapters.map((c) => ({ chapter: c, status: chapterStatus(c, questions, state) }));

  // 1) Empfohlene nächste Lerneinheit: instabilstes begonnenes Kapitel, sonst nächstes neues
  const started = statuses.filter((s) => s.status.attemptedShare > 0 && !s.status.completed);
  const fresh = statuses.filter((s) => s.status.attemptedShare === 0);
  if (started.length > 0) {
    const weakest = started.sort((a, b) => a.status.masteryPct - b.status.masteryPct)[0];
    recs.push({
      kind: 'next_unit',
      title: `Weiter mit Kapitel ${weakest.chapter.index}: ${weakest.chapter.title}`,
      detail: weakest.status.completionHint,
      href: `/lernen?chapter=${weakest.chapter.id}`,
    });
  } else if (fresh.length > 0) {
    recs.push({
      kind: 'next_unit',
      title: `Starte mit Kapitel ${fresh[0].chapter.index}: ${fresh[0].chapter.title}`,
      detail: 'Dieses Kapitel wurde noch nicht bearbeitet.',
      href: `/lernen?chapter=${fresh[0].chapter.id}`,
    });
  }

  // 2) Fehlerfokus-Warnung
  const openErrors = Object.values(state.mastery).filter((m) => m.openError).length;
  if (openErrors >= 3) {
    recs.push({
      kind: 'warning',
      title: `${openErrors} offene Fehlerfragen`,
      detail: 'Diese Fragen wurden falsch beantwortet und noch nicht stabil korrigiert. Der Fehlerfokus-Modus trainiert genau diese Lücken.',
      href: '/lernen?mode=error_focus',
    });
  }

  // 3) Hohe Aktivität, aber niedrige Stabilität
  const attempts = state.attempts;
  if (attempts.length >= 15) {
    const uniqueDays = new Set(attempts.map((a) => new Date(a.timestamp).toDateString())).size;
    if (uniqueDays <= 1) {
      recs.push({
        kind: 'warning',
        title: 'Viel Aktivität, aber noch keine Wiederholung mit Abstand',
        detail: 'Wissen ist erst prüfungsstabil, wenn es nach zeitlichem Abstand erneut abgerufen wurde (Spacing-Effekt). Wiederhole morgen dieselben Kapitel.',
      });
    }
  }

  // 4) Technik-Empfehlung: MC gut, Freitext schwach → mehr freier Abruf
  const mc = attempts.filter((a) => ['single_choice', 'multiple_choice', 'true_false'].includes(a.questionType));
  const open = attempts.filter((a) => ['open', 'transfer'].includes(a.questionType));
  if (mc.length >= 5 && open.length >= 3) {
    const gap = avg(mc.map((a) => a.score)) - avg(open.map((a) => a.score));
    if (gap > 0.25) {
      recs.push({
        kind: 'technique',
        title: 'Mehr freies Abrufen üben',
        detail: 'Deine Auswahlfragen laufen deutlich besser als freie Antworten. Für die Prüfung zählt aktiver Abruf – übe offene Fragen und erkläre Konzepte in eigenen Worten.',
      });
    }
  }
  // Unsicher-aber-richtig-Muster
  const unsure = attempts.filter((a) => a.errorCategory === 'unsure_correct').length;
  if (attempts.length >= 10 && unsure / attempts.length > 0.3) {
    recs.push({
      kind: 'technique',
      title: 'Richtig, aber oft unsicher',
      detail: 'Du antwortest häufig korrekt, gibst aber niedrige Sicherheit an. Wiederhole diese Inhalte mit Spacing, bis sich die Sicherheit einstellt – unsichere Treffer sind in Prüfungen fragil.',
    });
  }

  // 5) besonders unsichere Kapitel kennzeichnen
  const unstableChapters = statuses.filter((s) => s.status.attemptedShare >= 30 && s.status.masteryPct < 50);
  for (const s of unstableChapters.slice(0, 2)) {
    recs.push({
      kind: 'chapter',
      title: `Kapitel ${s.chapter.index} ist instabil (${s.status.masteryPct} %)`,
      detail: `${s.status.repeatErrors} offene Fehler, ${s.status.openGaps} offene Lücken. ${s.status.completionHint}`,
      href: `/lernen?chapter=${s.chapter.id}`,
    });
  }

  return recs;
}

export interface ErrorAnalysis {
  byCategory: { category: ErrorCategory; count: number }[];
  byChapter: { chapterId: string; count: number; topCategory: ErrorCategory | null }[];
  problemTerms: { term: string; count: number; confusedWith: string[] }[];
  resolvedCount: number;
  improvementTrend: 'improving' | 'flat' | 'declining' | 'unknown';
}

export function analyzeErrors(chapters: Chapter[], state: UserState): ErrorAnalysis {
  const wrong = state.attempts.filter((a) => a.errorCategory && a.errorCategory !== 'unsure_correct');
  const catCount: Partial<Record<ErrorCategory, number>> = {};
  for (const a of wrong) catCount[a.errorCategory!] = (catCount[a.errorCategory!] ?? 0) + 1;
  const byCategory = (Object.entries(catCount) as [ErrorCategory, number][])
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const byChapter = chapters
    .map((c) => {
      const chWrong = wrong.filter((a) => a.chapterId === c.id);
      const chCats: Partial<Record<ErrorCategory, number>> = {};
      for (const a of chWrong) chCats[a.errorCategory!] = (chCats[a.errorCategory!] ?? 0) + 1;
      const top = (Object.entries(chCats) as [ErrorCategory, number][]).sort((x, y) => y[1] - x[1])[0];
      return { chapterId: c.id, count: chWrong.length, topCategory: top ? top[0] : null };
    })
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count);

  const problemTerms = Object.values(state.errorPatterns)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((p) => ({ term: p.conceptTerm, count: p.count, confusedWith: Object.keys(p.confusedWith) }));

  const resolvedCount = Object.values(state.mastery).filter((m) => m.errorResolved).length;

  // Trend: Fehlerquote erste vs. zweite Hälfte der letzten 40 Versuche
  let improvementTrend: ErrorAnalysis['improvementTrend'] = 'unknown';
  const recent = state.attempts.slice(-40);
  if (recent.length >= 12) {
    const half = Math.floor(recent.length / 2);
    const err1 = 1 - avg(recent.slice(0, half).map((a) => a.score));
    const err2 = 1 - avg(recent.slice(half).map((a) => a.score));
    improvementTrend = err2 < err1 - 0.05 ? 'improving' : err2 > err1 + 0.05 ? 'declining' : 'flat';
  }

  return { byCategory, byChapter, problemTerms, resolvedCount, improvementTrend };
}

/** Statistik je Fragetyp (Trefferquote, Zeit, Unsicherheit, spätere Stabilität). */
export function techniqueBreakdown(state: UserState) {
  const byType: Record<string, { attempts: number; accuracy: number; avgMs: number; lowConfidenceShare: number }> = {};
  const groups: Record<string, typeof state.attempts> = {};
  for (const a of state.attempts) {
    (groups[a.questionType] ??= []).push(a);
  }
  for (const [type, atts] of Object.entries(groups)) {
    byType[type] = {
      attempts: atts.length,
      accuracy: Math.round(avg(atts.map((a) => a.score)) * 100),
      avgMs: Math.round(avg(atts.map((a) => a.responseMs))),
      lowConfidenceShare: Math.round((atts.filter((a) => a.confidence === 'low').length / atts.length) * 100),
    };
  }
  return byType;
}

function avg(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}
