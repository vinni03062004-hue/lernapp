import { Chapter } from '@/lib/types';
import { sections1 } from './script-1';
import { sections2 } from './script-2';
import { sections3 } from './script-3';
import { sections4 } from './script-4';
import { sections5 } from './script-5';

/**
 * Kapitelstruktur des Moduls Marketing I (Studiengang Online-Marketing).
 * Grundlage: „Marketing I – Zusammenfassung“ (24 Seiten). Seitenangaben = PDF-Seiten.
 * `keyIdeas` = Kernaussagen (Kurzüberblick), `sections` = vollständiges Lernskript.
 */
export const chapters: Chapter[] = [
  {
    id: 'm1',
    index: 1,
    title: 'Grundlagen des Marketings',
    subchapters: ['1.1 Begriffe des Marketings', '1.2 Markenführung, Positionierung und Wettbewerbsstrategien', '1.3 Marketingmanagement'],
    keyIdeas: [
      'Marketing kommt von „(to) market“ (Markt und vermarkten). Der Markt ist Ziel- UND Bezugsobjekt: Ziel ist, Märkte zu schaffen und zu beeinflussen; zugleich geben Märkte die Rahmenbedingungen für das effiziente und effektive Gestalten von Austauschprozessen vor.',
      'Austausch entsteht, wenn mindestens zwei Parteien etwas besitzen, das für die jeweils andere so nützlich ist, dass sie sich dafür vom eigenen Eigentum trennt. Daraus folgen die zwei Leitideen: Gratifikationsprinzip (Austausch für beide Seiten vorteilhaft) und Knappheitsprinzip (die getauschten Ressourcen sind knapp).',
      'Käufermarkt: mehr Angebot als Nachfrage (z. B. über 500 Mineralwässer in Deutschland) – die Nachfrage ist der Engpass, der Nachfrager steht im Zentrum des modernen Marketings. Die allermeisten Märkte sind heute Käufermärkte.',
      'Der Begriff entstand Anfang des 20. Jahrhunderts im angloamerikanischen Raum und löste in den 1960ern die „Absatzwirtschaft“ ab (Paradigmenwechsel von Angebot zu Nachfrage). Evolution: Verkaufs- → Markt- → Wettbewerbs- → Umfeld- → Beziehungs- → Netzwerk-/digitale Wertschöpfungs- → Nachhaltigkeitsorientierung.',
      'AMA (2017): Marketing ist eine Organisationsfunktion und ein Bündel von Prozessen, um Wert für Kunden zu schaffen, zu kommunizieren und zu liefern und Kundenbeziehungen so zu managen, dass Organisation und Stakeholder profitieren. Kundennutzen (Nettonutzen) = Differenz von Aufwand und erhaltenem Wert aus Kundensicht.',
      'Drei Kernbausteine: funktionaler (systematischer Planungsprozess/Abteilung), führungsorientierter (Leitphilosophie – alle Funktionen am Markt ausrichten) und aktivitätenorientierter Marketingbegriff (Sozialtechnologie – „Werkzeugkasten“ Marketingmix, Nachfrage gezielt beeinflussen).',
      'Transaktionsmarketing (kurzfristig, Produkt, Kundenakquisition, Leistungsdarstellung, reaktiv) vs. Beziehungsmarketing (langfristig, Produkt und Interaktion, Akquisition/Bindung/Rückgewinnung, Dialog, zusätzlich Kundenwert). Erkenntnis aus Dienstleistung und B2B; die drei Rs: Recruitment, Retention, Recovery.',
      'Markenführung in vier Schritten: Positionierung aufbauen, Markenmarketing planen und umsetzen, Markenleistung messen, Markenwert aufbauen und erhalten. Marken ≠ Produkte; juristische Definition (AMA 2017) vs. Marketingsicht (Wirkung: Werte, Beziehung, höhere Zahlungsbereitschaft; Kapferer 2012).',
      'Brand Equity: Marken schaffen Werte und sind selbst ein Wert. Voraussetzung (Aaker 1991): Marke bekannt, positiv assoziiert, Treue, hochwertig wahrgenommen. Vorteile u. a. Kundentreue, größere Margen, unelastische Reaktion auf Preiserhöhungen. Starke Marken entstehen durch einen konsistenten Marketingmix.',
      'Positionierung = festlegen, wie die Marke im Vergleich zum Wettbewerb wahrgenommen werden soll (Kern jeder Marketingstrategie). Zwei Schritte: relevante (direkte und indirekte) Wettbewerber ermitteln, Wettbewerbsvorteil bestimmen – über Points of Parity und Points of Difference.',
      'Abnehmergerichtete Strategie: besser (Qualitätsführerschaft/Differenzierung) oder billiger (Kostenführerschaft über Kostendegression). Mit der Nische ergibt sich eine Vier-Felder-Matrix: Qualitätsführerschaft, selektive Qualitätsführerschaft, aggressive und selektive Kostenführerschaft.',
      'Marketingmanagement setzt das erweiterte Marketingverständnis im Unternehmen um (Orientierungspunkte: Unternehmen, Kunde, Wettbewerber, gesellschaftliches Umfeld) – in sechs Schritten: Situationsanalyse, Marketingziele, Marketingstrategie, Marketinginstrumente, Implementierung, Controlling.',
    ],
    pdfPages: '1–6',
    sections: sections1,
  },
  {
    id: 'm2',
    index: 2,
    title: 'Produktpolitik',
    subchapters: ['2.1 Begriffe der Produktpolitik', '2.2 Gestaltungsfelder der Produktpolitik', '2.3 Innovationsmanagement'],
    keyIdeas: [
      'Produktpolitik ist als eines der vier Ps das Herz des Marketingmix (ein Produkt ist Grundvoraussetzung jeder Marketingtätigkeit) und umfasst alle Entscheidungen zur Gestaltung des Leistungsangebots (Bruhn 2016). Zentrale Frage: Was soll vermarktet werden?',
      'Produkt = Bündel von Attributen (Ausstattung, Funktionen, Nutzen, Verwendung), das ausgetauscht oder verwendet werden kann – materiell oder immateriell (auch Ideen und digitale Güter). Deshalb spricht man oft von Leistungspolitik.',
      'Produktebenen nach Leistung: Kernprodukt, reales Produkt, erweitertes Produkt (Zusatz- und Serviceleistungen). In gesättigten Märkten werden Zusatzleistungen immer wichtiger. Leistung = was das Unternehmen bietet, Nutzen = was der Kunde davon hat.',
      'Produktebenen nach Nutzen: Grundnutzen plus Zusatznutzen (sozialer/Geltungs-, Erbauungs-, emotionaler Nutzen). Fünf Kategorien: Grundnutzen, generisches, erwartetes, augmentiertes, potenzielles Produkt – je mehr Nutzenkomponenten, desto höher die Kategorie.',
      'Qualität = Gesamtheit der Eigenschaften, die die Fähigkeit zur Bedürfnisbefriedigung beeinflussen (objektiv oder subjektiv). Sieben Dimensionen: Gebrauchsnutzen, Haltbarkeit, Zuverlässigkeit, Ausstattung, Normgerechtigkeit, Ästhetik, Umwelt- und Sozialverträglichkeit.',
      'Typologisierung nach Materialität, Konsumentengruppe (B2C/B2B), Nutzungsdauer, Nutzungshäufigkeit und Kaufgewohnheit: Convenience, Shopping, Specialty und Unsought Goods.',
      'Drei Gestaltungsfelder: erstmalige Produktgestaltung, Variation über die Zeit, Kombination zu Produktprogrammen. Produktgestaltung (Pampers): technisch-funktionale Eigenschaften, Design, Verpackung, Qualitätsmanagement, Servicepolitik.',
      'Entscheidungen im Lebenszyklus: Produktvariation (Basisfunktion bleibt, Version wird ersetzt), Produktdifferenzierung (zusätzliche Version für neues Segment – Programm wächst), Produktelimination.',
      'Portfoliomanagement: Programmbreite = Anzahl der Produktlinien, Programmtiefe = Produkte pro Linie. Programmstruktur nach Material/Herkunft (Kraft Heinz), Preislagen (LVMH) oder Bedarfskreisen (P&G).',
      'Innovationsmanagement ist heute Voraussetzung für Erfolg (Kodak: Digitalkamera 1975 erfunden, 2012 Insolvenz). Produktlebenszyklus: Einführung, Wachstum, Reife (höchste Erfahrungskurveneffekte und Economies of Scale), Sättigung, Verfall.',
      'Der Lebenszyklus erklärt mit der Variable Zeit keine Technologiesprünge. Das S-Kurvenkonzept (Foster 1986): Jede Technologie stößt an eine Leistungsgrenze und wird ersetzt – Grenzen abschätzen, F&E kontinuierlich neue Produkte vorbereiten lassen.',
      'Adoptionsprozess: Aufmerksamkeit, Interesse, Bewertung, Versuch, Annahme. Innovatoren und Frühadopter sind einflussreiche Multiplikatoren (Influencer). Der Diffusionsprozess beschreibt die kumulierte Adoption im Zeitablauf; Adopterkategorien: 2,5 / 13,5 / 34 / 34 / 16 %.',
    ],
    pdfPages: '6–10',
    sections: sections2,
  },
  {
    id: 'm3',
    index: 3,
    title: 'Kommunikationspolitik',
    subchapters: ['3.1 Integrierte Marketingkommunikation', '3.2 Kommunikationsinstrumente'],
    keyIdeas: [
      'Kommunikationspolitik gestaltet und übermittelt Informationen, um Konsumenten im Sinne der Unternehmensziele zu beeinflussen (Homburg 2017). Kohärente Kommunikation macht Marken bekannt und schafft Markenassoziationen; sie muss integriert sein – medienneutrale Planung bewertet alle Kanäle nach Effektivität und Effizienz.',
      'Aufgaben: informieren, überzeugen, erinnern. Ökonomische Ziele betreffen den Marketingmix als Ganzes – nur die potenzialbezogenen Ziele sind reine Kommunikationsziele: Kategoriebedürfnis, Bekanntheitsgrad und Image, Einstellungen, Kaufabsicht.',
      'Acht Planungsschritte: Zielgruppe, Kommunikationsziele, Botschaft, Kanäle, Budget (empfohlen: auf Basis von Zielen und Aufgaben), Kommunikationsmix, Ergebnisse messen (CTR, Conversion Rate, Engagement Rate), Prozess steuern.',
      'Die Medienkombination hängt ab von Marktstellung, Art des Produktmarkts, Zielgruppe, Kaufbereitschaft/Art der Kaufentscheidung, Lebenszyklusphase und Budget. Sechs Kriterien (Keller/Swaminathan 2019): Reichweite, Mitwirkung, Gemeinsamkeit, Komplementarität, Vielseitigkeit, Kosten.',
      'Massenmediale Kommunikation richtet sich an eine Masse, persönliche an Einzelne. Fragmentierung: Mainstreammedien verlieren Reichweite, es entstehen spitze Zielgruppensegmente.',
      'Massenmediale Instrumente: Werbung (bezahlte, unpersönliche Präsentation mit genanntem Auftraggeber), Verkaufsförderung (kurzfristige Anreize), Sponsoring & Eventmarketing (emotionale Bindung), Public Relations (Dialog mit Anspruchsgruppen, hohe Glaubwürdigkeit, sieben Funktionen).',
      'Persönliche Instrumente: Direktmarketing, interaktives Marketing (Weiterentwicklung mit Austausch), Mund-zu-Mund-Kommunikation (Buzz-, Viral-, Influencer-Marketing) und persönlicher Verkauf (effektivstes Mittel, aber hohe Kosten).',
      'Merke: Der Kommunikationsmix besteht aus acht Werkzeugen, die so kombiniert werden, dass eine einheitliche und stimmige Markenbotschaft entsteht.',
    ],
    pdfPages: '11–16',
    sections: sections3,
  },
  {
    id: 'm4',
    index: 4,
    title: 'Preispolitik',
    subchapters: ['4.1 Die Stellung der Preispolitik im Marketing', '4.2 Preispolitische Strategien', '4.3 Preisbestimmung und Konditionierung'],
    keyIdeas: [
      'Preispolitik = alle Entscheidungen zur Festlegung eines Entgelts für in Anspruch genommene Leistungen (Homburg 2017) – inkl. Zahlungsbedingungen und Rabatten, daher auch Kontrahierungspolitik. Preise sind Indikator der Marktstellung und wirken direkt auf Umsatz und Gewinn.',
      'Einflussfaktoren: Käufer (Zahlungsbereitschaft = Preisobergrenze), Kosten (Gesamtkosten = Preisuntergrenze), Konkurrenz (Preiskorridor, Vergleichsportale), externe Rahmenbedingungen und psychologische Effekte (Schwellenpreise wie 2,99 €).',
      'Preis-Absatz-Funktion = funktionaler Zusammenhang zwischen Preis und abgesetzter Menge: linear x(p) = a – b · p (Monopol; a = Sättigungsmenge, a/b = Maximalpreis), multiplikativ x(p) = a · p^(–b) (keine Achsenschnitte), Gutenberg (doppelt geknickt, monopolistischer Mittelbereich – Apple).',
      'Prozess der Preisfestlegung (Bruhn 2016): Preisspielraum analysieren, Ziele festlegen, Strategie entwickeln, Preisinstrumente einsetzen (Preise, Preisnachlässe, Preiszuschläge, Zugaben), Preiskontrolle.',
      'Strategien: Preispositionierung (Hoch-, Mittel-, Niedrigpreis), Preiswettbewerb (Preisführerschaft, Preiskampf, Preisfolgerschaft), Preisabfolge (Skimming vs. Penetration) und Preisdifferenzierung (mengenmäßig, zeitlich, räumlich, personell, leistungsbezogen; Sonderform Preisbündelung).',
      'Preisbestimmung: kostenorientiert (Stückkosten plus Aufschlag – schnell, transparent, fair, aber ohne Nachfrage und Wettbewerb) vs. marktorientiert (Break-even-Analyse, Perceived-Value-Pricing, Cournot-Preis).',
      'Innovative Preismodelle: Yield Management (sechs Bedingungen), Dynamic Pricing, Auction Pricing, Reverse Pricing.',
      'Konditionenpolitik (v. a. B2B): Absatzkredite, Lieferungs- und Zahlungsbedingungen, Rabatte – Funktions-, Mengen-, Zeit- (Skonto als Sonderform) und Treuerabatte.',
    ],
    pdfPages: '16–20',
    sections: sections4,
  },
  {
    id: 'm5',
    index: 5,
    title: 'Distributionspolitik',
    subchapters: ['5.1 Grundlagen der Distributionspolitik', '5.2 Vertikale Gestaltung des Vertriebssystems', '5.3 Horizontale Gestaltung des Vertriebssystems'],
    keyIdeas: [
      'Distributionspolitik (Vertriebspolitik) = Verteilung von Leistungen von der Produktion zur Konsumption (Meffert/Burmann/Kirchgeorg 2015). Akquisitorische Komponente (Vertriebssystem effizient und effektiv) und logistische Komponente (adäquater Zugriff der Konsumenten).',
      'Drei Zielarten parallel: psychologische (einzigartiges, markentreues, positives Kauferlebnis), versorgungsorientierte (lückenlose Verfügbarkeit), ökonomische (Absatzmenge, Preisniveau, Vertriebskosten optimieren). Der Vertrieb muss zum übrigen Marketingmix passen.',
      'Vertriebskanal = Gesamtheit aller Organisationen, die ein Produkt von der Herstellung bis zum Endverbraucher leiten. Push „drückt“ Produkte in den Handel (geringe Markentreue, Impulskauf); Pull erzeugt einen Nachfragesog beim Endkunden (markentreu, involviert). Meist beide zugleich.',
      'Der Handel schafft Wert durch Überbrückung von Diskrepanzen: räumlich (Transport), zeitlich (Lagerung) und durch Sortimentsgestaltung (quantitativ/qualitativ). Disintermediation (z. B. D2C) und vertikale Integration (Edeka-Bananenreiferei).',
      'Vertikale Gestaltung: direkter Vertrieb (nullstufig, enge Kundenbeziehung und Kontrolle, aber hoher Aufwand) vs. indirekter Vertrieb (Arbeitsteilung, Marktkenntnis, größere Mengen, aber Handelsmargen und weniger Kontrolle). In der Praxis oft Mischformen.',
      'Externe Vertriebsorgane: Vertragshändler, Franchisepartner (Weisungsrecht), Absatzhelfer (Handelsvertreter, Kommissionäre, Makler – ohne Eigentum) und Absatzmittler (Groß- und Einzelhandel – mit Eigentum). Je mehr Organe, desto länger der Vertriebsweg.',
      'Horizontale Gestaltung: Einkanalsystem, Mehrkanalvertrieb (Multichannel – auf mehreren Kanälen präsent) und Omnichannel (über alle Kanäle vernetzt, z. B. Click & Collect).',
      'Distributionsgrad: intensiver (sehr viele Partner, Convenience Goods), selektiver (mehrere Partner, Shopping Goods) und exklusiver Vertrieb (sehr wenige Partner, Specialty Goods). Der Vertrieb ist markenbildend; sieben Einflussfaktoren von Produkt bis Umfeld.',
    ],
    pdfPages: '20–24',
    sections: sections5,
  },
];
