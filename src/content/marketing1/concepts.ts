import { Concept } from '@/lib/types';

/** Begriffe/Konzepte des Moduls Marketing I, aus dem PDF extrahiert. */
export const concepts: Concept[] = [
  // ---------------- Kapitel 1: Grundlagen ----------------
  {
    id: 'mc-marketing', chapterId: 'm1', term: 'Marketing',
    definition: 'Organisationsfunktion und Bündel von Prozessen, um Wert für Kunden zu schaffen, zu kommunizieren und zu liefern und Beziehungen so zu managen, dass Organisation und Stakeholder profitieren (AMA 2017).',
    context: 'Abgeleitet von „(to) market“ (Markt und vermarkten). Löste in den 1960ern die „Absatzwirtschaft“ ab.',
    examRelevance: 'AMA-Definition und die drei Kernbausteine (funktional/führungsorientiert/aktivitätenorientiert) benennen können.',
    synonyms: ['Absatzwirtschaft'],
  },
  {
    id: 'mc-markt', chapterId: 'm1', term: 'Markt',
    definition: 'Gesamtheit aller Käufer und Verkäufer, die sich mit dem Handel eines bestimmten Produkts oder einer Produktkategorie beschäftigen (Kotler/Keller/Opresnik 2015).',
    context: 'Der Markt ist Ziel- UND Bezugsobjekt des Marketings.',
  },
  {
    id: 'mc-austausch', chapterId: 'm1', term: 'Austausch',
    definition: 'Kommt zustande, wenn mind. zwei Parteien etwas besitzen, das für den jeweils anderen so nützlich ist, dass er/sie bereit ist, sich dafür von Eigentum zu trennen.',
  },
  {
    id: 'mc-gratifikation', chapterId: 'm1', term: 'Gratifikationsprinzip',
    definition: 'Leitidee: Der Austausch sollte für beide Seiten vorteilhaft sein – Nachfrager- und Anbieternutzen maximieren.',
    confusableWith: ['Knappheitsprinzip'],
  },
  {
    id: 'mc-knappheit', chapterId: 'm1', term: 'Knappheitsprinzip',
    definition: 'Leitidee: Die im Tausch gehandelten Ressourcen sind knapp, also nicht unbegrenzt vorhanden.',
    confusableWith: ['Gratifikationsprinzip'],
  },
  {
    id: 'mc-kaeufermarkt', chapterId: 'm1', term: 'Käufermarkt',
    definition: 'Markt mit mehr Angebot als Nachfrage – die Käufer entscheiden frei; die Nachfrage bildet den Engpass, der Nachfrager steht im Zentrum.',
    example: 'Über 500 verschiedene Mineralwässer in Deutschland.',
    examRelevance: 'Kennzeichen (Angebot > Nachfrage, Nachfrager im Zentrum) und Abgrenzung zum Verkäufermarkt.',
  },
  {
    id: 'mc-kundennutzen', chapterId: 'm1', term: 'Kundennutzen (Nettonutzen)',
    definition: 'Differenz von Aufwand und erhaltenem Wert aus Sicht des Kunden.',
    context: 'Zentraler Fokus des Marketings laut AMA-Definition („value to customers“).',
  },
  {
    id: 'mc-marketingmix', chapterId: 'm1', term: 'Marketingmix (vier Ps)',
    definition: 'Gesamtheit von Produkt- (Product), Preis- (Price), Vertriebs- (Place) und Kommunikationspolitik (Promotion). Für Dienstleistungen zusätzlich People, Processes, Physical Facilities.',
    examRelevance: 'Die vier Ps und die 3 Zusatz-Ps für Dienstleistungen nennen können.',
    mnemonic: '4 Ps: Product, Price, Place, Promotion.',
  },
  {
    id: 'mc-funktional', chapterId: 'm1', term: 'Funktionaler Marketingbegriff',
    definition: 'Marketing als betriebswirtschaftliche Grundfunktion/Abteilung (systematischer Planungsprozess), gleichrangig z. B. mit Produktion oder Finanzierung.',
    confusableWith: ['Führungsorientierter Marketingbegriff', 'Aktivitätenorientierter Marketingbegriff'],
  },
  {
    id: 'mc-fuehrung', chapterId: 'm1', term: 'Führungsorientierter Marketingbegriff',
    definition: 'Marketing als Leitphilosophie/Denkhaltung der Unternehmensführung – alle Funktionen werden am Markt ausgerichtet, jeder Mitarbeiter berücksichtigt Kundenbedürfnisse.',
    confusableWith: ['Funktionaler Marketingbegriff', 'Aktivitätenorientierter Marketingbegriff'],
  },
  {
    id: 'mc-aktivitaet', chapterId: 'm1', term: 'Aktivitätenorientierter Marketingbegriff',
    definition: 'Marketing als Sozialtechnologie/„Werkzeugkasten“ – Fokus auf die Aktivitäten des Marketingmix, um die Nachfragesituation gezielt zu beeinflussen.',
    confusableWith: ['Funktionaler Marketingbegriff', 'Führungsorientierter Marketingbegriff'],
  },
  {
    id: 'mc-transaktional', chapterId: 'm1', term: 'Transaktionales Marketing',
    definition: 'Klassische Marktbearbeitung mithilfe der vier Ps; Blick vom Unternehmen nach außen, reaktiv, kurzfristig, Fokus auf Geschäftsabschlüsse.',
    confusableWith: ['Beziehungsmarketing'],
  },
  {
    id: 'mc-beziehung', chapterId: 'm1', term: 'Beziehungsmarketing',
    definition: 'Nicht die einzelne Transaktion, sondern die Kundenbeziehung steht im Mittelpunkt – aktive Analyse, Gestaltung und Kontrolle guter Beziehungen; langfristig.',
    context: 'Erkenntnis aus Dienstleistung und B2B (Friseur, Werkstatt, Steuerberater). Paradigmenwechsel Transaktions- → Beziehungsmarketing.',
    confusableWith: ['Transaktionales Marketing'],
  },
  {
    id: 'mc-drei-rs', chapterId: 'm1', term: 'Drei Rs',
    definition: 'Strukturierung des Marketingmix nach der Phase der Geschäftsbeziehung: Recruitment (Akquise), Retention (Bindung durch Zufriedenheit), Recovery (Rückgewinnung abgewanderter Kunden).',
    mnemonic: '3 Rs: Recruitment, Retention, Recovery.',
  },
  {
    id: 'mc-b2b', chapterId: 'm1', term: 'B2B-Marketing',
    definition: 'Business-to-Business-Marketing: Die Konsumenten sind keine privaten Endverbraucher, sondern Organisationen.',
  },
  {
    id: 'mc-marke', chapterId: 'm1', term: 'Marke (Branding)',
    definition: 'Markenführung wurzelt nicht in Theorie, sondern wurde pragmatisch in Werbeagenturen entwickelt. Marketingsicht: Fokus auf die Wirkung – Vermittlung von Werten, Beziehung zum Kunden und erhöhte Zahlungsbereitschaft.',
    context: 'Marken dürfen nicht mit Produkten gleichgesetzt werden; auch Events, Dienstleistungen, Menschen, Orte.',
  },
  {
    id: 'mc-brandequity', chapterId: 'm1', term: 'Brand Equity (Markenwert)',
    definition: 'Der Wert, den eine Marke schafft und selbst darstellt. Messung indirekt (Marktforschung) oder direkt (Experimente).',
    context: 'Vorteile: bessere Leistungswahrnehmung, Kundentreue, größere Margen, unelastischere Reaktion auf Preiserhöhungen, elastischere auf Preissenkungen.',
    examRelevance: 'Reale Marketingvorteile starker Marken aufzählen können.',
  },
  {
    id: 'mc-positionierung', chapterId: 'm1', term: 'Positionierung',
    definition: 'Bestimmen, wie eine Marke im Vergleich zu Wettbewerbsangeboten von Konsumenten wahrgenommen werden soll – Kern jeder Marketingstrategie.',
    context: 'Zwei Schritte: (1) relevante Wettbewerber ermitteln, (2) Wettbewerbsvorteil bestimmen.',
  },
  {
    id: 'mc-pop-pod', chapterId: 'm1', term: 'Points of Parity / Points of Difference',
    definition: 'Points of Parity: Attribute, bei denen sich die Marke mit dem Wettbewerb die Waage hält. Points of Difference: Attribute, die besser sind als die Konkurrenz.',
    example: 'Fiji Water: Herkunft und angebliche Reinheit als Point of Difference.',
    mnemonic: 'PoP = gleichauf, PoD = besser.',
  },
  {
    id: 'mc-indirekter-wettbewerb', chapterId: 'm1', term: 'Indirekter Wettbewerb',
    definition: 'Unterschiedliche Produkte, die dieselben Bedürfnisse erfüllen.',
    example: 'Für stilles Wasser sind sprudelnde Wasser und andere Getränke indirekte Wettbewerber.',
  },
  {
    id: 'mc-qualitaetsfuehrer', chapterId: 'm1', term: 'Qualitätsführerschaft (Differenzierung)',
    definition: 'Bessere Angebote bezüglich Qualität, Marke, Zusatzleistungen oder Kundenbeziehung.',
    confusableWith: ['Kostenführerstrategie'],
  },
  {
    id: 'mc-kostenfuehrer', chapterId: 'm1', term: 'Kostenführerstrategie',
    definition: 'Vergleichbare Produkte zu geringerem Preis – über Kostendegressionseffekte (Standardisierung, Verfahrensinnovation, effiziente Vertriebswege).',
    confusableWith: ['Qualitätsführerschaft (Differenzierung)'],
  },
  {
    id: 'mc-kostendegression', chapterId: 'm1', term: 'Kostendegression',
    definition: 'Die Stückkosten eines Guts sinken mit jeder zusätzlich produzierten Einheit.',
  },
  {
    id: 'mc-marketingmanagement', chapterId: 'm1', term: 'Marketingmanagement',
    definition: 'Umsetzung des modernen, erweiterten Marketingverständnisses im Unternehmen; berücksichtigt vier Orientierungspunkte: Unternehmen, Kunde, Wettbewerber, gesellschaftliches Umfeld.',
    examRelevance: 'Die sechs Schritte in Reihenfolge nennen können.',
  },
  {
    id: 'mc-6schritte', chapterId: 'm1', term: 'Sechs Schritte des Marketingmanagements',
    definition: '1) Situationsanalyse, 2) Marketingziele, 3) Marketingstrategie, 4) Marketinginstrumente (4 Ps), 5) Marketingimplementierung, 6) Marketingcontrolling.',
    mnemonic: 'Analyse → Ziele → Strategie → Instrumente → Implementierung → Controlling.',
  },
  {
    id: 'mc-marktsegment', chapterId: 'm1', term: 'Marktsegment',
    definition: 'Teil eines Markts, der bestimmte Merkmale aufweist und relativ homogen ist.',
  },

  // ---------------- Kapitel 2: Produktpolitik ----------------
  {
    id: 'mc-produktpolitik', chapterId: 'm2', term: 'Produktpolitik',
    definition: 'Fasst alle Entscheidungen zusammen, die die Gestaltung des Leistungsangebots eines Unternehmens betreffen (Bruhn 2016). Herz des Marketingmix.',
    context: 'Wegen der Vielfalt materieller/immaterieller Produkte oft „Leistungspolitik“.',
  },
  {
    id: 'mc-produkt', chapterId: 'm2', term: 'Produkt',
    definition: 'Bündel von Attributen (Ausstattung, Funktionen, Nutzen, Verwendung), das ausgetauscht oder verwendet werden kann; materiell oder immateriell.',
    example: 'Materiell: Smartphone; immateriell: Streamen eines Liedes, In-Game-Items.',
  },
  {
    id: 'mc-grundnutzen', chapterId: 'm2', term: 'Grund- und Zusatznutzen',
    definition: 'Grundnutzen befriedigt das ursprüngliche Bedürfnis; Zusatznutzen: sozialer/Geltungsnutzen, Erbauungsnutzen, emotionaler Nutzen.',
    example: 'Hose: bekleidet/wärmt (Grundnutzen), soll aber auch angemessen sein, gut sitzen, gutes Gefühl geben (Zusatznutzen).',
  },
  {
    id: 'mc-qualitaet', chapterId: 'm2', term: 'Qualität',
    definition: 'Gesamtheit der Bestandteile/Eigenschaften eines Produkts oder einer Dienstleistung, die die Fähigkeit zur Bedürfnisbefriedigung beeinflussen; objektiv oder subjektiv.',
    context: 'Dimensionen: Gebrauchsnutzen, Haltbarkeit, Zuverlässigkeit, Ausstattung, Normgerechtigkeit, Ästhetik, Umwelt-/Sozialverträglichkeit.',
  },
  {
    id: 'mc-kaufgewohnheit', chapterId: 'm2', term: 'Güter nach Kaufgewohnheit',
    definition: 'Convenience Goods (mühelos, regelmäßig – Shampoo, Brot), Shopping Goods (mit Such-/Vergleichsaufwand – Kleidung, Möbel), Specialty Goods (einzigartig – Antiquitäten), Unsought Goods (nicht aktiv nachgefragt – Versicherungen).',
    examRelevance: 'Die vier Kaufgewohnheits-Typen mit Beispiel unterscheiden können.',
  },
  {
    id: 'mc-guetertypen', chapterId: 'm2', term: 'Produkttypologisierung',
    definition: 'Unterscheidung nach Materialität (Sachgüter/Dienstleistungen), Konsumentengruppe (Konsum-/Investitionsgüter, B2C/B2B), Nutzungsdauer (Verbrauchs-/Gebrauchsgüter) und Nutzungshäufigkeit (täglich/aperiodisch).',
  },
  {
    id: 'mc-verpackung', chapterId: 'm2', term: 'Produktverpackung',
    definition: 'Eine gute Verpackung soll (1) das Produkt schützen, (2) werblich anpreisen, (3) anwenderfreundlich sowie (4) möglichst leicht und ökologisch zu entsorgen sein.',
  },
  {
    id: 'mc-produktvariation', chapterId: 'm2', term: 'Produktvariation',
    definition: 'Bewusste Veränderung von Nutzenkomponenten – die Basisfunktion bleibt, Design/Farbe/Geschmack variieren. Die alte Version wird ersetzt.',
    confusableWith: ['Produktdifferenzierung'],
  },
  {
    id: 'mc-produktdiff', chapterId: 'm2', term: 'Produktdifferenzierung',
    definition: 'Abgewandelte Versionen sprechen neue Marktsegmente an – das Produktprogramm erweitert sich, denn beide Varianten werden angeboten.',
    confusableWith: ['Produktvariation'],
    mnemonic: 'Variation = ersetzt; Differenzierung = beide bleiben (Programm wird breiter).',
  },
  {
    id: 'mc-programmbreite', chapterId: 'm2', term: 'Programmbreite und -tiefe',
    definition: 'Programmbreite = Anzahl der Produktlinien; Programmtiefe = Zahl der Produkte pro Produktlinie. Produktlinie: Gruppe von Produkten mit gemeinsamen Kriterien.',
    mnemonic: 'Breite = Anzahl Linien, Tiefe = Produkte je Linie.',
  },
  {
    id: 'mc-innovationsmgmt', chapterId: 'm2', term: 'Innovationsmanagement',
    definition: 'Bewusste Gestaltung eines Innovationssystems zur Entwicklung von Neuprodukten und der damit verbundenen Veränderungen – heute Erfolgsvoraussetzung.',
    example: 'Kodak erfand 1975 die Digitalkamera, verfolgte sie aber nicht → 2012 Insolvenz.',
  },
  {
    id: 'mc-lebenszyklus', chapterId: 'm2', term: 'Produktlebenszyklus',
    definition: 'Idealtypische Phasen von der Einführung bis zur Elimination: Einführung, Wachstum, Reife, Sättigung, Verfall.',
    context: 'In der Reifephase sind Erfahrungskurveneffekte und Economies of Scale am höchsten.',
    examRelevance: 'Die fünf Phasen in Reihenfolge und ihre Merkmale kennen.',
  },
  {
    id: 'mc-erfahrungskurve', chapterId: 'm2', term: 'Erfahrungskurveneffekte / Economies of Scale',
    definition: 'Erfahrungskurve: Effizienzsteigerung durch bereits gesammelte Markt-/Produkterfahrung. Economies of Scale: Betriebsgrößenvorteile (Mengenrabatte, sinkende Stückkosten).',
  },
  {
    id: 'mc-skurve', chapterId: 'm2', term: 'S-Kurvenkonzept (Foster 1986)',
    definition: 'Sensibilisiert für technologische Diskontinuitäten: Jede Technologie stößt an eine Leistungsgrenze und wird durch eine neue ersetzt.',
    context: 'Der Produktlebenszyklus (Variable Zeit) erklärt Technologiesprünge nicht.',
    confusableWith: ['Produktlebenszyklus'],
  },
  {
    id: 'mc-adoption', chapterId: 'm2', term: 'Adoptionsprozess',
    definition: 'Individuelle Übernahme einer Neuerung in fünf Phasen: Aufmerksamkeit, Interesse, Bewertung, Versuch, Annahme.',
    confusableWith: ['Diffusionsprozess'],
  },
  {
    id: 'mc-diffusion', chapterId: 'm2', term: 'Diffusionsprozess',
    definition: 'Beschreibt die kumulierte Adoption einer Neuerung im Zeitablauf (S-förmig): langsamer Start, starker Anstieg in der Mitte, Abflachen bei Sättigung.',
    context: 'Innovatoren/frühe Adopter sind einflussreiche Multiplikatoren (Influencer).',
    confusableWith: ['Adoptionsprozess'],
    mnemonic: 'Adoption = einzelne Person; Diffusion = kumuliert über den Markt.',
  },

  // ---------------- Kapitel 3: Kommunikationspolitik ----------------
  {
    id: 'mc-kommunikationspolitik', chapterId: 'm3', term: 'Kommunikationspolitik',
    definition: 'Gestaltet und übermittelt Informationen, um Konsumenten im Sinne der Unternehmensziele zu beeinflussen (Homburg 2017). Aufgaben: informieren, überzeugen, erinnern.',
  },
  {
    id: 'mc-medienneutral', chapterId: 'm3', term: 'Medienneutrale Planung',
    definition: 'Alle Kommunikationsoptionen/-kanäle werden objektiv nach Effektivität (Nutzen) und Effizienz (Aufwand) bewertet – Grundlage integrierter Kommunikation.',
  },
  {
    id: 'mc-komm-ziele', chapterId: 'm3', term: 'Reine Kommunikationsziele',
    definition: 'Potenzialbezogene (vorökonomische) Ziele: Kategoriebedürfnis, Bekanntheitsgrad/Image, Einstellungen der Nachfrager, Kaufabsicht. Ökonomische Ziele betreffen den Marketingmix als Ganzes.',
    examRelevance: 'Reine (vorökonomische) vs. ökonomische Kommunikationsziele unterscheiden.',
  },
  {
    id: 'mc-8schritte-komm', chapterId: 'm3', term: 'Acht Schritte der Kommunikationsplanung',
    definition: '1) Zielgruppe, 2) Kommunikationsziele, 3) Botschaft, 4) Kanäle, 5) Budget, 6) Kommunikationsmix, 7) Ergebnisse messen, 8) Prozess steuern.',
  },
  {
    id: 'mc-6kriterien', chapterId: 'm3', term: 'Sechs Kriterien der integrierten Kommunikation',
    definition: 'Reichweite, Mitwirkung, Gemeinsamkeit (konsistente Botschaft), Komplementarität, Vielseitigkeit, Kosten (Keller/Swaminathan 2019).',
  },
  {
    id: 'mc-kommmix', chapterId: 'm3', term: 'Kommunikationsmix (acht Werkzeuge)',
    definition: 'Massenmedial: Werbung, Verkaufsförderung, Sponsoring & Eventmarketing, Public Relations. Persönlich: Direktmarketing, interaktives Marketing, Mund-zu-Mund-Kommunikation, persönlicher Verkauf.',
    examRelevance: 'Die acht Instrumente und ihre Zuordnung (massenmedial/persönlich) kennen.',
    mnemonic: '4 massenmedial + 4 persönlich = 8 Werkzeuge.',
  },
  {
    id: 'mc-werbung', chapterId: 'm3', term: 'Werbung',
    definition: 'Unpersönliche, durch einen explizit genannten Auftraggeber bezahlte Präsentation von Produkten (Print, Übertragung, Display, digital).',
    context: 'Vorteile: große Reichweite, Ausdruckskraft, Imageaufbau. Nachteile: hohe Kosten, Werbemüdigkeit, keine individuelle Ansprache, schwer messbar.',
  },
  {
    id: 'mc-verkaufsfoerderung', chapterId: 'm3', term: 'Verkaufsförderung (Promotion)',
    definition: 'Kurzfristige Anregung von Verkauf durch gezielte Anreize (Warenproben, Coupons, Preisnachlässe, Flash Sales, Gamification, Verbundwerbung).',
    context: 'Liefert keine Wettbewerbsargumente, sondern greifbare Kaufanreize; zu häufiger Einsatz schadet dem Markenwert.',
    example: 'Black Friday.',
  },
  {
    id: 'mc-sponsoring', chapterId: 'm3', term: 'Sponsoring & Eventmarketing',
    definition: 'Unternehmen unterstützen/organisieren Aktivitäten in Sport, Kunst, Unterhaltung, Wohltätigkeit und schaffen durch gemeinsame Erlebnisse emotionale Bindung.',
    example: 'Mercedes sponsert die Fashion Week; Red Bull Music Academy/Flugtage.',
  },
  {
    id: 'mc-pr', chapterId: 'm3', term: 'Public Relations (PR)',
    definition: 'Öffentlichkeitsarbeit: gezielte, transparente Kommunikation mit allen Anspruchsgruppen, um die öffentliche Meinung zu beeinflussen und das Image zu verbessern.',
    context: 'Höhere Glaubwürdigkeit als Werbung; erreicht auch Konsumenten, die Massenmedien meiden. PR „erzählt Geschichten“.',
  },
  {
    id: 'mc-direktmarketing', chapterId: 'm3', term: 'Direktmarketing',
    definition: 'Werbemaßnahmen zur direkten Ansprache von Konsumenten (Kataloge, Telefon, E-Mail/SMS, TV-Shopping).',
    context: 'Nachteile: Verwaltung der Kontaktdaten, Ablehnung, ethische Probleme (Irreführung, Privatsphäre).',
    confusableWith: ['Interaktives Marketing'],
  },
  {
    id: 'mc-interaktiv', chapterId: 'm3', term: 'Interaktives Marketing',
    definition: 'Weiterentwicklung des Direktmarketings mit Austausch zwischen Konsument und Unternehmen (E-Commerce, Chatbots, Retargeting, suchgebundene Anzeigen).',
    confusableWith: ['Direktmarketing'],
  },
  {
    id: 'mc-wom', chapterId: 'm3', term: 'Mund-zu-Mund-Kommunikation (Word-of-Mouth)',
    definition: 'Persönliche Kommunikation von Konsumenten untereinander über ihre Erfahrungen; zunehmend elektronisch. Formen: Buzz-, Viral- und Influencer-Marketing.',
    context: 'Sehr einflussreich aufgrund persönlicher Bindung; Wirkung schwer messbar.',
  },
  {
    id: 'mc-persoenlicher-verkauf', chapterId: 'm3', term: 'Persönlicher Verkauf',
    definition: 'Präsentation eines Angebots durch einen Verkäufer, v. a. im B2B. Effektivstes Mittel zur Kaufbeeinflussung, aber hohe Kosten.',
  },
  {
    id: 'mc-kpis', chapterId: 'm3', term: 'Digitale Kennzahlen (CTR, Conversion, Engagement)',
    definition: 'Click-Through-Rate: Klickhäufigkeit von Anzeigen. Conversion Rate: Anteil der Besucher mit Zielhandlung. Engagement Rate: wie aktiv Nutzer reagieren (Likes, Shares, Kommentare).',
  },

  // ---------------- Kapitel 4: Preispolitik ----------------
  {
    id: 'mc-preispolitik', chapterId: 'm4', term: 'Preispolitik (Kontrahierungspolitik)',
    definition: 'Alle Entscheidungen zur Festlegung eines Entgelts – Höhe des Preises sowie weitere Bedingungen (Zahlungsbedingungen, Rabatte).',
    context: 'Preise sind Indikator der Marktstellung und wirken direkt auf Umsatz und Gewinn.',
  },
  {
    id: 'mc-preisgrenzen', chapterId: 'm4', term: 'Preisober- und Preisuntergrenze',
    definition: 'Die Zahlungsbereitschaft der Kunden definiert die Preisobergrenze; die Gesamtkosten bilden die Preisuntergrenze. Dazwischen liegt der Preiskorridor.',
    examRelevance: 'Ober-/Untergrenze richtig zuordnen (Käufer = oben, Kosten = unten).',
  },
  {
    id: 'mc-schwellenpreis', chapterId: 'm4', term: 'Schwellenpreis',
    definition: 'Psychologischer Preiseffekt: Kunden ignorieren Nachkommastellen; dies wird durch Preise knapp unter einer Schwelle ausgenutzt (z. B. 2,99 €).',
  },
  {
    id: 'mc-paf', chapterId: 'm4', term: 'Preis-Absatz-Funktion (PAF)',
    definition: 'Funktionaler Zusammenhang zwischen Preis und in einem Zeitraum abgesetzter Menge. Formen: lineare PAF, multiplikatives Modell, Gutenberg-Modell.',
    examRelevance: 'Die drei PAF-Typen und ihre Kennzeichen unterscheiden.',
  },
  {
    id: 'mc-paf-linear', chapterId: 'm4', term: 'Lineare PAF x(p)=a−b·p',
    definition: 'Idealtypisch im Monopol: a = Sättigungsmenge (Absatz bei Preis 0), a/b = Maximalpreis, b = Preisreagibilität. Nachfrage sinkt mit steigendem Preis.',
    confusableWith: ['Multiplikatives Preis-Absatz-Modell', 'Gutenberg-Modell'],
  },
  {
    id: 'mc-paf-mult', chapterId: 'm4', term: 'Multiplikatives Preis-Absatz-Modell x(p)=a·p^(−b)',
    definition: 'Berücksichtigt den Ausgangspreis; die Achsen werden nicht geschnitten → keine Sättigungsmenge und kein Maximalpreis.',
    confusableWith: ['Lineare PAF x(p)=a−b·p', 'Gutenberg-Modell'],
  },
  {
    id: 'mc-gutenberg', chapterId: 'm4', term: 'Gutenberg-Modell',
    definition: 'Doppelt geknickte PAF für den unvollkommenen Markt: im mittleren Bereich entsteht ein monopolartiger Bereich – die Menge ändert sich trotz höherer Preise kaum.',
    example: 'Apple verkauft Smartphones erfolgreich zu hohen Preisen.',
    confusableWith: ['Lineare PAF x(p)=a−b·p', 'Multiplikatives Preis-Absatz-Modell'],
  },
  {
    id: 'mc-preispositionierung', chapterId: 'm4', term: 'Strategien der Preispositionierung',
    definition: 'Bezieht sich auf die Preishöhe: Hochpreis- (Premium), Mittelpreis- (Standard) und Niedrigpreisstrategie (Mindestqualität, sehr günstig).',
  },
  {
    id: 'mc-preiswettbewerb', chapterId: 'm4', term: 'Strategien des Preiswettbewerbs',
    definition: 'Orientierung an der Konkurrenz: Preisführerschaft (hoher Preis als Orientierung), Preiskampf (niedrigster Preis, Discounter), Preisfolgerschaft (Reaktion auf den Marktführer).',
  },
  {
    id: 'mc-skimming', chapterId: 'm4', term: 'Skimming- vs. Penetrationsstrategie',
    definition: 'Skimming: hohe Einführungspreise abschöpfen (Innovatoren/Frühadopter), dann senken. Penetration: niedrige Einführungspreise zur schnellen Marktdurchdringung, danach erhöhen.',
    example: 'Skimming: Apple senkt iPhone-Preise mit Nachfolgemodell. Penetration: Rasierer günstig, Klingen teuer.',
    mnemonic: 'Skimming = hoch → runter; Penetration = niedrig → hoch.',
  },
  {
    id: 'mc-preisdiff', chapterId: 'm4', term: 'Preisdifferenzierung',
    definition: 'Unterschiedliche Preise für verschiedene Segmente: mengenmäßig, zeitlich, räumlich, personell, leistungsbezogen; Sonderform Preisbündelung.',
    examRelevance: 'Die Formen der Preisdifferenzierung mit Beispiel unterscheiden können.',
  },
  {
    id: 'mc-clv', chapterId: 'm4', term: 'Customer Lifetime Value (Kundenwert)',
    definition: 'Wert, den ein Kunde über die gesamte Zeit seiner Kundschaft für ein Unternehmen darstellt.',
  },
  {
    id: 'mc-preisbestimmung', chapterId: 'm4', term: 'Kosten- vs. marktorientierte Preisbestimmung',
    definition: 'Kostenorientiert: Stückkosten + Aufschlag (einfach, fair, aber ignoriert Markt). Marktorientiert: an Marktreaktionen orientiert (Break-even-Analyse, Perceived-Value-Pricing, Cournot-Preis).',
  },
  {
    id: 'mc-innovpricing', chapterId: 'm4', term: 'Innovative Preismodelle',
    definition: 'Yield Management (Kapazitätsauslastung, z. B. Airlines/Hotels), Dynamic Pricing (automatische Anpassung nach Nachfrage, z. B. Uber), Auction Pricing (Auktion, eBay), Reverse Pricing (Kunde nennt Preisvorstellung).',
  },
  {
    id: 'mc-rabatte', chapterId: 'm4', term: 'Vier Rabattarten',
    definition: 'Funktionsrabatte (für übernommene Handelsfunktionen), Mengenrabatte (größere Mengen), Zeitrabatte (Bestellzeit; Skonto als Sonderform für frühe Zahlung) und Treuerabatte (kontinuierliche Bestellungen).',
    examRelevance: 'Die vier Rabattarten benennen und Skonto einordnen (Sonderform Zeitrabatt).',
  },

  // ---------------- Kapitel 5: Distributionspolitik ----------------
  {
    id: 'mc-distribution', chapterId: 'm5', term: 'Distributionspolitik (Vertriebspolitik)',
    definition: 'Bezieht sich auf die Verteilung von Leistungen von der Produktion zur Konsumption. Zwei Komponenten: akquisitorisch (Vertriebssystem gestalten) und logistisch (Zugriff der Konsumenten).',
  },
  {
    id: 'mc-vertriebsziele', chapterId: 'm5', term: 'Vertriebsziele',
    definition: 'Drei parallele Arten: psychologische (positives, markentreues Kauferlebnis), versorgungsorientierte (lückenlose Verfügbarkeit) und ökonomische (Absatz, Preisniveau, Vertriebskosten).',
  },
  {
    id: 'mc-vertriebskanal', chapterId: 'm5', term: 'Vertriebskanal',
    definition: 'Gesamtheit aller Organisationen, die ein Produkt von der Herstellung bis zum Endverbraucher leiten und transportieren.',
  },
  {
    id: 'mc-push-pull', chapterId: 'm5', term: 'Push- vs. Pull-Strategie',
    definition: 'Push „drückt“ Produkte in den Handel (Rabatte, Retail Media, Exklusivverträge). Pull erzeugt einen Nachfragesog bei Endkunden (SEO, Content Marketing, Social Media). Meist kombiniert.',
    mnemonic: 'Push = in den Handel drücken; Pull = Nachfrage ziehen.',
  },
  {
    id: 'mc-ueberbrueckung', chapterId: 'm5', term: 'Überbrückungsfunktionen des Handels',
    definition: 'Wertschöpfung durch Überbrückung von Diskrepanzen: räumlich (Transport), zeitlich (Lagerung) und Sortimentsgestaltung (quantitative/qualitative Diskrepanz).',
    example: 'Bananen: Transport aus Südamerika (räumlich), Kühlung/Nachreifung (zeitlich).',
  },
  {
    id: 'mc-disintermediation', chapterId: 'm5', term: 'Disintermediation',
    definition: 'Trend zur Ausschaltung von Intermediären (z. B. Direct-to-Consumer über E-Commerce, Einsparung der Handelsmarge).',
    confusableWith: ['Vertikale Integration'],
  },
  {
    id: 'mc-vertikale-integration', chapterId: 'm5', term: 'Vertikale Integration',
    definition: 'Ein Unternehmen gliedert vor- oder nachgelagerte Wertschöpfungsstufen ein, die vorher eigenständige Akteure erbracht haben.',
    example: 'Edeka betreibt eine eigene Bananenreiferei.',
    confusableWith: ['Disintermediation'],
  },
  {
    id: 'mc-direkt-indirekt', chapterId: 'm5', term: 'Direkter vs. indirekter Vertrieb',
    definition: 'Direkter Vertrieb: Unternehmen verkauft selbst an Endkunden (nullstufig) – enge Kundenbeziehung/Kontrolle, aber hoher Aufwand. Indirekter Vertrieb: Aufgaben werden mit externen Marktakteuren geteilt – Arbeitsteilung/Marktkenntnis, aber Handelsmargen, weniger Kontrolle.',
    examRelevance: 'Vor-/Nachteile beider Formen gegenüberstellen können.',
  },
  {
    id: 'mc-absatzhelfer-mittler', chapterId: 'm5', term: 'Absatzhelfer vs. Absatzmittler',
    definition: 'Absatzhelfer (Handelsvertreter, Kommissionäre, Makler) erwerben KEIN Eigentum an den Produkten; Absatzmittler (Groß-/Einzelhandel) erwerben Eigentum.',
    mnemonic: 'Helfer = kein Eigentum; Mittler = Eigentum.',
    examRelevance: 'Der Eigentumsunterschied ist ein Klassiker.',
  },
  {
    id: 'mc-franchising', chapterId: 'm5', term: 'Franchising',
    definition: 'Der Franchisenehmer übernimmt gegen Gebühren ein bestehendes Konzept und setzt es vor Ort um; der Franchisegeber hat Weisungsrecht und Kontrollmöglichkeiten.',
    example: 'Fast-Food-Restaurants.',
  },
  {
    id: 'mc-multi-omni', chapterId: 'm5', term: 'Multichannel vs. Omnichannel',
    definition: 'Einkanalsystem: nur ein Vertriebsweg. Multichannel: auf mehreren Kanälen präsent. Omnichannel: über alle Kanäle hinweg vernetzt und konsistent (nahtloses Erlebnis).',
    example: 'Omnichannel: online prüfen, per Click & Collect reservieren, vor Ort abholen, App-Punkte einlösen.',
    mnemonic: 'Multichannel = mehrere Kanäle; Omnichannel = alle Kanäle vernetzt.',
    examRelevance: 'Merke aus dem Skript: präsent (Multi) vs. vernetzt (Omni).',
  },
  {
    id: 'mc-distributionsgrad', chapterId: 'm5', term: 'Distributionsgrad (intensiv/selektiv/exklusiv)',
    definition: 'Intensiver Vertrieb: sehr viele Partner, Convenience Goods. Selektiver Vertrieb: mehrere Partner, Shopping Goods. Exklusiver Vertrieb: sehr wenige Partner, teure Specialty Goods.',
    examRelevance: 'Die drei Distributionsgrade mit passendem Gütertyp verbinden.',
  },
];
