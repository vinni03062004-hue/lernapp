/**
 * Zentrales Datenmodell der Lernapp.
 *
 * Entitäten gemäß Spezifikation: Module (Fach), Chapter, Concept, Question,
 * Figure (visuelles Element inkl. vierstufiger Bildprüfkette), AnswerAttempt,
 * StudySession, MasteryState, ErrorPattern, ExamReadinessSnapshot,
 * ExplanationRequest / ChatMessage.
 */

// ---------------------------------------------------------------------------
// Inhalte (statisch, aus dem PDF abgeleitetes Wissensmodell)
// ---------------------------------------------------------------------------

export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'true_false'
  | 'cloze'          // Lückentext
  | 'open'           // offene Verständnisfrage (Freitext)
  | 'transfer'       // Anwendungs-/Transferfrage (Freitext)
  | 'assignment'     // Zuordnungsfrage
  | 'image_open'     // bildbezogene offene Frage
  | 'image_choice'   // bildbezogene Auswahlfrage
  | 'image_assignment'; // Label-/Zuordnungsfrage zu visuellen Elementen

export type Difficulty = 1 | 2 | 3; // 1 = leicht, 2 = mittel, 3 = schwer/transfer

/** Lernziel-Kategorie – steuert die Wahl der Lerntechnik (siehe config/learning.ts). */
export type LearningGoal = 'fact' | 'distinction' | 'understanding' | 'application';

export interface Chapter {
  id: string;
  index: number;
  title: string;
  subchapters: string[];
  /** Kernaussagen / implizite Lernziele des Kapitels */
  keyIdeas: string[];
  /** Seitenbereich im Original-PDF (ungefähr) */
  pdfPages: string;
}

export interface Concept {
  id: string;
  chapterId: string;
  term: string;
  definition: string;
  /** Zusammenhang / Einordnung */
  context?: string;
  /** Beispiel(e) aus dem Skript oder naheliegend */
  example?: string;
  /** typische Verwechslungsbegriffe (für Fehleranalyse + Distraktoren) */
  confusableWith?: string[];
  /** Synonyme / alternative Formulierungen (für Freitextbewertung + Suche) */
  synonyms?: string[];
  /** Merksatz */
  mnemonic?: string;
  /** Prüfungsrelevanz-Hinweis */
  examRelevance?: string;
}

/** Vierstufige Bildprüfkette gemäß Erweiterungs-Spezifikation. */
export interface FigureValidation {
  technical: boolean;   // 1) technisch korrekt extrahiert, Auflösung ok, Kapitel zugeordnet
  semantic: boolean;    // 2) Kernaussage als Textbeschreibung erfasst, Elemente erkannt
  didactic: boolean;    // 3) Fragen + Erklärungen abgeleitet, in Bild-Modi verfügbar
  validated: boolean;   // 4) Konsistenz von Beschreibung, Fragen, Kapitelzuordnung geprüft
  /** false → wird im Debug-Bereich als "unsicher" gelistet */
  uncertain?: boolean;
  note?: string;
}

export interface Figure {
  id: string;
  chapterId: string;
  /** Dateiname unter /public/images/kv/ */
  file: string;
  title: string;
  pdfPage: number;
  /** Kurzbeschreibung (eine Zeile) */
  caption: string;
  /** fachliche Kernaussage in einfacher Sprache */
  explanationSimple: string;
  /** fachliche Erklärung */
  explanationExpert: string;
  /** benannte Bildelemente (Achsen, Boxen, Pfeile, Ebenen …) mit Einzelerklärung */
  elements: { label: string; meaning: string }[];
  /** typische Fehlinterpretationen */
  misconceptions?: string[];
  /** Verknüpfung zu Konzepten */
  conceptIds?: string[];
  validation: FigureValidation;
}

export interface Question {
  id: string;
  chapterId: string;
  subchapter?: string;
  type: QuestionType;
  goal: LearningGoal;
  difficulty: Difficulty;
  prompt: string;
  /** Für Choice-Fragen */
  options?: string[];
  /** Indizes der korrekten Optionen (single_choice: genau 1) */
  correctOptions?: number[];
  /** true_false */
  correctBool?: boolean;
  /** cloze: akzeptierte Antworten je Lücke (normalisiert verglichen) */
  clozeAnswers?: string[][];
  /** assignment: Paare links→rechts; UI mischt rechte Seite */
  pairs?: { left: string; right: string }[];
  /** Freitext: erwartete Kernpunkte (Rubrik). Jeder Punkt: Stichworte, von denen min. eines vorkommen muss. */
  rubric?: { point: string; keywords: string[]; weight?: number }[];
  /** Musterantwort für Freitext */
  modelAnswer?: string;
  /** Erklärung, warum richtig/falsch – wird nach Beantwortung gezeigt */
  explanation: string;
  /** Quellenverweis ins PDF ("Kapitel 3.2, S. 6") */
  source: string;
  /** verknüpftes Konzept (für Fehleranalyse / Problembegriffe) */
  conceptIds?: string[];
  /** bildbezogene Fragen */
  figureId?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  studyProgram: string;
  chapters: Chapter[];
  concepts: Concept[];
  questions: Question[];
  figures: Figure[];
}

// ---------------------------------------------------------------------------
// Nutzerzustand (persistiert in data/state.json)
// ---------------------------------------------------------------------------

export type ErrorCategory =
  | 'knowledge_gap'      // Wissenslücke
  | 'confusion'          // Verwechslungsfehler
  | 'application'        // Anwendungsfehler
  | 'careless'           // Flüchtigkeitsfehler
  | 'unsure_correct';    // richtig, aber unsicher

export type Confidence = 'low' | 'medium' | 'high';

export interface AnswerAttempt {
  id: string;
  questionId: string;
  chapterId: string;
  questionType: QuestionType;
  goal: LearningGoal;
  difficulty: Difficulty;
  mode: StudyMode;
  sessionId: string;
  /** Rohantwort des Nutzers (serialisiert) */
  answer: string;
  /** 0..1 – Teilpunkte möglich (Freitext/Zuordnung) */
  score: number;
  correct: boolean;
  /** getroffene/fehlende Rubrik-Punkte bei Freitext */
  rubricHits?: string[];
  rubricMisses?: string[];
  confidence: Confidence;
  errorCategory: ErrorCategory | null;
  /** bei confusion: mit welchem Begriff verwechselt */
  confusedWith?: string;
  responseMs: number;
  timestamp: number;
}

export type StudyMode =
  | 'learn'        // Lernmodus (Kapitel)
  | 'mixed'        // Mischmodus
  | 'error_focus'  // Fehlerfokus
  | 'exam'         // Prüfungsmodus
  | 'image_learn'  // Bild-Lernmodus
  | 'image_exam';  // Bild-Prüfmodus

export interface StudySession {
  id: string;
  mode: StudyMode;
  chapterIds: string[];
  startedAt: number;
  finishedAt?: number;
  questionIds: string[];
  attemptIds: string[];
  /** Prüfungsmodus: Ergebnis erst am Ende */
  examResult?: ExamResult;
  /** KI-generierte Prüfungsfragen dieser Session (nicht im Katalog) */
  generatedQuestions?: Question[];
}

export interface ExamResult {
  totalScore: number;      // 0..1
  perQuestion: {
    questionId: string;
    score: number;
    memorizedOnly: boolean;
    /** Review-Daten für die antippbare Durchsicht */
    correct?: boolean;
    rubricMisses?: string[];
    answer?: string;
    questionType?: string;
  }[];
  byDifficulty: Record<string, number>;
  recommendations: string[];
}

/**
 * Meisterschafts-Zustand pro Frage (Spaced-Repetition-Kern, SM-2-angelehnt,
 * bewusst vereinfacht und transparent – siehe scheduler.ts).
 */
export interface MasteryState {
  questionId: string;
  chapterId: string;
  /** 0..1 gleitende Beherrschung */
  mastery: number;
  /** Anzahl korrekter Antworten in Folge */
  streak: number;
  attempts: number;
  correctCount: number;
  lastResult: boolean | null;
  lastScore: number;
  lastAttemptAt: number | null;
  /** nächster empfohlener Wiederholungszeitpunkt (Spacing) */
  dueAt: number;
  /** Wiederholungsintervall in Stunden */
  intervalH: number;
  /** wurde jemals falsch beantwortet und ist noch nicht rehabilitiert? */
  openError: boolean;
  /** frühere Fehler inzwischen zweimal in Folge korrekt → stabil korrigiert */
  errorResolved: boolean;
}

export interface ErrorPattern {
  conceptTerm: string;
  chapterId: string;
  count: number;
  categories: Partial<Record<ErrorCategory, number>>;
  lastAt: number;
  /** Verwechslungen: Begriff → Häufigkeit */
  confusedWith: Record<string, number>;
}

export interface ExamReadinessSnapshot {
  timestamp: number;
  readiness: number;   // 0..100
  progress: number;    // 0..100
  components: Record<string, number>;
}

export interface TechniqueStats {
  /** je Fragetyp: Versuche, Treffer, mittlere Zeit, mittlere Unsicherheit */
  byType: Record<string, { attempts: number; correct: number; totalMs: number; lowConfidence: number; laterRetention: number; laterChecks: number }>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  /** Quellen der Antwort (Konzept-/Kapitel-/Bildverweise) */
  sources?: string[];
  /** Unsicherheitsmarker: Antwort basiert auf schwacher Evidenz */
  uncertain?: boolean;
  timestamp: number;
}

export interface UserState {
  version: number;
  createdAt: number;
  updatedAt: number;
  attempts: AnswerAttempt[];
  sessions: StudySession[];
  mastery: Record<string, MasteryState>;
  errorPatterns: Record<string, ErrorPattern>;
  readinessHistory: ExamReadinessSnapshot[];
  techniqueStats: TechniqueStats;
  chatHistory: ChatMessage[];
  /** zwischengespeicherte Podcast-Skripte je Kapitel (Cache) */
  podcastScripts?: Record<string, { title: string; script: string; generatedAt: number }>;
  /** gemeldete Fragen (Nutzer-Feedback "Frage problematisch") */
  flaggedQuestions: { questionId: string; reason: string; at: number }[];
  settings: {
    /** frei editierbarer Anzeigename des Profils (wem gehört es) */
    profileName?: string;
    /** Avatar des Profils: Bild als Data-URL oder ein Emoji */
    avatar?: string;
    theme: 'light' | 'dark';
    examQuestionCount: number;
    examTimeLimitMin: number | null;
    /** Prüfungsprofil: Anteil Freitext (0..1) */
    examOpenShare: number;
  };
}
