import { ScriptSection } from '@/lib/types';

/** Lernskript Kapitel 4 – Preispolitik (PDF S. 16–20). */
export const sections4: ScriptSection[] = [
  {
    id: 's4-stellung', sub: '4.1', title: 'Die Stellung der Preispolitik im Marketing', pdfPages: '16',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-preispolitik'] },
      { kind: 'merke', text: 'Preise sind ein wesentlicher Indikator für die Marktstellung und haben direkten Einfluss auf Umsatz und Gewinn.' },
      { kind: 'definitions', conceptIds: ['mc-ziele-preispolitik'] },
    ],
  },
  {
    id: 's4-einfluss', sub: '4.1', title: 'Grundlagen: Einflussfaktoren der Preisfestlegung', pdfPages: '16',
    blocks: [
      { kind: 'table', columns: ['Faktor', 'Bedeutung', 'Beispiel'], rows: [
        ['Käufer', 'Die Zahlungsbereitschaft des anvisierten Kundensegments definiert die Preisobergrenze; wahrgenommener Nutzen und reale Herstellerkosten müssen nicht zusammenhängen.', 'Milchkaffee bei Starbucks 10–30 % teurer als im unabhängigen Café'],
        ['Kosten', 'Der Preis sollte über die Lebensdauer des Produkts die Kosten decken und einen Gewinnbeitrag erwirtschaften – die Gesamtkosten bilden die Preisuntergrenze.', '–'],
        ['Konkurrenzsituation', 'Wettbewerbspreise fließen in die Beurteilung der Preiswürdigkeit ein; Preisvergleichsportale steigern die Transparenz; es entsteht ein relevanter Preiskorridor, oft durch automatisierte Preis-Monitoring-Tools überwacht.', 'Idealo, Google Shopping'],
        ['Externe Rahmenbedingungen', 'Handelsstruktur, gesamtwirtschaftliche Situation, saisonale Nachfrageschwankungen.', 'Discounter vs. exklusiver Handelspartner'],
        ['Psychologische Effekte der Preiswahrnehmung', 'Kunden tendieren dazu, Nachkommastellen zu ignorieren – das wird durch Schwellenpreise ausgenutzt.', '2,99 €'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-einflussfaktoren-preis', 'mc-preisgrenzen', 'mc-preiskorridor', 'mc-externe-rahmen', 'mc-schwellenpreis'] },
    ],
  },
  {
    id: 's4-paf', sub: '4.1', title: 'Preis-Absatz-Funktion', pdfPages: '17',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-paf'] },
      { kind: 'table', title: 'Drei Formen im Vergleich', columns: ['Form', 'Formel / Kennzeichen', 'Parameter'], rows: [
        ['Lineare Preis-Absatz-Funktion', 'x(p) = a – b · p; idealtypisch im Monopol, Nachfrage sinkt mit steigendem Preis', 'a = maximale Sättigungsmenge (Absatz bei Preis 0); a/b = Maximalpreis; b = Stärke der Marktreaktion auf Preisänderungen'],
        ['Multiplikatives Preis-Absatz-Modell', 'x(p) = a · p^(–b); berücksichtigt den Ausgangspreis (je niedriger, desto stärker wirken Preisänderungen); Achsen werden nicht geschnitten', 'a = Normierungsparameter (Menge bei Preis von einer Geldeinheit); b = Preisabhängigkeit der Absatzmenge; keine Sättigungsmenge, kein Maximalpreis'],
        ['Gutenberg-Modell', 'doppelt geknickt; unvollkommener Markt mit Wettbewerbern; oben/unten sinkt die Nachfrage ähnlich linear, in der Mitte eine Art Monopol', 'Mittelbereich: Absatzmenge ändert sich trotz höherer Preise wenig (z. B. Apple durch erfolgreiche Markenpolitik)'],
      ] },
      { kind: 'figure', figureId: 'f-paf' },
      { kind: 'definitions', conceptIds: ['mc-paf-linear', 'mc-paf-mult', 'mc-gutenberg'] },
      { kind: 'exam', text: 'Beim Gutenberg-Modell immer den monopolistischen MITTELbereich erklären und begründen (erfolgreiche Markenpolitik, Apple). Beim multiplikativen Modell betonen: keine Achsenschnitte → weder Sättigungsmenge noch Maximalpreis.' },
    ],
  },
  {
    id: 's4-prozess', sub: '4.1', title: 'Prozess der Preisfestlegung', pdfPages: '17–18',
    blocks: [
      { kind: 'text', text: 'Preise werden nicht nur einmalig festgelegt, sondern müssen über den Produktlebenszyklus mehrmals angepasst werden – systematischer Planungsprozess (Bruhn 2016):' },
      { kind: 'list', ordered: true, items: [
        'Analyse des preispolitischen Spielraums (Preiskorridor zwischen Preisunter- und Preisobergrenze)',
        'Festlegung spezifischer preispolitischer Zielsetzungen',
        'Preispolitische Strategieentwicklung',
        'Einsatz der Preisinstrumente',
        'Preiskontrolle',
      ] },
      { kind: 'definitions', conceptIds: ['mc-preisprozess', 'mc-preisspielraum'] },
      { kind: 'list', title: 'Vier zentrale Preisinstrumente', items: [
        '(1) Preise',
        '(2) Preisnachlässe (Rabatte, Boni und Skonti)',
        '(3) Preiszuschläge (z. B. für Sonderleistungen oder bestimmte Lieferzeiten)',
        '(4) Zugabe von Geld- und Sachwerten sowie Dienstleistungen – richtet sich vor allem an den Handel und soll die Akzeptanz der geforderten Preise unterstützen (z. B. Verkostungen, Displaymaterial)',
      ] },
      { kind: 'definitions', conceptIds: ['mc-preisinstrumente', 'mc-boni', 'mc-preiskontrolle'] },
    ],
  },
  {
    id: 's4-positionierung', sub: '4.2', title: 'Strategien der Preispositionierung', pdfPages: '18',
    blocks: [
      { kind: 'text', text: 'Preispolitische Entscheidungen zeigen oft schon kurzfristig Wirkung, basieren aber auf langfristigen strategischen Überlegungen (Bruhn 2016).' },
      { kind: 'definitions', conceptIds: ['mc-preispositionierung'] },
      { kind: 'table', columns: ['Strategie', 'Kennzeichen', 'Beispiel (Möbelbranche)'], rows: [
        ['Hochpreisstrategie', 'Spitzenqualität zu Premiumpreisen', 'Designmöbelstudios wie BoConcept oder Seyfarth'],
        ['Mittelpreisstrategie', 'mittleres Preisniveau bei Standardqualität', 'Vollsortimenter wie Höffner, Kraft, XXXL-Marken der Lutz-Gruppe (größter Marktanteil)'],
        ['Niedrigpreisstrategie', 'Mindestqualität zu sehr geringen Preisen', 'Möbeldiscounter wie Roller, Poco, Sconto'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-hochpreis', 'mc-mittelpreis', 'mc-niedrigpreis'] },
    ],
  },
  {
    id: 's4-wettbewerb', sub: '4.2', title: 'Strategien des Preiswettbewerbs', pdfPages: '18',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-preiswettbewerb', 'mc-preisfuehrerschaft', 'mc-preiskampf', 'mc-preisfolgerschaft'] },
      { kind: 'exam', text: 'Positionierung (Höhe des Preises: hoch/mittel/niedrig) und Preiswettbewerb (Orientierung an der Konkurrenz: führen/kämpfen/folgen) sind zwei verschiedene Strategiedimensionen – in Abgrenzungsfragen sauber trennen.' },
    ],
  },
  {
    id: 's4-abfolge', sub: '4.2', title: 'Strategien der Preisabfolge', pdfPages: '18',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-preisabfolge', 'mc-skimming', 'mc-penetration'] },
      { kind: 'example', title: 'Nicht immer erfolgreich: Netflix 2011', text: 'Netflix versuchte durch Entkopplung von DVD-Verleih und Streaming eine Preiserhöhung von 60 % – Verlust von 800.000 Kunden und 77 % des Börsenwerts.' },
    ],
  },
  {
    id: 's4-differenzierung', sub: '4.2', title: 'Strategien der Preisdifferenzierung', pdfPages: '18–19',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-preisdiff'] },
      { kind: 'table', columns: ['Form', 'Kennzeichen', 'Beispiel'], rows: [
        ['mengenmäßig', 'geringere Durchschnittspreise bei höheren Abnahmemengen; gibt Herstellungskostenvorteile weiter, regt zu größeren Bestellungen an', 'Kartenmacherei: 5 Einladungen 3,63 €/Stück, bei 500 nur noch 1,35 €'],
        ['zeitlich', 'bestmögliche Auslastung vorhandener Kapazitäten', 'Kinotag am Wochenanfang, günstigere Nachmittagsvorstellungen'],
        ['räumlich', 'Preise nach geografischen Aspekten (international, regional)', 'Benzin in Hamburg, Bremen, Berlin günstiger als in Thüringen und Baden-Württemberg (mehr Konkurrenz in Stadtstaaten)'],
        ['personell', 'Vergünstigungen für bestimmte Personengruppen (Studenten, Senioren)', 'kostenloses Jugendkonto der Sparkassen; Seniorenmenüs'],
        ['leistungsbezogen', 'geringfügige Leistungsänderung erzeugt unterschiedliche Preisklassen', 'gebundene Ausgabe, Taschenbuch, E-Book'],
        ['Preisbündelung (Sonderform)', 'verschiedene Leistungen gemeinsam zu einem günstigeren Paketpreis', 'MagentaEINS-Tarif der Telekom'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-pd-menge', 'mc-pd-zeit', 'mc-pd-raum', 'mc-pd-person', 'mc-pd-leistung', 'mc-preisbuendelung', 'mc-clv'] },
    ],
  },
  {
    id: 's4-bestimmung', sub: '4.3', title: 'Verfahrensweisen der Preisbestimmung', pdfPages: '19',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-preisbestimmung', 'mc-kostenorientiert'] },
      { kind: 'proscons', title: 'Kostenorientierte Preisbestimmung', pros: [
        'intuitivste Art, weit verbreitet', 'schnell, kostengünstig, transparent', 'wird von Konsumenten als fair wahrgenommen',
      ], cons: [
        'vernachlässigt jegliche nachfrage- und wettbewerbsbezogenen Aspekte',
      ] },
      { kind: 'definitions', conceptIds: ['mc-marktorientiert', 'mc-breakeven', 'mc-perceived-value', 'mc-cournot'] },
    ],
  },
  {
    id: 's4-innovativ', sub: '4.3', title: 'Innovative Preismodelle', pdfPages: '19',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-innovpricing', 'mc-yield'] },
      { kind: 'list', title: 'Yield Management ist sinnvoll bei …', ordered: true, items: [
        'fixen Kapazitäten', 'nicht lagerbaren Gütern', 'hohen Fixkosten und geringen variablen Kosten',
        'starken Nachfrageschwankungen', 'Vorausbuchung', 'möglicher Preisdifferenzierung',
      ] },
      { kind: 'definitions', conceptIds: ['mc-dynamic', 'mc-auction'] },
      { kind: 'proscons', title: 'Auction Pricing', pros: ['Unternehmen müssen sich nicht mit Preispolitik beschäftigen'], cons: ['Verkaufspreise können unter den Herstellerkosten liegen – ein wichtiger Gestaltungsbereich des Marketingmix wird aufgegeben'] },
      { kind: 'definitions', conceptIds: ['mc-reverse'] },
    ],
  },
  {
    id: 's4-konditionen', sub: '4.3', title: 'Konditionenpolitik', pdfPages: '19–20',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-konditionenpolitik', 'mc-absatzkredite', 'mc-rabatte'] },
      { kind: 'table', title: 'Vier Typen von Rabatten (Walsh/Deseniss/Kilian 2013)', columns: ['Rabatt', 'Gewährt für …'], rows: [
        ['Funktionsrabatt', 'vom Handel übernommene Funktionen (Lagerung, Präsentation, Kundenkontakt)'],
        ['Mengenrabatt', 'die Bestellung größerer Mengen durch das Handelsunternehmen'],
        ['Zeitrabatt', 'die Bestellzeit, z. B. vor der Saison (Skonto als Sonderform für frühzeitige Zahlung)'],
        ['Treuerabatt', 'langfristige und kontinuierliche Bestellungen'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-funktionsrabatt', 'mc-mengenrabatt', 'mc-zeitrabatt', 'mc-treuerabatt', 'mc-skonto'] },
      { kind: 'exam', text: 'Boni (rückwirkend am Ende einer Abrechnungsperiode) und Skonto (Sonderform des Zeitrabatts für frühe Zahlung) nicht verwechseln – beide sind Preisnachlässe.' },
    ],
  },
];
