import { Concept } from '@/lib/types';

/**
 * Kapitel 1 – Grundlagen des Marketings (PDF S. 1–6).
 * Alle Inhalte (Definitionen, Einordnungen, Beispiele) stammen aus dem Skript.
 */
export const concepts1: Concept[] = [
  // ---------- 1.1 Markt und Austauschprozesse (S. 1) ----------
  {
    id: 'mc-marketing', chapterId: 'm1', term: 'Marketing',
    definition: 'Abgeleitet vom englischen „(to) market“ – bedeutet gleichzeitig Markt und vermarkten. AMA (2017): „Marketing is an organizational function and a set of processes for creating, communicating, and delivering value to customers and for managing relationships in ways that benefit the organization and its stakeholders.“',
    context: 'Der Markt ist sowohl Ziel- als auch Bezugsobjekt des Marketings: einerseits Ziel, Märkte zu schaffen und zu beeinflussen, andererseits geben Märkte die Rahmenbedingungen für das effiziente und effektive Gestalten von Austauschprozessen vor. Die Definition war nie einheitlich oder konstant und wird kontinuierlich an reale Marktverhältnisse angepasst.',
    synonyms: ['Marketingdefinition', 'AMA-Definition'],
  },
  {
    id: 'mc-markt', chapterId: 'm1', term: 'Markt',
    definition: '„Gesamtheit aller Käufer und Verkäufer, die sich mit dem Handel eines bestimmten Produkts oder einer Produktkategorie beschäftigen“ (Kotler/Keller/Opresnik 2015).',
    context: 'Markt als Ziel- und Bezugsobjekt des Marketings: Ziel ist es, Märkte zu schaffen und zu beeinflussen; zugleich geben Märkte die Rahmenbedingungen für das effiziente und effektive Gestalten von Austauschprozessen vor.',
    synonyms: ['Markt als Ziel- und Bezugsobjekt'],
  },
  {
    id: 'mc-austausch', chapterId: 'm1', term: 'Austausch',
    definition: 'Kommt zustande, wenn mindestens zwei Parteien etwas besitzen, das für den jeweils anderen von so großem Nutzen ist, dass er/sie bereit ist, sich dafür von seinem Eigentum zu trennen.',
    context: 'Aus dem Austausch ergeben sich die zwei zentralen theoretischen Leitideen der Marketingwissenschaft: Gratifikationsprinzip und Knappheitsprinzip.',
    synonyms: ['Austauschprozess'],
  },
  {
    id: 'mc-gratifikation', chapterId: 'm1', term: 'Gratifikations- und Knappheitsprinzip (Leitideen)',
    definition: 'Aus dem Austausch ergeben sich die zwei zentralen theoretischen Leitideen der Marketingwissenschaft: Gratifikationsprinzip – der Austausch sollte für beide Seiten vorteilhaft sein (Nachfrager- und Anbieternutzen maximieren); Knappheitsprinzip – die im Tausch gehandelten Ressourcen sind knapp, also nicht unbegrenzt vorhanden.',
  },
  {
    id: 'mc-kaeufermarkt', chapterId: 'm1', term: 'Käufermarkt',
    definition: 'Markt mit mehr Angebot als Nachfrage – die Käufer entscheiden frei, welches der vielen Angebote ihre Bedürfnisse am besten befriedigt.',
    context: 'Die Nachfrage bildet den Engpass. Marketing dient dazu, diesen Engpass zu bewältigen, Kunden zu gewinnen und zu binden – der Nachfrager steht im Zentrum des modernen Marketings. Die allermeisten Märkte sind heutzutage Käufermärkte.',
    example: 'Über 500 verschiedene Mineralwässer in Deutschland.',
  },

  // ---------- 1.1 Entwicklung des Marketingbegriffs (S. 1–2) ----------
  {
    id: 'mc-absatzwirtschaft', chapterId: 'm1', term: 'Absatzwirtschaft',
    definition: 'Früher in Deutschland gebräuchlicher Begriff, den der Begriff Marketing in den 1960er-Jahren ablöste. Der Begriff Marketing entstand Anfang des 20. Jahrhunderts im angloamerikanischen Sprachraum.',
    context: 'Der Übergang markiert einen Paradigmenwechsel: von Angebot zu Nachfrage bzw. vom Abverkauf produzierter Ware zur Orientierung am Kunden.',
  },
  {
    id: 'mc-evolution', chapterId: 'm1', term: 'Evolution des Marketingbegriffs',
    definition: 'Zeitliche Entwicklung des Marketingverständnisses: Verkaufsorientierung (ab ca. 1900, 1950er/60er) → Marktorientierung (1970er) → Wettbewerbsorientierung (1980er) → Umfeldorientierung (1990er) → Beziehungsorientierung (2000er) → Netzwerk- und digitale Wertschöpfungsorientierung (2010er) → Nachhaltigkeitsorientierung (2020er).',
    context: 'AIDA-Modell: Attention – Interest – Desire – Action. Deepening (1990er): soziale und ökologische Ansprüche sowie Nachhaltigkeit werden wichtiger. Broadening (1990er): Der Marketinggedanke wird zunehmend auch von nicht kommerziellen Organisationen angewendet. Die Definition war nie einheitlich oder konstant – Marketingliteratur immer im Kontext ihrer Entstehungszeit lesen.',
    synonyms: ['Entwicklung des Marketingbegriffs', 'Marketingverständnis'],
  },

  // ---------- 1.1 Marketingdefinition (S. 2–3) ----------
  {
    id: 'mc-ama-merkmale', chapterId: 'm1', term: 'Merkmale des Marketings (Zerlegung der AMA-Definition)',
    definition: 'Die AMA-Definition lässt sich in sieben Bestandteile zerlegen: organizational function (Managementfunktion mit systematischer Planung), set of processes (funktionsübergreifende Prozesse), creating/communicating/delivering (analytisch und aktionsorientiert, kreative Problemlösungen, zeitlich aufeinanderfolgende Tätigkeiten), value to customers (Kundennutzen im Fokus), managing customer relationships (Beziehungsorientierung), benefit the organization (Wertorientierung), and its stakeholders (Stakeholderorientierung).',
    synonyms: ['AMA-Definition Bestandteile'],
  },
  {
    id: 'mc-kundennutzen', chapterId: 'm1', term: 'Kundennutzen (Nettonutzen)',
    definition: 'Differenz von Aufwand und erhaltenem Wert aus Sicht des Kunden.',
    context: 'Zentraler Fokus der AMA-Definition („value to customers“): systematische Auseinandersetzung mit dem Kunden und seinen Bedürfnissen.',
    synonyms: ['Nettonutzen', 'Kundennutzen'],
  },
  {
    id: 'mc-funktional', chapterId: 'm1', term: 'Funktionaler Marketingbegriff',
    definition: 'Marketing als systematischer Planungsprozess: betriebswirtschaftliche Grundfunktion bzw. Abteilung, gleichrangig z. B. mit Produktion oder Finanzierung.',
    context: 'Führt zum Aufbau spezifischer Kompetenzen wie Marktforschung, Marketing-Automation oder Kundenbindung.',
    confusableWith: ['Führungsorientierter Marketingbegriff', 'Aktivitätenorientierter Marketingbegriff'],
  },
  {
    id: 'mc-fuehrung', chapterId: 'm1', term: 'Führungsorientierter Marketingbegriff',
    definition: 'Marketing als Leitphilosophie: Denkhaltung bzw. Leitkonzept der Unternehmensführung – alle betrieblichen Funktionen werden am Markt ausgerichtet, alle marktrelevanten Ressourcen und Fähigkeiten koordiniert zur Schaffung von Kundennutzen eingesetzt.',
    context: 'Jeder Mitarbeiter sollte die Kundenbedürfnisse berücksichtigen.',
    confusableWith: ['Funktionaler Marketingbegriff', 'Aktivitätenorientierter Marketingbegriff'],
  },
  {
    id: 'mc-aktivitaet', chapterId: 'm1', term: 'Aktivitätenorientierter Marketingbegriff',
    definition: 'Marketing als Sozialtechnologie: Fokus auf die Aktivitäten des Marketingmix – Marketing als „Werkzeugkasten“.',
    context: 'Es geht nicht nur darum, Bedürfnisse zu erkennen und zu befriedigen, sondern die Nachfragesituation gezielt zu beeinflussen.',
    confusableWith: ['Funktionaler Marketingbegriff', 'Führungsorientierter Marketingbegriff'],
  },
  {
    id: 'mc-marketingmix', chapterId: 'm1', term: 'Marketingmix (vier Ps)',
    definition: 'Gesamtheit von Produkt-, Preis-, Promotions- und Vertriebspolitik (Place) – oft auch „vier Ps“: Product, Price, Place, Promotion.',
    context: 'Als operative Marketingplanung (Schritt 4 des Marketingmanagements): Product (Leistungs-/Programmpolitik), Price (Preis-/Konditionspolitik), Place (Vertriebspolitik), Promotion (Kommunikationspolitik). In den 1950er/1960er-Jahren als Konzept der „4 Ps“ entwickelt.',
    synonyms: ['vier Ps', '4 Ps'],
  },
  {
    id: 'mc-marketing-automation', chapterId: 'm1', term: 'Marketing-Automation',
    definition: 'Automatisierte Abläufe zur Kundenansprache, gesteuert über Software.',
    example: 'Automatische E-Mail-Kampagnen nach einem Kauf.',
  },

  // ---------- 1.1 Transaktionales vs. beziehungsorientiertes Marketing (S. 3) ----------
  {
    id: 'mc-transaktional', chapterId: 'm1', term: 'Transaktionales Marketing',
    definition: 'Klassische Marktbearbeitung mithilfe der vier Ps – Blick vom Unternehmen nach außen; das Unternehmen reagiert auf das Marktgeschehen, um Geschäftsabschlüsse zu tätigen (reaktiver Blickwinkel).',
    context: 'Vergleich: kurzfristig; Marketingobjekt Produkt; Ziel Kundenakquisition; Strategie Leistungsdarstellung; Erfolgsgrößen Absatz, Umsatz, Gewinn, Deckungsbeitrag, Kosten.',
    confusableWith: ['Beziehungsmarketing'],
    synonyms: ['Transaktionsmarketing'],
  },
  {
    id: 'mc-beziehung', chapterId: 'm1', term: 'Beziehungsmarketing',
    definition: 'Nicht die einzelne Transaktion, sondern die Kundenbeziehung an sich steht im Mittelpunkt – aktive Analyse, Gestaltung und Kontrolle guter Beziehungen mit den Anspruchsgruppen.',
    context: 'Vergleich: langfristig; Marketingobjekt Produkt und Interaktion; Ziele Kundenakquisition, -bindung, -rückgewinnung; Strategie Dialog; Erfolgsgrößen zusätzlich Kundenwert und Kundendeckungsbeitrag. Die Erkenntnis stammt aus Dienstleistung und B2B – Paradigmenwechsel vom Transaktions- zum Beziehungsmarketing.',
    example: 'Friseur, Autowerkstatt oder Steuerberater werden nicht nur rational nach Preis und Qualität ausgewählt, sondern wegen der über Jahre aufgebauten vertrauensvollen Beziehung.',
    confusableWith: ['Transaktionales Marketing', 'Evolution des Marketingbegriffs'],
    synonyms: ['beziehungsorientiertes Marketing'],
  },
  {
    id: 'mc-b2b', chapterId: 'm1', term: 'Business-to-Business-Marketing (B2B)',
    definition: 'Marketing, bei dem die Konsumenten keine privaten Endverbraucher, sondern Organisationen sind.',
    synonyms: ['B2B', 'B2B-Marketing'],
  },
  {
    id: 'mc-drei-rs', chapterId: 'm1', term: 'Drei Rs',
    definition: 'Strukturierung des Marketingmix zusätzlich nach der Phase der Geschäftsbeziehung: Recruitment (Kundenakquise durch Dialog und Interaktion), Retention (Kundenbindung durch Erhöhung der Kundenzufriedenheit) und Recovery (Rückgewinnung abgewanderter Kunden durch gezielte Maßnahmen, z. B. persönliche Gespräche).',
    synonyms: ['Recruitment', 'Retention', 'Recovery'],
  },
  {
    id: 'mc-akquise', chapterId: 'm1', term: 'Akquise / Akquisition',
    definition: 'Maßnahmen der Kundengewinnung.',
    synonyms: ['Kundenakquisition', 'Akquise'],
  },

  // ---------- 1.2 Markenführung (S. 3–4) ----------
  {
    id: 'mc-markenaufbau', chapterId: 'm1', term: 'Starke Marken aufbauen (vier Schritte)',
    definition: 'Marketingmanager erschaffen, verbessern und schützen Marken meist in vier groben Schritten (Kotler/Keller/Opresnik 2015): 1. Markenpositionierung identifizieren und aufbauen, 2. Markenmarketing planen und umsetzen, 3. Markenleistung messen und interpretieren, 4. Markenwert aufbauen und aufrechterhalten.',
    context: 'Der Aufbau starker Marken ist ein zentrales Ziel des Marketings.',
  },
  {
    id: 'mc-branding', chapterId: 'm1', term: 'Markenführung (Branding)',
    definition: 'Markenführung wurzelt nicht in akademischer Theorie, sondern wurde pragmatisch und schrittweise in Werbeagenturen entwickelt; die großen Agenturen nutzen bis heute eigene Markenmodelle – daher gibt es keine einheitliche Definition.',
    context: 'Marken dürfen nicht mit Produkten gleichgesetzt werden: Sie haben ein „Eigenleben“ entwickelt und finden heute auch für Veranstaltungen, Dienstleistungen, Menschen und Orte Anwendung.',
    example: 'Musikfestival „Rock am Ring“, Städtemarketing.',
    synonyms: ['Branding'],
  },
  {
    id: 'mc-marke', chapterId: 'm1', term: 'Marke (juristische Definition und Marketingsicht)',
    definition: 'Juristische Definition (AMA 2017): „A brand is a ‚Name, term, design, symbol, or any other feature that identifies one seller’s good or service as distinct from those of other sellers’“ – für Marketingmanager wenig hilfreich. Marketingsicht: Fokus auf die Wirkung von Marken – Vermittlung von Werten, Aufbau einer Beziehung mit dem Kunden und die daraus resultierende erhöhte Zahlungsbereitschaft.',
    context: 'Definition nach Kapferer (2012): „[A] name that symbolizes a long-term engagement, crusade or commitment to a unique set of values, embedded into products, services and behaviors, which make the organization, person or product stand apart and stand out“.',
    synonyms: ['Marke', 'Brand'],
  },
  {
    id: 'mc-brandequity', chapterId: 'm1', term: 'Brand Equity (Wert der Marke)',
    definition: 'Einigkeit in der Literatur: Marken schaffen Werte und stellen damit selbst einen Wert dar – Brand Equity.',
    context: 'Werden kurzfristige verkaufsfördernde Maßnahmen (z. B. Preisreduktionen) überbetont, kann die Marke an Wert verlieren.',
    synonyms: ['Markenwert', 'Wert der Marke'],
  },
  {
    id: 'mc-markenvorteile', chapterId: 'm1', term: 'Reale Marketingvorteile durch Markenführung',
    definition: 'Verbesserte Wahrnehmung der Produktleistung, stärkere Kundentreue, geringere Verwundbarkeit durch Marketingaktivitäten der Wettbewerber und durch Marketingkrisen, größere Margen, unelastischere Kundenreaktionen auf Preiserhöhungen, elastischere Kundenreaktionen auf Preissenkungen, steigende Handelskooperationen und Unterstützungsleistungen, höhere Effektivität der Marketingkommunikation, mögliche Lizenzierungschancen, zusätzliche Markenerweiterungschancen, leichtere Personalbeschaffung und -bindung, höhere Marktrendite.',
  },

  // ---------- 1.2 Positionierung im Markt (S. 4) ----------
  {
    id: 'mc-positionierung', chapterId: 'm1', term: 'Positionierung',
    definition: 'Eine Marke zu positionieren bedeutet zu bestimmen, wie diese von den Konsumenten im Vergleich mit Wettbewerbsangeboten wahrgenommen werden soll – Kern jeder Marketingstrategie.',
  },
  {
    id: 'mc-relevante-wettbewerber', chapterId: 'm1', term: 'Relevante Wettbewerber (direkter und indirekter Wettbewerb)',
    definition: 'Konkurrenten, die die gleiche Zielgruppe mit vergleichbaren Angeboten bedienen – schließt direkten und indirekten Wettbewerb ein.',
    example: 'Für Gerolsteiner Naturell sind stille Wasser direkte, sprudelnde Wasser und andere Getränke indirekte Wettbewerber.',
  },
  {
    id: 'mc-pop-pod', chapterId: 'm1', term: 'Points of Parity / Points of Difference',
    definition: 'Innerhalb des Wettbewerbsrahmens bestimmt (Keller/Swaminathan 2019): Points of Parity sind Attribute, hinsichtlich derer sich die Marke mit dem Wettbewerb die Waage hält; Points of Difference sind Attribute, die besser sind als die Angebote der Konkurrenz.',
    example: 'Fiji Water: Herkunft und angeblich besondere Reinheit als Point of Difference, gezielt über die Promotionsstrategie kommuniziert.',
    synonyms: ['Points of Parity', 'Points of Difference'],
  },

  // ---------- 1.2 Kostenführer- vs. Qualitätsführerstrategie (S. 5) ----------
  {
    id: 'mc-abnehmergerichtet', chapterId: 'm1', term: 'Abnehmergerichtete Strategie',
    definition: 'Langfristiger Verhaltensplan, der durch die Realisierung eines oder mehrerer Wettbewerbsvorteile in der Wahrnehmung der Kunden ihr Verhalten beeinflusst bzw. stimuliert (Bruhn 2016).',
    context: 'Grundsätzlich zwei Wahlmöglichkeiten: besser oder billiger als die Konkurrenz sein.',
  },
  {
    id: 'mc-qualitaetsfuehrer', chapterId: 'm1', term: 'Qualitätsführerschaft (Differenzierungsstrategie)',
    definition: 'Bessere Angebote als die Konkurrenz – bezogen auf Qualität, Marke, Zusatzleistungen oder Art der Kundenbeziehung.',
    context: 'In der Strategiematrix: Die Strategie der Qualitätsführerschaft realisiert Leistungsvorteile (Qualität, Service) auf dem Gesamtmarkt.',
    example: 'Volvic, Evian.',
    confusableWith: ['Kostenführerstrategie', 'Matrix von vier Strategierichtungen'],
    synonyms: ['Differenzierungsstrategie', 'Strategie der Qualitätsführerschaft'],
  },
  {
    id: 'mc-kostenfuehrer', chapterId: 'm1', term: 'Kostenführerstrategie',
    definition: 'Vergleichbare Produkte zu einem geringeren Preis – Nutzung von Kostendegressionseffekten (Standardisierung, Verfahrensinnovation, effiziente Vertriebswege), damit trotz niedriger Preise zufriedenstellende Gewinne entstehen.',
    confusableWith: ['Qualitätsführerschaft (Differenzierungsstrategie)'],
    synonyms: ['Kostenführerschaft'],
  },
  {
    id: 'mc-kostendegression', chapterId: 'm1', term: 'Kostendegression',
    definition: 'Die Stückkosten eines Guts sinken mit jeder zusätzlich produzierten Einheit dieses Guts.',
    context: 'Grundlage der Kostenführerstrategie (z. B. durch Standardisierung, Verfahrensinnovation, effiziente Vertriebswege).',
    confusableWith: ['Economies of Scale'],
  },
  {
    id: 'mc-nische', chapterId: 'm1', term: 'Nischenstrategie',
    definition: 'Alternativer dritter Weg: Fokus auf eine Marktnische, die von Wettbewerbern bisher vernachlässigt wurde (etwa weil sie unattraktiv ist).',
    context: 'Da es in gesättigten Märkten nur wenige Nischen gibt, wird die Nischenstrategie in die Dualität Kosten- vs. Qualitätsführerschaft einbezogen – es entsteht eine Matrix von vier Strategierichtungen.',
  },
  {
    id: 'mc-strategiematrix', chapterId: 'm1', term: 'Matrix von vier Strategierichtungen',
    definition: 'Kombination von Marktabdeckung (Gesamtmarkt oder Teilmarkt) und zentralem Vorteil (Qualität oder Preis): Strategie der Qualitätsführerschaft (Gesamt/Qualität), Strategie der aggressiven Kostenführerschaft (Gesamt/Preis), Strategie der selektiven Qualitätsführerschaft (Teil/Qualität), Strategie der selektiven Kostenführerschaft (Teil/Preis).',
  },

  // ---------- 1.3 Marketingmanagement (S. 5–6) ----------
  {
    id: 'mc-marketingmanagement', chapterId: 'm1', term: 'Marketingmanagement',
    definition: 'Umsetzung und Durchführung des modernen, erweiterten Marketingverständnisses in einem konkreten Unternehmen. AMA (2017): „Marketing Management is the process of setting goals for an organization (considering internal resources and market opportunities), the planning and execution of activities to meet these goals, and measuring progress toward their achievement.“',
    context: 'Berücksichtigt die vier zentralen Orientierungspunkte des Marketings: das Unternehmen selbst, den Kunden, die Wettbewerber und das gesellschaftliche Umfeld. Ziel: aus der Kombination von Unternehmensressourcen und Umfeldgegebenheiten Aktivitäten ableiten, die die Kundenbedürfnisse besser erfüllen als die Konkurrenz.',
  },
  {
    id: 'mc-6schritte', chapterId: 'm1', term: 'Sechs Schritte des Marketingmanagements',
    definition: '1: Situationsanalyse, 2: Marketingziele, 3: Marketingstrategie, 4: Marketinginstrumente, 5: Marketingimplementierung, 6: Marketingcontrolling.',
    example: 'Fiktives Getränkeunternehmen „Sitt“ führt das stille Wasser „isso“ für Jugendliche (12–19 Jahre) ein.',
  },
  {
    id: 'mc-marktsegment', chapterId: 'm1', term: 'Marktsegment',
    definition: 'Teil eines Markts, der bestimmte Merkmale aufweist und relativ homogen ist.',
  },
];
