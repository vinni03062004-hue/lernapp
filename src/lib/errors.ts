/**
 * Fehlerklassifikation.
 *
 * Kategorien gemäß Spezifikation:
 * - knowledge_gap  (Wissenslücke): falsch + niedrige/mittlere Sicherheit, erster Kontakt oder wiederholt falsch
 * - confusion      (Verwechslungsfehler): gewählter Distraktor entspricht einem bekannten Verwechslungsbegriff
 * - application    (Anwendungsfehler): falsch bei Transfer-/Anwendungsfragen trotz beherrschter Grundlagen
 * - careless       (Flüchtigkeitsfehler): falsch + hohe Sicherheit + sehr schnelle Antwort + Frage zuvor beherrscht
 * - unsure_correct (richtig, aber unsicher): korrekt mit niedriger Sicherheit
 */

import { LearningConfig } from '@/config/learning';
import { Concept, Confidence, ErrorCategory, MasteryState, Question } from './types';

export interface ClassificationInput {
  question: Question;
  concepts: Concept[];
  correct: boolean;
  score: number;
  confidence: Confidence;
  responseMs: number;
  mastery: MasteryState | undefined;
  /** bei Choice: Text der gewählten Option */
  chosenOptionText?: string;
}

export interface ClassificationResult {
  category: ErrorCategory | null;
  confusedWith?: string;
}

export function classifyAttempt(input: ClassificationInput): ClassificationResult {
  const { question, correct, confidence, responseMs, mastery, chosenOptionText, concepts } = input;

  if (correct) {
    return confidence === 'low' ? { category: 'unsure_correct' } : { category: null };
  }

  // Verwechslung: gewählte Option matcht einen Verwechslungsbegriff des Konzepts
  if (chosenOptionText) {
    const related = concepts.filter((c) => question.conceptIds?.includes(c.id));
    for (const c of related) {
      for (const conf of c.confusableWith ?? []) {
        if (chosenOptionText.toLowerCase().includes(conf.toLowerCase())) {
          return { category: 'confusion', confusedWith: conf };
        }
      }
    }
    // Distraktor selbst kann ein anderes Konzept sein
    for (const c of concepts) {
      if (question.conceptIds?.includes(c.id)) continue;
      if (chosenOptionText.toLowerCase().includes(c.term.toLowerCase())) {
        return { category: 'confusion', confusedWith: c.term };
      }
    }
  }

  // Flüchtigkeit: schnelle, sichere Falschantwort auf zuvor beherrschte Frage
  const wasMastered = (mastery?.mastery ?? 0) >= LearningConfig.masteryMinLevel;
  if (confidence === 'high' && responseMs < LearningConfig.errors.carelessMaxMs && wasMastered) {
    return { category: 'careless' };
  }

  // Anwendungsfehler: Transfer/Anwendung falsch, obwohl Frage-Mastery zuvor solide
  if ((question.goal === 'application' || question.type === 'transfer') && wasMastered) {
    return { category: 'application' };
  }

  return { category: 'knowledge_gap' };
}

/** Menschlich lesbare Labels für das UI. */
export const ERROR_LABELS: Record<ErrorCategory, string> = {
  knowledge_gap: 'Wissenslücke',
  confusion: 'Verwechslung',
  application: 'Anwendungsfehler',
  careless: 'Flüchtigkeitsfehler',
  unsure_correct: 'Richtig, aber unsicher',
};
