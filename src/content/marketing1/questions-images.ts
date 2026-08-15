import { Question } from '@/lib/types';

/**
 * Bild- und diagrammbezogene Fragen (Bild-Lernmodus und Bild-Prüfmodus).
 * Jede Frage referenziert eine Figure (figureId) und wird mit dem Bild angezeigt.
 */
export const questionsImages: Question[] = [
  // --- Drei Produktebenen ---
  {
    id: 'qmi-ebenen3-1', chapterId: 'm2', figureId: 'f-produktebenen3', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordne die drei Produktebenen ihrer Bedeutung zu (Beispiel E-Bike).',
    pairs: [
      { left: 'Kernprodukt', right: 'Kernleistung/Grundnutzen – Fortbewegung' },
      { left: 'Reales Produkt', right: 'Sichtbares Produkt: Rahmen, Akku, Motor, Display, Marke' },
      { left: 'Erweitertes Produkt', right: 'Zusatzleistungen: Software-Updates, Wartung, Garantie' },
    ],
    explanation: 'Zwiebelmodell von innen nach außen: Kernprodukt (abstrakter Nutzen) → reales Produkt (physisch/kaufbar) → erweitertes Produkt (Zusatzleistungen).',
    source: 'Abbildung Drei Produktebenen, PDF S. 7', conceptIds: ['mc-produkt', 'mc-grundnutzen'],
  },
  {
    id: 'qmi-ebenen3-2', chapterId: 'm2', figureId: 'f-produktebenen3', type: 'image_choice', goal: 'distinction', difficulty: 2,
    prompt: 'Zu welcher Ebene gehört „regelmäßige Software-Updates und Wartungsservice beim Fachhändler“?',
    options: ['Erweitertes Produkt', 'Kernprodukt', 'Reales Produkt', 'Generisches Produkt'],
    correctOptions: [0],
    explanation: 'Zusatzleistungen wie Service, Wartung und Garantie gehören zum erweiterten Produkt (äußerste Schicht).',
    source: 'Abbildung Drei Produktebenen, PDF S. 7', conceptIds: ['mc-produkt'],
  },
  // --- Fünf Produktebenen ---
  {
    id: 'qmi-ebenen5-1', chapterId: 'm2', figureId: 'f-produktebenen5', type: 'image_open', goal: 'understanding', difficulty: 3,
    prompt: 'Erläutere anhand der Abbildung die fünf Produktebenen am Beispiel der Hose – von unten nach oben.',
    rubric: [
      { point: 'Grundnutzen: bekleiden/wärmen', keywords: ['grundnutzen', 'bekleiden', 'wärmen', 'waermen', 'stoff'] },
      { point: 'Generisches Produkt: Basisausführung (Hosenbeine geschneidert)', keywords: ['generisch', 'geschneidert', 'basis'] },
      { point: 'Erwartetes Produkt: bequemer Sitz, Design', keywords: ['erwartet', 'sitz', 'design', 'bequem'] },
      { point: 'Augmentiertes Produkt: Marke, wasserabweisend, Thermo', keywords: ['augmentiert', 'marke', 'wasserabweisend', 'thermo'] },
      { point: 'Potenzielles Produkt: künftige Extras (smart clothing)', keywords: ['potenziell', 'smart clothing', 'extra', 'zukunft'] },
    ],
    modelAnswer: 'Von unten nach oben: (1) Grundnutzen – die Hose soll bekleiden und wärmen (ein Stück Stoff). (2) Generisches Produkt – die Basisausführung mit geschneiderten Hosenbeinen. (3) Erwartetes Produkt – was der Kunde selbstverständlich erwartet: bequemer Sitz und gefälliges Design. (4) Augmentiertes Produkt – Extras darüber hinaus: Markenname, wasserabweisend, Thermo. (5) Potenzielles Produkt – künftige Erweiterungen wie „smart clothing“.',
    explanation: 'Die Ebenen steigen mit zunehmendem Zusatznutzen vom reinen Grundnutzen bis zu künftigen Extras.',
    source: 'Abbildung Fünf Produktebenen, PDF S. 7', conceptIds: ['mc-grundnutzen', 'mc-produkt'],
  },
  // --- Programmbreite/-tiefe ---
  {
    id: 'qmi-programm-1', chapterId: 'm2', figureId: 'f-programmbreite', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Was stellt der waagerechte Pfeil („Breite“) in der Abbildung dar?',
    options: ['Die Anzahl der Produktlinien', 'Die Zahl der Produkte pro Linie', 'Den Umsatz je Marke', 'Die Preislage der Produkte'],
    correctOptions: [0],
    explanation: 'Die Breite (waagerecht) = Anzahl der Produktlinien; die Tiefe (senkrecht) = Zahl der Produkte je Linie.',
    source: 'Abbildung Programmbreite/-tiefe, PDF S. 9', conceptIds: ['mc-programmbreite'],
  },
  // --- Produktlebenszyklus ---
  {
    id: 'qmi-plz-1', chapterId: 'm2', figureId: 'f-lebenszyklus', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordne die Lebenszyklusphase ihrer typischen Marketing-Aktivität zu (laut Abbildung).',
    pairs: [
      { left: 'Einführung', right: 'Nachfrage stimulieren' },
      { left: 'Wachstum', right: 'Kampf um Marktanteile über Preis/Konditionen' },
      { left: 'Reife', right: 'Werbeausgaben erhöhen, Produktdifferenzierung' },
      { left: 'Sättigung', right: 'Preissenkungen' },
      { left: 'Verfall', right: 'Produkt wird nicht mehr unterstützt' },
    ],
    explanation: 'Die Umsatzkurve steigt bis zur Reife/Sättigung und fällt im Verfall; die Aktivitäten passen sich je Phase an.',
    source: 'Abbildung Produktlebenszyklus, PDF S. 10', conceptIds: ['mc-lebenszyklus'],
  },
  {
    id: 'qmi-plz-2', chapterId: 'm2', figureId: 'f-lebenszyklus', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'In welcher Phase sind laut Modell die Erfahrungskurven- und Skaleneffekte am höchsten, und warum kippt die Umsatzkurve danach?',
    rubric: [
      { point: 'Reife-/Sättigungsphase', keywords: ['reife', 'sättigung', 'saettigung'] },
      { point: 'Höchste Erfahrungskurven-/Skaleneffekte (viel Menge/Erfahrung)', keywords: ['erfahrungskurve', 'skalen', 'economies', 'menge', 'erfahrung'] },
      { point: 'Danach Rückgang: Sättigung des Marktes / Verfall', keywords: ['sättigung', 'saettigung', 'rückläufig', 'ruecklaeufig', 'verfall', 'kein bedarf'] },
    ],
    modelAnswer: 'In der Reife-/Sättigungsphase sind die Erfahrungskurven- und Economies-of-Scale-Effekte am höchsten, weil bis dahin große Mengen produziert und viel Markterfahrung gesammelt wurde. Danach kippt die Kurve, weil der Markt gesättigt ist: Es gibt kaum noch neue Käufer, der Umsatz wird rückläufig und das Produkt geht in den Verfall über.',
    explanation: 'Reife = Effizienzmaximum; anschließend Sättigung → Umsatzrückgang → Verfall.',
    source: 'Abbildung Produktlebenszyklus, PDF S. 10', conceptIds: ['mc-lebenszyklus', 'mc-erfahrungskurve'],
  },
  // --- S-Kurve ---
  {
    id: 'qmi-skurve-1', chapterId: 'm2', figureId: 'f-skurve', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Was zeigt die x-Achse im S-Kurvenkonzept?',
    options: ['Kumulierte Aufwendungen für Forschung und Entwicklung', 'Die Zeit in Jahren', 'Den Umsatz', 'Die Zahl der Wettbewerber'],
    correctOptions: [0],
    explanation: 'x-Achse: kumulierte F&E-Aufwendungen; y-Achse: Leistungsfähigkeit der Technologie. Das unterscheidet das Konzept vom zeitbasierten Lebenszyklus.',
    source: 'Abbildung S-Kurvenkonzept, PDF S. 10', conceptIds: ['mc-skurve'],
  },
  {
    id: 'qmi-skurve-2', chapterId: 'm2', figureId: 'f-skurve', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'Interpretiere die Abbildung: Was bedeutet es strategisch, wenn eine Technologie sich ihrer „Grenze“ nähert?',
    rubric: [
      { point: 'Leistungspotenzial erschöpft sich (flacht ab)', keywords: ['grenze', 'flacht', 'erschöpft', 'erschoepft', 'potenzial gering'] },
      { point: 'Weiterer F&E-Aufwand bringt wenig Zusatzleistung', keywords: ['aufwand', 'wenig', 'kaum', 'ineffizient', 'geringer zuwachs'] },
      { point: 'Rechtzeitiger Wechsel auf neue Technologie (Diskontinuität)', keywords: ['neue technologie', 'wechsel', 'umstieg', 'diskontinuität', 'diskontinuitaet', 'sprung'] },
    ],
    modelAnswer: 'Nähert sich eine Technologie ihrer Leistungsgrenze, flacht die S-Kurve ab: Zusätzliche F&E-Investitionen bringen kaum noch Leistungszuwachs. Strategisch heißt das, das Unternehmen sollte rechtzeitig in die nächste Technologie mit höherem Potenzial investieren (technologische Diskontinuität), statt weiter in die ausgereizte alte Technologie zu stecken – sonst droht es, wie Kodak den Anschluss zu verlieren.',
    explanation: 'An der Grenze lohnt weiterer Aufwand kaum – der rechtzeitige Technologiewechsel ist entscheidend.',
    source: 'Abbildung S-Kurvenkonzept, PDF S. 10', conceptIds: ['mc-skurve', 'mc-innovationsmgmt'],
  },
  // --- Diffusion ---
  {
    id: 'qmi-diff-1', chapterId: 'm2', figureId: 'f-diffusion', type: 'image_assignment', goal: 'fact', difficulty: 2,
    prompt: 'Ordne die Adopterkategorie ihrem ungefähren Anteil zu.',
    pairs: [
      { left: 'Innovatoren', right: '2,5 %' },
      { left: 'Frühadopter', right: '13,5 %' },
      { left: 'Frühe Mehrheit', right: '34 %' },
      { left: 'Nachzügler', right: '16 %' },
    ],
    explanation: 'Rogers: Innovatoren 2,5 %, Frühadopter 13,5 %, frühe Mehrheit 34 %, späte Mehrheit 34 %, Nachzügler 16 %.',
    source: 'Abbildung Adopterkategorien, PDF S. 11', conceptIds: ['mc-diffusion'],
  },
  {
    id: 'qmi-diff-2', chapterId: 'm2', figureId: 'f-diffusion', type: 'image_choice', goal: 'distinction', difficulty: 2,
    prompt: 'Welche Kurvenform beschreibt die glockenförmige Darstellung „Adopter über Adoptionszeit“ – und was ergibt ihre Aufsummierung?',
    options: [
      'Glockenkurve je Zeitpunkt; aufsummiert ergibt sich die S-förmige Diffusionskurve',
      'S-Kurve je Zeitpunkt; aufsummiert ergibt sich eine Glocke',
      'Eine fallende Gerade',
      'Eine konstante Linie',
    ],
    correctOptions: [0],
    explanation: 'Die Übernehmer je Zeitpunkt sind glockenförmig verteilt; kumuliert ergibt sich die S-förmige Diffusionskurve.',
    source: 'Abbildung Adopterkategorien, PDF S. 11', conceptIds: ['mc-diffusion', 'mc-adoption'],
  },
  // --- Preis-Absatz-Funktionen ---
  {
    id: 'qmi-paf-1', chapterId: 'm4', figureId: 'f-paf', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Welche Kurve im Diagramm schneidet weder die Preis- noch die Mengenachse (hat also keinen Maximalpreis und keine Sättigungsmenge)?',
    options: ['Die multiplikative Preis-Absatz-Funktion', 'Die lineare Preis-Absatz-Funktion', 'Die Gutenberg-Funktion', 'Die Break-even-Gerade'],
    correctOptions: [0],
    explanation: 'Die multiplikative PAF x(p)=a·p^(−b) nähert sich den Achsen nur an, schneidet sie aber nie – daher kein Maximalpreis und keine Sättigungsmenge.',
    source: 'Abbildung Preis-Absatz-Funktionen, PDF S. 18', conceptIds: ['mc-paf-mult', 'mc-paf'],
  },
  {
    id: 'qmi-paf-2', chapterId: 'm4', figureId: 'f-paf', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'Beschreibe anhand der Abbildung die Besonderheit der Gutenberg-Kurve und wofür ihr mittlerer Bereich steht.',
    rubric: [
      { point: 'Doppelt geknickt', keywords: ['doppelt geknickt', 'geknickt', 'knick'] },
      { point: 'Mittlerer, flacher Bereich = monopolistischer Bereich', keywords: ['monopolistisch', 'mittel', 'flach', 'stabil'] },
      { point: 'Menge reagiert dort kaum auf Preisänderung (Markentreue)', keywords: ['kaum', 'stabil', 'markentreue', 'unelastisch', 'wettbewerb'] },
    ],
    modelAnswer: 'Die Gutenberg-Kurve ist doppelt geknickt: Im mittleren, flachen Bereich entsteht ein monopolistischer Bereich, in dem die Absatzmenge trotz Preisänderungen nahezu stabil bleibt. Das spiegelt Markentreue in einem Markt mit Wettbewerbern wider – der Anbieter hat dort einen preispolitischen Spielraum (z. B. Apple).',
    explanation: 'Der monopolistische Mittelbereich zeigt den Preisspielraum durch Markentreue im unvollkommenen Markt.',
    source: 'Abbildung Preis-Absatz-Funktionen, PDF S. 18', conceptIds: ['mc-gutenberg'],
  },
  // --- Push/Pull ---
  {
    id: 'qmi-pushpull-1', chapterId: 'm5', figureId: 'f-pushpull', type: 'image_assignment', goal: 'distinction', difficulty: 2,
    prompt: 'Ordne die Maßnahme der richtigen Strategie zu (laut Abbildung).',
    pairs: [
      { left: 'Hersteller gewährt dem Handel Boni, Rabatte, Exklusivrechte', right: 'Push-Strategie' },
      { left: 'Hersteller wirbt per SEO/Social Media direkt bei Endkunden', right: 'Pull-Strategie' },
      { left: 'Handel bewirbt das Produkt über Regalplatzierung', right: 'Push-Strategie' },
      { left: 'Kunde fragt das Produkt aktiv beim Handel nach', right: 'Pull-Strategie' },
    ],
    explanation: 'Push (rote Pfeile): Ware wird über Anreize in den Handel gedrückt. Pull (lila Pfeile): Kommunikation an Endkunden erzeugt Nachfragesog.',
    source: 'Abbildung Push-/Pull-Strategie, PDF S. 21', conceptIds: ['mc-push-pull'],
  },
  {
    id: 'qmi-pushpull-2', chapterId: 'm5', figureId: 'f-pushpull', type: 'image_choice', goal: 'understanding', difficulty: 1,
    prompt: 'In welche Richtung zeigen in der Abbildung die Pfeile der Push-Strategie?',
    options: ['Von oben (Hersteller) nach unten (Kunde)', 'Von unten (Kunde) nach oben (Hersteller)', 'Nur horizontal', 'Im Kreis'],
    correctOptions: [0],
    explanation: 'Push „drückt“ die Ware von oben nach unten: Hersteller → Handel → Kunde. Pull wirkt umgekehrt als Nachfragesog von unten.',
    source: 'Abbildung Push-/Pull-Strategie, PDF S. 21', conceptIds: ['mc-push-pull'],
  },
  // --- Vertriebswege ---
  {
    id: 'qmi-wege-1', chapterId: 'm5', figureId: 'f-vertriebswege', type: 'image_assignment', goal: 'distinction', difficulty: 2,
    prompt: 'Ordne den Vertriebsweg dem Beispiel zu (laut Abbildung).',
    pairs: [
      { left: 'Einstufig (Hersteller → Einzelhandel → Endverbraucher)', right: 'Konsumgüter' },
      { left: 'Zweistufig (+ Großhandel)', right: 'Pharmaprodukte' },
      { left: 'Dreistufig (+ Absatzhelfer)', right: 'Exotische Früchte' },
    ],
    explanation: 'Alle drei sind indirekte Wege; sie unterscheiden sich in der Zahl der zwischengeschalteten Handelsstufen.',
    source: 'Abbildung Vertriebswege, PDF S. 22', conceptIds: ['mc-direkt-indirekt', 'mc-absatzhelfer-mittler'],
  },
  // --- Distributionsgrad ---
  {
    id: 'qmi-distgrad-1', chapterId: 'm5', figureId: 'f-distributionsgrad', type: 'image_open', goal: 'understanding', difficulty: 2,
    prompt: 'Erkläre anhand der Pyramide, wie Distributionsgrad, Zahl der Vertriebspartner und Gütertyp zusammenhängen.',
    rubric: [
      { point: 'Intensiv: viele Partner, günstige Convenience Goods', keywords: ['intensiv', 'viele', 'convenience', 'günstig', 'guenstig'] },
      { point: 'Selektiv: mehrere Partner, Shopping Goods', keywords: ['selektiv', 'mehrere', 'shopping'] },
      { point: 'Exklusiv: wenige Partner, teure Specialty Goods', keywords: ['exklusiv', 'wenige', 'specialty', 'teuer'] },
    ],
    modelAnswer: 'Je höher man in der Pyramide steigt, desto weniger Vertriebspartner und desto hochwertiger die Güter. Unten steht der intensive Vertrieb mit sehr vielen Partnern für günstige Convenience Goods (maximale Verfügbarkeit). In der Mitte der selektive Vertrieb mit mehreren Partnern für Shopping Goods. An der Spitze der exklusive Vertrieb mit wenigen Partnern für teure Specialty Goods (Prestige und Kontrolle).',
    explanation: 'Von der Basis zur Spitze: sinkende Partnerzahl, steigender Produktwert – intensiv → selektiv → exklusiv.',
    source: 'Abbildung Distributionsgrad, PDF S. 23', conceptIds: ['mc-distributionsgrad', 'mc-kaufgewohnheit'],
  },
];
