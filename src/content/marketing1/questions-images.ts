import { Question } from '@/lib/types';

/**
 * Bild- und diagrammbezogene Fragen (Bild-Lernmodus und Bild-Prüfmodus).
 * Jede Frage referenziert eine Figure (figureId) und wird mit dem Bild angezeigt.
 */
export const questionsImages: Question[] = [
  // ---------- Produktebenen nach Leistung (S. 7) ----------
  {
    id: 'qmi-ebenen3-1', chapterId: 'm2', figureId: 'f-produktebenen3', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordnen Sie die drei Produktebenen der Abbildung ihrer Ausprägung beim E-Bike zu.',
    pairs: [
      { left: 'Kernprodukt', right: 'Fortbewegung auf zwei Rädern, durch Elektroantrieb erleichtert' },
      { left: 'Reales Produkt', right: 'Rahmen mit integriertem Akku und Motor, Unterstützungsstufen, Display' },
      { left: 'Erweitertes Produkt', right: 'Regelmäßige Software-Updates, Wartungsservices beim Fachhändler' },
    ],
    explanation: 'Von innen nach außen: Kernleistung → sichtbares, kaufbares Produkt → Zusatzleistungen.',
    source: 'Abbildung Produktebenen nach Leistung, PDF S. 7', conceptIds: ['mc-kernprodukt', 'mc-reales-produkt', 'mc-erweitertes-produkt'],
  },
  {
    id: 'qmi-ebenen3-2', chapterId: 'm2', figureId: 'f-produktebenen3', type: 'image_choice', goal: 'distinction', difficulty: 2,
    prompt: 'Zu welcher Ebene der Abbildung gehören „Lieferung, Finanzierung, Garantie, Beratung, Installation, Service“?',
    options: ['Erweitertes Produkt', 'Kernprodukt', 'Reales Produkt', 'Potenzielles Produkt'],
    correctOptions: [0],
    explanation: 'Zusatzleistungen bilden die äußerste Ebene, das erweiterte Produkt. „Potenzielles Produkt“ gehört zum anderen Modell (Nutzenkategorien).',
    source: 'Abbildung Produktebenen nach Leistung, PDF S. 7', conceptIds: ['mc-erweitertes-produkt'],
  },
  {
    id: 'qmi-ebenen3-3', chapterId: 'm2', figureId: 'f-produktebenen3', type: 'image_open', goal: 'application', difficulty: 2,
    prompt: 'Erläutern Sie anhand der Abbildung, warum die äußere Ebene in gesättigten Märkten für Unternehmen immer wichtiger wird.',
    rubric: [
      { point: 'Äußere Ebene = erweitertes Produkt mit Zusatz-/Serviceleistungen', keywords: ['erweitert', 'zusatzleistung', 'service', 'garantie', 'äußere'] },
      { point: 'In gesättigten Märkten unterscheiden sich Produkte (Kern/real) oft nur geringfügig', keywords: ['gesättigt', 'geringfügig', 'kaum unterschied', 'ähnlich'] },
      { point: 'Zusatzleistungen ermöglichen die Abhebung vom Wettbewerb aus Kundensicht; Ziel Kundennutzen maximieren', keywords: ['abheb', 'wettbewerb', 'kundennutzen', 'kundensicht'] },
    ],
    modelAnswer: 'Die äußere Ebene ist das erweiterte Produkt mit allen Zusatzleistungen (Lieferung, Finanzierung, Garantie, Beratung, Installation, Service; beim E-Bike Software-Updates und Wartung). In gesättigten Märkten unterscheiden sich die Produkte in Kern und realer Ausführung oft nur geringfügig. Deshalb werden die Zusatzleistungen immer bedeutender, um sich aus Kundensicht vom Wettbewerb abzuheben – übergeordnetes Ziel der Leistungspolitik ist, den Kundennutzen zu maximieren.',
    explanation: 'Verbindung von Abbildung und Skripttext (S. 6–7).',
    source: 'Abbildung Produktebenen nach Leistung, PDF S. 6–7', conceptIds: ['mc-produktebenen-leistung', 'mc-erweitertes-produkt'],
  },
  // ---------- Produktebenen nach Nutzen (S. 7) ----------
  {
    id: 'qmi-ebenen5-1', chapterId: 'm2', figureId: 'f-produktebenen5', type: 'image_open', goal: 'understanding', difficulty: 3,
    prompt: 'Erläutern Sie anhand der Abbildung die fünf Nutzenkategorien am Beispiel der Hose – von unten nach oben.',
    rubric: [
      { point: 'Grundnutzen: bekleiden und wärmen (Stück Stoff)', keywords: ['grundnutzen', 'bekleiden', 'wärmen', 'stoff'] },
      { point: 'Generisches Produkt: Hosenbeine geschneidert', keywords: ['generisch', 'geschneidert', 'hosenbeine'] },
      { point: 'Erwartetes Produkt: bequemer Sitz, gefälliges Design', keywords: ['erwartet', 'bequem', 'design'] },
      { point: 'Augmentiertes Produkt: Markenname, wasserabweisend, Thermo, modisch', keywords: ['augmentiert', 'markenname', 'wasserabweisend', 'thermo'] },
      { point: 'Potenzielles Produkt: Extrafunktionalitäten, smart clothing', keywords: ['potenziell', 'smart clothing', 'extrafunktion'] },
    ],
    modelAnswer: 'Von unten nach oben: (1) Grundnutzen – bekleiden und wärmen, z. B. ein ausreichend großes Stück Stoff. (2) Generisches Produkt – Hosenbeine geschneidert. (3) Erwartetes Produkt – bequemer Sitz und gefälliges Design. (4) Augmentiertes Produkt – Markenname, wasserabweisend, Thermo, modisch. (5) Potenzielles Produkt – Extrafunktionalitäten wie „smart clothing“. Je mehr Nutzenkomponenten, desto höher die Kategorie.',
    explanation: 'Fünf Kategorien vom Nutzenstandpunkt (S. 7).',
    source: 'Abbildung Produktebenen nach Nutzen, PDF S. 7', conceptIds: ['mc-nutzenkategorien', 'mc-grundnutzen', 'mc-generisches-produkt', 'mc-erwartetes-produkt', 'mc-augmentiertes-produkt', 'mc-potenzielles-produkt'],
  },
  {
    id: 'qmi-ebenen5-2', chapterId: 'm2', figureId: 'f-produktebenen5', type: 'image_choice', goal: 'distinction', difficulty: 2,
    prompt: 'Welcher Stufe der Abbildung sind „Markenname, wasserabweisend, Thermo, modisch“ zugeordnet?',
    options: ['Augmentiertes Produkt', 'Erwartetes Produkt', 'Generisches Produkt', 'Potenzielles Produkt'],
    correctOptions: [0],
    explanation: 'Erwartet = bequemer Sitz, gefälliges Design; augmentiert = Extras darüber hinaus; potenziell = „smart clothing“.',
    source: 'Abbildung Produktebenen nach Nutzen, PDF S. 7', conceptIds: ['mc-augmentiertes-produkt', 'mc-erwartetes-produkt'],
  },
  // ---------- Programmbreite und -tiefe (S. 9) ----------
  {
    id: 'qmi-programm-1', chapterId: 'm2', figureId: 'f-programmbreite', type: 'image_choice', goal: 'understanding', difficulty: 1,
    prompt: 'Was stellt der waagerechte Pfeil „Breite“ in der Abbildung dar?',
    options: ['Die Anzahl der Produktlinien', 'Die Zahl der Produkte pro Produktlinie', 'Den Umsatz je Marke', 'Die Preislage der Produkte'],
    correctOptions: [0],
    explanation: 'Breite = Anzahl der Produktlinien (waagerecht); Tiefe = Produkte je Linie (senkrecht).',
    source: 'Abbildung Programmbreite und -tiefe, PDF S. 9', conceptIds: ['mc-programmbreite'],
  },
  {
    id: 'qmi-programm-2', chapterId: 'm2', figureId: 'f-programmbreite', type: 'image_open', goal: 'application', difficulty: 2,
    prompt: 'Beschreiben Sie anhand der Abbildung Breite und Tiefe des P&G-Programms. Wie verändern sich Breite bzw. Tiefe, wenn P&G (a) eine neue Produktlinie „Tiernahrung“ aufnimmt und (b) eine weitere Waschmittelmarke einführt?',
    rubric: [
      { point: 'Breite: vier Produktlinien (Hygiene, Schönheitspflege, Waschmittel, Gesundheit/Rasur)', keywords: ['vier', '4', 'produktlinien', 'breite'] },
      { point: 'Tiefe: mehrere Marken je Linie (z. B. Always, Pampers)', keywords: ['tiefe', 'je linie', 'pro produktlinie', 'always', 'pampers', 'ariel', 'lenor'] },
      { point: '(a) Neue Linie → Programmbreite steigt', keywords: ['breite steigt', 'breiter', 'mehr linien', 'breite nimmt zu', 'breite erhöht'] },
      { point: '(b) Weitere Marke in bestehender Linie → Programmtiefe steigt', keywords: ['tiefe steigt', 'tiefer', 'tiefe nimmt zu', 'tiefe erhöht'] },
    ],
    modelAnswer: 'Die Programmbreite (Anzahl der Produktlinien) umfasst in der Abbildung vier Linien: Baby- und Damenhygiene, Schönheitspflege, Wasch- und Reinigungsmittel sowie Gesundheit und Rasur. Die Programmtiefe (Zahl der Produkte pro Linie) zeigt sich in mehreren Marken je Linie, z. B. Always und Pampers oder Ariel und Lenor. (a) Mit einer neuen Linie „Tiernahrung“ steigt die Programmbreite auf fünf Linien. (b) Eine weitere Waschmittelmarke erhöht die Programmtiefe der Linie Wasch- und Reinigungsmittel.',
    explanation: 'Anwendung der Definitionen auf Veränderungen des Programms.',
    source: 'Abbildung Programmbreite und -tiefe, PDF S. 9', conceptIds: ['mc-programmbreite', 'mc-programmtiefe', 'mc-produktlinie'],
  },
  // ---------- Produktlebenszyklus (S. 9) ----------
  {
    id: 'qmi-plz-1', chapterId: 'm2', figureId: 'f-lebenszyklus', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordnen Sie die Phase des Lebenszyklus der typischen Marketingaktivität laut Abbildung zu.',
    pairs: [
      { left: 'Einführung', right: 'Einführungsaktivitäten, um Nachfrage zu stimulieren' },
      { left: 'Wachstum', right: 'Kampf um Marktanteile über Preis und Konditionen' },
      { left: 'Reife', right: 'Erhöhung der Werbeausgaben, Produktdifferenzierung' },
      { left: 'Sättigung', right: 'Preissenkungen' },
      { left: 'Verfall', right: 'Produkt nicht mehr unterstützt' },
    ],
    explanation: 'Die Aktivitäten stehen in der unteren Zeile der Abbildung.',
    source: 'Abbildung Produktlebenszyklus, PDF S. 9', conceptIds: ['mc-lebenszyklus', 'mc-einfuehrungsphase', 'mc-wachstumsphase', 'mc-reifephase', 'mc-saettigungsphase', 'mc-verfallsphase'],
  },
  {
    id: 'qmi-plz-2', chapterId: 'm2', figureId: 'f-lebenszyklus', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'In welcher Phase sind laut Skript Erfahrungskurveneffekte und Economies of Scale am höchsten? Erklären Sie beide Effekte und beschreiben Sie, was danach mit dem Umsatz geschieht.',
    rubric: [
      { point: 'Reifephase', keywords: ['reife'] },
      { point: 'Erfahrungskurveneffekte: Effizienzsteigerung durch gesammelte Erfahrung', keywords: ['erfahrung', 'effizienz'] },
      { point: 'Economies of Scale: Betriebsgrößenvorteile (Mengenrabatte, sinkende Stückkosten)', keywords: ['betriebsgröße', 'mengenrabatt', 'stückkosten', 'größenvorteil'] },
      { point: 'Danach: Sättigung (Umsätze gehen zurück) und Verfall (stark rückläufig)', keywords: ['sättigung', 'zurück', 'rückläufig', 'verfall'] },
    ],
    modelAnswer: 'Am höchsten sind beide Effekte in der Reifephase, in der sich der Markt weiter ausdehnt, die Wachstumsraten aber sinken. Erfahrungskurveneffekte sind Effizienzsteigerungen, weil bereits Erfahrung im Markt und mit dem Produkt gesammelt wurde; Economies of Scale sind Betriebsgrößenvorteile, etwa günstigere Einkaufskonditionen durch Mengenrabatte oder sinkende Stückkosten durch bessere Verwaltungskostenumlage. Danach folgt die Sättigungsphase, in der der Markt gesättigt ist und die Umsätze zurückgehen, und schließlich die Verfallsphase mit stark rückläufigem Umsatz.',
    explanation: 'Abbildung + Skripttext (S. 9–10).',
    source: 'Abbildung Produktlebenszyklus, PDF S. 9–10', conceptIds: ['mc-reifephase', 'mc-erfahrungskurve', 'mc-economies-of-scale', 'mc-saettigungsphase'],
  },
  {
    id: 'qmi-plz-3', chapterId: 'm2', figureId: 'f-lebenszyklus', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Welche Variable dient im abgebildeten Produktlebenszyklus als Erklärungsvariable – und welche Schwäche folgt daraus laut Skript?',
    options: [
      'Die Zeit – deshalb erklärt das Modell Technologiesprünge nicht.',
      'Der F&E-Aufwand – deshalb erklärt das Modell keine Umsätze.',
      'Der Preis – deshalb erklärt das Modell keine Mengen.',
      'Die Zahl der Wettbewerber – deshalb gilt es nur im Monopol.',
    ],
    correctOptions: [0],
    explanation: 'Der Produktlebenszyklus nutzt hauptsächlich die Variable Zeit; Technologiesprünge erklärt erst das S-Kurvenkonzept (F&E-Aufwand auf der x-Achse).',
    source: 'Abbildung Produktlebenszyklus, PDF S. 9–10', conceptIds: ['mc-lebenszyklus', 'mc-skurve'],
  },
  // ---------- S-Kurvenkonzept (S. 10) ----------
  {
    id: 'qmi-skurve-1', chapterId: 'm2', figureId: 'f-skurve', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Was ist auf der x-Achse des S-Kurvenkonzepts abgetragen?',
    options: ['Kumulierte Aufwendungen für Forschung und Entwicklung', 'Die Zeit in Jahren', 'Der Umsatz', 'Die Zahl der Wettbewerber'],
    correctOptions: [0],
    explanation: 'x-Achse: kumulierte F&E-Aufwendungen; y-Achse: Leistungsfähigkeit der Technologie.',
    source: 'Abbildung S-Kurvenkonzept, PDF S. 10', conceptIds: ['mc-skurve'],
  },
  {
    id: 'qmi-skurve-2', chapterId: 'm2', figureId: 'f-skurve', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'Interpretieren Sie die Abbildung: Was bedeutet es strategisch, wenn sich der „heutige Stand“ einer Technologie ihrer Grenze nähert?',
    rubric: [
      { point: 'Kurve flacht ab: verbleibendes Entwicklungspotenzial bis zur Grenze ist gering', keywords: ['flacht', 'potenzial', 'grenze', 'gering'] },
      { point: 'Weiterer F&E-Aufwand bringt kaum Leistungszuwachs', keywords: ['f&e', 'forschung', 'aufwand', 'kaum'] },
      { point: 'Ursachen der Grenze: Größe, Komplexität, Materialeigenschaften', keywords: ['größe', 'komplexität', 'material'], weight: 0.5 },
      { point: 'Strategie: Grenzen abschätzen, rechtzeitig neue Technologie/Produkte entwickeln', keywords: ['abschätzen', 'neue technologie', 'neue produkte', 'kontinuierlich', 'vorbereit'] },
    ],
    modelAnswer: 'Nähert sich der heutige Stand der Grenze, flacht die S-Kurve ab: Das verbleibende technologische Entwicklungspotenzial ist gering, zusätzlicher F&E-Aufwand bringt kaum noch Leistungszuwachs. Die Grenze ist durch Größe, Komplexität oder Materialeigenschaften bedingt. Strategisch muss das Unternehmen die Grenzen seiner Technologie abschätzen und rechtzeitig auf die neue Technologie setzen, deren Grenze höher liegt – F&E sollte kontinuierlich neue Produkte entwickeln und vorbereiten, um auf den Technologiesprung vorbereitet zu sein.',
    explanation: 'Strategische Konsequenz aus der Abbildung.',
    source: 'Abbildung S-Kurvenkonzept, PDF S. 10', conceptIds: ['mc-skurve', 'mc-diskontinuitaet'],
  },
  {
    id: 'qmi-skurve-3', chapterId: 'm2', figureId: 'f-skurve', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordnen Sie die Elemente der Abbildung ihrer Bedeutung zu.',
    pairs: [
      { left: 'y-Achse', right: 'Leistungsfähigkeit der Technologie' },
      { left: 'x-Achse', right: 'Kumulierte Aufwendungen für Forschung und Entwicklung' },
      { left: 'Gestrichelte waagerechte Linien', right: 'Leistungsgrenzen der alten und der neuen Technologie' },
      { left: 'Pfeile zwischen „heutiger Stand“ und Grenze', right: 'Technologische Entwicklungspotenziale' },
    ],
    explanation: 'Elemente des S-Kurvenkonzepts (Foster 1986).',
    source: 'Abbildung S-Kurvenkonzept, PDF S. 10', conceptIds: ['mc-skurve'],
  },
  // ---------- Diffusion / Adopterkategorien (S. 10) ----------
  {
    id: 'qmi-diff-1', chapterId: 'm2', figureId: 'f-diffusion', type: 'image_assignment', goal: 'fact', difficulty: 2,
    prompt: 'Ordnen Sie der Adopterkategorie ihren Anteil laut Abbildung zu.',
    pairs: [
      { left: 'Innovatoren', right: '2,5 %' },
      { left: 'Frühadopter', right: '13,5 %' },
      { left: 'Frühe Mehrheit', right: '34 %' },
      { left: 'Nachzügler', right: '16 %' },
    ],
    explanation: 'Innovatoren 2,5 %, Frühadopter 13,5 %, frühe Mehrheit 34 %, späte Mehrheit 34 %, Nachzügler 16 %.',
    source: 'Abbildung Adopterkategorien, PDF S. 10', conceptIds: ['mc-adopterkategorien'],
  },
  {
    id: 'qmi-diff-2', chapterId: 'm2', figureId: 'f-diffusion', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Welchen Verlauf der Neukäuferzahl zeigt die Kurve laut Skript – und warum?',
    options: [
      'Zunächst übernehmen wenige, dann steigt die Zahl der Neukäufer stark an (Produkt bekannter, Preise und Unsicherheit sinken), gegen Ende nimmt sie ab (Markt gesättigt).',
      'Die Zahl der Neukäufer ist von Beginn an konstant hoch.',
      'Die Zahl der Neukäufer sinkt von Anfang an kontinuierlich.',
      'Die Zahl der Neukäufer steigt bis zum Schluss immer weiter an.',
    ],
    correctOptions: [0],
    explanation: 'Gründe für den Anstieg: bekannteres Produkt, sinkende Unsicherheit und Preise, höhere Verfügbarkeit, soziale Empfehlungen; Verlangsamung durch weitgehende Sättigung.',
    source: 'Abbildung Adopterkategorien, PDF S. 10', conceptIds: ['mc-diffusion'],
  },
  {
    id: 'qmi-diff-3', chapterId: 'm2', figureId: 'f-diffusion', type: 'image_open', goal: 'application', difficulty: 2,
    prompt: 'Begründen Sie anhand der Abbildung und des Skripts, warum Unternehmen die beiden linken Gruppen gezielt ansprechen sollten.',
    rubric: [
      { point: 'Linke Gruppen: Innovatoren (2,5 %) und Frühadopter (13,5 %)', keywords: ['innovatoren', 'frühadopter', 'frühe adopter'] },
      { point: 'Hochinformiert, großes Interesse; heute Tech-Blogger, YouTuber, Fachexperten', keywords: ['hochinformiert', 'interesse', 'blogger', 'youtuber', 'experten'] },
      { point: 'Einflussreiche Multiplikatoren (Influencer)', keywords: ['multiplikator', 'influencer', 'einfluss'] },
      { point: 'Treiben den Diffusionsprozess voran → Mehrheit folgt', keywords: ['diffusion', 'voran', 'mehrheit', 'verbreitung'] },
    ],
    modelAnswer: 'Die beiden linken Gruppen sind die Innovatoren (2,5 %) und die Frühadopter (13,5 %). Laut Skript sind sie hochinformiert und haben großes Interesse am Produkt; heute sind sie oft als Tech-Blogger, YouTuber oder Fachexperten aktiv und damit einflussreiche Multiplikatoren (Influencer). Ihre gezielte Ansprache ist äußerst wichtig, um den Diffusionsprozess voranzutreiben (Rogers 2003) – über ihre Empfehlungen folgen die frühe und die späte Mehrheit.',
    explanation: 'Verknüpfung von Abbildung und Skripttext.',
    source: 'Abbildung Adopterkategorien, PDF S. 10', conceptIds: ['mc-innovatoren', 'mc-adopterkategorien', 'mc-diffusion'],
  },
  // ---------- Preis-Absatz-Funktionen (S. 17) ----------
  {
    id: 'qmi-paf-1', chapterId: 'm4', figureId: 'f-paf', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Welche Kurve im Diagramm schneidet weder die Preis- noch die Mengenachse und hat daher weder Sättigungsmenge noch Maximalpreis?',
    options: ['Die multiplikative Preis-Absatz-Funktion', 'Die lineare Preis-Absatz-Funktion', 'Die Gutenberg-Funktion', 'Keine der Kurven'],
    correctOptions: [0],
    explanation: 'x(p) = a·p^(–b) nähert sich den Achsen nur an; a ist dort ein Normierungsparameter.',
    source: 'Abbildung Preis-Absatz-Funktionen, PDF S. 17', conceptIds: ['mc-paf-mult'],
  },
  {
    id: 'qmi-paf-2', chapterId: 'm4', figureId: 'f-paf', type: 'image_open', goal: 'application', difficulty: 3,
    prompt: 'Beschreiben Sie anhand der Abbildung die Besonderheit der Gutenberg-Kurve, erklären Sie ihren mittleren Bereich und nennen Sie das Skript-Beispiel.',
    rubric: [
      { point: 'Doppelt geknickte PAF, unvollkommener Markt mit Wettbewerbern', keywords: ['doppelt geknickt', 'geknickt', 'unvollkommen', 'wettbewerber'] },
      { point: 'Oben und unten: Nachfrage sinkt ähnlich linear mit steigendem Preis', keywords: ['oben', 'unten', 'linear', 'sinkt'] },
      { point: 'Mittlerer Bereich: Art Monopol, Absatzmenge ändert sich trotz höherer Preise wenig', keywords: ['monopol', 'mittler', 'wenig', 'kaum'] },
      { point: 'Ursache/Beispiel: erfolgreiche Markenpolitik – Apple', keywords: ['markenpolitik', 'apple'] },
    ],
    modelAnswer: 'Die Gutenberg-Kurve ist doppelt geknickt und reflektiert den unvollkommenen Markt mit Wettbewerbern. Im oberen und unteren Bereich sinkt die Nachfrage mit steigendem Preis ähnlich wie bei einer linearen Funktion. Im mittleren, flachen Bereich entsteht eine Art Monopol: Die Absatzmenge verändert sich trotz höherer Preise nur wenig – etwa durch erfolgreiche Markenpolitik. Skript-Beispiel: Apple verkauft Smartphones erfolgreich zu hohen Preisen.',
    explanation: 'Der monopolistische Mittelbereich = preispolitischer Spielraum durch die Marke.',
    source: 'Abbildung Preis-Absatz-Funktionen, PDF S. 17', conceptIds: ['mc-gutenberg'],
  },
  {
    id: 'qmi-paf-3', chapterId: 'm4', figureId: 'f-paf', type: 'image_assignment', goal: 'understanding', difficulty: 2,
    prompt: 'Ordnen Sie die Beschriftung der linearen Preis-Absatz-Funktion in der Abbildung ihrer Bedeutung zu.',
    pairs: [
      { left: 'Sättigungsmenge a', right: 'Absatz bei einem Preis von 0' },
      { left: 'Maximalpreis a/b', right: 'Preis, bei dem keine Nachfrage mehr existiert' },
      { left: 'Steigungsdreieck mit b', right: 'Wie stark der Markt auf Preisänderungen reagiert' },
    ],
    explanation: 'Lineare PAF x(p) = a – b·p (idealtypisch im Monopol).',
    source: 'Abbildung Preis-Absatz-Funktionen, PDF S. 17', conceptIds: ['mc-paf-linear'],
  },
  // ---------- Push/Pull (S. 21) ----------
  {
    id: 'qmi-pushpull-1', chapterId: 'm5', figureId: 'f-pushpull', type: 'image_assignment', goal: 'distinction', difficulty: 2,
    prompt: 'Ordnen Sie die Maßnahme laut Abbildung der richtigen Strategie zu.',
    pairs: [
      { left: 'Hersteller gewährt dem Handel Exklusivrechte, Boni, Rabatte', right: 'Push-Strategie' },
      { left: 'Hersteller kommuniziert per SEO, Social-Media-Kampagnen, TV-Werbung an Endkunden', right: 'Pull-Strategie' },
      { left: 'Handel bewirbt das Produkt durch Werbung und Regalplatzierung', right: 'Push-Strategie' },
      { left: 'Kunde fragt das Produkt nach, Handel fordert Ware an', right: 'Pull-Strategie' },
    ],
    explanation: 'Rote Pfeile = Push (Ware wird durch den Kanal gedrückt), lila Pfeile = Pull (Nachfragesog).',
    source: 'Abbildung Push- und Pull-Strategie, PDF S. 21', conceptIds: ['mc-push-pull', 'mc-pull'],
  },
  {
    id: 'qmi-pushpull-2', chapterId: 'm5', figureId: 'f-pushpull', type: 'image_choice', goal: 'understanding', difficulty: 1,
    prompt: 'In welche Richtung zeigen in der Abbildung die (roten) Pfeile der Push-Strategie?',
    options: ['Von oben (Hersteller) über den Handel nach unten (Kunde)', 'Von unten (Kunde) nach oben (Hersteller)', 'Nur waagerecht zwischen zwei Händlern', 'Im Kreis'],
    correctOptions: [0],
    explanation: 'Push „drückt“ von oben nach unten; Pull wirkt als Nachfragesog von unten nach oben (gestrichelte lila Pfeile).',
    source: 'Abbildung Push- und Pull-Strategie, PDF S. 21', conceptIds: ['mc-push-pull'],
  },
  {
    id: 'qmi-pushpull-3', chapterId: 'm5', figureId: 'f-pushpull', type: 'image_open', goal: 'understanding', difficulty: 2,
    prompt: 'Erklären Sie anhand der Pfeile der Abbildung, wie bei der Pull-Strategie der „Nachfragesog“ entsteht, und nennen Sie, wann diese Strategie laut Skript sinnvoll ist.',
    rubric: [
      { point: 'Hersteller kommuniziert direkt an Endkunden (SEO, Social Media, TV-Werbung)', keywords: ['endkunden', 'seo', 'social media', 'tv'] },
      { point: 'Kunde fragt Produkt beim Handel nach', keywords: ['fragt', 'nachfrag', 'kunde'] },
      { point: 'Handel fordert Ware beim Hersteller an – Sog von unten nach oben', keywords: ['fordert', 'an', 'sog', 'unten nach oben'] },
      { point: 'Sinnvoll bei markentreuen, stärker involvierten Kunden', keywords: ['markentreu', 'involviert', 'involvement'] },
    ],
    modelAnswer: 'Der Hersteller richtet seine Kommunikation direkt an die Endkunden (lila Pfeil), z. B. durch SEO, Social-Media-Kampagnen oder TV-Werbung. Dadurch fragen die Kunden das Produkt beim Handel nach, und der Handel fordert die Ware beim Hersteller an (gestrichelte lila Pfeile nach oben) – so entsteht ein Nachfragesog durch den Kanal. Laut Skript ist die Pull-Strategie sinnvoll, wenn Kunden markentreu und stärker in den Kauf involviert sind.',
    explanation: 'Wirkungskette des Pull-Prinzips.',
    source: 'Abbildung Push- und Pull-Strategie, PDF S. 20–21', conceptIds: ['mc-pull', 'mc-involvement'],
  },
  // ---------- Vertriebswege (S. 23) ----------
  {
    id: 'qmi-wege-1', chapterId: 'm5', figureId: 'f-vertriebswege', type: 'image_assignment', goal: 'distinction', difficulty: 2,
    prompt: 'Ordnen Sie den Vertriebsweg der Abbildung seinem Beispiel zu.',
    pairs: [
      { left: 'Einstufiger Vertriebsweg (Einzelhandel)', right: 'Konsumgüter' },
      { left: 'Zweistufiger Vertriebsweg (Groß- und Einzelhandel)', right: 'Pharmaprodukte' },
      { left: 'Dreistufiger Vertriebsweg (Absatzhelfer, Groß- und Einzelhandel)', right: 'Exotische Früchte' },
    ],
    explanation: 'Je mehr Vertriebsorgane zwischen Hersteller und Endverbraucher, desto länger der Weg.',
    source: 'Abbildung Länge des Vertriebsweges, PDF S. 23', conceptIds: ['mc-vertriebsweglaenge', 'mc-absatzmittler', 'mc-absatzhelfer-mittler'],
  },
  {
    id: 'qmi-wege-2', chapterId: 'm5', figureId: 'f-vertriebswege', type: 'image_choice', goal: 'understanding', difficulty: 2,
    prompt: 'Welcher Vertriebsweg ist in der Abbildung NICHT dargestellt und wie heißt er laut Skript?',
    options: ['Der direkte Vertrieb – der nullstufige Vertriebsweg', 'Der einstufige Weg über den Einzelhandel', 'Der zweistufige Weg über den Großhandel', 'Der dreistufige Weg über einen Absatzhelfer'],
    correctOptions: [0],
    explanation: 'Die Abbildung zeigt nur indirekte Wege; der direkte Vertrieb heißt nullstufiger Vertriebsweg.',
    source: 'Abbildung Länge des Vertriebsweges, PDF S. 23', conceptIds: ['mc-vertriebsweglaenge', 'mc-direkt-indirekt'],
  },
  // ---------- Distributionsgrad (S. 24) ----------
  {
    id: 'qmi-distgrad-1', chapterId: 'm5', figureId: 'f-distributionsgrad', type: 'image_open', goal: 'understanding', difficulty: 2,
    prompt: 'Erklären Sie anhand der Pyramide, wie Distributionsgrad, Zahl der Vertriebspartner, Preisniveau und Gütertyp zusammenhängen.',
    rubric: [
      { point: 'Intensiv (Basis): sehr viele Partner, günstige Produkte, Convenience Goods', keywords: ['intensiv', 'sehr viele', 'convenience', 'günstig'] },
      { point: 'Selektiv (Mitte): mehrere Partner, Shopping Goods', keywords: ['selektiv', 'mehrere', 'shopping'] },
      { point: 'Exklusiv (Spitze): wenige Partner, teure Produkte, Specialty Goods', keywords: ['exklusiv', 'wenige', 'specialty', 'teuer'] },
      { point: 'Nach oben: weniger Partner, höherer Preis', keywords: ['weniger', 'nach oben', 'höher', 'teurer'] },
    ],
    modelAnswer: 'Je weiter oben in der Pyramide, desto weniger Vertriebspartner und desto teurer die Produkte. An der Basis steht der intensive Vertrieb mit sehr vielen Partnern für günstige Convenience Goods (z. B. „Deutsche Markenbutter“). In der Mitte der selektive Vertrieb mit mehreren Partnern für Shopping Goods (Andechser Bio-Almbutter). An der Spitze der exklusive Vertrieb mit wenigen Partnern für teure Specialty Goods (Tarbiana-Trüffelbutter).',
    explanation: 'Basis → Spitze: weniger Partner, höherwertige Güter.',
    source: 'Abbildung Distributionsgrad, PDF S. 24', conceptIds: ['mc-distributionsgrad', 'mc-intensiv', 'mc-selektiv', 'mc-exklusiv'],
  },
  {
    id: 'qmi-distgrad-2', chapterId: 'm5', figureId: 'f-distributionsgrad', type: 'image_assignment', goal: 'distinction', difficulty: 2,
    prompt: 'Ordnen Sie die Stufe der Pyramide dem passenden Gütertyp zu.',
    pairs: [
      { left: 'Intensiver Vertrieb', right: 'Convenience Goods' },
      { left: 'Selektiver Vertrieb', right: 'Shopping Goods' },
      { left: 'Exklusiver Vertrieb', right: 'Specialty Goods' },
    ],
    explanation: 'Verbindung zur Typologisierung nach Kaufgewohnheit (Kapitel 2).',
    source: 'Abbildung Distributionsgrad, PDF S. 24', conceptIds: ['mc-intensiv', 'mc-selektiv', 'mc-exklusiv', 'mc-kaufgewohnheit'],
  },
  {
    id: 'qmi-distgrad-3', chapterId: 'm5', figureId: 'f-distributionsgrad', type: 'image_choice', goal: 'application', difficulty: 1,
    prompt: 'Auf welcher Stufe der Pyramide steht laut Skript die Tarbiana-Trüffelbutter, die nur in Spezialitätenläden und online verkauft wird?',
    options: ['Exklusiver Vertrieb (Spitze)', 'Selektiver Vertrieb (Mitte)', 'Intensiver Vertrieb (Basis)', 'Sie ist nicht eingeordnet'],
    correctOptions: [0],
    explanation: 'Wenige Partner, teures Produkt, wenige sachkundig bediente Gourmetkunden = exklusiver Vertrieb.',
    source: 'Abbildung Distributionsgrad, PDF S. 23–24', conceptIds: ['mc-exklusiv'],
  },
];
