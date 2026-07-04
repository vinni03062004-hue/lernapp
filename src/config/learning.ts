/**
 * Zentrale, dokumentierte Konfiguration der Lernlogik.
 *
 * Alle Gewichte und Schwellenwerte der App liegen hier – keine Magic Numbers
 * im restlichen Code. Jede Zahl ist kommentiert und kann angepasst werden.
 * Die Werte folgen den Vorgaben der Produktspezifikation (Masterprompt).
 */

export const LearningConfig = {
  /**
   * Lernfortschritt (0–100) – Gewichte gemäß Spezifikation:
   * 40 % Stoffabdeckung, 30 % korrekte Antworten auf Mindestniveau,
   * 20 % Wiederholung früher gelernter Inhalte, 10 % stabile Kernkonzepte.
   */
  progressWeights: {
    coverage: 0.4,        // Anteil der Fragen, die mind. 1× bearbeitet wurden
    correctness: 0.3,     // Anteil bearbeiteter Fragen mit Mastery >= masteryMinLevel
    review: 0.2,          // Anteil bearbeiteter Fragen mit >= 2 Versuchen (Wiederholung)
    stability: 0.1,       // Anteil Kernfragen (difficulty>=2) mit Streak >= 2
  },

  /**
   * Prüfungsbereitschaft (0–100) – Gewichte gemäß Spezifikation:
   * 30 % aktuelle Trefferquote, 25 % Stabilität über Sitzungen,
   * 20 % Leistung bei schweren Fragen, 15 % Korrekturquote früherer Fehler,
   * 10 % Kapitelabdeckung.
   */
  readinessWeights: {
    recentAccuracy: 0.3,   // gewichtete Trefferquote der letzten Versuche
    stability: 0.25,       // Leistung über mehrere Sitzungen + Zeitabstand
    hardQuestions: 0.2,    // Score bei difficulty 3 / Transferfragen
    errorRecovery: 0.15,   // Anteil früherer Fehler, die inzwischen stabil korrekt sind
    chapterCoverage: 0.1,  // Anteil der Kapitel mit Mindestaktivität
  },

  /**
   * Dämpfung der Prüfungsbereitschaft, wenn Multiple-Choice deutlich besser
   * läuft als Freitext (Spezifikation: Bereitschaft darf dann nicht künstlich
   * hoch ausfallen). Faktor multipliziert die Bereitschaft, wenn die
   * MC-Trefferquote die Freitextquote um > 25 Punkte übersteigt.
   */
  mcVsOpenPenalty: {
    gapThreshold: 0.25,
    factor: 0.85,
  },

  /** Mindest-Mastery, damit eine Frage als "beherrscht auf Mindestniveau" zählt. */
  masteryMinLevel: 0.6,

  /** Kapitel-Abschlusskriterien (Spezifikation Abschnitt "Lernabschluss Logik"). */
  chapterCompletion: {
    minQuestionShare: 0.7,   // mind. 70 % der Kapitelfragen bearbeitet
    minAccuracy: 0.8,        // mind. 80 % korrekt (Mastery-gewichtet)
    requireErrorsResolved: true, // frühere Fehlerfragen müssen rehabilitiert sein
  },

  /**
   * Spaced Repetition (vereinfachtes, transparentes SM-2-Schema).
   * Intervalle in Stunden. Nach jedem korrekten Abruf rückt die Frage eine
   * Stufe weiter; nach Fehlern fällt sie auf Stufe 0 zurück und gilt als
   * "offener Fehler", bis sie 2× in Folge korrekt beantwortet wurde.
   */
  spacing: {
    intervalsH: [0.05, 8, 24, 72, 168, 336], // sofort, 8h, 1d, 3d, 7d, 14d
    /** richtig geraten mit niedriger Sicherheit → geringere Anhebung */
    lowConfidenceFactor: 0.5,
    /** Mastery-Update: exponentiell geglättet */
    masteryAlpha: 0.35,
  },

  /** Sitzungszusammenstellung im Lernmodus. */
  session: {
    defaultLength: 10,
    /** Anteil fälliger Wiederholungen (Spacing) an der Session */
    dueShare: 0.4,
    /** Anteil neuer Fragen */
    newShare: 0.4,
    /** Anteil Fehlerfragen */
    errorShare: 0.2,
    /** Interleaving: max. 2 Fragen desselben Kapitels hintereinander im Mischmodus */
    maxSameChapterRun: 2,
    /** falsch beantwortete Fragen werden am Sessionende erneut geprüft */
    requeueWrongAtEnd: true,
  },

  /** Prüfungsmodus-Defaults (Prüfungsprofil, im UI änderbar). */
  exam: {
    defaultQuestionCount: 12,
    defaultOpenShare: 0.35,  // Anteil Freitext-/Transferaufgaben
    defaultTimeLimitMin: null as number | null,
    /** Kennzeichnung "nur auswendig": korrekt bei Fakten-MC, aber < 50 % bei
     * zugehörigen Verständnis-/Transferfragen desselben Konzepts */
    memorizedOnlyThreshold: 0.5,
  },

  /** Freitextbewertung. */
  freetext: {
    /** Score-Schwellen: ab wann gilt eine offene Antwort als korrekt */
    correctThreshold: 0.65,
    partialThreshold: 0.35,
    /** Mindestlänge (Zeichen), sonst Hinweis auf zu knappe Antwort */
    minLength: 12,
  },

  /** Fehlerklassifikation. */
  errors: {
    /** Antwortzeit unter diesem Wert + falsch + hohe Sicherheit → Flüchtigkeitsfehler-Kandidat */
    carelessMaxMs: 7000,
  },

  /** Erklärmodus / Chatbot (Offline-Retrieval). */
  retrieval: {
    /** minimale Ähnlichkeit, unter der eine Antwort als "unsicher" markiert wird */
    uncertainBelow: 0.35,
    /** Anzahl der Quellen für eine Antwort */
    topK: 3,
  },
} as const;

export type LearningConfigType = typeof LearningConfig;
