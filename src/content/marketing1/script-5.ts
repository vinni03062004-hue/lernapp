import { ScriptSection } from '@/lib/types';

/** Lernskript Kapitel 5 – Distributionspolitik (PDF S. 20–24). */
export const sections5: ScriptSection[] = [
  {
    id: 's5-grundlagen', sub: '5.1', title: 'Grundlagen der Distributionspolitik', pdfPages: '20',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-distribution'] },
      { kind: 'merke', text: 'Der Erfolg hängt nicht nur von der Qualität der Leistungen, sondern auch von der Qualität der Vertriebskanäle ab – die besten Produkte nutzen wenig, wenn sie nicht kostengünstig und zeitnah bei den Konsumenten ankommen.' },
      { kind: 'definitions', conceptIds: ['mc-akquisitorisch', 'mc-logistisch'] },
    ],
  },
  {
    id: 's5-ziele', sub: '5.1', title: 'Rolle und Ziele der Distributionspolitik', pdfPages: '20',
    blocks: [
      { kind: 'text', text: 'Aufgabe des Vertriebs ist es, die Verfügbarkeit von Leistungen für die Kunden zu gewährleisten. Drei Arten von Vertriebszielen werden parallel verfolgt:' },
      { kind: 'table', columns: ['Zielart', 'Inhalt'], rows: [
        ['Psychologische Ziele', 'Den Kunden soll ein einzigartiges, markentreues und positives Kauferlebnis vermittelt werden.'],
        ['Versorgungsorientierte Ziele', 'Leistungen sollen lückenlos verfügbar sein.'],
        ['Ökonomische Ziele', 'Absatzmenge, Preisniveau und Vertriebskosten sollen optimiert werden.'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-vertriebsziele', 'mc-vertrieb-einklang'] },
    ],
  },
  {
    id: 's5-begriffe', sub: '5.1', title: 'Begriffe der Distributionspolitik: Vertriebskanal, Push und Pull', pdfPages: '20–21',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-vertriebskanal', 'mc-push-pull', 'mc-retail-media', 'mc-pull'] },
      { kind: 'table', title: 'Push vs. Pull im Vergleich', columns: ['', 'Push-Strategie', 'Pull-Strategie'], rows: [
        ['Ansatz', 'Hersteller „drückt“ Produkte in den Handel', 'Nachfragesog: Kommunikation direkt an Endkunden'],
        ['Maßnahmen', 'Rabatte, Boni, Exklusivrechte; digital: Retail Media, „Prime-Exklusivprodukte“, „Only at Zalando“', 'Social-Media-Kampagnen, Content Marketing, gute Platzierung in Suchmaschinen (SEO), TV-Werbung'],
        ['Sinnvoll, wenn …', 'Markentreue gering, Kunden entscheiden impulsiv im Geschäft, Produktnutzen relativ klar', 'Kunden markentreu und stärker in den Kauf involviert'],
      ] },
      { kind: 'figure', figureId: 'f-pushpull' },
      { kind: 'merke', text: 'In der Regel wenden Unternehmen beide Strategien gleichzeitig an.' },
      { kind: 'definitions', conceptIds: ['mc-involvement', 'mc-content-marketing', 'mc-seo'] },
    ],
  },
  {
    id: 's5-handel', sub: '5.1', title: 'Wertschöpfung durch den Handel', pdfPages: '21–22',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-intermediaere', 'mc-handelsleistungen', 'mc-ueberbrueckung'] },
      { kind: 'table', title: 'Überbrückung von Diskrepanzen zwischen Herstellung und Konsum', columns: ['Funktion', 'Inhalt', 'Beispiel Bananen'], rows: [
        ['Räumliche Überbrückung', 'Transport vom Ort der Herstellung in die Nähe des Ge- oder Verbrauchsorts', 'Bananen aus Costa Rica, Kolumbien, Ecuador in jedem Supermarkt'],
        ['Zeitliche Überbrückung', 'Lagerung und Vorratshaltung – Produkt ist verfügbar, wenn es gebraucht wird', 'Kühlung nach der Ernte, Nachreifung in Reifereien durch Begasung mit Ethen'],
        ['Sortimentsgestaltung', 'Abstimmung des Herstellerangebots mit der Nachfrage – qualitativ und quantitativ', 'Importeure liefern große Mengen, Endverbraucher kaufen wenige Stück (quantitativ), nehmen auch andere Lebensmittel mit (qualitativ)'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-raeumlich', 'mc-zeitlich', 'mc-sortiment'] },
      { kind: 'definitions', conceptIds: ['mc-disintermediation', 'mc-d2c'] },
      { kind: 'example', title: 'Gegenbeispiel zur Disintermediation: Nordstrom Local', text: 'Café-Atmosphäre mit professioneller Stylistenberatung statt Kleiderständern; die zusammengestellten Outfits werden geliefert – der Händler schafft Zusatznutzen.' },
      { kind: 'definitions', conceptIds: ['mc-vertikale-integration'] },
      { kind: 'exam', text: 'Disintermediation (Zwischenhändler fällt weg, z. B. D2C, Ersparnis der Handelsmarge) ≠ vertikale Integration (Funktion bleibt, wird aber ins eigene Unternehmen geholt – Edeka-Bananenreiferei).' },
    ],
  },
  {
    id: 's5-vertikal', sub: '5.2', title: 'Vertikale Gestaltung: direkter und indirekter Vertrieb', pdfPages: '22',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-vertriebsorgane', 'mc-vertikale-gestaltung', 'mc-direkt-indirekt', 'mc-indirekt', 'mc-vertriebsagentur'] },
      { kind: 'proscons', title: 'Direkter Vertrieb', pros: [
        'enge Kundenbeziehung und daraus resultierende Kundentreue',
        'Kontrolle der Vertriebsaktivitäten (Preise, Rabatte, Präsentation etc.)',
        'Gewinnung ungefilterter Kundeninformationen',
        'geringere Kosten (nur Personalkosten)',
      ], cons: [
        'hoher Aufwand',
        'geringere Absatzmenge',
        'Fehlen von komplementären Produkten',
      ] },
      { kind: 'proscons', title: 'Indirekter Vertrieb', pros: [
        'Arbeitsteilung',
        'Intermediäre kennen den Markt besser',
        'geringerer Aufwand',
        'größere Absatzmengen',
      ], cons: [
        'kein direktes Feedback vom Markt',
        'Handelsmargen',
        'Abhängigkeit von Vertriebspartnern',
        'geringere Kontrollmöglichkeiten',
      ] },
      { kind: 'definitions', conceptIds: ['mc-vertriebsweg-wahl'] },
      { kind: 'merke', text: 'In der Praxis entscheiden sich Unternehmen oft für Mischformen, nutzen also direkten und indirekten Vertrieb.' },
    ],
  },
  {
    id: 's5-extern', sub: '5.2', title: 'Externe Vertriebsorgane', pdfPages: '22',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-externe-vertriebsorgane'] },
      { kind: 'table', columns: ['Vertriebsorgan', 'Kennzeichen', 'Beispiel'], rows: [
        ['Vertragshändler', 'rechtlich selbstständig, aber durch Verträge fest in die Vertriebsstrategie des Anbieters eingebunden', 'Automobilbranche'],
        ['Franchisepartner', 'noch stärkere Bindung: Weisungsrecht des Anbieters, Kontrolle von Verhalten und Ergebnissen', 'Fast-Food-Restaurants'],
        ['Absatzhelfer', 'Handelsvertreter, Kommissionäre, Makler – unterscheiden sich nach Tätigkeit (Abschluss/Vermittlung), Dauer (ständig/fallweise), Vergütung (Fixum/Provision); erwerben KEIN Eigentum', 'Kosmetikbranche · Antiquitäten · Immobilien, Versicherungen'],
        ['Absatzmittler', 'Groß- und Einzelhandel; Großhandel verkauft große Mengen an gewerbliche Nachfrager, Einzelhandel an private Endverbraucher; erwerben Eigentum', '–'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-vertragshaendler', 'mc-franchising', 'mc-absatzhelfer-mittler', 'mc-absatzmittler'] },
      { kind: 'merke', text: 'Wichtig: Absatzhelfer erwerben im Gegensatz zu den Absatzmittlern kein Eigentum an den abzusetzenden Produkten.' },
    ],
  },
  {
    id: 's5-laenge', sub: '5.2', title: 'Länge des Vertriebsweges', pdfPages: '23',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-vertriebsweglaenge'] },
      { kind: 'figure', figureId: 'f-vertriebswege' },
    ],
  },
  {
    id: 's5-horizontal', sub: '5.3', title: 'Horizontale Gestaltung: Breite des Vertriebssystems', pdfPages: '23',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-horizontale-gestaltung', 'mc-breite', 'mc-einkanal', 'mc-multi-omni', 'mc-omnichannel'] },
      { kind: 'merke', text: 'Multichannel = auf mehreren Kanälen präsent sein; Omnichannel = über alle Kanäle hinweg vernetzt sein.' },
      { kind: 'definitions', conceptIds: ['mc-shop-in-shop', 'mc-click-collect'] },
    ],
  },
  {
    id: 's5-differenzierung', sub: '5.3', title: 'Vertriebswegedifferenzierung (Distributionsgrad)', pdfPages: '23–24',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-distributionsgrad'] },
      { kind: 'table', columns: ['Distributionsgrad', 'Vertriebspartner / Produkte', 'Beispiel Butter'], rows: [
        ['Intensiver Vertrieb', 'sehr viele Partner, günstige Produkte, Convenience Goods; sinnvoll bei sehr großer Zielgruppe', '„Deutsche Markenbutter“ in jedem Lebensmittelgeschäft'],
        ['Selektiver Vertrieb', 'mehrere Partner, Shopping Goods', 'Andechser Bio-Almbutter vor allem in gut sortierten Bioläden'],
        ['Exklusiver Vertrieb', 'sehr wenige Partner, teure Produkte, Specialty Goods; wenige Gourmetkunden, sachkundig bedient', 'Tarbiana-Trüffelbutter nur in Spezialitätenläden und online'],
      ] },
      { kind: 'figure', figureId: 'f-distributionsgrad' },
      { kind: 'definitions', conceptIds: ['mc-intensiv', 'mc-selektiv', 'mc-exklusiv'] },
    ],
  },
  {
    id: 's5-einfluss', sub: '5.3', title: 'Einflussfaktoren auf die Wahl des Vertriebssystems', pdfPages: '24',
    blocks: [
      { kind: 'merke', text: 'Der Vertrieb sollte als markenbildendes Element des Marketingmix verstanden und im Einklang mit den übrigen Marketingmaßnahmen geplant werden.' },
      { kind: 'table', columns: ['Faktor', 'Leitfragen / Aspekte'], rows: [
        ['Produkt', 'Wie erklärungsbedürftig ist es? Wie oft wird es gebraucht? Ist es transport- und lagerfähig? Wie viel Kundendienst ist nötig?'],
        ['Unternehmen', 'Größe, Finanzkraft, Erfahrung, Marktstellung, Strategie'],
        ['Markt', 'Marktposition und Wachstumsraten der Vertriebskanäle'],
        ['Kunden', 'Einkaufsverhalten'],
        ['Absatzmittler', 'vertragliche Bindung, Flexibilität, Standort, Größe, Image, Beeinflussbarkeit, Vertriebskosten'],
        ['Konkurrenz', 'Vertriebsstrategie der Konkurrenz'],
        ['Umfeld', 'Technologie, Gesetzgebung, soziokulturelle Veränderungen'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-einflussfaktoren-vertrieb'] },
      { kind: 'exam', text: 'In Transferaufgaben („Welches Vertriebssystem empfehlen Sie für …?“) mehrere Einflussfaktoren ausdrücklich prüfen – z. B. Erklärungsbedürftigkeit (Produkt), Finanzkraft (Unternehmen), Einkaufsverhalten (Kunden) – und daraus Länge, Breite und Distributionsgrad ableiten.' },
    ],
  },
];
