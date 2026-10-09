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
  'mc-marketing': {
    short: 'Von „(to) market“ = Markt und vermarkten. Definition der AMA (2017):',
    points: [
      '„Marketing is an organizational function and a set of processes',
      'for creating, communicating, and delivering value to customers',
      'and for managing relationships in ways that benefit the organization and its stakeholders.“',
    ],
  },
  'mc-markt': { short: 'Gesamtheit aller Käufer und Verkäufer, die mit einem bestimmten Produkt bzw. einer Produktkategorie handeln (Kotler/Keller/Opresnik 2015).' },
  'mc-austausch': { short: 'Mind. zwei Parteien besitzen etwas, das für die jeweils andere so nützlich ist, dass sie sich dafür vom eigenen Eigentum trennt.' },
  'mc-gratifikation': {
    short: 'Die zwei zentralen theoretischen Leitideen der Marketingwissenschaft:',
    points: [
      'Gratifikationsprinzip – Austausch für beide Seiten vorteilhaft: Nachfrager- und Anbieternutzen maximieren',
      'Knappheitsprinzip – die im Tausch gehandelten Ressourcen sind knapp, nicht unbegrenzt vorhanden',
    ],
  },
  'mc-absatzwirtschaft': { short: 'Früherer deutscher Begriff, den „Marketing“ in den 1960er-Jahren ablöste – Paradigmenwechsel von Angebot zu Nachfrage.' },
  'mc-evolution': {
    short: 'Entwicklung des Marketingverständnisses (Tabelle im Skript):',
    points: [
      'ab ca. 1900, 1950er/60er: handwerkliches Verständnis (AIDA, 4 Ps) – Verkaufsorientierung',
      '1970er: klassisches ökonomisches Verständnis – Marktorientierung',
      '1980er: langfristiges strategisches Verständnis – Wettbewerbsorientierung',
      '1990er: modernes, erweitertes Verständnis (Deepening, Broadening) – Umfeldorientierung',
      '2000er: generisches Verständnis (Sozialtechnik) – Beziehungsorientierung',
      '2010er: Netzwerk- und digitale Wertschöpfungsorientierung (Uber, Netflix, Spotify)',
      '2020er: Nachhaltigkeitsorientierung',
    ],
  },
  'mc-ama-merkmale': {
    short: 'Die AMA-Definition in sieben Bestandteilen:',
    points: [
      'organizational function – Managementfunktion, systematische Planung',
      'set of processes – funktionsübergreifende Prozesse',
      'creating, communicating, delivering – analytisch und aktionsorientiert',
      'value to customers – Kundennutzen im Fokus',
      'managing customer relationships – Beziehungsorientierung',
      'benefit the organization – Wertorientierung (Umsatz, Gewinn, Rendite; auch nicht kommerziell)',
      'and its stakeholders – Stakeholderorientierung (externe Anspruchsgruppen)',
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
  'mc-marke': {
    short: 'Zwei Sichtweisen auf die Marke:',
    points: [
      'Juristisch (AMA 2017): „Name, term, design, symbol, or any other feature …“ – für Marketer wenig hilfreich',
      'Marketingsicht: Wirkung – Werte vermitteln, Beziehung aufbauen, erhöhte Zahlungsbereitschaft',
    ],
  },
  'mc-brandequity': {
    short: 'Marken schaffen Werte und stellen damit selbst einen Wert dar.',
    points: [
      'Messung: indirekt (qualitative/quantitative Marktforschung) oder direkt (Experimente, holistische Methoden)',
      'Voraussetzung (Aaker 1991): Marke (er)kennen, positive Assoziationen, Treue, als hochwertig wahrnehmen',
      'Starke Marken entstehen durch einen konsistenten Marketingmix – jede Taktik ist markenbildend',
    ],
  },
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
  'mc-positionierung': {
    short: 'Festlegen, wie die Marke von den Konsumenten im Vergleich zum Wettbewerb wahrgenommen werden soll – Kern jeder Marketingstrategie.',
    points: [
      'Zwei Schritte: (1) relevante Wettbewerber ermitteln, (2) Wettbewerbsvorteil bestimmen',
      'Vier Fragen (Kapferer 2012): Zielgruppe? Wettbewerber? Wettbewerbsvorteil? Wodurch konkret?',
    ],
  },
  'mc-relevante-wettbewerber': {
    short: 'Konkurrenten, die die gleiche Zielgruppe mit vergleichbaren Angeboten bedienen – schließt direkten und indirekten Wettbewerb ein.',
    points: [
      'Indirekter Wettbewerb: unterschiedliche Produkte, die jedoch die gleichen Bedürfnisse erfüllen',
    ],
  },
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
      'Gesamtmarkt + Qualität: Qualitätsführerschaft – Leistungsvorteile (Volvic, Evian)',
      'Teilmarkt + Qualität: selektive Qualitätsführerschaft – Nische, hoher Preis (Voss, Fiji)',
      'Gesamtmarkt + Preis: aggressive Kostenführerschaft – niedrige Preise (Frische Brise, Handelsmarken)',
      'Teilmarkt + Preis: selektive Kostenführerschaft – Teilmarkt besonders günstig (regionale Marken)',
    ],
  },
  'mc-marketingmanagement': {
    short: 'Umsetzung und Durchführung des modernen, erweiterten Marketingverständnisses in einem konkreten Unternehmen. AMA (2017):',
    points: [
      '„the process of setting goals for an organization (considering internal resources and market opportunities),',
      'the planning and execution of activities to meet these goals,',
      'and measuring progress toward their achievement.“',
    ],
  },
  'mc-6schritte': {
    short: 'Sechs Schritte (Beispiel „Sitt“ mit dem Wasser „isso“):',
    points: [
      '1. Situationsanalyse – eigene Potenziale, gesellschaftliches Umfeld, Kunden, Wettbewerber',
      '2. Marketingziele – ökonomisch, psychografisch (Zufriedenheit, Image), sozial, Umwelt',
      '3. Marketingstrategie – strategische Planung: Märkte/Segmente, Marktbearbeitung',
      '4. Marketinginstrumente – operative Planung: vier Ps (+ People, Processes, Physical Facilities)',
      '5. Marketingimplementierung – Realisierung: Verantwortlichkeiten, Führungskonzepte, Budgets',
      '6. Marketingcontrolling – Zielerreichung evaluieren, Maßnahmen ggf. anpassen',
    ],
  },
  'mc-produktpolitik': {
    short: 'Alle Entscheidungen zur Gestaltung des Leistungsangebots (Bruhn 2016) – zentrale Frage: Was soll vermarktet werden?',
    points: [
      'Ziele: ökonomisch (verkaufte Mengen, Segmente) oder psychologisch (Image, Einstellungen)',
    ],
  },
  'mc-produkt': { short: 'Bündel von Attributen (Ausstattung, Funktionen, Nutzen, Verwendung), das ausgetauscht oder verwendet werden kann – materiell oder immateriell.' },
  'mc-produktebenen-leistung': {
    short: 'Drei Ebenen (Abbildung, Beispiel E-Bike) – Ziel: Kundennutzen maximieren:',
    points: [
      'Kernprodukt – Kernleistung: Bedürfnisbefriedigung bzw. Problemlösung (Fortbewegung)',
      'Reales Produkt – sichtbar, kaufbar: Design, Qualität, Funktionen, Verpackung, Markenname',
      'Erweitertes Produkt – alle Zusatzleistungen wie Lieferung, Garantie, Service (Software-Updates)',
    ],
  },
  'mc-zusatznutzen': {
    short: 'Nutzen über den Grundnutzen hinaus:',
    points: [
      'sozialer Nutzen / Geltungsnutzen – dem Anlass angemessen',
      'Erbauungsnutzen – gut sitzen, der Figur schmeicheln',
      'emotionaler Nutzen – Marke, gutes Gefühl',
    ],
  },
  'mc-nutzenkategorien': {
    short: 'Je mehr Nutzenkomponenten, desto höher die Kategorie (Abbildung, Beispiel Hose):',
    points: [
      'Grundnutzen – bekleiden und wärmen (ausreichend großes Stück Stoff)',
      'generisches Produkt – Hosenbeine geschneidert',
      'erwartetes Produkt – bequemer Sitz, gefälliges Design',
      'augmentiertes Produkt – Markenname, wasserabweisend, Thermo, modisch',
      'potenzielles Produkt – Extrafunktionalitäten, „smart clothing“',
    ],
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
    points: [
      'Materialität – Sachgüter (Bleistift, Auto) vs. Dienstleistungen (Haarschnitt, Ölwechsel)',
      'Konsumentengruppe – Konsumgüter (B2C) vs. Investitionsgüter (B2B); Büromaterial: beides',
      'Nutzungsdauer – Verbrauchsgüter (Lebensmittel) vs. Gebrauchsgüter (Fahrrad)',
      'Nutzungshäufigkeit – täglicher (Zahnpasta) vs. aperiodischer Bedarf (Weihnachtsbäume)',
      'Kaufgewohnheit – Convenience, Shopping, Specialty und Unsought Goods',
    ],
  },
  'mc-produktgestaltung': {
    short: 'Entwickelt die Gesamtheit von Kern- und Zusatzleistungen (Beispiel Pampers):',
    points: [
      'Technisch-funktionale Eigenschaften – Kernnutzen bereitstellen (saugstark und sanft)',
      'Produktdesign – äußere Gestaltung durch Farbe, Form (Schnitt, Farben, Muster)',
      'Produktverpackung – schützen, anpreisen, anwenderfreundlich, leicht und ökologisch entsorgbar',
      'Qualitätsmanagement – funktional-technische Eigenschaften dauerhaft sichern',
      'Servicepolitik – Garantien, Lieferung, Kundendienst, Value Added Services (Babyratgeber)',
    ],
  },
  'mc-produktdiff': { short: 'Abgewandelte Versionen sprechen neue Marktsegmente an – anders als bei der Variation erweitert sich das Produktprogramm, denn beide Varianten werden angeboten.' },
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
    points: [
      '1. Einführung – hohe Investitionen, geringe Umsätze',
      '2. Wachstum – überdurchschnittlicher Zuwachs, Gewinnzone wird erreicht',
      '3. Reife – Wachstumsraten sinken; Erfahrungskurveneffekte und Economies of Scale am höchsten',
      '4. Sättigung – Markt gesättigt, Umsätze gehen zurück',
      '5. Verfall – kaum noch Bedarf, Umsatz stark rückläufig',
    ],
  },
  'mc-erfahrungskurve': { short: 'Effizienzsteigerung, weil bereits Erfahrung im Markt und mit dem Produkt gesammelt wurde.' },
  'mc-economies-of-scale': { short: 'Betriebsgrößenvorteile – z. B. Mengenrabatte im Einkauf, sinkende Stückkosten durch bessere Verwaltungskostenumlage.' },
  'mc-skurve': {
    short: 'Foster (1986): sensibilisiert das Innovationsmanagement für technologische Diskontinuitäten.',
    points: [
      'Jede Technologie stößt an eine Leistungsgrenze (Größe, Komplexität, Materialeigenschaften)',
      'und wird durch eine neue Technologie ersetzt (Technologiesprung)',
      'Der Produktlebenszyklus (Variable Zeit) erklärt solche Technologiesprünge nicht',
      'Konsequenz: Grenzen abschätzen, F&E kontinuierlich neue Produkte vorbereiten lassen',
    ],
  },
  'mc-innovatoren': { short: 'Hochinformiert, großes Interesse – oft Tech-Blogger, YouTuber, Fachexperten und damit einflussreiche Multiplikatoren (Influencer).' },
  'mc-diffusion': {
    short: 'Beschreibt die kumulierte Adoption einer Neuerung im Zeitablauf.',
    points: [
      'Abbildung: Innovatoren 2,5 %, Frühadopter 13,5 %, frühe und späte Mehrheit je 34 %, Nachzügler 16 %',
      'Verlauf: zunächst wenige, dann steigt die Zahl der Neukäufer stark an, gegen Ende Abnahme',
      'Anstieg: Produkt bekannter, Unsicherheit und Preise sinken, Verfügbarkeit steigt, Empfehlungen',
      'Verlangsamung am Schluss: Markt weitgehend gesättigt',
    ],
  },
  'mc-integrierte-kommunikation': { short: 'Kommunikationsaktivitäten integrieren und abstimmen – so macht kohärente Kommunikation Marken bekannt und füllt sie mit Inhalt.' },
  'mc-komm-aufgaben': {
    short: 'In Dialog mit den Konsumenten treten, um sie …',
    points: [
      'über Produkte und Marken zu informieren',
      'von Produkten und Marken zu überzeugen',
      'an Produkte und Marken zu erinnern',
    ],
  },
  'mc-komm-ziele': {
    short: 'Ökonomische Ziele (Marktanteil, Kundenzahl, Absatz, Rentabilität) betreffen den ganzen Marketingmix. Reine Kommunikationsziele (vorökonomisch):',
    points: [
      'Kategoriebedürfnis',
      'Bekanntheitsgrad und Image',
      'Einstellungen zum Unternehmen und zu den Produkten',
      'Kaufabsicht',
    ],
  },
  'mc-kategoriebeduerfnis': { short: 'Schaffung neuer Kategorien: Innovative Produkte lösen Probleme, die Konsumenten noch nicht bewusst sind – das Bedürfnis muss erst etabliert werden.' },
  'mc-8schritte-komm': {
    short: 'Kommunikationsprogramme in acht Schritten (Kotler/Keller/Opresnik 2015):',
    points: [
      '1. Zielgruppe auswählen – deckungsgleich mit dem Marktsegment oder Teilmenge',
      '2. Kommunikationsziele festlegen – konkrete Ziele für einen bestimmten Zeitraum',
      '3. Botschaft bestimmen – was soll wie und von wem gesagt werden?',
      '4. Kanäle auswählen – persönliche vs. Massenkanäle (Grenzen verwischen)',
      '5. Budget festlegen – empfehlenswert: auf Basis von Zielen und Aufgaben',
      '6. Kommunikationsmix gestalten – durchdachte Kombination der Werkzeuge',
      '7. Ergebnisse messen – Befragungen, CTR, Conversion Rate, Engagement Rate',
      '8. Prozess steuern – überwachen, koordinieren, anpassen (Marketing-Automatisierung)',
    ],
  },
  'mc-kpis': {
    short: 'Digitale Messgrößen für die Kommunikationsergebnisse (Schritt 7):',
    points: [
      'Click-Through-Rate (CTR) – Klickhäufigkeit von Anzeigen (Banner gesehen, 1 % klickt)',
      'Conversion Rate – Anteil der Besucher mit Zielhandlung (100 Besucher, 5 Käufe = 5 %)',
      'Engagement Rate – wie aktiv Nutzer reagieren (Kommentare, Shares, Likes pro Post)',
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
      'Auswahl hängt ab von Marktstellung, Produktmarkt, Zielgruppe, Kaufentscheidung, Lebenszyklus, Budget',
    ],
  },
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
  'mc-wom': {
    short: 'Konsumenten tauschen sich untereinander über Erfahrungen mit Unternehmen und Produkten aus – zunehmend elektronisch (persönlich).',
    points: [
      'Buzz Marketing – Mundpropaganda in Foren, auf Bewertungs- und Social-Media-Plattformen',
      'Viral Marketing – Verbreitung über Influencer oder Onlinemedien multipliziert (viraler Effekt)',
      'Influencer-Marketing – Kooperation mit reichweitenstarken Personen (Glaubwürdigkeit nutzen)',
    ],
  },
  'mc-preispolitik': {
    short: 'Alle Entscheidungen zur Festlegung des Entgelts für Leistungen (Homburg 2017) – inkl. Zahlungsbedingungen und Rabatten, daher auch Kontrahierungspolitik.',
    points: [
      'Richtet sich nach Unternehmenszielen (Umsatz, Gewinn, Marktanteil, Rentabilität)',
      'sowie nach handelsbezogenen (Präsenz im Handel) und konsumentenbezogenen Zielen (Preiswahrnehmung)',
    ],
  },
  'mc-einflussfaktoren-preis': {
    short: 'Fünf Einflussfaktoren:',
    points: [
      'Käufer – Zahlungsbereitschaft = Preisobergrenze (Milchkaffee bei Starbucks 10–30 % teurer)',
      'Kosten – Gesamtkosten = Preisuntergrenze',
      'Konkurrenzsituation – Vergleichsportale (Idealo), relevanter Preiskorridor, Preis-Monitoring',
      'Externe Rahmenbedingungen – Handelsstruktur, gesamtwirtschaftliche Lage, saisonale Schwankungen',
      'Psychologische Effekte – Nachkommastellen werden ignoriert: Schwellenpreise (z. B. 2,99 €)',
    ],
  },
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
      '1. preispolitischen Spielraum analysieren (Korridor zwischen Preisunter- und -obergrenze)',
      '2. Ziele festlegen',
      '3. Strategie entwickeln',
      '4. Preisinstrumente einsetzen',
      '5. Preiskontrolle – Handelsabgabe-, Endverbraucher- und Konkurrenzpreise überwachen',
    ],
  },
  'mc-preisinstrumente': {
    short: 'Koordinierter Einsatz von vier Instrumenten:',
    points: [
      'Preise',
      'Preisnachlässe – Rabatte, Boni (rückwirkend am Periodenende, z. B. Kundenkarte), Skonti',
      'Preiszuschläge – z. B. für Sonderleistungen, Lieferzeiten',
      'Zugaben von Geld-, Sachwerten, Dienstleistungen – v. a. an den Handel (Verkostungen)',
    ],
  },
  'mc-preispositionierung': {
    short: 'Bezieht sich auf die Höhe des Preises (Beispiele aus der Möbelbranche):',
    points: [
      'Hochpreisstrategie – Spitzenqualität zu Premiumpreisen (BoConcept, Seyfarth)',
      'Mittelpreisstrategie – mittleres Preisniveau bei Standardqualität (Höffner, XXXL)',
      'Niedrigpreisstrategie – Mindestqualität zu sehr geringen Preisen (Roller, Poco, Sconto)',
    ],
  },
  'mc-preiswettbewerb': {
    short: 'Ob und wie sich ein Unternehmen an der Konkurrenz orientiert:',
    points: [
      'Preisführerschaft – sehr hoher Preis, durch Marke/Qualität gerechtfertigt (Apple iPhone X)',
      'Preiskampf – niedrigster Preis am Markt (Lebensmitteldiscounter)',
      'Preisfolgerschaft – Reaktion auf den Marktführer (senkt Aldi, ziehen Norma, Netto nach)',
    ],
  },
  'mc-preisabfolge': {
    short: 'Bezieht sich auf die Preisentwicklung im Produktlebenszyklus:',
    points: [
      'Skimming (Abschöpfung) – sehr hohe Einführungspreise für Innovatoren/Frühadopter, dann senken',
      'Penetration – geringe Preise, schnell den Markt durchdringen, danach erhöhen (Rasierer/Klingen)',
    ],
  },
  'mc-preisdiff': {
    short: 'Unterschiedliche Preise für Segmente mit unterschiedlicher Zahlungsbereitschaft. Formen:',
    points: [
      'mengenmäßig – günstiger bei größeren Mengen (Kartenmacherei)',
      'zeitlich – Kapazitäten auslasten (Kinotag, Nachmittagsvorstellungen)',
      'räumlich – nach geografischen Aspekten (Benzin in Stadtstaaten günstiger)',
      'personell – für Personengruppen (Studenten, Senioren, Jugendkonto)',
      'leistungsbezogen – geringfügig geänderte Leistung (gebunden, Taschenbuch, E-Book)',
      'Sonderform Preisbündelung – günstigerer Paketpreis (MagentaEINS)',
    ],
  },
  'mc-marktorientiert': {
    short: 'Orientiert sich an den Reaktionen der Marktteilnehmer (Nachfrage, Konkurrenz) – wird der Praxis besser gerecht. Verfahren:',
    points: [
      'Break-even-Analyse – nötige Absatzmenge bis zur Gewinnschwelle bei gegebenem Preis',
      'Perceived-Value-Pricing – Preis nach dem empfundenen Wert aus Kundensicht',
      'Cournot-Preis – gewinnmaximaler Preis mithilfe der Preis-Absatz-Funktion',
    ],
  },
  'mc-dynamic': { short: 'Preise ändern sich automatisch je nach Nachfrageintensität; Algorithmen bestimmen den optimalen Preis (z. B. Uber zu Stoßzeiten).' },
  'mc-reverse': { short: 'Umgekehrtes Prinzip: Kunden nennen online Bedarf und Preisvorstellung, Unternehmen machen Angebote – sehr individuelle Preise.' },
  'mc-konditionenpolitik': {
    short: 'Endpreise werden nicht immer tatsächlich gezahlt – v. a. im B2B wichtig. Dazu zählen:',
    points: [
      'Absatzkredite – ermöglichen oder erleichtern Kunden den Kauf',
      'Lieferungs- und Zahlungsbedingungen',
      'Rabatte',
    ],
  },
  'mc-rabatte': {
    short: 'Vier Typen von Rabatten (Walsh/Deseniss/Kilian 2013):',
    points: [
      'Funktionsrabatt – für vom Handel übernommene Funktionen (Lagerung, Präsentation)',
      'Mengenrabatt – für die Bestellung größerer Mengen',
      'Zeitrabatt – abhängig von der Bestellzeit; Skonto = Sonderform für frühe Zahlung',
      'Treuerabatt – für langfristige, kontinuierliche Bestellungen',
    ],
  },
  'mc-distribution': {
    points: [
      'akquisitorische Komponente – Vertriebssystem effizient und effektiv gestalten',
      'logistische Komponente – adäquater Zugriff der Konsumenten auf die Waren',
    ],
  },
  'mc-vertriebsziele': {
    short: 'Verfügbarkeit der Leistungen sichern – drei Zielarten parallel:',
    points: [
      'psychologisch – einzigartiges, markentreues, positives Kauferlebnis',
      'versorgungsorientiert – lückenlose Verfügbarkeit',
      'ökonomisch – Absatzmenge, Preisniveau, Vertriebskosten optimieren',
      'Im Einklang mit dem übrigen Marketingmix: Leistung, Zielgruppe, Image passend',
    ],
  },
  'mc-vertriebskanal': { short: 'Alle Organisationen, die ein Produkt von der Herstellung bis zum Endverbraucher leiten und transportieren (Kotler/Keller/Opresnik 2015).' },
  'mc-push-pull': {
    points: [
      'Mittel: Absatzförderung wie Rabatte, Boni oder Exklusivrechte',
      'Digital: Retail Media (gesponserte Platzierungen, z. B. Amazon), Exklusivverträge',
      'Sinnvoll: geringe Markentreue, impulsive Entscheidung im Geschäft, klarer Produktnutzen',
    ],
  },
  'mc-pull': { short: 'Erzeugt einen Nachfragesog: Kommunikation direkt an Endkunden (Social Media, Content Marketing, SEO) zieht sie ins Geschäft oder in den Onlineshop.' },
  'mc-intermediaere': {
    points: [
      'Hersteller geben Vertriebsaufgaben an den Handel ab (Kontakte, Kompetenz, Erfahrung)',
      'Der Handel erzeugt Nachfrage, berät Kunden, übernimmt Risiko, betreibt Marktforschung',
    ],
  },
  'mc-ueberbrueckung': {
    short: 'Der Handel steigert den Kundennutzen, indem er Lücken zwischen Herstellung und Konsum überbrückt:',
    points: [
      'räumlich – Transport in die Nähe des Verbrauchsorts (Bananen aus Costa Rica, Kolumbien, Ecuador)',
      'zeitlich – Lagerung, Vorratshaltung (Bananen gekühlt, später in Reifereien nachgereift)',
      'Sortimentsgestaltung – quantitative (Menge) und qualitative Diskrepanz (andere Waren)',
    ],
  },
  'mc-disintermediation': {
    short: 'Ausschaltung von Intermediären, wenn sie keinen Zusatznutzen mehr bringen – auch um die Handelsmarge einzusparen.',
    points: [
      'Direct-to-Consumer (D2C) über E-Commerce (Adidas, „Social Brands“ auf Instagram)',
    ],
  },
  'mc-direkt-indirekt': { short: 'Das Unternehmen verkauft selbst an Endkunden über interne Vertriebsorgane (Innen-/Außendienst) – nullstufiger Vertriebsweg.' },
  'mc-indirekt': {
    short: 'Vertriebsaufgaben werden mit externen, unabhängigen Marktakteuren mit akquisitorischer Funktion geteilt (Homburg 2017).',
    points: [
      'Wahl des Vertriebsweges: Vergleichsrechnung (Handelsmarge vs. eigene Abteilung), Kunden, Wert',
      'In der Praxis oft Mischformen aus direktem und indirektem Vertrieb',
    ],
  },
  'mc-absatzmittler': { short: 'Groß- und Einzelhandel – erwerben (anders als Absatzhelfer) Eigentum an den Produkten.' },
  'mc-vertriebsweglaenge': { short: 'Je mehr Vertriebsorgane zwischen Hersteller und Endverbraucher, desto länger der Vertriebsweg; direkter Vertrieb = nullstufig.' },
  'mc-horizontale-gestaltung': { short: 'Zahl der unterschiedlichen Absatzmittler je Absatzstufe (die vertikale Gestaltung betrifft die Länge der Kanäle).' },
  'mc-breite': {
    short: 'Hängt von der Zahl der gewählten Vertriebskanäle ab (Homburg 2017):',
    points: [
      'Einkanalsystem – nur ein Vertriebsweg, z. B. über den Einzelhandel',
      'Mehrkanalvertrieb (Multichannel) – mehrere Kanäle, heute die Regel',
      'Omnichannel – über alle Kanäle vernetzt und konsistent',
    ],
  },
  'mc-omnichannel': { short: 'Über alle Kanäle vernetzt und konsistent – Kanäle werden nahtlos verknüpft für ein durchgängiges Kundenerlebnis (z. B. Click & Collect).' },
  'mc-distributionsgrad': {
    short: 'Breite innerhalb eines Vertriebswegs – je mehr Organe pro Stufe, desto intensiver:',
    points: [
      'intensiv – sehr viele Partner, Convenience Goods („Deutsche Markenbutter“)',
      'selektiv – mehrere Partner, Shopping Goods (Andechser Bio-Almbutter)',
      'exklusiv – sehr wenige Partner, Specialty Goods (Tarbiana-Trüffelbutter)',
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

/**
 * Karten, die keinen Einzelbegriff, sondern eine Aufzählung bzw. Übersicht aus dem
 * Skript enthalten (z. B. „Sechs Kriterien …“) – werden in der App als „Aufzählung“ markiert.
 */
export const overviewIds = new Set<string>([
  'mc-evolution',
  'mc-ama-merkmale',
  'mc-drei-rs',
  'mc-markenaufbau',
  'mc-markenvorteile',
  'mc-strategiematrix',
  'mc-6schritte',
  'mc-nutzenkategorien',
  'mc-qualitaetsdimensionen',
  'mc-guetertypen',
  'mc-gestaltungsfelder',
  'mc-programmstruktur',
  'mc-komm-aufgaben',
  'mc-komm-ziele',
  'mc-8schritte-komm',
  'mc-6kriterien',
  'mc-kommmix',
  'mc-pr-funktionen',
  'mc-einflussfaktoren-preis',
  'mc-preisprozess',
  'mc-preisinstrumente',
  'mc-rabatte',
  'mc-vertriebsziele',
  'mc-ueberbrueckung',
  'mc-einflussfaktoren-vertrieb',
  'mc-kpis',
]);
