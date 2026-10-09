import { Concept } from '@/lib/types';

/**
 * Kapitel 1 – Grundlagen des Marketings (PDF S. 1–6).
 * Alle Definitionen eng am Skript; Merkhilfen und Prüfungshinweise sind
 * didaktische Ergänzungen ohne neue Fachinhalte.
 */
export const concepts1: Concept[] = [
  // ---------- 1.1 Markt und Austauschprozesse (S. 1) ----------
  {
    id: 'mc-marketing', chapterId: 'm1', term: 'Marketing',
    definition: 'Abgeleitet vom englischen „(to) market“ – bedeutet gleichzeitig Markt und vermarkten. AMA (2017): „Marketing is an organizational function and a set of processes for creating, communicating, and delivering value to customers and for managing relationships in ways that benefit the organization and its stakeholders.“',
    context: 'Der Markt ist sowohl Ziel- als auch Bezugsobjekt des Marketings: einerseits Ziel, Märkte zu schaffen und zu beeinflussen, andererseits geben Märkte die Rahmenbedingungen für das effiziente und effektive Gestalten von Austauschprozessen vor. Die Definition war nie einheitlich oder konstant und wird kontinuierlich an reale Marktverhältnisse angepasst.',
    examRelevance: 'Wortherkunft, die AMA-Definition (2017) und ihre Bestandteile sowie „Markt als Ziel- und Bezugsobjekt“ erklären können.',
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
    id: 'mc-gratifikation', chapterId: 'm1', term: 'Gratifikationsprinzip',
    definition: 'Theoretische Leitidee: Der Austausch sollte für beide Seiten vorteilhaft sein – Nachfrager- und Anbieternutzen maximieren.',
    confusableWith: ['Knappheitsprinzip'],
    mnemonic: 'Gratifikation = Belohnung für BEIDE Seiten.',
  },
  {
    id: 'mc-knappheit', chapterId: 'm1', term: 'Knappheitsprinzip',
    definition: 'Theoretische Leitidee: Die im Tausch gehandelten Ressourcen sind knapp, also nicht unbegrenzt vorhanden.',
    confusableWith: ['Gratifikationsprinzip'],
  },
  {
    id: 'mc-kaeufermarkt', chapterId: 'm1', term: 'Käufermarkt',
    definition: 'Markt mit mehr Angebot als Nachfrage – die Käufer entscheiden frei, welches der vielen Angebote ihre Bedürfnisse am besten befriedigt.',
    context: 'Die Nachfrage bildet den Engpass. Marketing dient dazu, diesen Engpass zu bewältigen, Kunden zu gewinnen und zu binden – der Nachfrager steht im Zentrum des modernen Marketings. Die allermeisten Märkte sind heutzutage Käufermärkte.',
    example: 'Über 500 verschiedene Mineralwässer in Deutschland.',
    examRelevance: 'Kennzeichen (Angebot > Nachfrage, Nachfrage als Engpass, Nachfrager im Zentrum) und die Aufgabe des Marketings im Käufermarkt.',
  },

  // ---------- 1.1 Entwicklung des Marketingbegriffs (S. 1–2) ----------
  {
    id: 'mc-absatzwirtschaft', chapterId: 'm1', term: 'Absatzwirtschaft',
    definition: 'Früher in Deutschland gebräuchlicher Begriff, den der Begriff Marketing in den 1960er-Jahren ablöste. Der Begriff Marketing entstand Anfang des 20. Jahrhunderts im angloamerikanischen Sprachraum.',
    context: 'Der Übergang markiert einen Paradigmenwechsel: von Angebot zu Nachfrage bzw. vom Abverkauf produzierter Ware zur Orientierung am Kunden.',
    examRelevance: 'Paradigmenwechsel Angebot → Nachfrage benennen können.',
  },
  {
    id: 'mc-evolution', chapterId: 'm1', term: 'Evolution des Marketingbegriffs',
    definition: 'Zeitliche Entwicklung des Marketingverständnisses: Verkaufsorientierung (ab ca. 1900, 1950er/60er) → Marktorientierung (1970er) → Wettbewerbsorientierung (1980er) → Umfeldorientierung (1990er) → Beziehungsorientierung (2000er) → Netzwerk- und digitale Wertschöpfungsorientierung (2010er) → Nachhaltigkeitsorientierung (2020er).',
    context: 'Die Definition war nie einheitlich oder konstant – Marketingliteratur deshalb immer im Kontext ihrer Entstehungszeit lesen.',
    mnemonic: 'V-M-W-U-B-N-N: „Viele Manager Wollen Umsatz, Beziehungen, Netzwerke, Nachhaltigkeit.“',
    examRelevance: 'Reihenfolge der Orientierungen mit den jeweiligen zeitlichen Einflüssen wiedergeben können.',
    synonyms: ['Entwicklung des Marketingbegriffs', 'Marketingverständnis'],
  },
  {
    id: 'mc-verkaufsorientierung', chapterId: 'm1', term: 'Verkaufsorientierung',
    definition: 'Handwerkliches Marketingverständnis, instrumentell verkürzt auf ein absatzpolitisches Werkzeug (ab ca. 1900 sowie 1950er/1960er).',
    context: 'Ab ca. 1900 werden Verkaufs- und Kommunikationstechniken erstmals systematisch erforscht und angewendet (z. B. AIDA-Modell); in den 1950er/1960er-Jahren wird der Marketingmix als Konzept der „4 Ps“ entwickelt.',
    confusableWith: ['Marktorientierung'],
  },
  {
    id: 'mc-marktorientierung', chapterId: 'm1', term: 'Marktorientierung',
    definition: 'Klassisches ökonomisches Marketingverständnis (1970er): Kundenbedürfnisse befriedigen, um primär ökonomische Ziele zu erreichen.',
    context: 'Zeitlicher Einfluss: Die starke Nachfragemacht des Handels wird berücksichtigt, Marketing erhält eine langfristigere Orientierung.',
    confusableWith: ['Verkaufsorientierung', 'Wettbewerbsorientierung'],
  },
  {
    id: 'mc-wettbewerbsorientierung', chapterId: 'm1', term: 'Wettbewerbsorientierung',
    definition: 'Langfristiges strategisches Marketingverständnis (1980er): Schaffung strategischer Wettbewerbsvorteile.',
    context: 'Zeitlicher Einfluss: Durch verstärkten – auch globalen – Wettbewerb rückt die strategische Positionierung in den Vordergrund (Strategisierung des Marketings).',
    confusableWith: ['Marktorientierung'],
  },
  {
    id: 'mc-umfeldorientierung', chapterId: 'm1', term: 'Umfeldorientierung',
    definition: 'Modernes und erweitertes Marketingverständnis (1990er): Zwei Parteien befriedigen ihre jeweiligen Bedürfnisse durch Austauschprozesse.',
    context: 'Zeitlicher Einfluss: Soziale und ökologische Ansprüche sowie Nachhaltigkeit werden wichtiger (Deepening); der Marketinggedanke wird zunehmend auch von nicht kommerziellen Organisationen angewendet (Broadening).',
    confusableWith: ['Nachhaltigkeitsorientierung'],
  },
  {
    id: 'mc-beziehungsorientierung', chapterId: 'm1', term: 'Beziehungsorientierung',
    definition: 'Generisches Marketingverständnis (2000er): Marketing als Sozialtechnik zur Erklärung jeglicher Austauschprozesse; die langfristige Kundenbeziehung rückt in den Mittelpunkt.',
    context: 'Zeitlicher Einfluss: Digitale Netzwerke beeinflussen zunehmend das Marktgeschehen. Auch in der AMA-Definition steht „managing customer relationships“ für Beziehungsorientierung: Langfristige Beziehungen zwischen Nachfrager und Anbieter sind ein wichtiges Ziel.',
    confusableWith: ['Beziehungsmarketing'],
  },
  {
    id: 'mc-digitale-wertschoepfung', chapterId: 'm1', term: 'Netzwerk- und digitale Wertschöpfungsorientierung',
    definition: 'Marketingverständnis der 2010er: Digitalisierung und Automatisierung von Prozessen schreiten voran, es entstehen digitale Wertschöpfungsmodelle.',
    example: 'Plattformen wie Uber, Abos wie Netflix, Freemium wie Spotify.',
  },
  {
    id: 'mc-nachhaltigkeitsorientierung', chapterId: 'm1', term: 'Nachhaltigkeitsorientierung',
    definition: 'Marketingverständnis der 2020er: Nachhaltigkeit und soziale Verantwortung werden zu zentralen gesellschaftlichen und unternehmerischen Anforderungen.',
    confusableWith: ['Umfeldorientierung'],
  },
  {
    id: 'mc-aida', chapterId: 'm1', term: 'AIDA-Modell',
    definition: 'Frühes Modell der ab ca. 1900 systematisch erforschten Verkaufs- und Kommunikationstechniken: Attention – Interest – Desire – Action.',
    context: 'Steht für die Phase der Verkaufsorientierung (handwerkliches Verständnis).',
    mnemonic: 'Aufmerksamkeit → Interesse → Wunsch → Handlung.',
  },
  {
    id: 'mc-deepening', chapterId: 'm1', term: 'Deepening',
    definition: 'Vertiefung des Marketings in den 1990er-Jahren: Soziale und ökologische Ansprüche sowie Nachhaltigkeit werden wichtiger.',
    confusableWith: ['Broadening'],
    mnemonic: 'Deepening = tiefer (Werte, Ökologie); Broadening = breiter (neue Anwender).',
  },
  {
    id: 'mc-broadening', chapterId: 'm1', term: 'Broadening',
    definition: 'Erweiterung des Marketings in den 1990er-Jahren: Der Marketinggedanke wird zunehmend auch von nicht kommerziellen Organisationen angewendet.',
    confusableWith: ['Deepening'],
  },

  // ---------- 1.1 Marketingdefinition (S. 2–3) ----------
  {
    id: 'mc-ama-merkmale', chapterId: 'm1', term: 'Merkmale des Marketings (Zerlegung der AMA-Definition)',
    definition: 'Die AMA-Definition lässt sich in sieben Bestandteile zerlegen: organizational function (Managementfunktion mit systematischer Planung), set of processes (funktionsübergreifende Prozesse), creating/communicating/delivering (analytisch und aktionsorientiert, kreative Problemlösungen, zeitlich aufeinanderfolgende Tätigkeiten), value to customers (Kundennutzen im Fokus), managing customer relationships (Beziehungsorientierung), benefit the organization (Wertorientierung), and its stakeholders (Stakeholderorientierung).',
    examRelevance: 'Klassische Freitextfrage: Bestandteile der AMA-Definition nennen und ihre Bedeutung erläutern.',
    synonyms: ['AMA-Definition Bestandteile'],
  },
  {
    id: 'mc-wertorientierung', chapterId: 'm1', term: 'Wertorientierung',
    definition: 'Bestandteil der AMA-Definition („in ways that benefit the organization“): Marketing unterstützt den Unternehmenszweck, meist finanzielle Ziele (Umsatz, Gewinn, Rendite); auch nicht kommerzielle Ziele (Mitgliederzahl, Aufmerksamkeit) sind möglich.',
    confusableWith: ['Stakeholderorientierung'],
  },
  {
    id: 'mc-stakeholderorientierung', chapterId: 'm1', term: 'Stakeholderorientierung',
    definition: 'Bestandteil der AMA-Definition („and its stakeholders“): Auch die Auswirkung der Unternehmenstätigkeit auf externe Anspruchsgruppen (Bürger, Umweltgruppen) wird berücksichtigt.',
    confusableWith: ['Wertorientierung'],
  },
  {
    id: 'mc-kundennutzen', chapterId: 'm1', term: 'Kundennutzen (Nettonutzen)',
    definition: 'Differenz von Aufwand und erhaltenem Wert aus Sicht des Kunden.',
    context: 'Zentraler Fokus der AMA-Definition („value to customers“): systematische Auseinandersetzung mit dem Kunden und seinen Bedürfnissen.',
    synonyms: ['Nettonutzen', 'Kundennutzen'],
  },
  {
    id: 'mc-kernbausteine', chapterId: 'm1', term: 'Drei Kernbausteine des Marketings',
    definition: 'Die Marketingdefinition umfasst drei Kernbausteine: den funktionalen Marketingbegriff (systematischer Planungsprozess), den führungsorientierten Marketingbegriff (Leitphilosophie) und den aktivitätenorientierten Marketingbegriff (Sozialtechnologie).',
    mnemonic: 'F-F-A: Funktion (Abteilung) – Führung (Denkhaltung) – Aktivität (Werkzeugkasten).',
    examRelevance: 'Alle drei benennen UND jeweils mit Stichwort in Klammern (Planungsprozess / Leitphilosophie / Sozialtechnologie) erläutern.',
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
    mnemonic: 'Product – Price – Place – Promotion.',
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
    confusableWith: ['Transaktionales Marketing', 'Beziehungsorientierung'],
    examRelevance: 'Abgrenzung zum Transaktionsmarketing anhand der fünf Vergleichskriterien (Fristigkeit, Objekt, Ziel, Strategie, Erfolgsgrößen).',
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
    mnemonic: 'Gewinnen – Halten – Zurückholen.',
    synonyms: ['Recruitment', 'Retention', 'Recovery'],
  },
  {
    id: 'mc-akquise', chapterId: 'm1', term: 'Akquise / Akquisition',
    definition: 'Maßnahmen der Kundengewinnung.',
    synonyms: ['Kundenakquisition', 'Akquise'],
  },

  // ---------- 1.2 Markenführung (S. 3–4) ----------
  {
    id: 'mc-markenaufbau', chapterId: 'm1', term: 'Vier Schritte des Markenaufbaus',
    definition: 'Marketingmanager erschaffen, verbessern und schützen Marken meist in vier groben Schritten (Kotler/Keller/Opresnik 2015): 1. Markenpositionierung identifizieren und aufbauen, 2. Markenmarketing planen und umsetzen, 3. Markenleistung messen und interpretieren, 4. Markenwert aufbauen und aufrechterhalten.',
    context: 'Der Aufbau starker Marken ist ein zentrales Ziel des Marketings.',
    mnemonic: 'Positionieren → Planen/Umsetzen → Messen → Wert pflegen.',
  },
  {
    id: 'mc-branding', chapterId: 'm1', term: 'Markenführung (Branding)',
    definition: 'Markenführung wurzelt nicht in akademischer Theorie, sondern wurde pragmatisch und schrittweise in Werbeagenturen entwickelt; die großen Agenturen nutzen bis heute eigene Markenmodelle – daher gibt es keine einheitliche Definition.',
    context: 'Marken dürfen nicht mit Produkten gleichgesetzt werden: Sie haben ein „Eigenleben“ entwickelt und finden heute auch für Veranstaltungen, Dienstleistungen, Menschen und Orte Anwendung.',
    example: 'Musikfestival „Rock am Ring“, Städtemarketing.',
    synonyms: ['Branding'],
  },
  {
    id: 'mc-marke', chapterId: 'm1', term: 'Marke (juristische Definition)',
    definition: 'Juristische Definition (AMA 2017): „A brand is a ‚Name, term, design, symbol, or any other feature that identifies one seller’s good or service as distinct from those of other sellers’“ – für Marketingmanager wenig hilfreich.',
    confusableWith: ['Marke (Marketingsicht)'],
    synonyms: ['Marke', 'Brand'],
  },
  {
    id: 'mc-marke-marketing', chapterId: 'm1', term: 'Marke (Marketingsicht)',
    definition: 'Fokus auf die Wirkung von Marken: Vermittlung von Werten, Aufbau einer Beziehung mit dem Kunden und die daraus resultierende erhöhte Zahlungsbereitschaft.',
    context: 'Definition nach Kapferer (2012): „[A] name that symbolizes a long-term engagement, crusade or commitment to a unique set of values, embedded into products, services and behaviors, which make the organization, person or product stand apart and stand out“.',
    confusableWith: ['Marke (juristische Definition)'],
    examRelevance: 'Unterschied juristisch (Kennzeichnung/Unterscheidung) vs. Marketingsicht (Wirkung: Werte, Beziehung, Zahlungsbereitschaft).',
  },
  {
    id: 'mc-brandequity', chapterId: 'm1', term: 'Brand Equity (Wert der Marke)',
    definition: 'Einigkeit in der Literatur: Marken schaffen Werte und stellen damit selbst einen Wert dar – Brand Equity.',
    context: 'Messung indirekt durch qualitative und quantitative Marktforschung oder direkt durch Experimente und spezielle holistische Methoden.',
    examRelevance: 'Begriff, beide Messansätze (indirekt/direkt) und die Voraussetzungen nach Aaker.',
    synonyms: ['Markenwert', 'Wert der Marke'],
  },
  {
    id: 'mc-markenvoraussetzungen', chapterId: 'm1', term: 'Voraussetzungen für Marketingvorteile (Aaker 1991)',
    definition: 'Damit eine Marke Marketingvorteile bringt, müssen Konsumenten die Marke (er)kennen, sie mit positiven Assoziationen verbinden, ihr treu sein und sie als hochwertig wahrnehmen.',
    mnemonic: 'Kennen – Mögen – Treu sein – Hochwertig finden.',
  },
  {
    id: 'mc-markenvorteile', chapterId: 'm1', term: 'Reale Marketingvorteile durch Markenführung',
    definition: 'Verbesserte Wahrnehmung der Produktleistung, stärkere Kundentreue, geringere Verwundbarkeit durch Marketingaktivitäten der Wettbewerber und durch Marketingkrisen, größere Margen, unelastischere Kundenreaktionen auf Preiserhöhungen, elastischere Kundenreaktionen auf Preissenkungen, steigende Handelskooperationen und Unterstützungsleistungen, höhere Effektivität der Marketingkommunikation, mögliche Lizenzierungschancen, zusätzliche Markenerweiterungschancen, leichtere Personalbeschaffung und -bindung, höhere Marktrendite.',
    mnemonic: 'Preiserhöhung → Kunden reagieren UNelastisch (bleiben); Preissenkung → Kunden reagieren elastisch (kaufen mehr).',
    examRelevance: 'Häufig: „Nennen Sie Vorteile starker Marken.“ Mindestens 5–6 sicher abrufbar haben; Elastizitätsrichtung nicht vertauschen.',
  },
  {
    id: 'mc-konsistenter-mix', chapterId: 'm1', term: 'Markenaufbau durch konsistenten Marketingmix',
    definition: 'Starke Marken werden durch die Anwendung eines konsistenten Marketingmix aufgebaut – jede Taktik ist als markenbildende Aktivität zu verstehen.',
    context: 'Werden kurzfristige verkaufsfördernde Maßnahmen (z. B. Preisreduktionen) überbetont, kann die Marke an Wert verlieren.',
  },

  // ---------- 1.2 Positionierung im Markt (S. 4) ----------
  {
    id: 'mc-positionierung', chapterId: 'm1', term: 'Positionierung',
    definition: 'Eine Marke zu positionieren bedeutet zu bestimmen, wie diese von den Konsumenten im Vergleich mit Wettbewerbsangeboten wahrgenommen werden soll – Kern jeder Marketingstrategie.',
    context: 'Erfolgt typischerweise in zwei Schritten: (1) Ermittlung der relevanten Wettbewerber, (2) Bestimmung des Wettbewerbsvorteils.',
    examRelevance: 'Definition + zwei Schritte + vier Fragen nach Kapferer + Points of Parity/Difference.',
  },
  {
    id: 'mc-positionierungsfragen', chapterId: 'm1', term: 'Vier Fragen der Positionierung (Kapferer 2012)',
    definition: 'Wer ist unsere Zielgruppe? Wer sind unsere Wettbewerber? Was ist unser Wettbewerbsvorteil? Wodurch erzielen wir diesen konkret?',
    mnemonic: 'Für wen? Gegen wen? Womit? Wie konkret?',
  },
  {
    id: 'mc-relevante-wettbewerber', chapterId: 'm1', term: 'Relevante Wettbewerber',
    definition: 'Konkurrenten, die die gleiche Zielgruppe mit vergleichbaren Angeboten bedienen – schließt direkten und indirekten Wettbewerb ein.',
    example: 'Für Gerolsteiner Naturell sind stille Wasser direkte, sprudelnde Wasser und andere Getränke indirekte Wettbewerber.',
  },
  {
    id: 'mc-indirekter-wettbewerb', chapterId: 'm1', term: 'Indirekter Wettbewerb',
    definition: 'Unterschiedliche Produkte, die jedoch die gleichen Bedürfnisse erfüllen.',
    example: 'Für Gerolsteiner Naturell (stilles Wasser) sind sprudelnde Wasser und andere Getränke indirekte Wettbewerber; stille Wasser sind direkte Wettbewerber.',
    synonyms: ['direkter Wettbewerb'],
  },
  {
    id: 'mc-pop-pod', chapterId: 'm1', term: 'Points of Parity / Points of Difference',
    definition: 'Innerhalb des Wettbewerbsrahmens bestimmt (Keller/Swaminathan 2019): Points of Parity sind Attribute, hinsichtlich derer sich die Marke mit dem Wettbewerb die Waage hält; Points of Difference sind Attribute, die besser sind als die Angebote der Konkurrenz.',
    example: 'Fiji Water: Herkunft und angeblich besondere Reinheit als Point of Difference, gezielt über die Promotionsstrategie kommuniziert.',
    mnemonic: 'Parity = gleichauf, Difference = besser.',
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
    confusableWith: ['Kostenführerstrategie', 'Strategie der selektiven Qualitätsführerschaft'],
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
    id: 'mc-strategiematrix', chapterId: 'm1', term: 'Matrix der vier Strategierichtungen',
    definition: 'Kombination von Marktabdeckung (Gesamtmarkt oder Teilmarkt) und zentralem Vorteil (Qualität oder Preis): Strategie der Qualitätsführerschaft (Gesamt/Qualität), Strategie der aggressiven Kostenführerschaft (Gesamt/Preis), Strategie der selektiven Qualitätsführerschaft (Teil/Qualität), Strategie der selektiven Kostenführerschaft (Teil/Preis).',
    mnemonic: '„selektiv“ = nur ein Teilmarkt (Nische); „aggressiv“ = Preisvorteil auf dem Gesamtmarkt.',
    examRelevance: 'Matrix zeichnen/erklären können und jeder Strategie ein Skript-Beispiel zuordnen.',
  },
  {
    id: 'mc-selektive-qf', chapterId: 'm1', term: 'Strategie der selektiven Qualitätsführerschaft',
    definition: 'Bietet in einer lukrativen Nische, die von größeren Unternehmen vernachlässigt wird, besondere Leistungen zu hohem Preis an.',
    example: 'Voss, Fiji.',
    confusableWith: ['Qualitätsführerschaft (Differenzierungsstrategie)', 'Strategie der selektiven Kostenführerschaft'],
  },
  {
    id: 'mc-aggressive-kf', chapterId: 'm1', term: 'Strategie der aggressiven Kostenführerschaft',
    definition: 'Niedrige Preise auf dem Gesamtmarkt.',
    example: 'Frische Brise, Handelsmarken.',
    confusableWith: ['Strategie der selektiven Kostenführerschaft'],
  },
  {
    id: 'mc-selektive-kf', chapterId: 'm1', term: 'Strategie der selektiven Kostenführerschaft',
    definition: 'Unternehmensleistung auf einem Teilmarkt besonders günstig.',
    example: 'Günstige regionale Mineralwassermarken.',
    confusableWith: ['Strategie der aggressiven Kostenführerschaft', 'Strategie der selektiven Qualitätsführerschaft'],
  },

  // ---------- 1.3 Marketingmanagement (S. 5–6) ----------
  {
    id: 'mc-marketingmanagement', chapterId: 'm1', term: 'Marketingmanagement',
    definition: 'Umsetzung und Durchführung des modernen, erweiterten Marketingverständnisses in einem konkreten Unternehmen. AMA (2017): „Marketing Management is the process of setting goals for an organization (considering internal resources and market opportunities), the planning and execution of activities to meet these goals, and measuring progress toward their achievement.“',
    context: 'Berücksichtigt die vier zentralen Orientierungspunkte des Marketings: das Unternehmen selbst, den Kunden, die Wettbewerber und das gesellschaftliche Umfeld. Ziel: aus der Kombination von Unternehmensressourcen und Umfeldgegebenheiten Aktivitäten ableiten, die die Kundenbedürfnisse besser erfüllen als die Konkurrenz.',
    examRelevance: 'Definition, vier Orientierungspunkte, Ziel und die sechs Schritte.',
  },
  {
    id: 'mc-6schritte', chapterId: 'm1', term: 'Sechs Schritte des Marketingmanagements',
    definition: '1: Situationsanalyse, 2: Marketingziele, 3: Marketingstrategie, 4: Marketinginstrumente, 5: Marketingimplementierung, 6: Marketingcontrolling.',
    example: 'Fiktives Getränkeunternehmen „Sitt“ führt das stille Wasser „isso“ für Jugendliche (12–19 Jahre) ein.',
    mnemonic: 'Analyse → Ziele → Strategie → Instrumente → Umsetzung → Kontrolle.',
  },
  {
    id: 'mc-situationsanalyse', chapterId: 'm1', term: 'Situationsanalyse',
    definition: 'Schritt 1 des Marketingmanagements: Informationen über die unternehmensinterne und -externe Ausgangssituation – eigene Potenziale, gesellschaftliches Umfeld, Kunden, Wettbewerber.',
    example: '„Sitt“ analysiert Getränkemarkt, Trends, Kundenverhalten und Wettbewerber – es gibt nur wenige Mineralwasser-Angebote speziell für Teenager.',
  },
  {
    id: 'mc-marketingziele', chapterId: 'm1', term: 'Marketingziele',
    definition: 'Schritt 2 des Marketingmanagements: ökonomische Ziele (Rendite, Gewinn, Umsatz, Deckungsbeitrag), psychografische Ziele (Kundenzufriedenheit, Image), soziale Ziele und Umweltziele.',
    example: 'Stilles Wasser „isso“: Ziel 0,5 % Marktanteil sowie weitere Ziele.',
  },
  {
    id: 'mc-marketingstrategie', chapterId: 'm1', term: 'Marketingstrategie',
    definition: 'Schritt 3 des Marketingmanagements (strategische Marketingplanung): langfristiger Verhaltensplan zur Zielerreichung inkl. Auswahl der Märkte und Marktsegmente, Marktbearbeitungsstrategie und grundlegender Verhaltensweisen gegenüber Marktteilnehmern.',
    example: 'Selektiv-differenzierte Marktbearbeitung; Zielgruppe Jugendliche 12–19 Jahre; Produkt soll als „cool“ wahrgenommen und etwas teurer als Konkurrenzprodukte sein.',
    confusableWith: ['Marketinginstrumente (operative Marketingplanung)'],
  },
  {
    id: 'mc-marketinginstrumente', chapterId: 'm1', term: 'Marketinginstrumente (operative Marketingplanung)',
    definition: 'Schritt 4 des Marketingmanagements: operative Marketingplanung mit den vier Ps – Product (Leistungs-/Programmpolitik), Price (Preis-/Konditionspolitik), Place (Vertriebspolitik), Promotion (Kommunikationspolitik); für Dienstleistungen zusätzlich People, Processes, Physical Facilities.',
    example: '„isso“: stilles Wasser, 0,75-l-Plastikflasche, türkis getönt, Einzel- und 6er-Packung; Preis 0,89 € / 4,99 €; 6er über Onlineshop, Supermärkte, Drogerien, Einzelflaschen über Schulen, Imbiss, Gastro, Veranstaltungen; Promotion über Social Media (Instagram/TikTok) und Influencer-Kooperationen.',
    confusableWith: ['Marketingstrategie'],
  },
  {
    id: 'mc-dienstleistungs-ps', chapterId: 'm1', term: 'Zusätzliche Ps für Dienstleistungen',
    definition: 'People (Dienstleistungspersonal), Processes (Dienstleistungserstellungsprozess) und Physical Facilities (physisch fassbare Leistungspotenziale, Räumlichkeiten etc.).',
    synonyms: ['People', 'Processes', 'Physical Facilities'],
  },
  {
    id: 'mc-implementierung', chapterId: 'm1', term: 'Marketingimplementierung',
    definition: 'Schritt 5 des Marketingmanagements: Realisierung und Durchsetzung inklusive Bestimmung von Verantwortlichkeiten, Führungskonzepten und Budgets.',
    example: 'Produktlaunch von „isso“ durch die zuständige Marketingabteilung.',
  },
  {
    id: 'mc-controlling', chapterId: 'm1', term: 'Marketingcontrolling',
    definition: 'Schritt 6 des Marketingmanagements: Evaluation der Zielerreichung und ggf. Anpassung der Maßnahmen.',
    example: 'Wurde das Marktanteilsziel von „isso“ erreicht?',
  },
  {
    id: 'mc-marktsegment', chapterId: 'm1', term: 'Marktsegment',
    definition: 'Teil eines Markts, der bestimmte Merkmale aufweist und relativ homogen ist.',
  },
];
