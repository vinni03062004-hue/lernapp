import { Concept } from '@/lib/types';

/** Kapitel 4 – Preispolitik (PDF S. 16–20). Definitionen eng am Skript. */
export const concepts4: Concept[] = [
  // ---------- 4.1 Die Stellung der Preispolitik im Marketing (S. 16) ----------
  {
    id: 'mc-preispolitik', chapterId: 'm4', term: 'Preispolitik (Kontrahierungspolitik)',
    definition: 'Alle Entscheidungen, die sich mit der Festlegung eines Entgelts für in Anspruch genommene Leistungen befassen (Homburg 2017). Sie befasst sich mit der Höhe des Preises, aber auch mit weiteren Bedingungen (z. B. Zahlungsbedingungen und Rabatte) – daher auch Kontrahierungspolitik.',
    context: 'Preise sind ein wesentlicher Indikator für die Marktstellung und haben direkten Einfluss auf Umsatz und Gewinn. Die Preispolitik ist eine komplexe Managementaufgabe mit strategischen und operativen Entscheidungsparametern.',
    examRelevance: 'Definition + Begründung des Begriffs Kontrahierungspolitik.',
    synonyms: ['Kontrahierungspolitik', 'Preisgestaltung'],
  },
  {
    id: 'mc-ziele-preispolitik', chapterId: 'm4', term: 'Ziele der Preispolitik',
    definition: 'Die Preispolitik richtet sich nach den Unternehmenszielen (Umsatz, Gewinn, Marktanteil, Rentabilität) sowie nach handelsbezogenen Zielen (z. B. Erhöhung der Präsenz in Handelskanälen) und konsumentenbezogenen Zielen (z. B. Beeinflussung der Preiswahrnehmung).',
  },

  // ---------- Einflussfaktoren der Preisfestlegung (S. 16) ----------
  {
    id: 'mc-einflussfaktoren-preis', chapterId: 'm4', term: 'Einflussfaktoren der Preisfestlegung',
    definition: 'Käufer (Zahlungsbereitschaft = Preisobergrenze), Kosten (Gesamtkosten = Preisuntergrenze), Konkurrenzsituation (Preiskorridor), externe Rahmenbedingungen und psychologische Effekte der Preiswahrnehmung.',
    mnemonic: 'K-K-K-E-P: Käufer, Kosten, Konkurrenz, Externe Rahmenbedingungen, Psychologie.',
    examRelevance: 'Alle fünf Faktoren mit Beispiel; Ober- und Untergrenze korrekt zuordnen.',
  },
  {
    id: 'mc-preisgrenzen', chapterId: 'm4', term: 'Preisobergrenze und Preisuntergrenze',
    definition: 'Die Zahlungsbereitschaft des anvisierten Kundensegments definiert die Preisobergrenze; die Gesamtkosten bilden die Preisuntergrenze (der Preis sollte über die Lebensdauer des Produkts die Kosten decken und einen Gewinnbeitrag erwirtschaften).',
    context: 'Der wahrgenommene Nutzen und die realen Herstellerkosten müssen nicht zusammenhängen.',
    example: 'Milchkaffee bei Starbucks ist 10–30 % teurer als im unabhängigen Café.',
    mnemonic: 'Oben der Kunde (Zahlungsbereitschaft), unten die Kosten.',
    synonyms: ['Zahlungsbereitschaft', 'Preisobergrenze', 'Preisuntergrenze'],
  },
  {
    id: 'mc-preiskorridor', chapterId: 'm4', term: 'Konkurrenzsituation und Preiskorridor',
    definition: 'Wettbewerbspreise werden von Konsumenten bei der Beurteilung der Preiswürdigkeit einbezogen; Preisvergleichsportale steigern die Transparenz. Es entsteht ein relevanter Preiskorridor, der oft durch automatisierte Preis-Monitoring-Tools überwacht wird.',
    example: 'Preisvergleichsportale wie Idealo oder Google Shopping.',
    synonyms: ['Preiskorridor', 'Preisvergleichsportale', 'Preis-Monitoring'],
  },
  {
    id: 'mc-externe-rahmen', chapterId: 'm4', term: 'Externe Rahmenbedingungen der Preisfestlegung',
    definition: 'Handelsstruktur (z. B. Discounter vs. exklusiver Handelspartner), gesamtwirtschaftliche Situation und saisonale Nachfrageschwankungen.',
  },
  {
    id: 'mc-schwellenpreis', chapterId: 'm4', term: 'Psychologische Preiseffekte / Schwellenpreise',
    definition: 'Psychologische Effekte der Preiswahrnehmung beschreiben, wie Preise von Kunden wahrgenommen werden: Kunden tendieren dazu, Nachkommastellen zu ignorieren, was durch Schwellenpreise ausgenutzt wird.',
    example: '2,99 €.',
    synonyms: ['Schwellenpreis', 'psychologische Preiseffekte'],
  },

  // ---------- Preis-Absatz-Funktion (S. 17) ----------
  {
    id: 'mc-paf', chapterId: 'm4', term: 'Preis-Absatz-Funktion',
    definition: 'Mathematisch-analytischer Ansatz aus der mikroökonomischen Preistheorie, der Konsumentenreaktionen auf Preisänderungen abbildet – funktionaler Zusammenhang zwischen dem Preis eines Produkts und der in einem gewissen Zeitraum abgesetzten Menge.',
    context: 'Ermittlung auf Grundlage einer ausreichend großen Datenbasis (Rechnungswesen, Kundenbefragungen, Analyse von Nutzerverhalten, E-Commerce-Verkaufsdaten); dient der Prognose, welche Mengen zu welchen Preisen verkauft werden können. Drei Formen: lineare PAF, multiplikatives Modell, Gutenberg-Modell.',
    examRelevance: 'Definition, Datenbasis, Zweck und die drei Formen unterscheiden.',
    synonyms: ['PAF'],
  },
  {
    id: 'mc-paf-linear', chapterId: 'm4', term: 'Lineare Preis-Absatz-Funktion',
    definition: 'x(p) = a – b · p: idealtypische Betrachtung im Monopol; die Nachfrage sinkt mit steigendem Preis. Parameter b verdeutlicht, wie stark der Markt auf Preisänderungen reagiert; a = maximale Sättigungsmenge (Absatz bei Preis 0); a/b = Maximalpreis (Preis, bei dem keine Nachfrage mehr existiert).',
    confusableWith: ['Multiplikatives Preis-Absatz-Modell', 'Gutenberg-Modell'],
    mnemonic: 'a = Absatz bei Preis 0 (Sättigung), a/b = Preis bei Absatz 0 (Maximalpreis).',
  },
  {
    id: 'mc-paf-mult', chapterId: 'm4', term: 'Multiplikatives Preis-Absatz-Modell',
    definition: 'x(p) = a · p^(–b): berücksichtigt zusätzlich den Ausgangspreis – je niedriger dieser ist, desto stärker wirken sich Preisänderungen aus. Die Achsen werden nicht geschnitten, es gibt also keine Sättigungsmenge und keinen Maximalpreis; a = Normierungsparameter (verkaufte Menge bei einem Preis von einer Geldeinheit), b indiziert die Preisabhängigkeit der Absatzmenge.',
    confusableWith: ['Lineare Preis-Absatz-Funktion', 'Gutenberg-Modell'],
    mnemonic: 'Multiplikativ: keine Achsenschnitte → weder Sättigungsmenge noch Maximalpreis.',
  },
  {
    id: 'mc-gutenberg', chapterId: 'm4', term: 'Gutenberg-Modell',
    definition: 'Reflektiert den unvollkommenen Markt: doppelt geknickte Preis-Absatz-Funktion, zurückzuführen auf einen Markt mit Wettbewerbern. Im oberen und unteren Bereich sinkt die Nachfrage mit steigendem Preis (ähnlich linear), im mittleren Bereich entsteht eine Art Monopol: Die Absatzmenge verändert sich trotz höherer Preise wenig.',
    example: 'Durch erfolgreiche Markenpolitik verkauft Apple Smartphones erfolgreich zu hohen Preisen.',
    confusableWith: ['Lineare Preis-Absatz-Funktion', 'Multiplikatives Preis-Absatz-Modell'],
    examRelevance: 'Doppelter Knick, monopolistischer Mittelbereich, Ursache (Markenpolitik), Apple-Beispiel.',
  },

  // ---------- Prozess der Preisfestlegung (S. 17–18) ----------
  {
    id: 'mc-preisprozess', chapterId: 'm4', term: 'Prozess der Preisfestlegung',
    definition: 'Preise werden nicht nur einmalig festgelegt, sondern müssen über den Produktlebenszyklus mehrmals angepasst werden – systematischer Planungsprozess (Bruhn 2016): 1. Analyse des preispolitischen Spielraums, 2. Festlegung spezifischer preispolitischer Zielsetzungen, 3. preispolitische Strategieentwicklung, 4. Einsatz der Preisinstrumente, 5. Preiskontrolle.',
    mnemonic: 'Spielraum → Ziele → Strategie → Instrumente → Kontrolle.',
  },
  {
    id: 'mc-preisspielraum', chapterId: 'm4', term: 'Preispolitischer Spielraum',
    definition: 'Preiskorridor zwischen Preisuntergrenze und Preisobergrenze – seine Analyse ist der erste Schritt im Prozess der Preisfestlegung.',
  },
  {
    id: 'mc-preisinstrumente', chapterId: 'm4', term: 'Preisinstrumente',
    definition: 'Die tatsächliche Preisgestaltung geschieht durch den koordinierten Einsatz von vier Instrumenten: (1) Preise, (2) Preisnachlässe (Rabatte, Boni und Skonti), (3) Preiszuschläge (z. B. für Sonderleistungen oder bestimmte Lieferzeiten), (4) Zugabe von Geld- und Sachwerten sowie Dienstleistungen – richtet sich vor allem an den Handel und soll die Akzeptanz der geforderten Preise unterstützen.',
    example: 'Zugaben: Verkostungen, Displaymaterial.',
    synonyms: ['Preisnachlässe', 'Preiszuschläge', 'Zugaben'],
  },
  {
    id: 'mc-boni', chapterId: 'm4', term: 'Boni',
    definition: 'Rückwirkende Nachlässe am Ende einer Abrechnungsperiode, etwa über eine Kundenkarte.',
    confusableWith: ['Skonto'],
  },
  {
    id: 'mc-preiskontrolle', chapterId: 'm4', term: 'Preiskontrolle',
    definition: 'Begleitet den Prozess fortlaufend und überwacht Handelsabgabepreis, Endverbraucherpreis sowie Konkurrenzpreise – zeigt rechtzeitig an, wann eine Preiskorrektur notwendig wird.',
  },

  // ---------- 4.2 Strategien der Preispositionierung (S. 18) ----------
  {
    id: 'mc-preispositionierung', chapterId: 'm4', term: 'Preispositionierung',
    definition: 'Strategien, die sich auf die Höhe des Preises beziehen: Hochpreisstrategie, Mittelpreisstrategie und Niedrigpreisstrategie.',
    context: 'Preispolitische Entscheidungen zeigen oft schon kurzfristig Wirkung, basieren aber auf langfristigen strategischen Überlegungen (Bruhn 2016).',
  },
  {
    id: 'mc-hochpreis', chapterId: 'm4', term: 'Hochpreisstrategie',
    definition: 'Spitzenqualität zu Premiumpreisen.',
    example: 'Designmöbelstudios wie BoConcept oder Seyfarth.',
    confusableWith: ['Preisführerschaft'],
  },
  {
    id: 'mc-mittelpreis', chapterId: 'm4', term: 'Mittelpreisstrategie',
    definition: 'Mittleres Preisniveau bei Standardqualität.',
    example: 'Vollsortimenter wie Höffner, Kraft, XXXL-Marken der Lutz-Gruppe (größter Marktanteil).',
  },
  {
    id: 'mc-niedrigpreis', chapterId: 'm4', term: 'Niedrigpreisstrategie',
    definition: 'Mindestqualität zu sehr geringen Preisen.',
    example: 'Möbeldiscounter wie Roller, Poco, Sconto.',
    confusableWith: ['Preiskampf'],
  },

  // ---------- Strategien des Preiswettbewerbs (S. 18) ----------
  {
    id: 'mc-preiswettbewerb', chapterId: 'm4', term: 'Preiswettbewerb',
    definition: 'Strategien, die sich darauf beziehen, ob und wie sich ein Unternehmen am Verhalten der Konkurrenz orientiert: Preisführerschaft, Preiskampf, Preisfolgerschaft.',
  },
  {
    id: 'mc-preisfuehrerschaft', chapterId: 'm4', term: 'Preisführerschaft',
    definition: 'Sehr hoher Preis, gerechtfertigt durch Marke und Qualität, der dem Wettbewerb als Orientierung dient.',
    example: 'Apple iPhone X ab 999 Dollar; der durchschnittliche Smartphonepreis bei Apple ist ca. dreimal so hoch wie beim Marktführer Samsung.',
    confusableWith: ['Hochpreisstrategie', 'Preisfolgerschaft'],
  },
  {
    id: 'mc-preiskampf', chapterId: 'm4', term: 'Preiskampf',
    definition: 'Gegenteil der Preisführerschaft: Bestreben, den niedrigsten Preis am Markt zu fordern.',
    example: 'Typisch für Lebensmitteldiscounter.',
    confusableWith: ['Niedrigpreisstrategie'],
  },
  {
    id: 'mc-preisfolgerschaft', chapterId: 'm4', term: 'Preisfolgerschaft',
    definition: 'Reaktion auf die Preise des Marktführers, ohne die Preisforderungen selbst strategisch zu planen.',
    example: 'Senkt Aldi die Preise, ziehen Norma, Netto usw. nach.',
    confusableWith: ['Preisführerschaft'],
  },

  // ---------- Strategien der Preisabfolge (S. 18) ----------
  {
    id: 'mc-preisabfolge', chapterId: 'm4', term: 'Preisabfolge',
    definition: 'Strategien, die sich auf die Preisentwicklung im Produktlebenszyklus beziehen: Skimmingstrategie und Penetrationsstrategie.',
    context: 'Nicht immer erfolgreich: Netflix versuchte 2011 durch Entkopplung von DVD-Verleih und Streaming eine Preiserhöhung von 60 % – Verlust von 800.000 Kunden und 77 % des Börsenwerts.',
  },
  {
    id: 'mc-skimming', chapterId: 'm4', term: 'Skimmingstrategie (Abschöpfung)',
    definition: 'Sehr hohe Einführungspreise nutzen die Preisbereitschaft von Innovatoren und Frühadoptern aus, um schnell Gewinne abzuschöpfen; sind diese Segmente gesättigt, wird der Preis für die frühe und späte Mehrheit gesenkt.',
    example: 'Apple senkte den iPhone-7-Preis mit Vorstellung von iPhone 8 und X von 759 auf 629 Euro.',
    confusableWith: ['Penetrationsstrategie'],
    mnemonic: 'Skimming = Sahne abschöpfen: erst hoch, dann runter.',
    synonyms: ['Abschöpfungsstrategie', 'Skimming'],
  },
  {
    id: 'mc-penetration', chapterId: 'm4', term: 'Penetrationsstrategie',
    definition: 'Umgekehrte Logik zum Skimming: mit geringen Preisen den Markt so schnell wie möglich durchdringen und danach die Preise erhöhen.',
    example: 'Rasierklingen: Rasierer günstig, Nachfüllpacks teuer.',
    confusableWith: ['Skimmingstrategie (Abschöpfung)'],
    mnemonic: 'Penetration = erst niedrig (durchdringen), dann hoch.',
    synonyms: ['Penetration'],
  },

  // ---------- Strategien der Preisdifferenzierung (S. 18–19) ----------
  {
    id: 'mc-preisdiff', chapterId: 'm4', term: 'Preisdifferenzierung',
    definition: 'Forderung unterschiedlicher Preise für verschiedene Marktsegmente – sinnvoll, weil Segmente unterschiedliche Zahlungsbereitschaften aufweisen. Formen: mengenmäßig, zeitlich, räumlich, personell, leistungsbezogen; Sonderform Preisbündelung.',
    examRelevance: 'Alle Formen mit Skript-Beispiel und dem jeweiligen Zweck.',
  },
  {
    id: 'mc-pd-menge', chapterId: 'm4', term: 'Mengenmäßige Preisdifferenzierung',
    definition: 'Geringere Durchschnittspreise bei höheren Abnahmemengen – gibt Herstellungskostenvorteile weiter und regt zu größeren Bestellungen an.',
    example: 'Kartenmacherei: 5 Hochzeitseinladungen kosten 3,63 € pro Stück, bei 500 nur noch 1,35 €.',
  },
  {
    id: 'mc-pd-zeit', chapterId: 'm4', term: 'Zeitliche Preisdifferenzierung',
    definition: 'Zielt auf die bestmögliche Auslastung vorhandener Kapazitäten.',
    example: 'Kinos mit „Kinotag“ am Wochenanfang und günstigeren Nachmittagsvorstellungen.',
  },
  {
    id: 'mc-pd-raum', chapterId: 'm4', term: 'Räumliche Preisdifferenzierung',
    definition: 'Preisgestaltung nach geografischen Aspekten – internationale Märkte, aber auch regionale Unterschiede.',
    example: 'Benzin ist in Hamburg, Bremen und Berlin günstiger als in Thüringen und Baden-Württemberg wegen stärkerer Konkurrenz in den Stadtstaaten.',
  },
  {
    id: 'mc-pd-person', chapterId: 'm4', term: 'Personelle Preisdifferenzierung',
    definition: 'Vergünstigungen für bestimmte Personengruppen, z. B. Studenten oder Senioren.',
    example: 'Kostenloses Jugendkonto der Sparkassen (Maximierung des langfristigen Kundenwerts); Seniorenmenüs (kleinere Portionen).',
  },
  {
    id: 'mc-pd-leistung', chapterId: 'm4', term: 'Leistungsbezogene Preisdifferenzierung',
    definition: 'Eine geringfügige Änderung von Leistungen erzeugt unterschiedliche Preisklassen.',
    example: 'Bücher als gebundene Ausgabe, Taschenbuch und E-Book.',
  },
  {
    id: 'mc-preisbuendelung', chapterId: 'm4', term: 'Preisbündelung',
    definition: 'Sonderform der Preisdifferenzierung: Verschiedene Leistungen werden gemeinsam zu einem günstigeren Paketpreis angeboten.',
    example: 'MagentaEINS-Tarif der Telekom.',
  },
  {
    id: 'mc-clv', chapterId: 'm4', term: 'Langfristiger Kundenwert (Customer Lifetime Value)',
    definition: 'Wert, den ein Kunde über die gesamte Zeit seiner Kundschaft für ein Unternehmen darstellt.',
    example: 'Kostenloses Jugendkonto der Sparkassen zur Maximierung des langfristigen Kundenwerts.',
    synonyms: ['Customer Lifetime Value', 'CLV', 'Kundenwert'],
  },

  // ---------- 4.3 Preisbestimmung (S. 19) ----------
  {
    id: 'mc-preisbestimmung', chapterId: 'm4', term: 'Verfahrensweisen der Preisbestimmung',
    definition: 'Man unterscheidet die kostenorientierte Preisbestimmung (vornehmlich Kostenrechnung) und die marktorientierte Preisbestimmung (vornehmlich Reaktionen der Marktteilnehmer).',
  },
  {
    id: 'mc-kostenorientiert', chapterId: 'm4', term: 'Kostenorientierte Preisbestimmung',
    definition: 'Nutzt vornehmlich die Kostenrechnung: Preis = Stückkosten plus branchen- oder firmenüblicher Aufschlag.',
    context: 'Vorteile: intuitivste Art, weit verbreitet, schnell, kostengünstig, transparent – wird von Konsumenten als fair wahrgenommen. Nachteil: vernachlässigt jegliche nachfrage- und wettbewerbsbezogenen Aspekte.',
    confusableWith: ['Marktorientierte Preisbestimmung'],
  },
  {
    id: 'mc-marktorientiert', chapterId: 'm4', term: 'Marktorientierte Preisbestimmung',
    definition: 'Orientiert sich vornehmlich an den Reaktionen der Marktteilnehmer und wird den Anforderungen der Praxis besser gerecht; oft Unterscheidung zwischen kundenbezogenen Betrachtungen (Nachfrage) und dem Preisverhalten der Konkurrenz (Wettbewerb).',
    context: 'Verfahren: Break-even-Analyse, Perceived-Value-Pricing, Cournot-Preis.',
    confusableWith: ['Kostenorientierte Preisbestimmung'],
  },
  {
    id: 'mc-breakeven', chapterId: 'm4', term: 'Break-even-Analyse',
    definition: 'Einbeziehung der erforderlichen Absatzmenge bei einem gegebenen Preis zur Erreichung der Gewinnschwelle.',
    synonyms: ['Gewinnschwelle'],
  },
  {
    id: 'mc-perceived-value', chapterId: 'm4', term: 'Perceived-Value-Pricing',
    definition: 'Preisbildung nach dem empfundenen Wert aus Kundensicht.',
  },
  {
    id: 'mc-cournot', chapterId: 'm4', term: 'Cournot-Preis',
    definition: 'Gewinnmaximaler Preis unter Verwendung der Preis-Absatz-Funktion.',
  },

  // ---------- Innovative Preismodelle (S. 19) ----------
  {
    id: 'mc-innovpricing', chapterId: 'm4', term: 'Innovative Preismodelle',
    definition: 'Yield Management, Dynamic Pricing, Auction Pricing und Reverse Pricing.',
  },
  {
    id: 'mc-yield', chapterId: 'm4', term: 'Yield Management',
    definition: 'Die Nachfrage soll erlösmaximal mit vorhandenen Kapazitäten synchronisiert werden; ursprünglich von Fluglinien entwickelt.',
    context: 'Sinnvoll bei (1) fixen Kapazitäten, (2) nicht lagerbaren Gütern, (3) hohen Fixkosten und geringen variablen Kosten, (4) starken Nachfrageschwankungen, (5) Vorausbuchung, (6) möglicher Preisdifferenzierung. Gilt insbesondere für Hotels, Transportunternehmen und Konzerttickets.',
    confusableWith: ['Dynamic Pricing'],
    examRelevance: 'Die sechs Bedingungen sind eine typische Aufzählungsfrage.',
  },
  {
    id: 'mc-dynamic', chapterId: 'm4', term: 'Dynamic Pricing',
    definition: 'Verkaufspreise verändern sich automatisch je nach Nachfrageintensität; der optimale Preis wird durch mathematische Algorithmen bestimmt, z. B. durch Frühbucher- und Last-Minute-Preisnachlässe.',
    example: 'Höhere Uber-Kosten zu Stoßzeiten.',
    confusableWith: ['Yield Management'],
  },
  {
    id: 'mc-auction', chapterId: 'm4', term: 'Auction Pricing',
    definition: 'Der Preis wird durch Auktionen ermittelt.',
    context: 'Vorteil: Unternehmen müssen sich nicht mit Preispolitik beschäftigen. Nachteil: Verkaufspreise können unter den Herstellerkosten liegen – ein wichtiger Gestaltungsbereich des Marketingmix wird aufgegeben.',
    example: 'eBay.',
    confusableWith: ['Reverse Pricing'],
  },
  {
    id: 'mc-reverse', chapterId: 'm4', term: 'Reverse Pricing',
    definition: 'Umgekehrtes Prinzip: Kunden geben im Internet ihre Bedürfnisse (z. B. Hotel, Handwerkerleistung) und Preisvorstellungen an, Unternehmen geben entsprechende Angebote ab – sehr individuelle Preise im Sinne einer kundenorientierten Preisdifferenzierung.',
    confusableWith: ['Auction Pricing'],
  },

  // ---------- Konditionenpolitik (S. 19–20) ----------
  {
    id: 'mc-konditionenpolitik', chapterId: 'm4', term: 'Konditionenpolitik',
    definition: 'Die Festlegung der Endpreise bedeutet nicht, dass Konsumenten diese auch tatsächlich entrichten – besonders im B2B-Bereich spielt die Konditionenpolitik eine große Rolle. Dazu zählen Absatzkredite, Lieferungs- und Zahlungsbedingungen sowie Rabatte.',
  },
  {
    id: 'mc-absatzkredite', chapterId: 'm4', term: 'Absatzkredite',
    definition: 'Durch deren Gewährung ermöglichen oder erleichtern Unternehmen potenziellen Kunden den Kauf der eigenen Erzeugnisse.',
  },
  {
    id: 'mc-rabatte', chapterId: 'm4', term: 'Vier Typen von Rabatten',
    definition: 'Nach Walsh/Deseniss/Kilian (2013): Funktionsrabatte, Mengenrabatte, Zeitrabatte (mit Skonto als Sonderform) und Treuerabatte.',
    mnemonic: 'F-M-Z-T: Funktion, Menge, Zeit, Treue.',
    examRelevance: 'Alle vier mit Erklärung; Skonto als Sonderform des Zeitrabatts einordnen.',
  },
  {
    id: 'mc-funktionsrabatt', chapterId: 'm4', term: 'Funktionsrabatt',
    definition: 'Gegenleistung für vom Handel übernommene Funktionen, z. B. Lagerung, Präsentation, Kundenkontakt.',
  },
  {
    id: 'mc-mengenrabatt', chapterId: 'm4', term: 'Mengenrabatt',
    definition: 'Rabatt auf die Bestellung größerer Mengen durch das Handelsunternehmen.',
    confusableWith: ['Mengenmäßige Preisdifferenzierung'],
  },
  {
    id: 'mc-zeitrabatt', chapterId: 'm4', term: 'Zeitrabatt',
    definition: 'Rabatt abhängig von der Bestellzeit, z. B. vor der Saison; Skonto ist eine Sonderform für eine frühzeitige Zahlung.',
  },
  {
    id: 'mc-treuerabatt', chapterId: 'm4', term: 'Treuerabatt',
    definition: 'Belohnung für langfristige und kontinuierliche Bestellungen.',
  },
  {
    id: 'mc-skonto', chapterId: 'm4', term: 'Skonto',
    definition: 'Sonderform des Zeitrabatts für eine frühzeitige Zahlung; gehört zu den Preisnachlässen (Rabatte, Boni und Skonti).',
    confusableWith: ['Boni'],
    synonyms: ['Skonti'],
  },
];
