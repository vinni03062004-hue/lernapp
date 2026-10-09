/**
 * Lernkarten-Fassung der Begriffe (Marketing I): kurze Kernaussage + Stichpunkte
 * für Aufzählungen – zum Auswendiglernen und Abfragen. Inhalt unverändert aus
 * dem Skript, nur verdichtet; die vollständige Skript-Definition bleibt in
 * `definition` erhalten und ist in der App aufklappbar.
 */
export interface CardOverride {
  /** Kurzdefinition (1–2 Zeilen) */
  short?: string;
  /** Stichpunkte bei Aufzählungen (Elemente, Schritte, Arten) */
  points?: string[];
}

export const cardOverrides: Record<string, CardOverride> = {
  // ---------------- Kapitel 1: Grundlagen des Marketings ----------------
  'mc-marketing': {
    short: 'Von „(to) market“ = Markt und vermarkten. Definition der AMA (2017):',
    points: [
      'Organisationsfunktion und Bündel von Prozessen,',
      'um Wert für Kunden zu schaffen, zu kommunizieren und zu liefern',
      'und Kundenbeziehungen so zu managen, dass Organisation und Stakeholder profitieren',
    ],
  },
  'mc-markt': { short: 'Gesamtheit aller Käufer und Verkäufer, die mit einem bestimmten Produkt bzw. einer Produktkategorie handeln (Kotler/Keller/Opresnik 2015).' },
  'mc-austausch': { short: 'Mind. zwei Parteien besitzen etwas, das für die jeweils andere so nützlich ist, dass sie sich dafür vom eigenen Eigentum trennt.' },
  'mc-absatzwirtschaft': { short: 'Früherer deutscher Begriff, den „Marketing“ in den 1960er-Jahren ablöste – Paradigmenwechsel von Angebot zu Nachfrage.' },
  'mc-evolution': {
    short: 'Entwicklung des Marketingverständnisses in sieben Orientierungen:',
    points: [
      'ab ca. 1900 und 1950er/60er: Verkaufsorientierung',
      '1970er: Marktorientierung',
      '1980er: Wettbewerbsorientierung',
      '1990er: Umfeldorientierung (Deepening, Broadening)',
      '2000er: Beziehungsorientierung',
      '2010er: Netzwerk- und digitale Wertschöpfungsorientierung',
      '2020er: Nachhaltigkeitsorientierung',
    ],
  },
  'mc-beziehungsorientierung': { short: '2000er: Marketing als Sozialtechnik für jegliche Austauschprozesse; die langfristige Kundenbeziehung rückt in den Mittelpunkt.' },
  'mc-ama-merkmale': {
    short: 'Die AMA-Definition in sieben Bestandteilen:',
    points: [
      'organizational function – Managementfunktion, systematische Planung',
      'set of processes – funktionsübergreifende Prozesse',
      'creating, communicating, delivering – analytisch und aktionsorientiert',
      'value to customers – Kundennutzen im Fokus',
      'managing customer relationships – Beziehungsorientierung',
      'benefit the organization – Wertorientierung',
      'and its stakeholders – Stakeholderorientierung',
    ],
  },
  'mc-wertorientierung': { short: 'Marketing unterstützt den Unternehmenszweck – meist finanzielle Ziele (Umsatz, Gewinn, Rendite), auch nicht kommerzielle (Mitgliederzahl, Aufmerksamkeit).' },
  'mc-stakeholderorientierung': { short: 'Auch die Auswirkungen der Unternehmenstätigkeit auf externe Anspruchsgruppen (Bürger, Umweltgruppen) werden berücksichtigt.' },
  'mc-kernbausteine': {
    short: 'Die Marketingdefinition umfasst drei Kernbausteine:',
    points: [
      'funktionaler Marketingbegriff – systematischer Planungsprozess',
      'führungsorientierter Marketingbegriff – Leitphilosophie',
      'aktivitätenorientierter Marketingbegriff – Sozialtechnologie',
    ],
  },
  'mc-funktional': { short: 'Systematischer Planungsprozess: Marketing als betriebswirtschaftliche Grundfunktion bzw. Abteilung, gleichrangig mit Produktion oder Finanzierung.' },
  'mc-fuehrung': { short: 'Leitphilosophie: Marketing als Leitkonzept der Unternehmensführung – alle Funktionen werden am Markt ausgerichtet, um Kundennutzen zu schaffen.' },
  'mc-transaktional': { short: 'Klassische Marktbearbeitung mit den vier Ps: Das Unternehmen reagiert auf das Marktgeschehen, um Geschäftsabschlüsse zu tätigen (reaktiv).' },
  'mc-beziehung': { short: 'Nicht die einzelne Transaktion, sondern die Kundenbeziehung steht im Mittelpunkt – aktive Analyse, Gestaltung und Kontrolle der Beziehungen.' },
  'mc-drei-rs': {
    short: 'Marketingmix zusätzlich nach der Phase der Geschäftsbeziehung:',
    points: [
      'Recruitment – Kundenakquise durch Dialog und Interaktion',
      'Retention – Kundenbindung durch höhere Kundenzufriedenheit',
      'Recovery – Rückgewinnung abgewanderter Kunden',
    ],
  },
  'mc-markenaufbau': {
    short: 'Marken werden in vier groben Schritten aufgebaut (Kotler/Keller/Opresnik 2015):',
    points: [
      '1. Markenpositionierung identifizieren und aufbauen',
      '2. Markenmarketing planen und umsetzen',
      '3. Markenleistung messen und interpretieren',
      '4. Markenwert aufbauen und aufrechterhalten',
    ],
  },
  'mc-branding': { short: 'Nicht aus akademischer Theorie, sondern pragmatisch in Werbeagenturen entwickelt – daher keine einheitliche Definition.' },
  'mc-marke': { short: 'AMA (2017): Name, Begriff, Design, Symbol o. Ä., das das Angebot eines Anbieters von dem anderer unterscheidet – für Marketer wenig hilfreich.' },
  'mc-markenvoraussetzungen': { short: 'Konsumenten müssen die Marke (er)kennen, positiv assoziieren, ihr treu sein und sie als hochwertig wahrnehmen (Aaker 1991).' },
  'mc-markenvorteile': {
    short: 'Reale Marketingvorteile starker Marken:',
    points: [
      'bessere Wahrnehmung der Produktleistung',
      'stärkere Kundentreue',
      'weniger verwundbar durch Wettbewerber und Marketingkrisen',
      'größere Margen',
      'unelastischere Reaktion auf Preiserhöhungen, elastischere auf Preissenkungen',
      'mehr Handelskooperation und -unterstützung',
      'effektivere Marketingkommunikation',
      'Lizenzierungs- und Markenerweiterungschancen',
      'leichtere Personalbeschaffung und -bindung',
      'höhere Marktrendite',
    ],
  },
  'mc-positionierung': { short: 'Festlegen, wie die Marke von den Konsumenten im Vergleich zum Wettbewerb wahrgenommen werden soll – Kern jeder Marketingstrategie.' },
  'mc-pop-pod': {
    short: 'Innerhalb des Wettbewerbsrahmens (Keller/Swaminathan 2019):',
    points: [
      'Points of Parity – Attribute, bei denen die Marke mit dem Wettbewerb gleichauf ist',
      'Points of Difference – Attribute, die besser sind als die der Konkurrenz',
    ],
  },
  'mc-abnehmergerichtet': { short: 'Langfristiger Verhaltensplan, der über Wettbewerbsvorteile in der Wahrnehmung der Kunden deren Verhalten beeinflusst (Bruhn 2016).' },
  'mc-kostenfuehrer': { short: 'Vergleichbare Produkte zu geringerem Preis – dank Kostendegression (Standardisierung, Verfahrensinnovation, effiziente Vertriebswege) trotzdem Gewinn.' },
  'mc-strategiematrix': {
    short: 'Marktabdeckung (Gesamt/Teil) × zentraler Vorteil (Qualität/Preis):',
    points: [
      'Gesamtmarkt + Qualität: Qualitätsführerschaft',
      'Gesamtmarkt + Preis: aggressive Kostenführerschaft',
      'Teilmarkt + Qualität: selektive Qualitätsführerschaft',
      'Teilmarkt + Preis: selektive Kostenführerschaft',
    ],
  },
  'mc-marketingmanagement': {
    short: 'Umsetzung des modernen, erweiterten Marketingverständnisses im konkreten Unternehmen. Nach AMA (2017):',
    points: [
      'Ziele setzen (interne Ressourcen und Marktchancen)',
      'Aktivitäten planen und ausführen',
      'Zielerreichung messen',
    ],
  },
  'mc-6schritte': {
    short: 'Sechs Schritte (Beispiel „Sitt“/„isso“):',
    points: [
      '1. Situationsanalyse',
      '2. Marketingziele',
      '3. Marketingstrategie',
      '4. Marketinginstrumente',
      '5. Marketingimplementierung',
      '6. Marketingcontrolling',
    ],
  },
  'mc-situationsanalyse': { short: 'Schritt 1: Ausgangssituation analysieren – eigene Potenziale, gesellschaftliches Umfeld, Kunden, Wettbewerber.' },
  'mc-marketingziele': { short: 'Schritt 2: ökonomische Ziele (Rendite, Gewinn, Umsatz, Deckungsbeitrag), psychografische Ziele (Zufriedenheit, Image), soziale und Umweltziele.' },
  'mc-marketingstrategie': { short: 'Schritt 3 (strategische Planung): langfristiger Verhaltensplan – Märkte/Segmente, Marktbearbeitungsstrategie, Verhalten gegenüber Marktteilnehmern.' },
  'mc-marketinginstrumente': {
    short: 'Schritt 4 (operative Planung) mit den vier Ps:',
    points: [
      'Product – Leistungs-/Programmpolitik',
      'Price – Preis-/Konditionspolitik',
      'Place – Vertriebspolitik',
      'Promotion – Kommunikationspolitik',
      'für Dienstleistungen zusätzlich People, Processes, Physical Facilities',
    ],
  },
  'mc-dienstleistungs-ps': {
    short: 'Zusätzliche Ps für Dienstleistungen:',
    points: [
      'People – Dienstleistungspersonal',
      'Processes – Dienstleistungserstellungsprozess',
      'Physical Facilities – physisch fassbare Leistungspotenziale, Räumlichkeiten',
    ],
  },

  // ---------------- Kapitel 2: Produktpolitik ----------------
  'mc-produktpolitik': { short: 'Alle Entscheidungen zur Gestaltung des Leistungsangebots (Bruhn 2016) – zentrale Frage: Was soll vermarktet werden?' },
  'mc-produkt': { short: 'Bündel von Attributen (Ausstattung, Funktionen, Nutzen, Verwendung), das ausgetauscht oder verwendet werden kann – materiell oder immateriell.' },
  'mc-produktebenen-leistung': {
    short: 'Kernleistung plus Zusatz- und Serviceleistungen; Ziel: Kundennutzen maximieren. Drei Ebenen:',
    points: ['Kernprodukt', 'reales Produkt', 'erweitertes Produkt'],
  },
  'mc-reales-produkt': { short: 'Das sichtbare, real kaufbare Produkt: Design, technische Qualität, Funktionalitäten, Verpackung, Markenname.' },
  'mc-zusatznutzen': {
    short: 'Nutzen über den Grundnutzen hinaus:',
    points: [
      'sozialer Nutzen / Geltungsnutzen – dem Anlass angemessen',
      'Erbauungsnutzen – gut sitzen, der Figur schmeicheln',
      'emotionaler Nutzen – Marke, gutes Gefühl',
    ],
  },
  'mc-nutzenkategorien': {
    short: 'Je mehr Nutzenkomponenten, desto höher die Kategorie:',
    points: ['Grundnutzen', 'generisches Produkt', 'erwartetes Produkt', 'augmentiertes Produkt', 'potenzielles Produkt'],
  },
  'mc-qualitaet': { short: 'Gesamtheit der Bestandteile und Eigenschaften eines Produkts/einer Dienstleistung, die die Fähigkeit zur Bedürfnisbefriedigung beeinflussen.' },
  'mc-qualitaetsdimensionen': {
    short: 'Sieben Dimensionen (Meffert/Burmann/Kirchgeorg 2015):',
    points: [
      'Gebrauchsnutzen – funktioniert es wie erwartet?',
      'Haltbarkeit – Lebensdauer?',
      'Zuverlässigkeit – wie wahrscheinlich versagt es?',
      'Ausstattung – Zusatzvorzüge?',
      'Normgerechtigkeit – Gütenormen eingehalten?',
      'Ästhetik – gefällt es?',
      'Umwelt- und Sozialverträglichkeit – nachhaltig?',
    ],
  },
  'mc-guetertypen': {
    short: 'Einteilung nach fünf Merkmalen (Walsh/Deseniss/Kilian 2013):',
    points: ['Materialität', 'Konsumentengruppe', 'Nutzungsdauer', 'Nutzungshäufigkeit', 'Kaufgewohnheit'],
  },
  'mc-konsum-invest': {
    short: 'Unterscheidung nach Konsumentengruppe:',
    points: [
      'Konsumgüter (B2C) – Endkonsumenten, privater Gebrauch',
      'Investitionsgüter (B2B) – Unternehmen, Weiterverkauf oder Verwendung',
    ],
  },
  'mc-produktgestaltung': {
    short: 'Entwickelt die Gesamtheit von Kern- und Zusatzleistungen. Bereiche:',
    points: ['technisch-funktionale Eigenschaften', 'Produktdesign', 'Produktverpackung', 'Qualitätsmanagement', 'Servicepolitik'],
  },
  'mc-verpackung': {
    short: 'Eine gute Verpackung soll das Produkt:',
    points: ['schützen', 'werblich anpreisen', 'anwenderfreundlich sein', 'leicht und ökologisch sinnvoll zu entsorgen sein'],
  },
  'mc-qualitaetsmanagement': { short: 'Sichert die funktional-technischen Eigenschaften dauerhaft; optimiert Arbeitsabläufe und Prozesse.' },
  'mc-produktdiff': { short: 'Abgewandelte Versionen für neue Marktsegmente – das Programm wird breiter, weil beide Varianten angeboten werden.' },
  'mc-portfoliomanagement': { short: 'Steuert die Marketingziele aller Produkte/Marken im Portfolio und verteilt die Ressourcen; inkl. Sortimentserweiterung und -bereinigung.' },
  'mc-programmstruktur': {
    short: 'Ausrichtung der Programmstruktur (Walsh/Deseniss/Kilian 2013):',
    points: [
      'an Material oder Herkunft – z. B. Kraft Heinz',
      'an Preislagen – z. B. LVMH',
      'an Bedarfskreisen – z. B. Procter & Gamble',
    ],
  },
  'mc-innovationsmgmt': { short: 'Bewusste Gestaltung eines Innovationssystems zur Entwicklung von Neuprodukten – heute Voraussetzung für wirtschaftlichen Erfolg.' },
  'mc-lebenszyklus': {
    short: 'Idealtypische Phasen eines Produkts von der Neueinführung bis zur Eliminierung:',
    points: ['1. Einführung', '2. Wachstum', '3. Reife', '4. Sättigung', '5. Verfall'],
  },
  'mc-reifephase': { short: 'Markt dehnt sich weiter aus, Wachstumsraten sinken; Erfahrungskurveneffekte und Economies of Scale sind am höchsten.' },
  'mc-erfahrungskurve': { short: 'Effizienzsteigerung, weil bereits Erfahrung im Markt und mit dem Produkt gesammelt wurde.' },
  'mc-economies-of-scale': { short: 'Betriebsgrößenvorteile – z. B. Mengenrabatte im Einkauf, sinkende Stückkosten durch bessere Verwaltungskostenumlage.' },
  'mc-skurve': {
    short: 'Foster (1986): sensibilisiert das Innovationsmanagement für technologische Diskontinuitäten.',
    points: [
      'Jede Technologie stößt an eine Leistungsgrenze (Größe, Komplexität, Materialeigenschaften)',
      'und wird durch eine neue Technologie ersetzt',
      'Konsequenz: Grenzen abschätzen, F&E kontinuierlich neue Produkte vorbereiten lassen',
    ],
  },
  'mc-diskontinuitaet': { short: 'Ablösung einer Technologie an ihrer Leistungsgrenze durch eine neue – erklärt das S-Kurvenkonzept, nicht der Produktlebenszyklus.' },
  'mc-innovatoren': { short: 'Hochinformiert, großes Interesse – oft Tech-Blogger, YouTuber, Fachexperten und damit einflussreiche Multiplikatoren (Influencer).' },
  'mc-adopterkategorien': {
    short: 'Einteilung der Übernehmer nach Adoptionszeit (Abbildung):',
    points: ['Innovatoren 2,5 %', 'Frühadopter 13,5 %', 'frühe Mehrheit 34 %', 'späte Mehrheit 34 %', 'Nachzügler 16 %'],
  },

  // ---------------- Kapitel 3: Kommunikationspolitik ----------------
  'mc-integrierte-kommunikation': { short: 'Kommunikationsaktivitäten integrieren und abstimmen – so macht kohärente Kommunikation Marken bekannt und füllt sie mit Inhalt.' },
  'mc-komm-aufgaben': {
    short: 'In Dialog mit den Konsumenten treten, um sie …',
    points: ['über Produkte und Marken zu informieren', 'von Produkten und Marken zu überzeugen', 'an Produkte und Marken zu erinnern'],
  },
  'mc-komm-ziele': {
    short: 'Ökonomische Ziele (Marktanteil, Kundenzahl, Absatz, Rentabilität) betreffen den ganzen Marketingmix. Reine Kommunikationsziele (vorökonomisch):',
    points: ['Kategoriebedürfnis', 'Bekanntheitsgrad und Image', 'Einstellungen zum Unternehmen und zu den Produkten', 'Kaufabsicht'],
  },
  'mc-kategoriebeduerfnis': { short: 'Schaffung neuer Kategorien: Innovative Produkte lösen Probleme, die Konsumenten noch nicht bewusst sind – das Bedürfnis muss erst etabliert werden.' },
  'mc-8schritte-komm': {
    short: 'Kampagnen in acht Schritten planen (Kotler/Keller/Opresnik 2015):',
    points: [
      '1. Zielgruppe auswählen',
      '2. Kommunikationsziele festlegen',
      '3. Botschaft bestimmen',
      '4. Kanäle auswählen',
      '5. Budget festlegen',
      '6. Kommunikationsmix gestalten',
      '7. Ergebnisse messen',
      '8. Prozess steuern',
    ],
  },
  'mc-kanaele': { short: 'Auf welchem Träger wird die Botschaft vermittelt? Persönliche vs. Massenkanäle – Grenzen verwischen durch Social Media, programmatische Werbung, KI.' },
  'mc-budget': { short: 'Nach finanziellen Möglichkeiten, als % vom Umsatz, an Mitbewerbern orientiert oder nach Zielen und Aufgaben – Letzteres ist empfohlen.' },
  'mc-prozesssteuerung': { short: 'Instrumente nicht isoliert laufen lassen: kontinuierlich überwachen, koordinieren und anpassen – zunehmend per Marketing-Automatisierung.' },
  'mc-medienkombination': {
    short: 'Auswahl und Kombination der Werkzeuge hängen ab von:',
    points: [
      'Marktstellung des Unternehmens',
      'Art des Produktmarkts (Konsum oder Industrie)',
      'Charakteristiken der Zielgruppe',
      'Kaufbereitschaft und Art der Kaufentscheidung',
      'Phase im Lebenszyklus',
      'verfügbarem Budget',
    ],
  },
  'mc-kaufentscheidung': { short: 'Kognitiver und sonstiger Aufwand eines Kaufs: impulsive, habituelle, limitierte und extensive Kaufentscheidungen.' },
  'mc-6kriterien': {
    short: 'Effektivität und Effizienz integrierter Kommunikation (Keller/Swaminathan 2019):',
    points: [
      'Reichweite – wird die Zielgruppe erreicht?',
      'Mitwirkung – welche Wirkung auf die Zielgruppe?',
      'Gemeinsamkeit – konsistente Botschaft?',
      'Komplementarität – ergänzen sich die Wege?',
      'Vielseitigkeit – wirkt sie bei einem wie bei mehreren Kontakten?',
      'Kosten – welche Kosten fallen an?',
    ],
  },
  'mc-fragmentierung': { short: 'Mainstreammedien verlieren Reichweite; es entstehen immer mehr Angebote für sehr spitze Zielgruppensegmente.' },
  'mc-kommmix': {
    short: 'Acht Werkzeuge, kombiniert zu einer einheitlichen, stimmigen Markenbotschaft:',
    points: [
      'massenmedial: Werbung, Verkaufsförderung, Sponsoring & Events, Public Relations',
      'persönlich: Direktmarketing, interaktives Marketing, Mund-zu-Mund-Kommunikation, persönlicher Verkauf',
    ],
  },
  'mc-werbemuedigkeit': { short: 'Werbung stört umso mehr, je stärker sie die Mediennutzung unterbricht; Konsumenten sind werbemüde und blenden Werbung technisch aus.' },
  'mc-sponsoring': { short: 'Unternehmen organisieren/finanzieren Aktivitäten in Sport, Kunst, Unterhaltung oder Wohltätigkeit (auch Events, Webinare, Firmenmuseen) – massenmedial.' },
  'mc-pr': { short: 'Gezielte, transparente Kommunikation im Dialog mit allen Anspruchsgruppen, um die öffentliche Meinung zu beeinflussen – Ziel: besseres Unternehmensimage.' },
  'mc-pr-funktionen': {
    short: 'Sieben Funktionen der PR (Meffert et al. 2015):',
    points: [
      'Informationsfunktion – Informationen an die Öffentlichkeit',
      'Kontaktfunktion – Stakeholderverbindungen aufbauen und halten',
      'Imagefunktion – Unternehmensbild aufbauen, ändern, pflegen',
      'Absatzförderungsfunktion – Verkauf durch Anerkennung und Vertrauen',
      'Sozialfunktion – gesellschaftliche und soziale Leistungen zeigen',
      'Balancefunktion – Anreiz-Beitrags-Gleichgewicht der Stakeholder',
      'Stabilisierungsfunktion – Krisenfestigkeit durch stabile Beziehungen',
    ],
  },
  'mc-direktmarketing': { short: 'Werbemaßnahmen mit direkter Ansprache – z. B. Katalog per Post, Telefonmarketing, E-Mail/SMS, TV-Shopping (persönlich).' },
  'mc-interaktiv': { short: 'Weiterentwicklung des Direktmarketings: Es findet ein Austausch zwischen Konsument und Unternehmen statt (persönlich).' },
  'mc-suchgebunden': { short: 'Anzeigen neben den Suchergebnissen – erreichen Kunden gezielt in der Suchphase des Kaufentscheidungsprozesses.' },
  'mc-wom': { short: 'Konsumenten tauschen sich untereinander über Erfahrungen mit Unternehmen und Produkten aus – zunehmend elektronisch (persönlich).' },
  'mc-influencer': { short: 'Strategische Nutzung des viralen Effekts: Kooperation mit reichweitenstarken Personen, deren Glaubwürdigkeit die Markenbotschaft trägt.' },

  // ---------------- Kapitel 4: Preispolitik ----------------
  'mc-preispolitik': { short: 'Alle Entscheidungen zur Festlegung des Entgelts für Leistungen (Homburg 2017) – inkl. Zahlungsbedingungen und Rabatten, daher auch Kontrahierungspolitik.' },
  'mc-ziele-preispolitik': {
    short: 'Die Preispolitik richtet sich nach:',
    points: [
      'Unternehmenszielen – Umsatz, Gewinn, Marktanteil, Rentabilität',
      'handelsbezogenen Zielen – z. B. mehr Präsenz in Handelskanälen',
      'konsumentenbezogenen Zielen – z. B. Preiswahrnehmung beeinflussen',
    ],
  },
  'mc-einflussfaktoren-preis': {
    short: 'Fünf Einflussfaktoren:',
    points: [
      'Käufer – Zahlungsbereitschaft = Preisobergrenze',
      'Kosten – Gesamtkosten = Preisuntergrenze',
      'Konkurrenzsituation – Preiskorridor',
      'externe Rahmenbedingungen',
      'psychologische Effekte – Schwellenpreise',
    ],
  },
  'mc-preisgrenzen': {
    short: 'Der preispolitische Spielraum (Preiskorridor):',
    points: [
      'Preisobergrenze = Zahlungsbereitschaft des Kundensegments',
      'Preisuntergrenze = Gesamtkosten (über die Lebensdauer decken + Gewinnbeitrag)',
    ],
  },
  'mc-preiskorridor': { short: 'Konsumenten beziehen Wettbewerbspreise ein, Vergleichsportale schaffen Transparenz → relevanter Preiskorridor, oft per Preis-Monitoring überwacht.' },
  'mc-schwellenpreis': { short: 'Kunden ignorieren gern Nachkommastellen – Schwellenpreise (z. B. 2,99 €) nutzen das aus.' },
  'mc-paf': { short: 'Funktionaler Zusammenhang zwischen dem Preis und der in einem Zeitraum abgesetzten Menge (mikroökonomische Preistheorie).' },
  'mc-paf-linear': {
    short: 'x(p) = a – b · p (idealtypisch im Monopol):',
    points: [
      'a = maximale Sättigungsmenge (Absatz bei Preis 0)',
      'a/b = Maximalpreis (keine Nachfrage mehr)',
      'b = wie stark der Markt auf Preisänderungen reagiert',
    ],
  },
  'mc-paf-mult': {
    short: 'x(p) = a · p^(–b) – berücksichtigt den Ausgangspreis:',
    points: [
      'je niedriger der Ausgangspreis, desto stärker wirken Preisänderungen',
      'schneidet die Achsen nicht → keine Sättigungsmenge, kein Maximalpreis',
      'a = Normierungsparameter, b = Preisabhängigkeit der Absatzmenge',
    ],
  },
  'mc-gutenberg': {
    short: 'Doppelt geknickte PAF für den unvollkommenen Markt mit Wettbewerbern:',
    points: [
      'oberer und unterer Bereich: Nachfrage sinkt mit steigendem Preis (ähnlich linear)',
      'mittlerer Bereich: Art Monopol – Menge ändert sich trotz höherer Preise kaum (z. B. Apple)',
    ],
  },
  'mc-preisprozess': {
    short: 'Systematischer Planungsprozess (Bruhn 2016), da Preise mehrmals angepasst werden:',
    points: [
      '1. preispolitischen Spielraum analysieren',
      '2. Ziele festlegen',
      '3. Strategie entwickeln',
      '4. Preisinstrumente einsetzen',
      '5. Preiskontrolle',
    ],
  },
  'mc-preisinstrumente': {
    short: 'Koordinierter Einsatz von vier Instrumenten:',
    points: [
      'Preise',
      'Preisnachlässe – Rabatte, Boni, Skonti',
      'Preiszuschläge – z. B. für Sonderleistungen, Lieferzeiten',
      'Zugaben von Geld-, Sachwerten, Dienstleistungen – v. a. an den Handel',
    ],
  },
  'mc-preiskontrolle': { short: 'Überwacht laufend Handelsabgabe-, Endverbraucher- und Konkurrenzpreise – zeigt rechtzeitig, wann eine Preiskorrektur nötig ist.' },
  'mc-preiswettbewerb': {
    short: 'Ob und wie sich ein Unternehmen an der Konkurrenz orientiert:',
    points: ['Preisführerschaft', 'Preiskampf', 'Preisfolgerschaft'],
  },
  'mc-skimming': { short: 'Sehr hohe Einführungspreise schöpfen die Zahlungsbereitschaft von Innovatoren und Frühadoptern ab; danach Preissenkung für die Mehrheit.' },
  'mc-preisdiff': {
    short: 'Unterschiedliche Preise für Segmente mit unterschiedlicher Zahlungsbereitschaft. Formen:',
    points: ['mengenmäßig', 'zeitlich', 'räumlich', 'personell', 'leistungsbezogen', 'Sonderform: Preisbündelung'],
  },
  'mc-preisbestimmung': {
    short: 'Zwei Verfahrensweisen:',
    points: ['kostenorientiert – vornehmlich Kostenrechnung', 'marktorientiert – vornehmlich Reaktionen der Marktteilnehmer'],
  },
  'mc-marktorientiert': {
    short: 'Orientiert sich an den Reaktionen der Marktteilnehmer (Nachfrage, Konkurrenz) – wird der Praxis besser gerecht. Verfahren:',
    points: ['Break-even-Analyse', 'Perceived-Value-Pricing', 'Cournot-Preis'],
  },
  'mc-dynamic': { short: 'Preise ändern sich automatisch je nach Nachfrageintensität; Algorithmen bestimmen den optimalen Preis (z. B. Uber zu Stoßzeiten).' },
  'mc-reverse': { short: 'Umgekehrtes Prinzip: Kunden nennen online Bedarf und Preisvorstellung, Unternehmen machen Angebote – sehr individuelle Preise.' },
  'mc-konditionenpolitik': {
    short: 'Endpreise werden nicht immer tatsächlich gezahlt – v. a. im B2B wichtig. Dazu zählen:',
    points: ['Absatzkredite', 'Lieferungs- und Zahlungsbedingungen', 'Rabatte'],
  },

  // ---------------- Kapitel 5: Distributionspolitik ----------------
  'mc-vertriebsziele': {
    short: 'Verfügbarkeit der Leistungen sichern – drei Zielarten parallel:',
    points: [
      'psychologisch – einzigartiges, markentreues, positives Kauferlebnis',
      'versorgungsorientiert – lückenlose Verfügbarkeit',
      'ökonomisch – Absatzmenge, Preisniveau, Vertriebskosten optimieren',
    ],
  },
  'mc-vertrieb-einklang': {
    short: 'Der Vertrieb soll zum übrigen Marketingmix passen:',
    points: [
      'der Unternehmensleistung angemessen sein',
      'der Zielgruppe entgegenkommen',
      'das Image aus Preis- und Kommunikationspolitik unterstützen',
    ],
  },
  'mc-vertriebskanal': { short: 'Alle Organisationen, die ein Produkt von der Herstellung bis zum Endverbraucher leiten und transportieren (Kotler/Keller/Opresnik 2015).' },
  'mc-pull': { short: 'Erzeugt einen Nachfragesog: Kommunikation direkt an Endkunden (Social Media, Content Marketing, SEO) zieht sie ins Geschäft oder in den Onlineshop.' },
  'mc-handelsleistungen': {
    short: 'Hersteller geben Vertriebsaufgaben an den Handel ab (Kontakte, Kompetenz, Erfahrung). Der Handel …',
    points: [
      '… erzeugt Nachfrage durch Marketingkommunikation',
      '… berät Kunden bei Kaufentscheidungen',
      '… übernimmt Teile des Risikos',
      '… betreibt Marktforschung',
    ],
  },
  'mc-ueberbrueckung': {
    short: 'Der Handel steigert den Kundennutzen, indem er Lücken zwischen Herstellung und Konsum überbrückt:',
    points: ['räumlich – Transport', 'zeitlich – Lagerung und Vorratshaltung', 'Sortimentsgestaltung – quantitativ und qualitativ'],
  },
  'mc-disintermediation': { short: 'Ausschaltung von Intermediären, wenn sie keinen Zusatznutzen mehr bringen – auch um die Handelsmarge einzusparen.' },
  'mc-direkt-indirekt': { short: 'Das Unternehmen verkauft selbst an Endkunden über interne Vertriebsorgane (Innen-/Außendienst) – nullstufiger Vertriebsweg.' },
  'mc-indirekt': { short: 'Vertriebsaufgaben werden mit externen, unabhängigen Marktakteuren mit akquisitorischer Funktion geteilt (Homburg 2017).' },
  'mc-vertriebsweg-wahl': { short: 'Oft per Vergleichsrechnung (Handelsmarge vs. Kosten eigener Vertrieb); dazu Kundenzahl, Komplexität und Wert des Produkts.' },
  'mc-externe-vertriebsorgane': {
    short: 'Unabhängige externe Organe mit akquisitorischer Funktion (indirekter Vertrieb):',
    points: ['Vertragshändler', 'Franchisepartner', 'Absatzhelfer', 'Absatzmittler'],
  },
  'mc-absatzmittler': { short: 'Groß- und Einzelhandel – erwerben (anders als Absatzhelfer) Eigentum an den Produkten.' },
  'mc-vertriebsweglaenge': { short: 'Je mehr Vertriebsorgane zwischen Hersteller und Endverbraucher, desto länger der Vertriebsweg; direkter Vertrieb = nullstufig.' },
  'mc-horizontale-gestaltung': { short: 'Zahl der unterschiedlichen Absatzmittler je Absatzstufe (die vertikale Gestaltung betrifft die Länge der Kanäle).' },
  'mc-breite': {
    short: 'Hängt von der Zahl der gewählten Vertriebskanäle ab (Homburg 2017):',
    points: ['Einkanalsystem', 'Mehrkanalvertrieb (Multichannel)', 'Omnichannel'],
  },
  'mc-omnichannel': { short: 'Über alle Kanäle vernetzt und konsistent – Kanäle werden nahtlos verknüpft für ein durchgängiges Kundenerlebnis (z. B. Click & Collect).' },
  'mc-distributionsgrad': {
    short: 'Breite innerhalb eines Vertriebswegs – je mehr Organe pro Stufe, desto intensiver:',
    points: [
      'intensiv – sehr viele Partner, Convenience Goods',
      'selektiv – mehrere Partner, Shopping Goods',
      'exklusiv – sehr wenige Partner, Specialty Goods',
    ],
  },
  'mc-einflussfaktoren-vertrieb': {
    short: 'Sieben Einflussfaktoren:',
    points: [
      'Produkt – Erklärungsbedarf, Bedarfshäufigkeit, Transport-/Lagerfähigkeit, Kundendienst',
      'Unternehmen – Größe, Finanzkraft, Erfahrung, Marktstellung, Strategie',
      'Markt – Marktposition und Wachstum der Vertriebskanäle',
      'Kunden – Einkaufsverhalten',
      'Absatzmittler – Bindung, Flexibilität, Standort, Größe, Image, Kosten',
      'Konkurrenz – deren Vertriebsstrategie',
      'Umfeld – Technologie, Gesetzgebung, soziokultureller Wandel',
    ],
  },
};
