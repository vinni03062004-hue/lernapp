import { ScriptSection } from '@/lib/types';

/** Lernskript Kapitel 1 – Grundlagen des Marketings (PDF S. 1–6). */
export const sections1: ScriptSection[] = [
  {
    id: 's1-markt', sub: '1.1', title: 'Markt und Austauschprozesse', pdfPages: '1',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-marketing', 'mc-markt', 'mc-austausch'] },
      { kind: 'text', text: 'Aus dem Austausch ergeben sich die zwei zentralen theoretischen Leitideen der Marketingwissenschaft:' },
      { kind: 'definitions', conceptIds: ['mc-gratifikation'] },
      { kind: 'definitions', conceptIds: ['mc-kaeufermarkt'] },
      { kind: 'merke', text: 'Die Nachfrage bildet den Engpass – Marketing dient dazu, diesen Engpass zu bewältigen, Kunden zu gewinnen und zu binden. Der Nachfrager steht im Zentrum des modernen Marketings. Die allermeisten Märkte sind heutzutage Käufermärkte.' },
    ],
  },
  {
    id: 's1-entwicklung', sub: '1.1', title: 'Entwicklung des Marketingbegriffs', pdfPages: '1–2',
    blocks: [
      { kind: 'list', items: [
        'Der Begriff entstand Anfang des 20. Jahrhunderts im angloamerikanischen Sprachraum und löste in den 1960er-Jahren den in Deutschland gebräuchlichen Begriff Absatzwirtschaft ab.',
        'Dieser Übergang markiert einen Paradigmenwechsel: von Angebot zu Nachfrage bzw. vom Abverkauf produzierter Ware zur Orientierung am Kunden.',
        'Die Definition war nie einheitlich oder konstant – sie wird kontinuierlich weiterentwickelt und an reale Marktverhältnisse angepasst.',
      ] },
      { kind: 'merke', text: 'Marketingliteratur immer im Kontext ihrer Entstehungszeit lesen!' },
      { kind: 'definitions', conceptIds: ['mc-absatzwirtschaft'] },
      { kind: 'table', title: 'Evolution des Marketingbegriffs', columns: ['Zeitraum', 'Zeitliche Einflüsse', 'Marketingverständnis und Orientierung'], rows: [
        ['ab ca. 1900 und 1950er/1960er', 'Verkaufs- und Kommunikationstechniken werden erstmals systematisch erforscht und angewendet (z. B. AIDA-Modell). In den 1950er/60er-Jahren wird der „Marketingmix“ (Produkt-, Preis-, Vertriebs- und Kommunikationspolitik) als Konzept der „4 Ps“ entwickelt.', 'handwerkliches Verständnis (instrumentell verkürzt auf ein absatzpolitisches Werkzeug): Verkaufsorientierung'],
        ['1970er', 'Die starke Nachfragemacht des Handels wird berücksichtigt, Marketing erhält eine langfristigere Orientierung.', 'klassisches ökonomisches Verständnis (Kundenbedürfnisse befriedigen, um primär ökonomische Ziele zu erreichen): Marktorientierung'],
        ['1980er', 'Durch verstärkten – auch globalen – Wettbewerb rückt die strategische Positionierung in den Vordergrund (Strategisierung des Marketings).', 'langfristiges strategisches Verständnis (Schaffung strategischer Wettbewerbsvorteile): Wettbewerbsorientierung'],
        ['1990er', 'Soziale und ökologische Ansprüche sowie Nachhaltigkeit werden wichtiger (Deepening). Der Marketinggedanke wird zunehmend auch von nicht kommerziellen Organisationen angewendet (Broadening).', 'modernes und erweitertes Verständnis (zwei Parteien befriedigen ihre jeweiligen Bedürfnisse durch Austauschprozesse): Umfeldorientierung'],
        ['2000er', 'Digitale Netzwerke beeinflussen zunehmend das Marktgeschehen; die langfristige Kundenbeziehung rückt in den Mittelpunkt.', 'generisches Verständnis (Sozialtechnik zur Erklärung jeglicher Austauschprozesse): Beziehungsorientierung'],
        ['2010er', 'Digitalisierung und Automatisierung von Prozessen schreiten voran – digitale Wertschöpfungsmodelle (Plattformen wie Uber, Abos wie Netflix, Freemium wie Spotify).', 'Netzwerk- und digitale Wertschöpfungsorientierung'],
        ['2020er', 'Nachhaltigkeit und soziale Verantwortung werden zu zentralen gesellschaftlichen und unternehmerischen Anforderungen.', 'Nachhaltigkeitsorientierung'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-evolution'] },
    ],
  },
  {
    id: 's1-definition', sub: '1.1', title: 'Marketingdefinition', pdfPages: '2–3',
    blocks: [
      { kind: 'text', text: 'Oft zitiert wird die Definition der American Marketing Association: „Marketing is an organizational function and a set of processes for creating, communicating, and delivering value to customers and for managing relationships in ways that benefit the organization and its stakeholders.“ (AMA 2017)' },
      { kind: 'table', title: 'Merkmale des Marketings (Zerlegung der Definition)', columns: ['Definitionsbestandteil', 'Bedeutung'], rows: [
        ['Marketing is an organizational function', 'Marketing stellt innerhalb der Unternehmensorganisation eine Managementfunktion dar, die sich mit systematischer Planung befasst.'],
        ['and a set of processes', 'Marktorientierte Informationen sind für fast alle Unternehmensfunktionen relevant – Marketing nutzt funktionsübergreifende Prozesse.'],
        ['for creating, communicating, and delivering', 'Marketing ist nicht nur analytisch, sondern auch aktionsorientiert und schafft kreative Problemlösungen; es beinhaltet zeitlich aufeinanderfolgende Tätigkeiten.'],
        ['value to customers', 'Zentraler Fokus liegt auf dem Kundennutzen – systematische Auseinandersetzung mit dem Kunden und seinen Bedürfnissen.'],
        ['and for managing customer relationships', 'Langfristige Beziehungen zwischen Nachfrager und Anbieter sind ein wichtiges Ziel (Beziehungsorientierung).'],
        ['in ways that benefit the organization', 'Marketing unterstützt den Unternehmenszweck, meist finanzielle Ziele (Umsatz, Gewinn, Rendite) = Wertorientierung; auch nicht kommerzielle Ziele (Mitgliederzahl, Aufmerksamkeit) möglich.'],
        ['and its stakeholders', 'Auch die Auswirkung der Unternehmenstätigkeit auf externe Anspruchsgruppen (Bürger, Umweltgruppen) wird berücksichtigt (Stakeholderorientierung).'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-ama-merkmale', 'mc-kundennutzen'] },
      { kind: 'text', text: 'Die Definition umfasst die drei Kernbausteine des Marketings:' },
      { kind: 'definitions', conceptIds: ['mc-funktional', 'mc-fuehrung', 'mc-aktivitaet'] },
      { kind: 'definitions', conceptIds: ['mc-marketingmix', 'mc-marketing-automation'] },
    ],
  },
  {
    id: 's1-transaktion', sub: '1.1', title: 'Transaktionales vs. beziehungsorientiertes Marketing', pdfPages: '3',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-transaktional', 'mc-beziehung'] },
      { kind: 'example', title: 'Herkunft des Beziehungsmarketings', text: 'Die Erkenntnis stammt aus Dienstleistung und B2B: Friseur, Autowerkstatt und Steuerberater werden nicht nur rational nach Preis und Qualität ausgewählt, sondern wegen der über Jahre aufgebauten vertrauensvollen Beziehung – Paradigmenwechsel vom Transaktions- zum Beziehungsmarketing.' },
      { kind: 'definitions', conceptIds: ['mc-b2b'] },
      { kind: 'table', title: 'Vergleich', columns: ['Kriterium', 'Transaktionsmarketing', 'Beziehungsmarketing'], rows: [
        ['Betrachtungsfristigkeit', 'kurzfristig', 'langfristig'],
        ['Marketingobjekt', 'Produkt', 'Produkt und Interaktion'],
        ['Marketingziel', 'Kundenakquisition', 'Kundenakquisition, -bindung, -rückgewinnung'],
        ['Marketingstrategie', 'Leistungsdarstellung', 'Dialog'],
        ['Ökonomische Erfolgs- und Steuerungsgrößen', 'Absatz, Umsatz, Gewinn, Deckungsbeitrag, Kosten', 'zusätzlich: Kundenwert, Kundendeckungsbeitrag'],
      ] },
      { kind: 'text', text: 'Der Marketingmix wird daher nicht nur über die vier Ps strukturiert, sondern zusätzlich über die Phase der Geschäftsbeziehung – die sogenannten drei Rs:' },
      { kind: 'definitions', conceptIds: ['mc-drei-rs', 'mc-akquise'] },
    ],
  },
  {
    id: 's1-markenfuehrung', sub: '1.2', title: 'Markenführung: starke Marken aufbauen', pdfPages: '3',
    blocks: [
      { kind: 'text', text: 'Der Aufbau starker Marken ist ein zentrales Ziel des Marketings; Marketingmanager erschaffen, verbessern und schützen Marken – meist in vier groben Schritten (Kotler/Keller/Opresnik 2015):' },
      { kind: 'list', ordered: true, items: [
        'Die Markenpositionierung wird identifiziert und aufgebaut.',
        'Das Markenmarketing wird geplant und umgesetzt.',
        'Die Markenleistung wird gemessen und interpretiert.',
        'Der Markenwert wird aufgebaut und aufrechterhalten.',
      ] },
      { kind: 'definitions', conceptIds: ['mc-markenaufbau'] },
    ],
  },
  {
    id: 's1-markenbegriff', sub: '1.2', title: 'Markenbegriff', pdfPages: '3–4',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-branding'] },
      { kind: 'example', text: 'Marken haben ein „Eigenleben“ entwickelt und gelten heute auch für Veranstaltungen, Dienstleistungen, Menschen und Orte – z. B. Musikfestival „Rock am Ring“ oder Städtemarketing.' },
      { kind: 'definitions', conceptIds: ['mc-marke'] },
    ],
  },
  {
    id: 's1-brandequity', sub: '1.2', title: 'Wert der Marke (Brand Equity)', pdfPages: '4',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-brandequity'] },
      { kind: 'list', title: 'Reale Marketingvorteile durch Markenführung', items: [
        'verbesserte Wahrnehmung der Produktleistung',
        'stärkere Kundentreue',
        'geringere Verwundbarkeit durch Marketingaktivitäten der Wettbewerber',
        'geringere Verwundbarkeit durch Marketingkrisen',
        'größere Margen',
        'unelastischere Kundenreaktionen auf Preiserhöhungen',
        'elastischere Kundenreaktionen auf Preissenkungen',
        'steigende Handelskooperationen und Unterstützungsleistungen',
        'höhere Effektivität der Marketingkommunikation',
        'mögliche Lizenzierungschancen',
        'zusätzliche Markenerweiterungschancen',
        'leichtere Personalbeschaffung und -bindung',
        'höhere Marktrendite',
      ] },
      { kind: 'definitions', conceptIds: ['mc-markenvorteile'] },
      { kind: 'merke', text: 'Werden kurzfristige verkaufsfördernde Maßnahmen (z. B. Preisreduktionen) überbetont, kann die Marke an Wert verlieren.' },
    ],
  },
  {
    id: 's1-positionierung', sub: '1.2', title: 'Positionierung im Markt', pdfPages: '4',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-positionierung', 'mc-relevante-wettbewerber'] },
      { kind: 'example', title: 'Direkter vs. indirekter Wettbewerb', text: 'Für Gerolsteiner Naturell sind stille Wasser direkte, sprudelnde Wasser und andere Getränke indirekte Wettbewerber.' },
      { kind: 'definitions', conceptIds: ['mc-pop-pod'] },
      { kind: 'example', title: 'Point of Difference', text: 'Fiji Water: Herkunft und angeblich besondere Reinheit – gezielt über die Promotionsstrategie kommuniziert.' },
    ],
  },
  {
    id: 's1-strategien', sub: '1.2', title: 'Kostenführer- vs. Qualitätsführerstrategie', pdfPages: '5',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-abnehmergerichtet'] },
      { kind: 'text', text: 'Grundsätzlich gibt es zwei Wahlmöglichkeiten: besser oder billiger als die Konkurrenz sein.' },
      { kind: 'definitions', conceptIds: ['mc-qualitaetsfuehrer', 'mc-kostenfuehrer', 'mc-kostendegression', 'mc-nische'] },
      { kind: 'table', title: 'Matrix von vier Strategierichtungen', columns: ['Marktabdeckung', 'Zentraler Vorteil: Qualität', 'Zentraler Vorteil: Preis'], rows: [
        ['Gesamt', 'Strategie der Qualitätsführerschaft (z. B. Volvic, Evian)', 'Strategie der aggressiven Kostenführerschaft (z. B. Frische Brise, Handelsmarken)'],
        ['Teil', 'Strategie der selektiven Qualitätsführerschaft (z. B. Voss, Fiji)', 'Strategie der selektiven Kostenführerschaft (z. B. günstige regionale Mineralwassermarken)'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-strategiematrix'] },
    ],
  },
  {
    id: 's1-management', sub: '1.3', title: 'Marketingmanagement', pdfPages: '5',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-marketingmanagement'] },
      { kind: 'list', title: 'Vier zentrale Orientierungspunkte des Marketings', items: ['das Unternehmen selbst', 'der Kunde', 'die Wettbewerber', 'das gesellschaftliche Umfeld'] },
      { kind: 'merke', text: 'Ziel: aus der Kombination von Unternehmensressourcen und Umfeldgegebenheiten Aktivitäten ableiten, die die Kundenbedürfnisse besser erfüllen als die Konkurrenz.' },
    ],
  },
  {
    id: 's1-sechs-schritte', sub: '1.3', title: 'Sechs Schritte des Marketingmanagements (Fallbeispiel „Sitt“ / „isso“)', pdfPages: '5–6',
    blocks: [
      { kind: 'table', columns: ['Schritt', 'Inhalt', 'Beispiel „Sitt“ / Wasser „isso“'], rows: [
        ['1: Situationsanalyse', 'Informationen über die unternehmensinterne und -externe Ausgangssituation: eigene Potenziale, gesellschaftliches Umfeld, Kunden, Wettbewerber', '„Sitt“ analysiert Getränkemarkt, Trends, Kundenverhalten und Wettbewerber – es gibt nur wenige Mineralwasser-Angebote speziell für Teenager'],
        ['2: Marketingziele', 'ökonomische Ziele (Rendite, Gewinn, Umsatz, Deckungsbeitrag), psychografische Ziele (Kundenzufriedenheit, Image), soziale Ziele, Umweltziele', 'stilles Wasser „isso“; Ziel: 0,5 % Marktanteil sowie weitere Ziele'],
        ['3: Marketingstrategie', 'strategische Marketingplanung; langfristiger Verhaltensplan zur Zielerreichung inkl. Auswahl der Märkte und Marktsegmente, Marktbearbeitungsstrategie, grundlegende Verhaltensweisen gegenüber Marktteilnehmern', 'selektiv-differenzierte Marktbearbeitung; Zielgruppe: Jugendliche 12–19 Jahre; Produkt soll als „cool“ wahrgenommen und etwas teurer als Konkurrenzprodukte sein'],
        ['4: Marketinginstrumente', 'operative Marketingplanung (vier Ps): Product (Leistungs-/Programmpolitik), Price (Preis-/Konditionspolitik), Place (Vertriebspolitik), Promotion (Kommunikationspolitik); zusätzlich für Dienstleistungen: People, Processes, Physical Facilities', 'Produkt: stilles Wasser, 0,75-l-Plastikflasche, türkis getönt, Einzel- und 6er-Packung; Preis: 0,89 € / 4,99 €; Distribution: 6er über Onlineshop, Supermärkte, Drogerien, Einzel über Schulen, Imbiss, Gastro, Veranstaltungen; Promotion: Social Media (Instagram/TikTok), Influencer-Kooperationen'],
        ['5: Marketingimplementierung', 'Realisierung und Durchsetzung inkl. Bestimmung von Verantwortlichkeiten, Führungskonzepten und Budgets', 'Produktlaunch durch die zuständige Marketingabteilung'],
        ['6: Marketingcontrolling', 'Evaluation der Zielerreichung und ggf. Anpassung der Maßnahmen', 'Wurde das Marktanteilsziel erreicht?'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-6schritte', 'mc-marktsegment'] },
    ],
  },
];
