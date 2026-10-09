import { Concept } from '@/lib/types';

/** Kapitel 4 – Preispolitik (PDF S. 16–20). Definitionen eng am Skript. */
export const concepts4: Concept[] = [
  // ---------- 4.1 Die Stellung der Preispolitik im Marketing (S. 16) ----------
  {
    id: 'mc-preispolitik', chapterId: 'm4', term: 'Preispolitik (Kontrahierungspolitik)',
    definition: 'Alle Entscheidungen, die sich mit der Festlegung eines Entgelts für in Anspruch genommene Leistungen befassen (Homburg 2017). Sie befasst sich mit der Höhe des Preises, aber auch mit weiteren Bedingungen (z. B. Zahlungsbedingungen und Rabatte) – daher auch Kontrahierungspolitik.',
    context: 'Preise sind ein wesentlicher Indikator für die Marktstellung und haben direkten Einfluss auf Umsatz und Gewinn. Die Preispolitik ist eine komplexe Managementaufgabe mit strategischen und operativen Entscheidungsparametern.',
    synonyms: ['Kontrahierungspolitik', 'Preisgestaltung'],
  },

  // ---------- Einflussfaktoren der Preisfestlegung (S. 16) ----------
  {
    id: 'mc-einflussfaktoren-preis', chapterId: 'm4', term: 'Einflussfaktoren der Preisfestlegung',
    definition: 'Käufer (Zahlungsbereitschaft = Preisobergrenze), Kosten (Gesamtkosten = Preisuntergrenze), Konkurrenzsituation (Preiskorridor), externe Rahmenbedingungen und psychologische Effekte der Preiswahrnehmung.',
  },

  // ---------- Preis-Absatz-Funktion (S. 17) ----------
  {
    id: 'mc-paf', chapterId: 'm4', term: 'Preis-Absatz-Funktion',
    definition: 'Mathematisch-analytischer Ansatz aus der mikroökonomischen Preistheorie, der Konsumentenreaktionen auf Preisänderungen abbildet – funktionaler Zusammenhang zwischen dem Preis eines Produkts und der in einem gewissen Zeitraum abgesetzten Menge.',
    context: 'Ermittlung auf Grundlage einer ausreichend großen Datenbasis (Rechnungswesen, Kundenbefragungen, Analyse von Nutzerverhalten, E-Commerce-Verkaufsdaten); dient der Prognose, welche Mengen zu welchen Preisen verkauft werden können. Drei Formen: lineare PAF, multiplikatives Modell, Gutenberg-Modell.',
    synonyms: ['PAF'],
  },
  {
    id: 'mc-paf-linear', chapterId: 'm4', term: 'Lineare Preis-Absatz-Funktion',
    definition: 'x(p) = a – b · p: idealtypische Betrachtung im Monopol; die Nachfrage sinkt mit steigendem Preis. Parameter b verdeutlicht, wie stark der Markt auf Preisänderungen reagiert; a = maximale Sättigungsmenge (Absatz bei Preis 0); a/b = Maximalpreis (Preis, bei dem keine Nachfrage mehr existiert).',
    confusableWith: ['Multiplikatives Preis-Absatz-Modell', 'Gutenberg-Modell'],
  },
  {
    id: 'mc-paf-mult', chapterId: 'm4', term: 'Multiplikatives Preis-Absatz-Modell',
    definition: 'x(p) = a · p^(–b): berücksichtigt zusätzlich den Ausgangspreis – je niedriger dieser ist, desto stärker wirken sich Preisänderungen aus. Die Achsen werden nicht geschnitten, es gibt also keine Sättigungsmenge und keinen Maximalpreis; a = Normierungsparameter (verkaufte Menge bei einem Preis von einer Geldeinheit), b indiziert die Preisabhängigkeit der Absatzmenge.',
    confusableWith: ['Lineare Preis-Absatz-Funktion', 'Gutenberg-Modell'],
  },
  {
    id: 'mc-gutenberg', chapterId: 'm4', term: 'Gutenberg-Modell',
    definition: 'Reflektiert den unvollkommenen Markt: doppelt geknickte Preis-Absatz-Funktion, zurückzuführen auf einen Markt mit Wettbewerbern. Im oberen und unteren Bereich sinkt die Nachfrage mit steigendem Preis (ähnlich linear), im mittleren Bereich entsteht eine Art Monopol: Die Absatzmenge verändert sich trotz höherer Preise wenig.',
    example: 'Durch erfolgreiche Markenpolitik verkauft Apple Smartphones erfolgreich zu hohen Preisen.',
    confusableWith: ['Lineare Preis-Absatz-Funktion', 'Multiplikatives Preis-Absatz-Modell'],
  },

  // ---------- Prozess der Preisfestlegung (S. 17–18) ----------
  {
    id: 'mc-preisprozess', chapterId: 'm4', term: 'Prozess der Preisfestlegung',
    definition: 'Preise werden nicht nur einmalig festgelegt, sondern müssen über den Produktlebenszyklus mehrmals angepasst werden – systematischer Planungsprozess (Bruhn 2016): 1. Analyse des preispolitischen Spielraums, 2. Festlegung spezifischer preispolitischer Zielsetzungen, 3. preispolitische Strategieentwicklung, 4. Einsatz der Preisinstrumente, 5. Preiskontrolle.',
  },
  {
    id: 'mc-preisinstrumente', chapterId: 'm4', term: 'Preisinstrumente',
    definition: 'Die tatsächliche Preisgestaltung geschieht durch den koordinierten Einsatz von vier Instrumenten: (1) Preise, (2) Preisnachlässe (Rabatte, Boni und Skonti), (3) Preiszuschläge (z. B. für Sonderleistungen oder bestimmte Lieferzeiten), (4) Zugabe von Geld- und Sachwerten sowie Dienstleistungen – richtet sich vor allem an den Handel und soll die Akzeptanz der geforderten Preise unterstützen.',
    example: 'Zugaben: Verkostungen, Displaymaterial.',
    synonyms: ['Preisnachlässe', 'Preiszuschläge', 'Zugaben'],
  },

  // ---------- 4.2 Strategien der Preispositionierung (S. 18) ----------
  {
    id: 'mc-preispositionierung', chapterId: 'm4', term: 'Preispositionierung',
    definition: 'Strategien, die sich auf die Höhe des Preises beziehen: Hochpreisstrategie, Mittelpreisstrategie und Niedrigpreisstrategie.',
    context: 'Preispolitische Entscheidungen zeigen oft schon kurzfristig Wirkung, basieren aber auf langfristigen strategischen Überlegungen (Bruhn 2016).',
  },

  // ---------- Strategien des Preiswettbewerbs (S. 18) ----------
  {
    id: 'mc-preiswettbewerb', chapterId: 'm4', term: 'Preiswettbewerb',
    definition: 'Strategien, die sich darauf beziehen, ob und wie sich ein Unternehmen am Verhalten der Konkurrenz orientiert: Preisführerschaft, Preiskampf, Preisfolgerschaft.',
  },

  // ---------- Strategien der Preisabfolge (S. 18) ----------
  {
    id: 'mc-preisabfolge', chapterId: 'm4', term: 'Preisabfolge',
    definition: 'Strategien, die sich auf die Preisentwicklung im Produktlebenszyklus beziehen: Skimmingstrategie und Penetrationsstrategie.',
    context: 'Nicht immer erfolgreich: Netflix versuchte 2011 durch Entkopplung von DVD-Verleih und Streaming eine Preiserhöhung von 60 % – Verlust von 800.000 Kunden und 77 % des Börsenwerts.',
  },

  // ---------- Strategien der Preisdifferenzierung (S. 18–19) ----------
  {
    id: 'mc-preisdiff', chapterId: 'm4', term: 'Preisdifferenzierung',
    definition: 'Forderung unterschiedlicher Preise für verschiedene Marktsegmente – sinnvoll, weil Segmente unterschiedliche Zahlungsbereitschaften aufweisen. Formen: mengenmäßig, zeitlich, räumlich, personell, leistungsbezogen; Sonderform Preisbündelung.',
  },
  {
    id: 'mc-clv', chapterId: 'm4', term: 'Langfristiger Kundenwert (Customer Lifetime Value)',
    definition: 'Wert, den ein Kunde über die gesamte Zeit seiner Kundschaft für ein Unternehmen darstellt.',
    example: 'Kostenloses Jugendkonto der Sparkassen zur Maximierung des langfristigen Kundenwerts.',
    synonyms: ['Customer Lifetime Value', 'CLV', 'Kundenwert'],
  },

  // ---------- 4.3 Preisbestimmung (S. 19) ----------
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

  // ---------- Innovative Preismodelle (S. 19) ----------
  {
    id: 'mc-yield', chapterId: 'm4', term: 'Yield Management',
    definition: 'Die Nachfrage soll erlösmaximal mit vorhandenen Kapazitäten synchronisiert werden; ursprünglich von Fluglinien entwickelt.',
    context: 'Sinnvoll bei (1) fixen Kapazitäten, (2) nicht lagerbaren Gütern, (3) hohen Fixkosten und geringen variablen Kosten, (4) starken Nachfrageschwankungen, (5) Vorausbuchung, (6) möglicher Preisdifferenzierung. Gilt insbesondere für Hotels, Transportunternehmen und Konzerttickets.',
    confusableWith: ['Dynamic Pricing'],
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
    id: 'mc-rabatte', chapterId: 'm4', term: 'Vier Typen von Rabatten',
    definition: 'Nach Walsh/Deseniss/Kilian (2013): Funktionsrabatte, Mengenrabatte, Zeitrabatte (mit Skonto als Sonderform) und Treuerabatte.',
  },
];
