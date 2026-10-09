import { Figure } from '@/lib/types';

/**
 * Visuelle Wissenseinheiten des Moduls Marketing I: alle zehn Abbildungen des
 * PDFs mit Beschreibung, Bildelementen, typischen Fehlinterpretationen und
 * vierstufiger Bildprüfkette. Inhalte ausschließlich aus Abbildung + Skripttext;
 * Seitenangaben gemäß Bildposition im PDF.
 */
const ok = { technical: true, semantic: true, didactic: true, validated: true };

export const figures: Figure[] = [
  {
    id: 'f-produktebenen3', chapterId: 'm2', file: 'img-000.png', pdfPage: 7,
    title: 'Produktebenen nach Leistung (Kernprodukt, reales und erweitertes Produkt)',
    caption: 'Drei ineinanderliegende Ebenen am Beispiel E-Bike: Kernprodukt → reales Produkt → erweitertes Produkt.',
    explanationSimple: 'Ein Produkt besteht aus drei Schichten. Innen das Kernprodukt: die eigentliche Leistung (das E-Bike bringt dich auf zwei Rädern voran, der Motor erleichtert das Fahren). Darum das reale Produkt: das, was man tatsächlich kaufen kann (Rahmen mit Akku und Motor, Unterstützungsstufen, Display). Außen das erweiterte Produkt: alle Zusatzleistungen (Software-Updates, Wartung beim Fachhändler).',
    explanationExpert: 'Die Abbildung konkretisiert die Produktebenen nach Leistung: (1) Kernprodukt = Kernleistung, d. h. die Befriedigung eines Bedürfnisses bzw. die Lösung eines Problems. (2) Reales Produkt = Umsetzung des Kernprodukts in ein sichtbares, real kaufbares Produkt mit spezifischem Design, technischer Qualität, Funktionalitäten, Verpackung und Markennamen. (3) Erweitertes Produkt = Produkt mit allen Zusatzleistungen wie Lieferung, Finanzierung, Garantie, Beratung, Installation, Service. In gesättigten Märkten unterscheiden sich Produkte oft nur geringfügig, daher werden die Zusatzleistungen der äußeren Ebene immer bedeutender, um sich vom Wettbewerb abzuheben.',
    elements: [
      { label: 'Kernprodukt (innerer Kreis)', meaning: 'Kernleistung: Bedürfnisbefriedigung bzw. Problemlösung – E-Bike: Fortbewegung auf zwei Rädern, durch Elektroantrieb erleichtert.' },
      { label: 'Reales Produkt (mittlerer Kreis)', meaning: 'Sichtbares, kaufbares Produkt mit Design, technischer Qualität, Funktionen, Verpackung, Marke – E-Bike: Rahmen mit integriertem Akku und Motor, Unterstützungsstufen, Display.' },
      { label: 'Erweitertes Produkt (äußerer Kreis)', meaning: 'Alle Zusatzleistungen (Lieferung, Finanzierung, Garantie, Beratung, Installation, Service) – E-Bike: Software-Updates, Wartungsservices beim Fachhändler.' },
    ],
    conceptIds: ['mc-produktebenen-leistung'],
    validation: ok,
  },
  {
    id: 'f-produktebenen5', chapterId: 'm2', file: 'img-001.png', pdfPage: 7,
    title: 'Produktebenen nach Nutzen (fünf Kategorien)',
    caption: 'Fünf aufeinander aufbauende Nutzenkategorien am Beispiel Hose: Grundnutzen → generisch → erwartet → augmentiert → potenziell.',
    explanationSimple: 'Die Stufen zeigen, wie viel Nutzen ein Produkt bietet. Ganz unten der Grundnutzen: Die Hose bekleidet und wärmt (ein ausreichend großes Stück Stoff würde reichen). Darüber: generisches Produkt (Hosenbeine geschneidert), erwartetes Produkt (bequemer Sitz, gefälliges Design), augmentiertes Produkt (Markenname, wasserabweisend, Thermo, modisch) und ganz oben das potenzielle Produkt (Extrafunktionalitäten, „smart clothing“).',
    explanationExpert: 'Vom Nutzenstandpunkt aus ergeben sich laut Skript fünf Kategorien – je mehr Nutzenkomponenten, desto höher die Kategorie. Der Grundnutzen befriedigt das ursprüngliche Bedürfnis; ein Produkt, das nur ihn erfüllt, ist meist nicht akzeptabel. Die höheren Stufen fügen Nutzenkomponenten hinzu (generisch → erwartet → augmentiert → potenziell). Die Zusatznutzen (Geltungs-, Erbauungs-, emotionaler Nutzen) sind nicht an eine Reihenfolge gebunden und müssen nicht zwangsläufig vorhanden sein.',
    elements: [
      { label: 'Grundnutzen (unterste Stufe)', meaning: 'Bekleiden und Wärmen, z. B. ein ausreichend großes Stück Stoff.' },
      { label: 'Generisches Produkt', meaning: 'Hosenbeine geschneidert.' },
      { label: 'Erwartetes Produkt', meaning: 'Bequemer Sitz und gefälliges Design.' },
      { label: 'Augmentiertes Produkt', meaning: 'Markenname, wasserabweisend, Thermo, modisch.' },
      { label: 'Potenzielles Produkt (oberste Stufe)', meaning: 'Extrafunktionalitäten, „smart clothing“.' },
    ],
    conceptIds: ['mc-nutzenkategorien', 'mc-grundnutzen'],
    validation: ok,
  },
  {
    id: 'f-programmbreite', chapterId: 'm2', file: 'img-002.png', pdfPage: 9,
    title: 'Programmbreite und Programmtiefe',
    caption: 'Produktprogramm mit vier Produktlinien und ihren Marken: Breite = Anzahl der Produktlinien (waagerecht), Tiefe = Produkte je Linie (senkrecht).',
    explanationSimple: 'Die Abbildung zeigt ein Produktprogramm. Nebeneinander stehen die Produktlinien – je mehr Linien, desto breiter das Programm. Untereinander stehen die Marken einer Linie – je mehr Produkte pro Linie, desto tiefer das Programm.',
    explanationExpert: 'Programmbreite ist durch die Anzahl der Produktlinien definiert, Programmtiefe beschreibt die Zahl der Produkte pro Produktlinie; eine Produktlinie ist eine Gruppe von Produkten mit gemeinsamen Kriterien. Im Beispiel umfasst das Programm vier Linien – Baby- und Damenhygiene (Always, Pampers …), Schönheitspflege (Olaz, Herbal Essences …), Wasch- und Reinigungsmittel (Ariel, Lenor …), Gesundheit und Rasur (blend-a-dent, Wick …). Das Produktportfoliomanagement steuert die Ziele aller Produkte/Marken und verteilt die Ressourcen.',
    elements: [
      { label: 'Waagerechter Pfeil „Breite“', meaning: 'Anzahl der Produktlinien.' },
      { label: 'Senkrechter Pfeil „Tiefe“', meaning: 'Zahl der Produkte/Marken innerhalb einer Produktlinie.' },
      { label: 'Spaltenköpfe (Produktlinien)', meaning: 'Baby-/Damenhygiene, Schönheitspflege, Wasch-/Reinigungsmittel, Gesundheit/Rasur.' },
      { label: 'Zellen (Marken)', meaning: 'z. B. Always und Pampers in der Hygiene-Linie, Ariel und Lenor bei den Waschmitteln.' },
    ],
    conceptIds: ['mc-programmbreite', 'mc-programmtiefe', 'mc-produktlinie', 'mc-portfoliomanagement'],
    validation: ok,
  },
  {
    id: 'f-lebenszyklus', chapterId: 'm2', file: 'img-003.png', pdfPage: 9,
    title: 'Produktlebenszyklus',
    caption: 'Umsatzverlauf über die Zeit in fünf Phasen mit typischen Marketingaktivitäten.',
    explanationSimple: 'Die gestrichelte Kurve zeigt den Umsatz eines Produkts über die Zeit: niedrig bei der Einführung, steigend im Wachstum, am höchsten in Reife und Sättigung, fallend im Verfall. Unter jeder Phase steht, was Unternehmen typischerweise tun.',
    explanationExpert: 'Idealtypische Darstellung der Phasen von der Neueinführung bis zur Eliminierung. Skript: Einführung (hohe Investitionen, geringe Umsätze), Wachstum (überdurchschnittlicher Zuwachs, Gewinnzone wird erreicht), Reife (Markt dehnt sich weiter aus, Wachstumsraten sinken; Erfahrungskurveneffekte und Economies of Scale am höchsten), Sättigung (Markt gesättigt, Umsätze gehen zurück), Verfall (kaum noch Bedarf, Umsatz stark rückläufig). Typische Aktivitäten laut Abbildung: Einführungsaktivitäten, um Nachfrage zu stimulieren · Kampf um Marktanteile über Preis und Konditionen · Erhöhung der Werbeausgaben, Produktdifferenzierung · Preissenkungen · Produkt nicht mehr unterstützt. Hauptsächliche Erklärungsvariable ist die Zeit.',
    elements: [
      { label: 'x-Achse „Zeit“', meaning: 'Zeitverlauf – die Erklärungsvariable des Modells.' },
      { label: 'Gestrichelte Kurve „Umsatz“', meaning: 'Umsatzentwicklung über die fünf Phasen.' },
      { label: 'Zeile „typische Marketing-Aktivitäten“', meaning: 'Je Phase die typische Maßnahme (von Nachfrage stimulieren bis Produkt nicht mehr unterstützen).' },
    ],
    conceptIds: ['mc-lebenszyklus'],
    validation: ok,
  },
  {
    id: 'f-skurve', chapterId: 'm2', file: 'img-004.png', pdfPage: 10,
    title: 'S-Kurvenkonzept',
    caption: 'Leistungsfähigkeit zweier Technologien über den kumulierten F&E-Aufwendungen – die neue Technologie löst die alte ab.',
    explanationSimple: 'Zwei S-förmige Kurven zeigen, wie leistungsfähig eine Technologie wird, je mehr in Forschung und Entwicklung investiert wird. Die alte Technologie flacht an ihrer Grenze ab – mehr Geld bringt kaum noch Fortschritt. Die neue Technologie startet niedriger, hat aber eine höhere Grenze und ersetzt die alte.',
    explanationExpert: 'S-Kurvenkonzept (Foster 1986): Ziel ist, das Innovationsmanagement für technologische Diskontinuitäten zu sensibilisieren. x-Achse: kumulierte Aufwendungen für Forschung und Entwicklung; y-Achse: Leistungsfähigkeit der Technologie. Jede Technologie stößt irgendwann an eine Leistungsgrenze (bedingt durch Größe, Komplexität oder Materialeigenschaften) und wird durch eine neue ersetzt. Markiert sind der heutige Stand und die verbleibenden technologischen Entwicklungspotenziale bis zur Grenze. Konsequenz: Unternehmen müssen die Grenzen ihrer Technologien abschätzen; F&E sollte kontinuierlich neue Produkte entwickeln und vorbereiten.',
    elements: [
      { label: 'x-Achse', meaning: 'Kumulierte Aufwendungen für Forschung und Entwicklung.' },
      { label: 'y-Achse', meaning: 'Leistungsfähigkeit der Technologie.' },
      { label: 'Gestrichelte Linien „Grenze alte/neue Technologie“', meaning: 'Obere Leistungsgrenze der jeweiligen Technologie.' },
      { label: 'Punkte „heutiger Stand“ und Pfeile „technologische Entwicklungspotenziale“', meaning: 'Abstand zwischen aktuellem Stand und Grenze = verbleibendes Potenzial.' },
    ],
    conceptIds: ['mc-skurve', 'mc-innovationsmgmt'],
    validation: ok,
  },
  {
    id: 'f-diffusion', chapterId: 'm2', file: 'img-005.png', pdfPage: 10,
    title: 'Diffusionsprozess: Adopter nach Adoptionszeit',
    caption: 'Verteilung der Übernehmer über die Adoptionszeit: Innovatoren, Frühadopter, frühe Mehrheit, späte Mehrheit, Nachzügler.',
    explanationSimple: 'Die gestrichelte Kurve zeigt, wie viele Menschen ein neues Produkt zu welchem Zeitpunkt übernehmen: Zuerst nur wenige (Innovatoren 2,5 %, Frühadopter 13,5 %), dann sehr viele (frühe und späte Mehrheit je 34 %), am Ende die Nachzügler (16 %).',
    explanationExpert: 'Die Abbildung teilt die Adopter nach dem Zeitpunkt der Übernahme ein: Innovatoren 2,5 %, Frühadopter 13,5 %, frühe Mehrheit 34 %, späte Mehrheit 34 %, Nachzügler 16 %. Skript zum Kurvenverlauf: Zunächst übernehmen nur wenige das Produkt, dann steigt die Zahl der Neukäufer stark an, gegen Ende nimmt sie wieder ab. Gründe für den Anstieg: Das Produkt wird bekannter, Unsicherheit und Preise sinken, die Verfügbarkeit steigt, soziale Empfehlungen wirken; die Verlangsamung am Schluss entsteht, weil der Markt weitgehend gesättigt ist. Innovatoren und frühe Adopter sind hochinformierte, einflussreiche Multiplikatoren; ihre gezielte Ansprache treibt den Diffusionsprozess voran (Rogers 2003).',
    elements: [
      { label: 'x-Achse „Adoptionszeit“', meaning: 'Zeitpunkt der Übernahme.' },
      { label: 'y-Achse „Adopter“', meaning: 'Zahl der Übernehmer zum jeweiligen Zeitpunkt.' },
      { label: 'Innovatoren (2,5 %) und Frühadopter (13,5 %)', meaning: 'Frühe, hochinformierte Segmente – Multiplikatoren (Influencer).' },
      { label: 'Frühe und späte Mehrheit (je 34 %), Nachzügler (16 %)', meaning: 'Der Großteil des Marktes folgt; am Ende ist der Markt weitgehend gesättigt.' },
    ],
    conceptIds: ['mc-diffusion', 'mc-innovatoren'],
    validation: ok,
  },
  {
    id: 'f-paf', chapterId: 'm4', file: 'img-006.png', pdfPage: 17,
    title: 'Preis-Absatz-Funktionen im Vergleich',
    caption: 'Lineare, Gutenberg- und multiplikative Preis-Absatz-Funktion im selben Diagramm (Absatz x über Preis p).',
    explanationSimple: 'Drei Kurven zeigen, wie viel bei welchem Preis verkauft wird. Die Gerade ist die lineare Funktion: von der Sättigungsmenge bei Preis 0 bis zum Maximalpreis. Die doppelt geknickte Kurve ist das Gutenberg-Modell: In der Mitte ändert sich die Menge kaum, obwohl der Preis steigt. Die stark gekrümmte Kurve ist die multiplikative Funktion – sie berührt die Achsen nie.',
    explanationExpert: 'x-Achse: Preis p; y-Achse: Absatz x. Lineare PAF x(p) = a – b·p: idealtypisch im Monopol, a = Sättigungsmenge (Absatz bei Preis 0), a/b = Maximalpreis, b = Stärke der Marktreaktion (im Diagramm als Steigungsdreieck mit den Seiten 1 und b). Multiplikatives Modell x(p) = a·p^(–b): berücksichtigt den Ausgangspreis (je niedriger, desto stärker wirken Änderungen); schneidet die Achsen nicht – keine Sättigungsmenge, kein Maximalpreis. Gutenberg-Modell: doppelt geknickt (unvollkommener Markt mit Wettbewerbern) – oben und unten sinkt die Nachfrage ähnlich linear, im mittleren Bereich entsteht eine Art Monopol, in dem sich die Absatzmenge trotz höherer Preise wenig verändert (z. B. Apple durch erfolgreiche Markenpolitik).',
    elements: [
      { label: 'Sättigungsmenge a (y-Achsenabschnitt)', meaning: 'Absatz bei Preis 0 – Startpunkt der linearen PAF.' },
      { label: 'Maximalpreis a/b (x-Achsenabschnitt)', meaning: 'Preis, bei dem keine Nachfrage mehr existiert.' },
      { label: 'Steigungsdreieck (1 und b)', meaning: 'Parameter b – wie stark der Markt auf Preisänderungen reagiert.' },
      { label: 'Gutenberg-Kurve mit flachem Mittelteil', meaning: 'Monopolistischer Bereich: Menge bleibt trotz Preisänderung nahezu stabil.' },
      { label: 'Multiplikative Kurve', meaning: 'Nähert sich den Achsen nur an – weder Sättigungsmenge noch Maximalpreis.' },
    ],
    conceptIds: ['mc-paf', 'mc-paf-linear', 'mc-paf-mult', 'mc-gutenberg'],
    validation: ok,
  },
  {
    id: 'f-pushpull', chapterId: 'm5', file: 'img-007.png', pdfPage: 21,
    title: 'Push- und Pull-Strategie',
    caption: 'Hersteller – Handel – Kunde: Push „drückt“ die Ware durch den Kanal (rote Pfeile), Pull erzeugt einen Nachfragesog (lila Pfeile).',
    explanationSimple: 'Oben der Hersteller, in der Mitte der Handel, unten der Kunde. Push (rot): Der Hersteller wirkt mit Exklusivrechten, Boni oder Rabatten auf den Handel ein, der Handel bewirbt das Produkt bei den Kunden (Werbung, Regalplatzierung). Pull (lila): Der Hersteller spricht die Endkunden direkt an (SEO, Social-Media-Kampagnen, TV-Werbung) – die Kunden fragen das Produkt nach, der Handel fordert es beim Hersteller an.',
    explanationExpert: 'Push-Strategie: Der Hersteller wirkt aktiv auf den Handel ein (Exklusivrechte, Boni, Rabatte); der Handel bewirbt das Produkt bei den Endkunden (Werbung, Regalplatzierung) – die Ware wird von oben nach unten durch den Kanal gedrückt. Sinnvoll bei geringer Markentreue, impulsiven Entscheidungen im Geschäft und klarem Produktnutzen. Pull-Strategie: Der Hersteller richtet seine Kommunikation an die Endkunden (SEO, Social-Media-Kampagnen, TV-Werbung); Kunden fragen das Produkt beim Handel nach, der Handel fordert die Ware beim Hersteller an – ein Nachfragesog von unten nach oben. Sinnvoll bei markentreuen, stärker involvierten Kunden. In der Regel werden beide Strategien gleichzeitig angewendet.',
    elements: [
      { label: 'Rote, durchgezogene Pfeile (abwärts)', meaning: 'Push: Hersteller → Handel (Exklusivrechte, Boni, Rabatte) → Kunde (Werbung, Regalplatzierung).' },
      { label: 'Lila Pfeil vom Hersteller zum Kunden', meaning: 'Pull: Kommunikation direkt an Endkunden (SEO, Social Media, TV-Werbung).' },
      { label: 'Lila, gestrichelte Pfeile (aufwärts)', meaning: 'Kunde fragt Produkt nach → Handel fordert Ware an: Nachfragesog.' },
    ],
    conceptIds: ['mc-push-pull', 'mc-pull'],
    validation: ok,
  },
  {
    id: 'f-vertriebswege', chapterId: 'm5', file: 'img-008.png', pdfPage: 23,
    title: 'Länge des Vertriebsweges (ein-, zwei-, dreistufig)',
    caption: 'Indirekte Vertriebswege zwischen Hersteller und Endverbraucher mit unterschiedlich vielen Stufen.',
    explanationSimple: 'Drei Wege vom Hersteller zum Endverbraucher: einstufig nur über den Einzelhandel (z. B. Konsumgüter), zweistufig über Groß- und Einzelhandel (z. B. Pharmaprodukte), dreistufig zusätzlich über einen Absatzhelfer (z. B. exotische Früchte). Je mehr Stationen, desto länger der Vertriebsweg.',
    explanationExpert: 'Je mehr verschiedene Vertriebsorgane zwischen Hersteller und Endverbraucher stehen, desto länger ist der Vertriebsweg. Die Abbildung zeigt indirekte Wege: einstufig (Einzelhandel; Konsumgüter), zweistufig (Großhandel + Einzelhandel; Pharmaprodukte), dreistufig (Absatzhelfer + Großhandel + Einzelhandel; exotische Früchte). Der direkte Vertrieb ohne Zwischenstufe heißt nullstufiger Vertriebsweg. Absatzhelfer erwerben kein Eigentum, Absatzmittler (Groß- und Einzelhandel) schon.',
    elements: [
      { label: 'Einstufiger Vertriebsweg', meaning: 'Hersteller → Einzelhandel → Endverbraucher (z. B. Konsumgüter).' },
      { label: 'Zweistufiger Vertriebsweg', meaning: 'Hersteller → Großhandel → Einzelhandel → Endverbraucher (z. B. Pharmaprodukte).' },
      { label: 'Dreistufiger Vertriebsweg', meaning: 'Hersteller → Absatzhelfer → Großhandel → Einzelhandel → Endverbraucher (z. B. exotische Früchte).' },
    ],
    conceptIds: ['mc-vertriebsweglaenge', 'mc-indirekt', 'mc-absatzhelfer-mittler', 'mc-absatzmittler'],
    validation: ok,
  },
  {
    id: 'f-distributionsgrad', chapterId: 'm5', file: 'img-009.png', pdfPage: 24,
    title: 'Distributionsgrad: intensiver, selektiver und exklusiver Vertrieb',
    caption: 'Pyramide der Vertriebswegedifferenzierung mit Zahl der Vertriebspartner, Preisniveau und Gütertyp.',
    explanationSimple: 'Die Pyramide zeigt drei Stufen: unten der intensive Vertrieb (sehr viele Partner, günstige Produkte, Convenience Goods), in der Mitte der selektive Vertrieb (mehrere Partner, Shopping Goods), oben der exklusive Vertrieb (wenige Partner, teure Produkte, Specialty Goods).',
    explanationExpert: 'Der Distributionsgrad beschreibt die Breite innerhalb eines Vertriebswegs: Je mehr Vertriebsorgane auf einer Stufe eingesetzt werden, desto intensiver ist der Vertrieb. Intensiv: sehr viele Vertriebspartner, günstige Produkte, Convenience Goods – sinnvoll bei sehr großer Zielgruppe („Deutsche Markenbutter“). Selektiv: mehrere Partner, Shopping Goods (Andechser Bio-Almbutter in gut sortierten Bioläden). Exklusiv: wenige Partner, teure Produkte, Specialty Goods – wenige Gourmetkunden werden sachkundig bedient (Tarbiana-Trüffelbutter).',
    elements: [
      { label: 'Basis: intensiver Vertrieb', meaning: 'Sehr viele Vertriebspartner, günstige Produkte, Convenience Goods.' },
      { label: 'Mitte: selektiver Vertrieb', meaning: 'Mehrere Vertriebspartner, Shopping Goods.' },
      { label: 'Spitze: exklusiver Vertrieb', meaning: 'Wenige Vertriebspartner, teure Produkte, Specialty Goods.' },
    ],
    conceptIds: ['mc-distributionsgrad', 'mc-convenience', 'mc-shopping', 'mc-specialty'],
    validation: ok,
  },
];
