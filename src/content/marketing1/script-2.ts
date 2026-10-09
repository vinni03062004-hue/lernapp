import { ScriptSection } from '@/lib/types';

/** Lernskript Kapitel 2 – Produktpolitik (PDF S. 6–10). */
export const sections2: ScriptSection[] = [
  {
    id: 's2-produktpolitik', sub: '2.1', title: 'Begriffe der Produktpolitik', pdfPages: '6',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-produktpolitik'] },
      { kind: 'merke', text: 'Zentrale Frage der Produktpolitik: Was soll vermarktet werden? Ein zu vermarktendes Produkt ist die Grundvoraussetzung für jede Marketingtätigkeit – deshalb ist die Produktpolitik das Herz des Marketingmix.' },
    ],
  },
  {
    id: 's2-produkt', sub: '2.1', title: 'Was ist ein Produkt?', pdfPages: '6',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-produkt'] },
      { kind: 'list', title: 'Produkte können materiell oder immateriell sein', items: [
        'materiell („berührbar“), z. B. Smartphone',
        'immateriell, z. B. das Streamen eines Liedes; auch Ideen (Liedtext, Melodie) und digitale Güter (In-Game-Items, Online-Coaching) können Produkte sein',
      ] },
      { kind: 'definitions', conceptIds: ['mc-leistungspolitik'] },
    ],
  },
  {
    id: 's2-ebenen-leistung', sub: '2.1', title: 'Produktebenen (nach Leistung)', pdfPages: '6–7',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-produktebenen-leistung'] },
      { kind: 'example', title: 'Kernleistung + Zusatz- und Serviceleistungen', text: 'Küche = Schränke/Geräte + Planung, Beratung, Lieferung, Montage, Garantie.' },
      { kind: 'merke', text: 'In gesättigten Märkten unterscheiden sich Produkte oft nur geringfügig – Zusatzleistungen werden immer bedeutender, um sich aus Kundensicht vom Wettbewerb abzuheben.' },
      { kind: 'figure', figureId: 'f-produktebenen3' },
      { kind: 'definitions', conceptIds: ['mc-kernprodukt', 'mc-reales-produkt', 'mc-erweitertes-produkt', 'mc-leistung-nutzen'] },
    ],
  },
  {
    id: 's2-ebenen-nutzen', sub: '2.1', title: 'Produktebenen (nach Nutzen)', pdfPages: '7',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-grundnutzen', 'mc-zusatznutzen'] },
      { kind: 'text', text: 'Vom Nutzenstandpunkt aus ergeben sich fünf Kategorien – je mehr Nutzenkomponenten, desto höher die Kategorie. Die Zusatznutzen sind nicht an eine Reihenfolge gebunden und müssen nicht zwangsläufig vorhanden sein.' },
      { kind: 'figure', figureId: 'f-produktebenen5' },
      { kind: 'definitions', conceptIds: ['mc-nutzenkategorien', 'mc-generisches-produkt', 'mc-erwartetes-produkt', 'mc-augmentiertes-produkt', 'mc-potenzielles-produkt'] },
      { kind: 'exam', text: 'Nicht verwechseln: Die Leistungs-Sicht (Kernprodukt → reales → erweitertes Produkt, E-Bike) und die Nutzen-Sicht (Grundnutzen → generisch → erwartet → augmentiert → potenziell, Hose) sind zwei verschiedene Modelle.' },
    ],
  },
  {
    id: 's2-qualitaet', sub: '2.1', title: 'Qualität', pdfPages: '7',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-qualitaet'] },
      { kind: 'table', title: 'Qualitätsdimensionen (Meffert/Burmann/Kirchgeorg 2015)', columns: ['Dimension', 'Leitfrage'], rows: [
        ['Gebrauchsnutzen', 'Funktioniert das Produkt wie erwartet?'],
        ['Haltbarkeit', 'Was ist die Lebensdauer des Produkts?'],
        ['Zuverlässigkeit', 'Wie wahrscheinlich ist es, dass das Produkt versagt?'],
        ['Ausstattung', 'Welche Zusatzvorzüge gibt es?'],
        ['Normgerechtigkeit', 'Werden Gütenormen eingehalten?'],
        ['Ästhetik', 'Gefällt das Produkt?'],
        ['Umwelt- und Sozialverträglichkeit', 'Ist das Produkt nachhaltig?'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-qualitaetsdimensionen'] },
    ],
  },
  {
    id: 's2-typologisierung', sub: '2.1', title: 'Produkttypologisierung', pdfPages: '7–8',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-guetertypen'] },
      { kind: 'table', title: 'Unterscheidungsmerkmale (Walsh/Deseniss/Kilian 2013)', columns: ['Merkmal', 'Ausprägungen', 'Beispiele'], rows: [
        ['Materialität', 'Sachgüter (physisch berührbar) vs. Dienstleistungen (nicht materiell)', 'Bleistift, Auto vs. Haarschnitt, Ölwechsel, Steuererklärung'],
        ['Konsumentengruppe', 'Konsumgüter [B2C]: Endkonsumenten, privater Gebrauch vs. Investitionsgüter [B2B]: Unternehmen, Weiterverkauf/Verwendung', 'manche Produkte in beiden Kategorien, z. B. Büromaterial'],
        ['Nutzungsdauer', 'Verbrauchsgüter (schnell aufgebraucht) vs. Gebrauchsgüter (länger benutzt)', 'Lebensmittel vs. Fahrrad'],
        ['Nutzungshäufigkeit', 'Waren des täglichen vs. des aperiodischen Bedarfs', 'Zahnpasta vs. Weihnachtsbäume'],
        ['Kaufgewohnheit', 'Convenience, Shopping, Specialty und Unsought Goods', 'Shampoo/Brot · Kleidung/Möbel · Antiquitäten/hochpreisige Modemarken · Versicherungen'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-sachgueter-dl', 'mc-konsum-invest', 'mc-verbrauch-gebrauch', 'mc-bedarf', 'mc-kaufgewohnheit', 'mc-convenience', 'mc-shopping', 'mc-specialty', 'mc-unsought'] },
    ],
  },
  {
    id: 's2-gestaltungsfelder', sub: '2.2', title: 'Gestaltungsfelder der Produktpolitik', pdfPages: '8',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-produktmanager', 'mc-ziele-produktpolitik', 'mc-gestaltungsfelder', 'mc-produktprogramm'] },
    ],
  },
  {
    id: 's2-produktgestaltung', sub: '2.2', title: 'Produktgestaltung und Qualitätsmanagement (Beispiel Pampers)', pdfPages: '8',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-produktgestaltung'] },
      { kind: 'table', columns: ['Aspekt', 'Leitfrage', 'Beispiel Pampers'], rows: [
        ['Technisch-funktionale Eigenschaften', 'Wie kann der Kernnutzen bereitgestellt werden?', 'Material, das saugstark und zugleich sanft ist'],
        ['Produktdesign', 'Wie ist das Produkt äußerlich durch Farbe, Form usw. gestaltet?', 'Schnitt, Farben, Muster'],
        ['Produktverpackung', 'Schützen, werblich anpreisen, anwenderfreundlich, leicht und ökologisch sinnvoll entsorgbar', '–'],
        ['Qualitätsmanagement', 'Wie können die funktional-technischen Eigenschaften dauerhaft gesichert werden? (Optimierung von Arbeitsabläufen und Prozessen)', '–'],
        ['Servicepolitik', 'Sollen weitere Serviceleistungen (Garantien, Lieferung, Kundendienst, Value Added Services) angeboten werden?', 'Pampers-Onlinebabyratgeber, Schwangerschaftstipps'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-technisch-funktional', 'mc-produktdesign', 'mc-verpackung', 'mc-qualitaetsmanagement', 'mc-servicepolitik', 'mc-serviceleistungen'] },
    ],
  },
  {
    id: 's2-lebenszyklus-entscheidungen', sub: '2.2', title: 'Produktpolitische Entscheidungen im Lebenszyklus', pdfPages: '8–9',
    blocks: [
      { kind: 'text', text: 'Die meisten Produkte müssen mit der Zeit an neue Marktrealitäten angepasst werden (Walsh/Deseniss/Kilian 2013):' },
      { kind: 'definitions', conceptIds: ['mc-produktvariation', 'mc-produktdiff', 'mc-produktelimination'] },
      { kind: 'exam', text: 'Variation ersetzt die alte Version (Basisfunktion bleibt, Design/Farbe/Geschmack ändern sich). Differenzierung ergänzt eine Version für ein neues Segment – beide Varianten werden angeboten, das Programm erweitert sich.' },
    ],
  },
  {
    id: 's2-portfolio', sub: '2.2', title: 'Produktportfoliomanagement', pdfPages: '9',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-portfoliomanagement', 'mc-programmbreite', 'mc-programmtiefe', 'mc-produktlinie'] },
      { kind: 'figure', figureId: 'f-programmbreite' },
      { kind: 'definitions', conceptIds: ['mc-programmstruktur'] },
    ],
  },
  {
    id: 's2-innovation', sub: '2.3', title: 'Innovationsmanagement', pdfPages: '9',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-innovationsmgmt'] },
      { kind: 'example', title: 'Kodak', text: 'Die erste Digitalkamera wurde 1975 von einem Kodak-Mitarbeiter erfunden, jedoch nicht als Strategie verfolgt – 2012 Insolvenz. Kodak hat die digitale Revolution nicht verschlafen, sondern bewusst vernachlässigt.' },
    ],
  },
  {
    id: 's2-plz', sub: '2.3', title: 'Produktlebenszyklus', pdfPages: '9–10',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-lebenszyklus'] },
      { kind: 'table', columns: ['Phase', 'Merkmale (Skript)', 'Typische Marketingaktivität (Abbildung)'], rows: [
        ['Einführungsphase', 'hohe Investitionen, geringe Umsätze', 'Einführungsaktivitäten, um Nachfrage zu stimulieren'],
        ['Wachstumsphase', 'überdurchschnittlicher Zuwachs – Gewinnzone wird erreicht', 'Kampf um Marktanteile über Preis und Konditionen'],
        ['Reifephase', 'Markt dehnt sich weiter aus, Wachstumsraten sinken; Erfahrungskurveneffekte und Economies of Scale am höchsten', 'Erhöhung der Werbeausgaben, Produktdifferenzierung'],
        ['Sättigungsphase', 'Markt ist gesättigt, Umsätze gehen zurück', 'Preissenkungen'],
        ['Verfallsphase', 'kaum noch Bedarf, Umsatz stark rückläufig – Ende des Zyklus', 'Produkt nicht mehr unterstützt'],
      ] },
      { kind: 'figure', figureId: 'f-lebenszyklus' },
      { kind: 'definitions', conceptIds: ['mc-einfuehrungsphase', 'mc-wachstumsphase', 'mc-reifephase', 'mc-saettigungsphase', 'mc-verfallsphase', 'mc-erfahrungskurve', 'mc-economies-of-scale'] },
    ],
  },
  {
    id: 's2-skurve', sub: '2.3', title: 'S-Kurvenkonzept', pdfPages: '10',
    blocks: [
      { kind: 'text', text: 'Der Produktlebenszyklus nutzt hauptsächlich die Erklärungsvariable Zeit – er erklärt Technologiesprünge nicht.' },
      { kind: 'definitions', conceptIds: ['mc-skurve'] },
      { kind: 'figure', figureId: 'f-skurve' },
      { kind: 'merke', text: 'Unternehmen müssen die Grenzen ihrer Technologien abschätzen, um auf Technologiesprünge vorbereitet zu sein – F&E sollte kontinuierlich neue Produkte entwickeln und vorbereiten.' },
      { kind: 'definitions', conceptIds: ['mc-diskontinuitaet'] },
    ],
  },
  {
    id: 's2-adoption', sub: '2.3', title: 'Adoption neuer Produkte', pdfPages: '10',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-adoption'] },
      { kind: 'example', title: 'Akzeptanz braucht Zeit', text: 'Sony brachte 1981 die erste filmlose Kamera, doch es dauerte weitere 20 Jahre bis zum Massenmarkt.' },
      { kind: 'definitions', conceptIds: ['mc-innovatoren'] },
      { kind: 'merke', text: 'Die gezielte Ansprache von Innovatoren und frühen Adoptern ist äußerst wichtig, um den Diffusionsprozess von Produktinnovationen voranzutreiben (Rogers 2003).' },
      { kind: 'definitions', conceptIds: ['mc-diffusion'] },
      { kind: 'figure', figureId: 'f-diffusion' },
      { kind: 'list', title: 'Verlauf der Diffusionskurve', items: [
        'Zunächst übernehmen nur wenige das Produkt, dann steigt die Zahl der Neukäufer stark an, gegen Ende nimmt sie wieder ab.',
        'Anstieg in der Mitte: Produkt wird bekannter, Unsicherheit und Preise sinken, Verfügbarkeit steigt, soziale Empfehlungen wirken.',
        'Verlangsamung am Schluss: Der Markt ist weitgehend gesättigt.',
      ] },
      { kind: 'definitions', conceptIds: ['mc-adopterkategorien'] },
      { kind: 'exam', text: 'Adoption = individueller Übernahmeprozess in fünf Phasen; Diffusion = kumulierte Adoption im Zeitablauf. Bei Fragen zum Kurvenverlauf die Gründe für Anstieg (bekannter, weniger Unsicherheit, sinkende Preise, Verfügbarkeit, Empfehlungen) und Verlangsamung (Sättigung) nennen.' },
    ],
  },
];
