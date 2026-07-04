import { NextRequest, NextResponse } from 'next/server';
import { submitAttempt } from '@/lib/attempt-service';
import { questionSolution } from '@/lib/session-service';

export const dynamic = 'force-dynamic';

/**
 * Antwort einreichen. Bewertung, Fehlerklassifikation und Mastery-Update
 * erfolgen serverseitig. Body: { questionId, answer, confidence, responseMs,
 * mode, sessionId, deferFeedback? }
 * deferFeedback=true (Prüfungsmodus): Lösung wird NICHT zurückgegeben.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, answer, confidence, responseMs, mode, sessionId, deferFeedback } = body;
    if (!questionId || typeof answer !== 'string' || !sessionId) {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
    }
    const result = await submitAttempt({
      questionId,
      answer,
      confidence: ['low', 'medium', 'high'].includes(confidence) ? confidence : 'medium',
      responseMs: typeof responseMs === 'number' ? responseMs : 0,
      mode: mode ?? 'learn',
      sessionId,
    });
    if (deferFeedback) {
      // Prüfungsmodus: kein Feedback während der Beantwortung
      return NextResponse.json({ recorded: true, attemptId: result.attempt.id });
    }
    const solution = questionSolution(questionId);
    return NextResponse.json({
      recorded: true,
      correct: result.attempt.correct,
      score: result.attempt.score,
      feedback: result.feedback,
      explanation: result.explanation,
      source: result.source,
      modelAnswer: result.modelAnswer,
      rubricMisses: result.rubricMisses,
      errorLabel: result.errorLabel,
      mastery: result.mastery,
      nextDueInH: result.nextDueInH,
      solution,
    });
  } catch (err) {
    console.error('[api/attempt]', err);
    return NextResponse.json({ error: 'Antwort konnte nicht bewertet werden.' }, { status: 500 });
  }
}
