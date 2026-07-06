'use client';

/**
 * Zentrale Session-Komponente für alle Modi:
 * Lern-, Misch-, Fehlerfokus-, Bild-Lernmodus (direktes Feedback)
 * sowie Prüfungs- und Bild-Prüfmodus (deferFeedback: Bewertung erst am Ende).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Mode = 'learn' | 'mixed' | 'error_focus' | 'exam' | 'image_learn' | 'image_exam';

interface ClientQuestion {
  id: string;
  chapterId: string;
  chapterTitle: string;
  type: string;
  goal: string;
  difficulty: number;
  prompt: string;
  options?: string[];
  clozeCount?: number;
  assignmentLeft?: string[];
  assignmentRight?: { origIndex: number; text: string }[];
  figure?: { file: string; title: string; caption: string; chapterTitle: string; pdfPage: number };
  isOpen: boolean;
}

interface AttemptFeedback {
  correct: boolean;
  score: number;
  feedback: string;
  explanation: string;
  source: string;
  modelAnswer?: string;
  rubricMisses: string[];
  errorLabel: string | null;
  mastery: number;
  nextDueInH: number;
  solution?: any;
}

interface ExamResult {
  totalScore: number;
  perQuestion: {
    questionId: string;
    score: number;
    memorizedOnly: boolean;
    correct?: boolean;
    rubricMisses?: string[];
    answer?: string;
    questionType?: string;
  }[];
  byDifficulty: Record<string, number>;
  recommendations: string[];
}

const ERROR_LABELS: Record<string, string> = {
  knowledge_gap: 'Wissenslücke',
  confusion: 'Verwechslung',
  application: 'Anwendungsfehler',
  careless: 'Flüchtigkeitsfehler',
  unsure_correct: 'Richtig, aber unsicher',
};

const TYPE_LABELS: Record<string, string> = {
  single_choice: 'Single Choice', multiple_choice: 'Multiple Choice', true_false: 'Richtig / Falsch',
  cloze: 'Lückentext', open: 'Offene Frage', transfer: 'Transferfrage', assignment: 'Zuordnung',
  image_open: 'Bildfrage (offen)', image_choice: 'Bildfrage (Auswahl)', image_assignment: 'Bild-Zuordnung',
};

// Serialisierte Antwort -> lesbarer Text (für die Durchsicht am Prüfungsende).
function describeAnswer(q: ClientQuestion, raw: string): string {
  if (!raw) return '(keine Antwort)';
  try {
    switch (q.type) {
      case 'single_choice':
      case 'image_choice': {
        const i = parseInt(raw, 10);
        return q.options?.[i] ?? raw;
      }
      case 'multiple_choice':
        return raw.split(',').map((x) => q.options?.[parseInt(x, 10)] ?? x).join(', ');
      case 'true_false':
        return raw === 'true' ? 'Wahr' : 'Falsch';
      case 'cloze':
        return (JSON.parse(raw) as string[]).join(' · ');
      case 'assignment':
      case 'image_assignment': {
        const arr = JSON.parse(raw) as number[];
        return (q.assignmentLeft ?? [])
          .map((l, i) => l + ' → ' + (q.assignmentRight?.find((r) => r.origIndex === arr[i])?.text ?? '—'))
          .join('; ');
      }
      default:
        return raw;
    }
  } catch {
    return raw;
  }
}

// Richtige Lösung für die Durchsicht.
function describeCorrect(q: ClientQuestion, sol: any): string {
  if (!sol) return '';
  switch (q.type) {
    case 'single_choice':
    case 'image_choice':
    case 'multiple_choice':
      return (sol.correctOptions ?? []).map((i: number) => q.options?.[i] ?? i).join(', ');
    case 'true_false':
      return sol.correctBool ? 'Wahr' : 'Falsch';
    case 'cloze':
      return (sol.clozeAnswers ?? []).map((a: string[]) => a.join(' / ')).join(' · ');
    case 'assignment':
    case 'image_assignment':
      return (sol.pairs ?? []).map((pr: any) => pr.left + ' → ' + pr.right).join('; ');
    default:
      return sol.modelAnswer ?? '';
  }
}

export function SessionPlayer(props: {
  mode: Mode;
  chapterIds: string[];
  count?: number;
  timeLimitMin?: number | null;
  onDone?: () => void;
}) {
  const deferFeedback = props.mode === 'exam' || props.mode === 'image_exam';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [queue, setQueue] = useState<ClientQuestion[]>([]);
  const [pos, setPos] = useState(0);
  const [requeued, setRequeued] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, { score: number; correct: boolean }>>({});

  // Antwort-Zustand der aktuellen Frage
  const [choice, setChoice] = useState<number | null>(null);
  const [multi, setMulti] = useState<Set<number>>(new Set());
  const [boolAnswer, setBoolAnswer] = useState<boolean | null>(null);
  const [clozeInputs, setClozeInputs] = useState<string[]>([]);
  const [assignChoices, setAssignChoices] = useState<(number | null)[]>([]);
  const [freetext, setFreetext] = useState('');
  const [confidence, setConfidence] = useState<'low' | 'medium' | 'high' | null>(null);
  const [feedback, setFeedback] = useState<AttemptFeedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewSolutions, setReviewSolutions] = useState<Record<string, any>>({});
  const [openReview, setOpenReview] = useState<string | null>(null);
  const [flagged, setFlagged] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const startRef = useRef<number>(Date.now());
  const finishedRef = useRef(false);

  const question = queue[pos] ?? null;

  useEffect(() => {
    let cancelled = false;
    async function start() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: props.mode, chapterIds: props.chapterIds, count: props.count }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Fehler beim Start');
        if (cancelled) return;
        setSessionId(data.session.id);
        setQueue(data.questions);
        if (props.timeLimitMin) setSecondsLeft(props.timeLimitMin * 60);
        startRef.current = Date.now();
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Session konnte nicht gestartet werden.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    start();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mode, JSON.stringify(props.chapterIds), props.count]);

  const finish = useCallback(async () => {
    if (finishedRef.current || !sessionId) return;
    finishedRef.current = true;
    setFinished(true);
    try {
      const res = await fetch('/api/session/finish', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.examResult) {
        setExamResult(data.examResult);
        // Lösungen für Review laden
        const sols: Record<string, any> = {};
        await Promise.all(
          data.examResult.perQuestion.map(async (p: any) => {
            try {
              const r = await fetch(`/api/solution?id=${encodeURIComponent(p.questionId)}`);
              const d = await r.json();
              sols[p.questionId] = d.solution;
            } catch {}
          })
        );
        setReviewSolutions(sols);
      }
    } catch {}
    props.onDone?.();
  }, [sessionId, props]);

  // Countdown (optionales Zeitlimit im Prüfungsmodus)
  useEffect(() => {
    if (secondsLeft === null || finished) return;
    if (secondsLeft <= 0) { finish(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, finished, finish]);

  function resetInputs(q: ClientQuestion | null) {
    setChoice(null);
    setMulti(new Set());
    setBoolAnswer(null);
    setClozeInputs(q?.clozeCount ? new Array(q.clozeCount).fill('') : []);
    setAssignChoices(q?.assignmentLeft ? new Array(q.assignmentLeft.length).fill(null) : []);
    setFreetext('');
    setConfidence(null);
    setFeedback(null);
    setFlagged(false);
    startRef.current = Date.now();
  }

  useEffect(() => { resetInputs(question); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [question?.id]);

  function serializeAnswer(): string | null {
    if (!question) return null;
    switch (question.type) {
      case 'single_choice':
      case 'image_choice':
        return choice === null ? null : String(choice);
      case 'multiple_choice':
        return multi.size === 0 ? null : [...multi].sort((a, b) => a - b).join(',');
      case 'true_false':
        return boolAnswer === null ? null : String(boolAnswer);
      case 'cloze':
        return clozeInputs.some((v) => v.trim() === '') ? null : JSON.stringify(clozeInputs);
      case 'assignment':
      case 'image_assignment':
        return assignChoices.some((v) => v === null) ? null : JSON.stringify(assignChoices);
      default:
        return freetext.trim().length === 0 ? null : freetext.trim();
    }
  }

  async function submit() {
    if (!question || submitting) return;
    const answer = serializeAnswer();
    if (answer === null || !confidence) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/attempt', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id, answer, confidence,
          responseMs: Date.now() - startRef.current,
          mode: props.mode, sessionId, deferFeedback,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Bewertung fehlgeschlagen');
      if (deferFeedback) {
        next();
      } else {
        setFeedback(data);
        setAnswers((a) => ({ ...a, [question.id]: { score: data.score, correct: data.correct } }));
        // Falsche Fragen ans Sessionende anhängen (einmal pro Frage)
        if (!data.correct && !requeued.has(question.id)) {
          setQueue((q) => [...q, question]);
          setRequeued((r) => new Set(r).add(question.id));
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (pos + 1 >= queue.length) finish();
    else setPos((p) => p + 1);
  }

  async function flagQuestion() {
    if (!question || flagged) return;
    setFlagged(true);
    try {
      await fetch('/api/flag', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id, reason: 'Vom Nutzer als problematisch gemeldet' }),
      });
    } catch {}
  }

  // ---------- Render ----------

  if (loading) return <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="spinner" /> Session wird zusammengestellt …</div>;
  if (error) return (
    <div className="card">
      <div className="feedback-box bad"><strong>Hinweis:</strong> {error}</div>
      <p className="dim small">Tipp: Im Fehlerfokus-Modus braucht es zunächst falsch beantwortete Fragen aus anderen Modi.</p>
      <Link className="btn" href="/">Zur Übersicht</Link>
    </div>
  );

  if (finished) {
    const answered = Object.values(answers);
    const correctCount = answered.filter((a) => a.correct).length;
    return (
      <div>
        <div className="card">
          <h2>{deferFeedback ? 'Prüfung abgeschlossen' : 'Session abgeschlossen'}</h2>
          {examResult ? (
            <>
              <div className="big-number">{Math.round(examResult.totalScore * 100)} %</div>
              <div className="progress-track" style={{ margin: '10px 0 16px' }}>
                <div className={`progress-fill ${examResult.totalScore >= 0.8 ? 'green' : examResult.totalScore >= 0.5 ? '' : 'warn'}`} style={{ width: `${Math.round(examResult.totalScore * 100)}%` }} />
              </div>
              {Object.entries(examResult.byDifficulty).length > 0 && (
                <p className="small dim">Nach Schwierigkeit: {Object.entries(examResult.byDifficulty).map(([k, v]) => `${k}: ${v} %`).join(' · ')}</p>
              )}
              <h3 style={{ marginTop: 16 }}>Empfehlungen</h3>
              <ul>{examResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </>
          ) : (
            <>
              <div className="big-number">{correctCount} / {answered.length}</div>
              <p className="dim">Fragen korrekt beantwortet. Falsch beantwortete Fragen wurden am Ende erneut geprüft und in die adaptive Wiederholung aufgenommen.</p>
            </>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <Link className="btn primary" href="/">Zur Übersicht</Link>
            <Link className="btn" href="/analyse">Zur Analyse</Link>
          </div>
        </div>
        {examResult && (
          <div className="card">
            <h3>Durchsicht der Aufgaben</h3>
            <p className="small dim" style={{ marginTop: -4 }}>Tippe eine Aufgabe an, um Frage, deine Antwort und die Bewertung zu sehen.</p>
            {examResult.perQuestion.map((p, i) => {
              const q = queue.find((x) => x.id === p.questionId);
              const sol = reviewSolutions[p.questionId];
              const isOpenRow = openReview === p.questionId;
              const verdict = p.correct ? '✓ Richtig' : p.score > 0.3 ? '◐ Teilweise richtig' : '✗ Nicht richtig';
              const correctText = q ? describeCorrect(q, sol) : '';
              return (
                <div key={p.questionId} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <button
                    onClick={() => setOpenReview(isOpenRow ? null : p.questionId)}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', padding: '12px 0', textAlign: 'left', color: 'inherit' }}
                  >
                    <span className={`badge ${p.score >= 0.65 ? 'success' : p.score > 0 ? 'warn' : 'danger'}`}>{Math.round(p.score * 100)} %</span>
                    {p.memorizedOnly && <span className="badge warn">vermutlich nur auswendig</span>}
                    <span className="small" style={{ flex: 1, minWidth: 120 }}>Frage {i + 1}{q ? ': ' + q.prompt.slice(0, 70) + (q.prompt.length > 70 ? '…' : '') : ''}</span>
                    <span aria-hidden>{isOpenRow ? '▲' : '▼'}</span>
                  </button>
                  {isOpenRow && q && (
                    <div style={{ padding: '0 0 14px' }}>
                      {q.figure && (
                        <div className="small dim" style={{ marginBottom: 6 }}>Abbildung: <strong style={{ color: 'var(--text)' }}>{q.figure.title}</strong></div>
                      )}
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>{q.prompt}</div>
                      <div className="small dim">Deine Antwort (bereits abgegeben)</div>
                      <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '8px 10px', margin: '4px 0 12px', whiteSpace: 'pre-wrap', color: 'var(--text)', opacity: 0.85 }}>
                        {describeAnswer(q, p.answer ?? '')}
                      </div>
                      <div className={`feedback-box ${p.correct ? 'ok' : p.score > 0.3 ? 'partial' : 'bad'}`}>
                        <strong>{verdict} ({Math.round(p.score * 100)} %)</strong>
                        {p.rubricMisses && p.rubricMisses.length > 0 && (
                          <div className="small" style={{ marginTop: 6 }}>
                            <strong>Fehlende Kernpunkte:</strong>
                            <ul style={{ margin: '4px 0 0' }}>{p.rubricMisses.map((m, j) => <li key={j}>{m}</li>)}</ul>
                          </div>
                        )}
                        {correctText && (
                          <div className="small" style={{ marginTop: 6 }}><strong>{q.isOpen ? 'Musterlösung:' : 'Richtige Antwort:'}</strong> {correctText}</div>
                        )}
                        {sol?.explanation && <div className="small" style={{ marginTop: 8 }}>{sol.explanation}</div>}
                        {sol?.source && <div className="source-ref">⌘ Quelle: {sol.source}</div>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (!question) return <div className="card empty-state">Keine Fragen verfügbar.</div>;

  const answerReady = serializeAnswer() !== null && confidence !== null;
  const fbClass = feedback ? (feedback.correct ? 'ok' : feedback.score > 0.3 ? 'partial' : 'bad') : '';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="badge accent">{question.chapterTitle}</span>
          <span className="badge">{TYPE_LABELS[question.type] ?? question.type}</span>
          <span className="badge">{'★'.repeat(question.difficulty)}{'☆'.repeat(3 - question.difficulty)}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {secondsLeft !== null && (
            <span className={`badge ${secondsLeft < 60 ? 'danger' : ''}`}>⏱ {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</span>
          )}
          <span className="dim small">Frage {pos + 1} von {queue.length}</span>
        </div>
      </div>
      <div className="progress-track" style={{ marginBottom: 18 }}>
        <div className="progress-fill" style={{ width: `${(pos / Math.max(1, queue.length)) * 100}%` }} />
      </div>

      <div className="card">
        {question.figure && (
          props.mode === 'exam' ? (
            // NUR normaler Prüfmodus: kein Bild – nur der fett gedruckte Name des Modells.
            <div className="card" style={{ background: 'var(--bg-subtle)', marginBottom: 12 }}>
              <div className="small dim">Abbildung</div>
              <strong style={{ fontSize: 18 }}>{question.figure.title}</strong>
            </div>
          ) : (
            <div className="figure-frame">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                <strong style={{ color: '#16181d' }}>{question.figure.title}</strong>
                <span className="small" style={{ color: '#5b6270' }}>{question.figure.chapterTitle} · PDF S. {question.figure.pdfPage}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/kv/${question.figure.file}`} alt={question.figure.caption} />
            </div>
          )
        )}
        <h2 style={{ fontSize: 18, lineHeight: 1.45 }}>{question.prompt}</h2>

        {/* ---------- Eingaben je Fragetyp ---------- */}
        {(question.type === 'single_choice' || question.type === 'image_choice') && question.options?.map((opt, i) => {
          let cls = 'option-row';
          if (feedback?.solution) {
            if (feedback.solution.correctOptions?.includes(i)) cls += ' correct';
            else if (choice === i) cls += ' wrong';
          } else if (choice === i) cls += ' selected';
          return (
            <button key={i} className={cls} disabled={!!feedback} onClick={() => setChoice(i)}>
              <span className="badge">{String.fromCharCode(65 + i)}</span> {opt}
            </button>
          );
        })}

        {question.type === 'multiple_choice' && question.options?.map((opt, i) => {
          let cls = 'option-row';
          if (feedback?.solution) {
            if (feedback.solution.correctOptions?.includes(i)) cls += ' correct';
            else if (multi.has(i)) cls += ' wrong';
          } else if (multi.has(i)) cls += ' selected';
          return (
            <button key={i} className={cls} disabled={!!feedback}
              onClick={() => setMulti((m) => { const n = new Set(m); n.has(i) ? n.delete(i) : n.add(i); return n; })}>
              <span className="badge">{multi.has(i) ? '☑' : '☐'}</span> {opt}
            </button>
          );
        })}

        {question.type === 'true_false' && (
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {[true, false].map((v) => {
              let cls = 'option-row';
              if (feedback?.solution) {
                if (feedback.solution.correctBool === v) cls += ' correct';
                else if (boolAnswer === v) cls += ' wrong';
              } else if (boolAnswer === v) cls += ' selected';
              return (
                <button key={String(v)} className={cls} style={{ marginTop: 0 }} disabled={!!feedback} onClick={() => setBoolAnswer(v)}>
                  {v ? '✓ Wahr' : '✗ Falsch'}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'cloze' && (
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {clozeInputs.map((val, i) => (
              <div key={i}>
                <label className="small dim">Lücke {i + 1}</label>
                <input type="text" value={val} disabled={!!feedback} placeholder="Antwort eingeben …"
                  onChange={(e) => setClozeInputs((arr) => arr.map((v, j) => (j === i ? e.target.value : v)))} />
                {feedback?.solution?.clozeAnswers && (
                  <div className="small" style={{ marginTop: 3, color: 'var(--success)' }}>Erwartet: {feedback.solution.clozeAnswers[i]?.join(' / ')}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {(question.type === 'assignment' || question.type === 'image_assignment') && question.assignmentLeft && (
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {question.assignmentLeft.map((left, i) => (
              <div key={i}>
                <label className="small" style={{ fontWeight: 600 }}>{left}</label>
                <select value={assignChoices[i] === null ? '' : String(assignChoices[i])} disabled={!!feedback}
                  onChange={(e) => setAssignChoices((arr) => arr.map((v, j) => (j === i ? (e.target.value === '' ? null : parseInt(e.target.value, 10)) : v)))}>
                  <option value="">– bitte zuordnen –</option>
                  {question.assignmentRight?.map((r) => (
                    <option key={r.origIndex} value={r.origIndex}>{r.text}</option>
                  ))}
                </select>
                {feedback?.solution?.pairs && (
                  <div className="small" style={{ marginTop: 3, color: assignChoices[i] === i ? 'var(--success)' : 'var(--danger)' }}>
                    {assignChoices[i] === i ? '✓ richtig' : `✗ Richtig wäre: ${feedback.solution.pairs[i]?.right}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {question.isOpen && (
          <div style={{ marginTop: 12 }}>
            <textarea value={freetext} disabled={!!feedback} placeholder="Antwort in eigenen Worten – nenne die Kernpunkte …"
              onChange={(e) => setFreetext(e.target.value)} />
            <div className="small dim" style={{ marginTop: 4 }}>Die Antwort wird semantisch anhand erwarteter Kernpunkte bewertet – Teilpunkte sind möglich.</div>
          </div>
        )}

        {/* ---------- Sicherheit + Absenden ---------- */}
        {!feedback && (
          <div className="confidence-row">
            <span className="small dim">Wie sicher bist du?</span>
            {(['low', 'medium', 'high'] as const).map((c) => (
              <button key={c} className={`btn small ${confidence === c ? 'primary' : ''}`} onClick={() => setConfidence(c)}>
                {c === 'low' ? 'Unsicher' : c === 'medium' ? 'Mittel' : 'Sicher'}
              </button>
            ))}
            <button className="btn primary" style={{ marginLeft: 'auto' }} disabled={!answerReady || submitting} onClick={submit}>
              {submitting ? 'Wird bewertet …' : deferFeedback ? 'Weiter →' : 'Antwort prüfen'}
            </button>
          </div>
        )}

        {/* ---------- Feedback (Lernmodi) ---------- */}
        {feedback && (
          <>
            <div className={`feedback-box ${fbClass}`}>
              <strong>
                {feedback.correct ? '✓ Richtig' : feedback.score > 0.3 ? '◐ Teilweise richtig' : '✗ Nicht richtig'}
                {(question.isOpen || (feedback.score > 0 && feedback.score < 1)) && ` (${Math.round(feedback.score * 100)} %)`}
              </strong>
              {feedback.errorLabel && <span className="badge" style={{ marginLeft: 8 }}>{ERROR_LABELS[feedback.errorLabel] ?? feedback.errorLabel}</span>}
              <div style={{ marginTop: 6 }}>{feedback.feedback}</div>
              {feedback.rubricMisses.length > 0 && (
                <div className="small" style={{ marginTop: 6 }}>
                  <strong>Fehlende Kernpunkte:</strong>
                  <ul style={{ margin: '4px 0 0' }}>{feedback.rubricMisses.map((m, i) => <li key={i}>{m}</li>)}</ul>
                </div>
              )}
              <div style={{ marginTop: 8 }}>{feedback.explanation}</div>
              {feedback.modelAnswer && question.isOpen && (
                <div className="small" style={{ marginTop: 8 }}><strong>Beispiel-Musterlösung (eine von mehreren möglichen):</strong> {feedback.modelAnswer}</div>
              )}
              <div className="source-ref">⌘ Quelle: {feedback.source}</div>
              <div className="small dim" style={{ marginTop: 6 }}>
                Langzeit-Beherrschung dieser Frage (Lernstand, nicht die Note dieser Antwort): {Math.round(feedback.mastery * 100)} % · nächste Wiederholung in ~{feedback.nextDueInH < 1 ? 'dieser Session' : `${Math.round(feedback.nextDueInH)} h`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button className="btn primary" onClick={next}>{pos + 1 >= queue.length ? 'Session abschließen' : 'Nächste Frage →'}</button>
              <button className="btn small ghost" onClick={flagQuestion} disabled={flagged}>{flagged ? '✓ Gemeldet' : '⚑ Frage melden'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
