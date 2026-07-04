import { Concept } from '@/lib/types';

/**
 * Wissensmodell: zentrale Begriffe und Definitionen aus dem Modul-PDF.
 * confusableWith speist die Verwechslungs-Fehleranalyse,
 * synonyms verbessert Freitextbewertung und Retrieval.
 */
export const concepts: Concept[] = [
  // ---- Kapitel 1 ----
  {
    id: 'c-konsumentenverhalten', chapterId: 'k1', term: 'Konsumentenverhalten',
    definition: 'Verhalten beim Kauf oder Konsum wirtschaftlicher Güter. Im engeren Sinn das beobachtbare, äußere Verhalten; im weiteren Sinn auch materielle und immaterielle Güter (z. B. Kino, Arzt, Wahl).',
    context: 'Wissenschaftliche Betrachtung ab den 1920ern, etabliert nach dem 2. Weltkrieg mit dem Wandel vom Verkäufer- zum Käufermarkt. Folge: professionelles Marketing.',
    examRelevance: 'Klassiker für Definitions- und Abgrenzungsfragen (engerer vs. weiterer Sinn).',
  },
  {
    id: 'c-utilitaristisch', chapterId: 'k1', term: 'Utilitaristischer Konsum',
    definition: 'Konsum, bei dem der praktische Nutzen im Vordergrund steht, z. B. ein familienfreundliches Auto.',
    confusableWith: ['Hedonistischer Konsum'],
    example: 'Kauf eines Kombis wegen Stauraum und Sicherheit.',
    mnemonic: 'Utilitaristisch = Utility = Nutzen.',
  },
  {
    id: 'c-hedonistisch', chapterId: 'k1', term: 'Hedonistischer Konsum',
    definition: 'Konsum, bei dem der Konsument Fantasie und Emotionen durch die Nutzung des Produktes erleben möchte, z. B. Nutzung eines Sportwagens.',
    confusableWith: ['Utilitaristischer Konsum'],
    example: 'Sportwagen wegen Fahrgefühl und Prestige.',
    context: 'Schnittmengen zwischen Utilitarismus und Hedonismus sind möglich.',
  },
  {
    id: 'c-entscheidungsformen', chapterId: 'k1', term: 'Entscheidungsformen des Konsumenten',
    definition: 'Kaufentscheidung treffen, Produkt/Dienstleistung bezahlen oder konsumieren – mindestens eine Form muss vorliegen, damit jemand als Konsument gilt.',
  },

  // ---- Kapitel 2 ----
  {
    id: 'c-behaviorismus', chapterId: 'k2', term: 'Behaviorismus (S-R-Modell)',
    definition: 'Verhaltenserklärung, die nur Reize und Reaktionen beinhaltet (Stimulus-Response). Innere Prozesse der Person werden nicht berücksichtigt – die Person gilt als „Black Box“.',
    confusableWith: ['Neobehaviorismus'],
    synonyms: ['S-R-Modell', 'Stimulus-Response-Modell'],
  },
  {
    id: 'c-neobehaviorismus', chapterId: 'k2', term: 'Neobehaviorismus (S-O-R-Modell)',
    definition: 'Erweiterung des Behaviorismus um die Introspektion: Stimulus, Organismus, Response. Innere Prozesse (intervenierende Variablen) werden berücksichtigt, sind aber nicht direkt beobachtbar.',
    confusableWith: ['Behaviorismus'],
    synonyms: ['S-O-R-Modell', 'Stimulus-Organismus-Response'],
    mnemonic: 'Das O in S-O-R = Organismus = das Innere des Konsumenten.',
    examRelevance: 'Abgrenzung S-R vs. S-O-R ist ein typischer Prüfungsklassiker.',
  },
  {
    id: 'c-stimulus', chapterId: 'k2', term: 'Stimulus (Reiz)',
    definition: 'Reize aus der Umwelt, die auf Konsumenten wirken; unterteilt in andere Reize (z. B. Hupen) und marketingdominante Reize. Marketingdominante Reize lassen sich in die 4 Ps unterteilen: Price, Product, Place, Promotion.',
    synonyms: ['Reiz', '4 Ps'],
  },
  {
    id: 'c-response', chapterId: 'k2', term: 'Response (Reaktion)',
    definition: 'Die direkt beobachtbare/messbare Reaktion des Konsumenten, z. B. Verweildauer am POS, Menge der gekauften Ware, Zahl der Cross-Buyings.',
  },
  {
    id: 'c-totalmodelle', chapterId: 'k2', term: 'Totalmodelle',
    definition: 'Modelle, die das Konsumentenverhalten ganzheitlich erklären wollen. Didaktisch wertvoll, in der Praxis aber schlecht anzuwenden.',
    confusableWith: ['Partialmodelle', 'Phasenmodelle'],
  },
  {
    id: 'c-partialmodelle', chapterId: 'k2', term: 'Partialmodelle',
    definition: 'Modelle mit Fokus auf einzelne Aspekte des Konsumentenverhaltens; für die praktische Anwendung geeignet. Grundüberlegung: Wenige Variablen üben besonders hohen Einfluss aus – dafür ist das Betrachtungsspektrum limitiert.',
    confusableWith: ['Totalmodelle', 'Phasenmodelle'],
  },
  {
    id: 'c-phasenmodelle', chapterId: 'k2', term: 'Phasenmodelle',
    definition: 'Zeitliche Einteilung des Kaufprozesses (Was macht der Käufer in welcher Phase?), häufig in Vorkauf-, Kauf- und Nachkaufphase. Wertvoll für extensive und organisationale Kaufentscheidungen, für Impulskäufe eher ungeeignet.',
    confusableWith: ['Totalmodelle', 'Partialmodelle'],
  },
  {
    id: 'c-determinante', chapterId: 'k2', term: 'Determinante',
    definition: 'Psychische, soziale, persönliche oder kulturelle Faktoren, die zur Erklärung des Konsumentenverhaltens verwendet werden.',
  },
  {
    id: 'c-aktivierende-prozesse', chapterId: 'k2', term: 'Aktivierende Prozesse',
    definition: 'Zentralnervöse Erregungen/Spannungen, die menschliches Verhalten bedingen und Antrieb verleihen – für Konsumenten v. a. Aktivierung, Motivation, Emotion und Einstellung.',
    confusableWith: ['Kognitive Prozesse'],
  },
  {
    id: 'c-kognitive-prozesse', chapterId: 'k2', term: 'Kognitive Prozesse',
    definition: 'Informationsaufnahme, -verarbeitung und -speicherung; Lernen und Entscheiden sind zentral. Gedankliche Prozesse, durch die wir Kenntnis erlangen (z. B. über Kunden, Preise, Testergebnisse).',
    confusableWith: ['Aktivierende Prozesse'],
  },

  // ---- Kapitel 3 ----
  {
    id: 'c-aktivierung', chapterId: 'k3', term: 'Aktivierung',
    definition: 'Grunddimension aller Antriebsprozesse; macht Menschen leistungsbereit und -fähig. Prozesse mit innerer Erregung und Spannung gelten als aktivierend – ohne Aktivierung kein Verhalten.',
    examRelevance: 'Aktivierung hat den geringsten Komplexitätsgrad der Verhaltenskonstrukte und ist am einfachsten zu beeinflussen.',
  },
  {
    id: 'c-phasisch', chapterId: 'k3', term: 'Phasische Aktivierung',
    definition: 'Zeitlich begrenzte Aktivierung: Fähigkeit, auf situative Einflüsse zu reagieren, relevante Reize zu fokussieren und irrelevante auszublenden (Aufmerksamkeit). Aus Marketingsicht besonders relevant.',
    confusableWith: ['Tonische Aktivierung'],
    mnemonic: 'Phasisch = Phase = kurzfristig. Tonisch = Dauerton = langfristig.',
  },
  {
    id: 'c-tonisch', chapterId: 'k3', term: 'Tonische Aktivierung',
    definition: 'Aktivierung über längere Zeitintervalle mit einem gewissen Grad an Wachheit und allgemeiner Leistungsfähigkeit (z. B. biologisch bedingtes Mittagstief). Von Unternehmen kaum beeinflussbar.',
    confusableWith: ['Phasische Aktivierung'],
  },
  {
    id: 'c-orientierungsreaktion', chapterId: 'k3', term: 'Orientierungsreaktion',
    definition: 'Ausrichtung eines Organismus auf eine veränderte Reizkonstellation, z. B. Zuwenden des Körpers zu einer attraktiven Sache. Wichtig zur Messung der Aktivierung.',
    confusableWith: ['Aufmerksamkeit'],
  },
  {
    id: 'c-aufmerksamkeit', chapterId: 'k3', term: 'Aufmerksamkeit',
    definition: 'Bereitschaft, Außenreize wahrzunehmen. Subtypen: orientierende, selektive/fokussierte, geteilte und dauerhafte Aufmerksamkeit.',
    confusableWith: ['Orientierungsreaktion'],
  },
  {
    id: 'c-lambda', chapterId: 'k3', term: 'Lambda-Hypothese',
    definition: 'Funktion zwischen Aktivierung und Leistung mit einem optimalen Bereich: Zu wenig Aktivierung (Unteraktivierung) und zu viel (Überaktivierung/Panik) senken die Leistungsfähigkeit. Weder empirisch widerlegt noch ganz bestätigt.',
    context: 'Überaktivierung ist im Allgemeinen selten; häufig wird die Aktivierungsschwelle nicht erreicht (Unteraktivierung).',
    mnemonic: 'Die Kurve sieht aus wie der griechische Buchstabe Lambda (λ) – erst steigend, dann fallend.',
  },
  {
    id: 'c-stimuli-arten', chapterId: 'k3', term: 'Affektive, physische und kognitive Stimuli',
    definition: 'Affektive (emotionale) Stimuli aktivieren am stärksten (teils genetisch disponiert, z. B. Erotik); physische Stimuli sind Eigenschaften wie Größe, Form, (Signal-)Farbe, Geruch, Lautstärke; kognitive Stimuli wirken über Widersprüche, gedankliche Konflikte und Überraschung.',
    context: 'Die Stimuli-Arten können kombiniert auftreten; die Zuordnung ist nicht immer eindeutig.',
  },
  {
    id: 'c-bumerang', chapterId: 'k3', term: 'Bumerang-Effekt',
    definition: 'Es wird die gegenteilige Kommunikationswirkung erreicht – z. B. wenn Reize nicht zum Gesamtkontext passen oder von der eigentlichen Werbebotschaft ablenken.',
    example: 'Ein erotischer Reiz lenkt so stark ab, dass die Marke nicht erinnert wird.',
  },
  {
    id: 'c-schockwerbung', chapterId: 'k3', term: 'Schockwerbung',
    definition: 'Werbung, die gegen gute Sitten und Moralvorstellungen verstößt, um Gehör zu finden. Vorteil: Abhebung von der Konkurrenz; Nachteile: Bumerang-Effekt, negative Publicity.',
  },
  {
    id: 'c-elm', chapterId: 'k3', term: 'Elaboration-Likelihood-Modell (ELM)',
    definition: 'Beschreibt zwei Wege der Überzeugung: den zentralen Weg über Fakten und Argumente (bei Zeit und Motivation; führt zu nachhaltiger, änderungsresistenter Einstellungsänderung) und den peripheren Weg über Hinweisreize wie Bilder, Musik, attraktive Testimonials (schnell, aber fragil).',
    example: 'Teures funktionales Produkt → zentraler Weg; schnelllebiges Produkt → peripherer Weg.',
    examRelevance: 'Sehr prüfungsrelevant: Wege benennen, Bedingungen und Stabilität der Einstellungsänderung unterscheiden.',
    synonyms: ['ELM', 'zentraler Weg', 'peripherer Weg'],
  },
  {
    id: 'c-reziprozitaet', chapterId: 'k3', term: 'Prinzip der Reziprozität (Cialdini)',
    definition: 'Beruht auf Gegenseitigkeit und sozialem Austausch: Wer etwas erhält (z. B. Verkostung, kostenloser Schnaps), fühlt sich verpflichtet, etwas zurückzugeben (Kauf, höheres Trinkgeld).',
    confusableWith: ['Prinzip der Verpflichtung und Konsistenz'],
  },
  {
    id: 'c-konsistenz', chapterId: 'k3', term: 'Prinzip der Verpflichtung und Konsistenz (Cialdini)',
    definition: 'Beruht auf Verlässlichkeit: Wer einer Sache zustimmt, will konsistent bleiben und stimmt weiter zu. Eigene Einstellung wird mit tatsächlichem Verhalten in Einklang gebracht (z. B. Kundenkarte → künftige Käufe).',
    confusableWith: ['Prinzip der Reziprozität'],
  },
  {
    id: 'c-soziale-bewaehrtheit', chapterId: 'k3', term: 'Prinzip der sozialen Bewährtheit (Cialdini)',
    definition: 'Menschen orientieren sich am Verhalten anderer.',
    example: 'Bestseller-Listen, „Kunden kauften auch…“.',
    confusableWith: ['Prinzip der Autorität'],
  },
  {
    id: 'c-gefallen', chapterId: 'k3', term: 'Prinzip des Gefallens (Cialdini)',
    definition: 'Wir mögen Personen/Produkte lieber, die wir als vertraut, attraktiv oder sympathisch empfinden – z. B. Präferenz für Markenprodukte gegenüber unbekannten Produkten.',
  },
  {
    id: 'c-autoritaet', chapterId: 'k3', term: 'Prinzip der Autorität (Cialdini)',
    definition: 'Menschen haben automatisch Respekt vor Symbolen oder Personen, die ihnen überlegen erscheinen – z. B. Werbung mit Experten.',
    confusableWith: ['Prinzip der sozialen Bewährtheit'],
  },
  {
    id: 'c-verknappung', chapterId: 'k3', term: 'Prinzip der Verknappung (Cialdini)',
    definition: 'Reflexartiges Zugreifen auf ein Produkt durch empfundene Freiheitseinschränkung – z. B. „fast ausverkauft“ oder das letzte Hotelzimmer.',
  },

  // ---- Kapitel 4 ----
  {
    id: 'c-emotion', chapterId: 'k4', term: 'Emotion',
    definition: 'Innere Erregungsvorgänge, die subjektiv erlebt (interpretiert) und als angenehm oder unangenehm empfunden werden. Vier Dimensionen: Erregung (Ausmaß), Richtung (positiv/negativ), Qualität (Art, z. B. Optimismus), subjektives Bewusstsein.',
    context: 'Emotionen sind nicht dasselbe wie Stimmungen, Affekte oder Gefühle. Angeborene (Basis-)Emotionen sind kulturunabhängig; Dechiffrieren und Umgang sind kulturabhängig.',
    confusableWith: ['Motivation', 'Einstellung'],
  },
  {
    id: 'c-basisemotionen', chapterId: 'k4', term: 'Basisemotionen (Izard/Plutchik)',
    definition: 'Angeborene Emotionen, aus denen sich gemischte Emotionen zusammensetzen. Izard nennt 10 (u. a. Interesse, Freude, Überraschung, Kummer, Wut, Ekel, Geringschätzung, Angst, Scham, Schuldgefühl), Plutchik 8 (Erwartung, Freude, Überraschung, Trauer, Wut, Ekel, Akzeptanz, Angst).',
    mnemonic: 'Izard = zehn (beide mit z), Plutchik = acht.',
  },
  {
    id: 'c-erlebnismarketing', chapterId: 'k4', term: 'Erlebnismarketing',
    definition: 'Anreicherung des Marketings mit emotionalen Stimuli. Emotionen verbessern Informationsaufnahme/-verarbeitung, dienen als USP und rechtfertigen höhere Zahlungsbereitschaft (Nobelmarken).',
    synonyms: ['USP', 'Unique Selling Proposition'],
  },
  {
    id: 'c-motivation', chapterId: 'k4', term: 'Motivation',
    definition: 'Emotion mit Zielorientierung (Verhaltensziel); charakterisiert die aktuelle Energetisierung – momentane, zielgerichtete Beweggründe.',
    confusableWith: ['Motiv', 'Emotion', 'Einstellung'],
  },
  {
    id: 'c-motiv', chapterId: 'k4', term: 'Motiv',
    definition: 'Zeitlich latenter Zustand des Individuums, ähnlich auf bestimmte Ziele zu reagieren (z. B. Selbstverwirklichung). Primäre Motive sind genetisch bedingt (Hunger), sekundäre erlernt und kulturell geprägt (Anerkennung, Freiheit); intrinsische kommen von innen, extrinsische von außen.',
    confusableWith: ['Motivation', 'Trieb', 'Bedürfnis'],
  },
  {
    id: 'c-beduerfnis', chapterId: 'k4', term: 'Bedürfnis',
    definition: 'Gefühlter Mangelzustand (subjektiv/objektiv, ohne Zielausrichtung) mit dem begleitenden Wunsch, diesen zu beseitigen. Eng mit Motiven verbunden.',
    confusableWith: ['Motiv', 'Trieb'],
  },
  {
    id: 'c-trieb', chapterId: 'k4', term: 'Trieb',
    definition: 'Genetisch bedingtes Motiv ohne kognitive Komponente, z. B. Hungergefühl, wenn Glukose am Minimum ist.',
    confusableWith: ['Motiv', 'Bedürfnis'],
  },
  {
    id: 'c-maslow', chapterId: 'k4', term: 'Maslow’sche Bedürfnishierarchie',
    definition: 'Anordnung menschlicher Bedürfnisse in 5 Ebenen: physiologische Bedürfnisse, Sicherheit, soziale Bedürfnisse, Wertschätzung, Selbstverwirklichung. Ebenen 1–3 sind Defizitbedürfnisse (sinkende Motivationskraft bei Befriedigung); Selbstverwirklichung ist unstillbar.',
    context: 'Für Marketingkonzeptionen weniger zweckmäßig (alle Konsumenten in einem Topf); relevant sind Motive mittlerer Reichweite wie Ökonomie/Sparsamkeit, Prestige/Status, Normunterwerfung, Lust/Neugier, Erotik, Angst/Risiko, Konsistenz-/Dissonanzvermeidung.',
    examRelevance: 'Ebenen in richtiger Reihenfolge + Kritik am Modell.',
  },
  {
    id: 'c-einstellung', chapterId: 'k4', term: 'Einstellung',
    definition: 'Motivation mit kognitiver Gegenstandsbeurteilung; das subjektbezogene Verhaltenskonstrukt mit der höchsten Komplexität und größten zeitlichen Persistenz. Erlernte, relativ konstante Bereitschaft, sich gegenüber einem Objekt unter bestimmten situativen Voraussetzungen positiv oder negativ zu verhalten.',
    confusableWith: ['Image', 'Meinung', 'Überzeugung', 'Präferenz', 'Motivation'],
    example: 'Negative Einstellung zu Fast Food – aber wenn der Zug ausfällt und es die einzige Essensmöglichkeit ist, isst man wahrscheinlich doch dort (situative Voraussetzung).',
  },
  {
    id: 'c-abc-modell', chapterId: 'k4', term: 'ABC-Modell der Einstellung',
    definition: 'Zerlegt die Einstellung in drei Komponenten: Affect (gefühlsmäßig), Behavior (Handlungsabsicht) und Cognition (subjektives Wissen). Nicht immer ist ersichtlich, welche Komponente am Anfang steht.',
    synonyms: ['affektiv', 'Verhalten', 'Kognition'],
  },
  {
    id: 'c-image', chapterId: 'k4', term: 'Image',
    definition: 'Analoger Begriff zur Einstellung, der sich durch den Objektbezug unterscheidet: Image bezieht sich auf das Objekt (z. B. das Auto), die Einstellung meist auf die Tätigkeit (z. B. das Autofahren).',
    confusableWith: ['Einstellung'],
  },
  {
    id: 'c-meinung', chapterId: 'k4', term: 'Meinung / Überzeugung / Präferenz / Vorurteil',
    definition: 'Meinung = verbalisierte Einstellung; Überzeugung = persistente, kognitive Grundlage der Einstellung; Präferenz = relativierte Einstellung; Vorurteile/Stereotype = schlecht begründete, rigide, pauschale (häufig negative) Einstellungen.',
    confusableWith: ['Einstellung'],
    examRelevance: 'Beliebte Zuordnungsfrage: Begriff → Kurzdefinition.',
  },
  {
    id: 'c-konstrukt-hierarchie', chapterId: 'k4', term: 'Aufbau der Verhaltenskonstrukte',
    definition: 'Die Verhaltenskonstrukte bauen aufeinander auf: Aktivierung (zentralnervöses Erregungsmuster) → Emotion (+ Interpretation) → Motivation (+ Zielorientierung) → Einstellung (+ Gegenstandsbeurteilung). Mit jeder Stufe steigen zeitliche Beständigkeit und Komplexität.',
    mnemonic: 'A-E-M-E: Aktivierung, Emotion, Motivation, Einstellung – jede Stufe fügt eine Komponente hinzu.',
  },

  // ---- Kapitel 5 ----
  {
    id: 'c-dreispeicher', chapterId: 'k5', term: 'Dreispeichermodell (modales Gedächtnismodell)',
    definition: 'Beschreibt Informationsaufnahme, -verarbeitung und -speicherung über drei Speicher: sensorischer Speicher (Millisekunden, akustisch/visuell), Kurzzeit-/Arbeitsspeicher (Minuten, Kapazität 7±2 Chunks, optimal 3–4) und Langzeitspeicher (quasi unbegrenzte Kapazität, lebenslang).',
    examRelevance: 'Speicher, Reihenfolge, Speicherdauern und Kapazitäten benennen können.',
    synonyms: ['sensorischer Speicher', 'Kurzzeitspeicher', 'Arbeitsspeicher', 'Langzeitspeicher'],
  },
  {
    id: 'c-sensorischer-speicher', chapterId: 'k5', term: 'Sensorischer Speicher',
    definition: 'Sinneseindrücke werden nach Passieren der Aufmerksamkeitsschwelle innerhalb von (Milli-)Sekunden verarbeitet; ohne Weiterleitung in den Kurzzeitspeicher verblassen sie.',
    confusableWith: ['Kurzzeitspeicher', 'Langzeitspeicher'],
  },
  {
    id: 'c-kurzzeitspeicher', chapterId: 'k5', term: 'Kurzzeit-/Arbeitsspeicher',
    definition: 'Begrenzter Speicher zur Informationsverarbeitung und Verhaltensbildung im Zusammenspiel mit dem Langzeitspeicher; Kapazität 7±2 Elemente (Chunks), optimal 3–4; Speicherdauer Minuten. Verarbeitung drückt sich u. a. in Memorieren aus (Transfer in den Langzeitspeicher).',
    confusableWith: ['Sensorischer Speicher', 'Langzeitspeicher'],
  },
  {
    id: 'c-lernen', chapterId: 'k5', term: 'Lernen',
    definition: 'Eine erfahrungs- bzw. orientierungsbedingte, relativ konsistente Verhaltensänderung; erklärt durch behavioristische (Konditionierung) und kognitive Lerntheorien.',
  },
  {
    id: 'c-klassische-konditionierung', chapterId: 'k5', term: 'Klassische Konditionierung',
    definition: 'Ein zu erlernender Stimulus wird mit einer Reaktion und einem bereits erlernten Stimulus verbunden (Pawlow’scher Hund: Glocke → Speichelfluss). In der Werbung durch emotionales Aufladen eines Markennamens genutzt.',
    confusableWith: ['Instrumentelle Konditionierung'],
    mnemonic: 'Klassisch = Glocke (Pawlow). Instrumentell = Belohnung/Strafe (Skinner).',
  },
  {
    id: 'c-instrumentelle-konditionierung', chapterId: 'k5', term: 'Instrumentelle (operante) Konditionierung',
    definition: 'Verhalten wird durch Verstärkung (Belohnung oder Strafe) erlernt – ein selektiver Lernprozess. Aus Marketingsicht besonders wichtig für Habitualisierung (Gewohnheit) und Internalisierung (Verinnerlichung).',
    confusableWith: ['Klassische Konditionierung'],
  },
  {
    id: 'c-stimulusgeneralisierung', chapterId: 'k5', term: 'Stimulusgeneralisierung',
    definition: 'Gleiche Reaktionen auf ähnliche Reize – z. B. ähnliche Produkte mit ähnlichen Eigenschaften bei neuen Kollektionen (Wissensübertragung).',
    confusableWith: ['Reizdiskriminierung'],
  },
  {
    id: 'c-reizdiskriminierung', chapterId: 'k5', term: 'Reizdiskriminierung',
    definition: 'Unterschiedliche Reaktionen auf Reize – z. B. das Produkt durch Eigenschaften von der Konkurrenz abheben.',
    confusableWith: ['Stimulusgeneralisierung'],
  },
  {
    id: 'c-schemata', chapterId: 'k5', term: 'Schemata / semantische Netzwerke',
    definition: 'Wissenseinheiten, die durch kognitives Lernen gebildet oder modifiziert werden; sie ordnen und kategorisieren Wissen und sind Hilfen für effektives Denken und Handeln.',
  },
  {
    id: 'c-verarbeitungstiefe', chapterId: 'k5', term: 'Verarbeitungstiefe',
    definition: 'Ausmaß der kognitiven Aktivität: Hohe Verarbeitungstiefe steigert Gedächtnisleistung, gedankliche Kontrolle und Anstrengung (kritischere Auseinandersetzung); oberflächliche Verarbeitung nutzt wiederkehrende Stimuli und involviert Konsumenten gering.',
  },

  // ---- Kapitel 6 ----
  {
    id: 'c-selbstkonzept', chapterId: 'k6', term: 'Selbstkonzepttheorie',
    definition: 'Die komplexe Kombination von Motiven, Gefühlen, Werten, Wissen und Zielen bestimmt die Persönlichkeit einer Person. Selbstkonzept = Selbstbild + Weltbild; Produkte müssen mit dem Lebensstil in Einklang gebracht werden.',
  },
  {
    id: 'c-wert', chapterId: 'k6', term: 'Wert',
    definition: 'Konsistentes System von Einstellungen in Kombination mit normativer Verbindlichkeit. Für detaillierte Verhaltensprognosen eher ungeeignet, schwer beeinflussbar; im Marketing für Wertesegmentierung/Wertedynamik genutzt.',
  },
  {
    id: 'c-bigfive', chapterId: 'k6', term: 'Big-Five-Modell',
    definition: 'Persönlichkeit hat 5 kulturunabhängige Dimensionen: Extraversion, Verträglichkeit, Gewissenhaftigkeit, Neurotizismus (analog emotionale Stabilität) und Offenheit für Erfahrungen.',
    mnemonic: 'OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
  },
  {
    id: 'c-involvement', chapterId: 'k6', term: 'Involvement',
    definition: 'Grad der Beteiligung an der Informationsverarbeitung; beschreibt die Motivation. Low Involvement = niedrige kognitive/emotionale Aktivität (z. B. Einwegfeuerzeug), High Involvement = hohe Aktivität (z. B. Photovoltaikanlage). Auch situative Faktoren wirken.',
    examRelevance: 'Grundlage der Kaufentscheidungsarten-Matrix (Kapitel 7).',
  },
  {
    id: 'c-gruppen', chapterId: 'k6', term: 'Primäre / sekundäre Gruppen & Referenzgruppen',
    definition: 'Primäre Gruppen sind persönlich und nahestehend (Familie), sekundäre größer und entfernter (Verein, Partei). Fremdgruppen fungieren als reale oder imaginäre Referenz-/Bezugsgruppen: Individuen adaptieren Gruppenverhalten und vermeiden Ausgrenzung; manche grenzen sich demonstrativ ab.',
  },
  {
    id: 'c-meinungsfuehrer', chapterId: 'k6', term: 'Meinungsführer',
    definition: 'Eine Person, die uns stark beeinflussen kann; Gruppen wirken über Mund-zu-Mund-Propaganda signifikant auf Kaufentscheidungen.',
    synonyms: ['Mund-zu-Mund-Propaganda', 'Word of Mouth'],
  },
  {
    id: 'c-kaufrollen', chapterId: 'k6', term: 'Rollen im Kaufentscheidungsprozess',
    definition: 'Bei komplexen Kaufentscheidungen: Initiator, Beeinflusser, Entscheider, Käufer, Nutzer.',
    example: 'Tochter (Initiator), Onkel (Beeinflusser), Vater (Entscheider), Mutter (Käufer), Sohn (Nutzer).',
    examRelevance: 'Zuordnungsklassiker – Rollen an einem Familienbeispiel erkennen.',
  },
  {
    id: 'c-lebensstil', chapterId: 'k6', term: 'Lebensstil & Lifestylesegmentierung',
    definition: 'Individuelle und kollektive Orientierung an Werten und Zielen – Kombination aus Persönlichkeit/Demografie und Kultur. Lifestylesegmentierung gliedert den Markt wegen des erwarteten Zusammenhangs zwischen Lebensstil und Konsumentenverhalten.',
  },
  {
    id: 'c-vals', chapterId: 'k6', term: 'VALS-II & AIO-Konzept',
    definition: 'Segmentierungsansätze: VALS-II teilt Konsumenten in Lebensstilgruppen (u. a. Actualizers, Achievers, Experiencers, Strugglers) nach Ressourcen und Orientierung; das AIO-Konzept segmentiert nach Activities, Interests, Opinions (westlich orientiert, keine universelle Aussage).',
    synonyms: ['Sinus-Milieus'],
  },
  {
    id: 'c-haushalt', chapterId: 'k6', term: 'Haushalt & Familie (autokratisch/synkratisch)',
    definition: 'Kaufentscheidungen im Haushalt erfolgen autokratisch (eine Person) oder synkratisch (gemeinsam); der Familienlebenszyklus liefert Segmentierungsrückschlüsse (z. B. mit Kind weniger Geld verfügbar).',
    confusableWith: [],
    mnemonic: 'Autokratisch = allein (Auto-), synkratisch = zusammen (syn-).',
  },
  {
    id: 'c-soziale-schicht', chapterId: 'k6', term: 'Soziale Schicht & Subkultur',
    definition: 'Soziale Schicht = Menschen mit gleichem/sehr ähnlichem Status; Subkulturen = abgegrenzte Bevölkerungsgruppen (z. B. Alter, ethnische Herkunft). Kulturelle Einflussgrößen sind die schwächsten Einflussgrößen auf das Konsumentenverhalten.',
  },
  {
    id: 'c-ethnomarketing', chapterId: 'k6', term: 'Ethnomarketing',
    definition: 'Anpassung des Marketing-Mix an ethnische Minderheiten (z. B. Werbung in anderer Sprache, Zertifizierungen wie Halal). Umstritten: Kann Integration verhindern oder fördern.',
  },
  {
    id: 'c-hofstede', chapterId: 'k6', term: 'Kulturdimensionen nach Hofstede',
    definition: 'Dimensionen zur Operationalisierung von Kultur, u. a. Machtdistanz, Unsicherheitsvermeidung, Männlichkeit/Weiblichkeit, Individualisierung. Kultur = übereinstimmende Muster in Denken, Fühlen und Handeln; Mythen und Rituale wirken stark auf das Konsumentenverhalten.',
  },
  {
    id: 'c-microtargeting', chapterId: 'k6', term: 'Microtargeting',
    definition: 'Profilanalyse von Personen für eine genaue Zielansprache durch individuelle Botschaften – zentrale digitale Einflussgröße.',
  },

  // ---- Kapitel 7 ----
  {
    id: 'c-kaufarten', chapterId: 'k7', term: 'Arten der Kaufentscheidung',
    definition: 'Impulsiv (Reiz größtenteils ohne Kognition), habitualisiert (Gewohnheitskauf, „Autopilot“, wenig Alternativen), limitiert (höhere kognitive Komponente, Auswahl mehrerer Alternativen mit vorhandenem Wissen) und extensiv (Suchkauf: stark emotional und kognitiv involviert, intensiver Informationssuchprozess).',
    examRelevance: 'Häufig als Matrix nach emotionalem und kognitivem Involvement geprüft.',
    mnemonic: 'Impulsiv: Emotion hoch/Kognition niedrig. Extensiv: beides hoch. Habitualisiert: beides niedrig. Limitiert: Kognition hoch/Emotion niedrig.',
  },
  {
    id: 'c-problemerkenntnis', chapterId: 'k7', term: 'Problemerkenntnis',
    definition: 'Zentraler Startpunkt der Vorkaufphase: Soll- und Istzustand weichen ab. Entweder entsteht ein Bedarf (Idealzustand wiederherstellen) oder Gelegenheiten verschieben den Idealzustand nach oben. Die Differenz muss groß genug sein, um als Problem wahrgenommen zu werden; Probleme können offensichtlich oder versteckt sein.',
  },
  {
    id: 'c-informationssuche', chapterId: 'k7', term: 'Informationssuche',
    definition: 'Beabsichtigt oder unabsichtlich; beginnt mit internen (Gedächtnis) und externen Quellen. Externe Suche hängt u. a. von Kaufrisiko, Zeitbudget, kognitiven Fähigkeiten und Beschaffungsaufwand ab; die Intensität korreliert stark mit Komplexität und Risiko der Kaufentscheidung (finanziell, funktionell, physisch, sozial, psychologisch).',
  },
  {
    id: 'c-evoked-set', chapterId: 'k7', term: 'Evoked Set',
    definition: 'Die Menge der dem Konsumenten bekannten Alternativen.',
    confusableWith: ['Consideration Set'],
    mnemonic: 'Evoked = alles, was einem einfällt; Consideration = die engere Auswahl daraus.',
  },
  {
    id: 'c-consideration-set', chapterId: 'k7', term: 'Consideration Set',
    definition: 'Die engere Auswahl der aus dem Evoked Set gewählten Alternativen, die tatsächlich in Frage kommen.',
    confusableWith: ['Evoked Set'],
  },
  {
    id: 'c-kaufphase', chapterId: 'k7', term: 'Kaufphase',
    definition: 'Folgt nach der Evaluation: 1. Alternativenidentifikation, 2. Intentionsentwicklung, 3. Kauf (bei Impulskäufen keine Alternativenidentifikation). Zwischen Intention und Kauf wirken Marketing- und neutrale Stimuli beschleunigend oder bremsend; auch Verkäuferaussagen (z. B. Lieferengpass) wirken.',
  },
  {
    id: 'c-pos', chapterId: 'k7', term: 'Point of Sale (POS)',
    definition: 'Verkaufsort; optimierbar über einfache/schnelle Kaufabwicklung, Transparenz, Zahlungsmöglichkeiten, Verkaufsförderung (Coupons) und erlebnisorientierte Gestaltung. POS-Aktivitäten: Verkaufsraumgestaltung, Verkaufsgespräch (verbal + nonverbal), Verbundkäufe/Cross-Buyings (Up-Sell), Services.',
  },
  {
    id: 'c-customer-journey', chapterId: 'k7', term: 'Digitaler Konsument & Customer Journey',
    definition: 'Der digitale Konsument ist durch Recherchemöglichkeiten oft versierter als der Verkäufer. Die Customer Journey ist wesentlich komplexer als analog (Suchdienste, Preisvergleichsportale), kann sich über Wochen ziehen; Multi-Channel-Kunden müssen offline und online zu unterschiedlichen Zeiten erreicht werden.',
  },
  {
    id: 'c-nachkaufphase', chapterId: 'k7', term: 'Nachkauf- und Nutzungsphase',
    definition: 'Ablauf: 1. Konsum, 2. Evaluierung (Vergleich erwartete vs. tatsächliche Leistung → Zufriedenheit, Unzufriedenheit oder Indifferenz), 3. ggf. Beschwerde, 4. Entsorgung (entsorgen, tauschen, verschenken, verkaufen). Nimmt für langfristige Kundenbeziehungen die „Pole-Position“ ein.',
  },
  {
    id: 'c-beschwerde', chapterId: 'k7', term: 'Beschwerde',
    definition: 'Konsumenten erwarten Verhaltensänderung und/oder Entschädigung aufgrund einer subjektiv empfundenen Schädigung. Nicht mit Reklamation zu verwechseln – auf Beschwerden müssen Unternehmen nicht rechtlich eingehen.',
    confusableWith: ['Reklamation'],
  },
  {
    id: 'c-gabor-granger', chapterId: 'k7', term: 'Gabor-Granger-Methode',
    definition: 'Direkte Preisbestimmungsmethode: Probanden erhalten 5 Preispunkte eines Produkts und geben auf einer fünfstufigen Skala ihre Kaufbereitschaft an. Übertragen in ein Koordinatensystem (Kaufwahrscheinlichkeit/Preis) zeigt der stärkste Kurvenabfall den optimalen Preis.',
    confusableWith: ['Van-Westendorp-Methode'],
  },
  {
    id: 'c-van-westendorp', chapterId: 'k7', term: 'Van-Westendorp-Methode (Price-Sensitivity-Meter)',
    definition: 'Erweitert Gabor-Granger um vier Fragen zur Preisbereitschaft: zu günstig, angemessen, gerade noch akzeptabel, zu teuer. Preisuntergrenze = Schnittpunkt „zu günstig“ × „relativ hoch“; Preisobergrenze = Schnittpunkt „noch akzeptabel“ × „zu teuer“; dazwischen liegt der akzeptable Bereich.',
    confusableWith: ['Gabor-Granger-Methode'],
    synonyms: ['PSM', 'Price Sensitivity Meter'],
  },
  {
    id: 'c-vickrey', chapterId: 'k7', term: 'Vickrey-Auktion & Conjoint-Analyse',
    definition: 'Indirekte Preisbestimmungsmethoden: Bei der Vickrey-Auktion schreiben Teilnehmer verdeckt ihren Höchstpreis auf (Höchstbietender erhält das Produkt). Die Conjoint-Analyse definiert Produkte als Bündel von Eigenschaftsausprägungen (Preis, Qualität, Marke); aus Rangreihungen wird der Nutzenbeitrag einzelner Eigenschaften berechnet und der optimale Preis abgeleitet.',
  },
  {
    id: 'c-primacy-preis', chapterId: 'k7', term: 'Preiswahrnehmung (Primacy-Effekt)',
    definition: 'Zahlen nach dem Komma werden gemäß Primacy-Effekt schwächer wahrgenommen – gebrochene Preise (z. B. 10,99) wirken günstiger als volle.',
  },

  // ---- Kapitel 8 ----
  {
    id: 'c-erfolgskette', chapterId: 'k8', term: 'Erfolgskette der Kundenorientierung',
    definition: 'Kundenorientierung → Kundenzufriedenheit → Kundenbindung → Kundenwert; moderiert durch unternehmensexterne und unternehmensinterne Faktoren.',
    examRelevance: 'Reihenfolge der Kette + moderierende Faktoren.',
    mnemonic: 'O-Z-B-W: Orientierung, Zufriedenheit, Bindung, Wert.',
  },
  {
    id: 'c-kundenorientierung', chapterId: 'k8', term: 'Kundenorientierung',
    definition: 'Unternehmensaktivitäten an Wünschen und Bedürfnissen der Kunden ausrichten, um langfristige, profitable Kundenbeziehungen zu generieren – genährt durch Relationship-Marketing; Beziehungen mit dem höchsten Kundenwert werden besonders gefördert.',
  },
  {
    id: 'c-kundenzufriedenheit', chapterId: 'k8', term: 'Kundenzufriedenheit',
    definition: 'Voraussetzung für langfristigen Kundenwert; wirkt über Wiederkäufe, Cross-Buyings, geringere Preissensibilität und positive Mund-zu-Mund-Propaganda auf den Unternehmenserfolg.',
  },
  {
    id: 'c-nachkaufdissonanz', chapterId: 'k8', term: 'Nachkaufdissonanzen',
    definition: 'Störgefühle/Zweifel nach dem Kauf (z. B. neue Kleidung wird belächelt, finanzielle Lage wird bewusst). Käufer mildern sie durch Bestätigung der Entscheidung (Testberichte) oder Rückgängigmachen des Kaufs. Unternehmen handeln proaktiv: Rückgabemöglichkeit, gratulierendes Begleitmaterial; manchmal werden Dissonanzen bewusst verstärkt, um zu neuen Produkten zu animieren.',
    synonyms: ['kognitive Dissonanz'],
  },
  {
    id: 'c-beschwerdemanagement', chapterId: 'k8', term: 'Beschwerdemanagement',
    definition: 'Auftretende Kundenbeschwerden als Chance nutzen, um Kundenzufriedenheit wiederherzustellen.',
  },
  {
    id: 'c-kundenbindung', chapterId: 'k8', term: 'Kundenbindung',
    definition: 'Positive Einstellung hinsichtlich der Bereitschaft künftiger Transaktionen – loyales Verhalten gegenüber dem Anbieter. Formen: bedingte Kundenloyalität (freiwillig), oberflächliche Loyalität (ausschließliche Wiederkäufer, auch Zwang wie Abos), Commitment (langfristige Beziehung, hohe Unzufriedenheitstoleranz).',
    confusableWith: ['Kundenloyalität', 'Commitment'],
  },
  {
    id: 'c-bindungsebenen', chapterId: 'k8', term: 'Ebenen der Kundenbindung',
    definition: 'Drei separate Ebenen: Organisations-/Unternehmensebene (v. a. B2B, z. B. Verzahnung von Arbeitsabläufen), Personenebene (v. a. Dienstleistungen, z. B. Friseur), Leistungsebene (Austauschleistung und ihre Vorteile; für Konsumgüterhersteller oft die einzige Ebene).',
  },
  {
    id: 'c-variety-seeking', chapterId: 'k8', term: 'Variety Seeking',
    definition: 'Kunden neigen bei niedrigem Involvement trotz fehlender Unzufriedenheit dazu, den Anbieter zu wechseln, weil sie nach Abwechslung streben. Wird durch externe Einflüsse wie Kaufrisiko oder Alternativenanzahl bestimmt.',
    examRelevance: 'Wichtiges Konzept: Wechsel ohne Unzufriedenheit!',
  },
  {
    id: 'c-kundenwert', chapterId: 'k8', term: 'Kundenwert',
    definition: 'Aus Unternehmenssicht: Beitrag des Kunden zum Erreichen monetärer und nicht-monetärer Ziele (z. B. Feedback). Aus Nachfragersicht: Leistungswert (Funktionsumfang, Preis), Markenwert (Image, symbolische Assoziationen) und Beziehungswert (Wertschätzung, Kommunikation).',
  },

  // ---- Kapitel 9 ----
  {
    id: 'c-dl-dimensionen', chapterId: 'k9', term: 'Dimensionen der Dienstleistung',
    definition: 'Potenzialdimension (Leistungsfähigkeit des Anbieters, tangible und intangible Faktoren), Prozessdimension (Einbeziehung interner und externer Faktoren) und Ergebnisdimension (Immaterialität der Leistung – weder transport- noch lagerfähig).',
  },
  {
    id: 'c-4ls', chapterId: 'k9', term: 'Leistungstypologien (4 Ls)',
    definition: 'Dienstleistungen werden nach vier Merkmalen typologisiert: Integration, Interaktion, Individualisierung und Immaterialität – von Mass Services (z. B. Reinigung) über Professional Services (z. B. Friseur) bis Speciality Services (z. B. Rechtsberatung).',
    mnemonic: '4 Ls: Integration, Interaktion, Individualisierung, Immaterialität – alle mit I, aber „Leistungstypologie“.',
  },
  {
    id: 'c-beurteilungsproblematik', chapterId: 'k9', term: 'Beurteilungsproblematik',
    definition: 'Die Qualität einer Dienstleistung ist vor dem Kauf schwer einschätzbar – besonders bedeutend in der Vorkonsumphase. Sucheigenschaften (Testergebnisse, Preise, Ausstattung) helfen, auf das Ergebnis zu schließen; bei Spezialdienstleistern (Arzt) ist Vertrauen besonders relevant.',
  },
  {
    id: 'c-konsumphasen', chapterId: 'k9', term: 'Konsumphasenmodell (Dienstleistungen)',
    definition: '1. Vorkonsumphase (Problemerkenntnis, Informationssuche, Evaluation), 2. Konsumphase (Interaktionsprozess; mehr wahrgenommene Kontrolle → bessere Bewertung; „Never change a running system“), 3. Nachkonsumphase (Bewertung nach Einzelmerkmalen, Leistungsbereichen oder gesamt).',
  },
  {
    id: 'c-service-erfolgskette', chapterId: 'k9', term: 'Service-Erfolgskette',
    definition: 'Aktivitäten des Dienstleistungsmarketings → psychologische Wirkungen (Kundenzufriedenheit, Image, Qualitätswahrnehmung, Beziehungsqualität, Commitment, Risikowahrnehmung) → Verhaltenswirkungen (Kundenbindung, (Wieder-)Kauf, Weiterempfehlung, Zusatzkauf) → ökonomischer Erfolg. Die Komponenten beeinflussen sich gegenseitig im Zeitverlauf.',
  },
  {
    id: 'c-qualitaetswahrnehmung', chapterId: 'k9', term: 'Qualitätswahrnehmung',
    definition: 'Dem Konstrukt der Kundenzufriedenheit ähnlich, aber weniger auf die einzelne Transaktion und eher auf globaler Ebene bezogen. Dreiecksverhältnis: Kunde, Dienstleister und Konkurrenz beeinflussen die Dienstleistungsqualität.',
    confusableWith: ['Kundenzufriedenheit'],
  },
  {
    id: 'c-beziehungsqualitaet', chapterId: 'k9', term: 'Beziehungsqualität & Commitment',
    definition: 'Wie der Kunde die Beziehung wahrnimmt (Vertrautheit in Unternehmen und Prozesse) – z. B. verzeiht man einem Kellner, der einen kennt, eher einen Fehler. Commitment stellt eine hohe psychologische Wechselbarriere dar.',
  },
  {
    id: 'c-risikowahrnehmung', chapterId: 'k9', term: 'Risikowahrnehmung bei Dienstleistungen',
    definition: 'Beim Dienstleistungserwerb ist das gefühlte Risiko oft höher als bei Sachgütern – Anbieter sollten proaktiv Risiko minimieren, z. B. Garantien für Vertrauen einsetzen.',
  },
  {
    id: 'c-segmentierungskriterien', chapterId: 'k9', term: 'Anforderungen an Segmentierungskriterien',
    definition: 'Messbarkeit, Kaufverhaltensrelevanz, Erreichbarkeit/Zugänglichkeit, Handlungsfähigkeit, Wirtschaftlichkeit, zeitliche Stabilität, Dienstleistungsbezug. Zeitliche Stabilität und Messbarkeit muss jedes Kriterium erfüllen, die übrigen nur der Gesamtkriterienkatalog.',
    examRelevance: 'Die Ausnahme-Regel (Stabilität + Messbarkeit für jedes Kriterium) wird gern geprüft.',
  },
  {
    id: 'c-benefit-segmentation', chapterId: 'k9', term: 'Benefit Segmentation',
    definition: 'Segmentierung nach Nutzenerwartungen der Konsumenten. Motive sind wegen unzureichender Messbarkeit eher ungeeignet; Lifestyle-Kriterien geeignet, wenn sonst hoher Messaufwand entsteht. Unterschieden werden konsumtive (Empfänger = Konsument) und investive (Empfänger = Unternehmen) Dienstleistungen.',
  },

  // ---- Kapitel 10 ----
  {
    id: 'c-org-kaufverhalten', chapterId: 'k10', term: 'Organisationales Kaufverhalten',
    definition: 'Entscheidungsprozess von der Bedarfserstellung bis zur Qualitätsbeurteilung, wenn Organisationen als Käufer auftreten (staatlich/nichtstaatlich). Kaufentscheidungen sind oft multipersonal und extensiv; Fehlentscheidungen haben größere Konsequenzen (z. B. Produktausfall).',
  },
  {
    id: 'c-b2b-charakteristika', chapterId: 'k10', term: 'Charakteristika organisationaler Kaufentscheidungen (B2B)',
    definition: 'Wenige Anbieter und Nachfrager; Bedarf von B2C-Märkten abhängig (derivativer Bedarf); stabile Marktpartnerschaften; langer Entscheidungsprozess; intensive Verhandlungen; kurze Absatzwege (häufig Direktvertrieb); hoher Individualisierungsgrad; hohe Imagebedeutung; multipersonale Entscheidungen.',
  },
  {
    id: 'c-geschaeftsbeziehungen', chapterId: 'k10', term: 'Phasen der Geschäftsbeziehung',
    definition: '1. Aufmerksamkeit, 2. Erkundung (Erwartungsaufbau, Verhandlungen), 3. Ausweitung (nach ersten positiven Abschlüssen), 4. Bindung, 5. Auflösung. Geschäftsbeziehungen sind das A und O organisationaler Kaufentscheidungen.',
    mnemonic: 'A-E-A-B-A: Aufmerksamkeit, Erkundung, Ausweitung, Bindung, Auflösung.',
  },
  {
    id: 'c-wiederkauf-arten', chapterId: 'k10', term: 'Arten der organisationalen Kaufentscheidung',
    definition: 'Identischer Wiederkauf (Routinekauf gleicher Produkte nach vergangenen Bestellungen), modifizierter Wiederkauf (Grundform bereits erfolgt, aber abgewandelt z. B. bei Preis oder Eigenschaften), Erstkauf (risikohaft, keine bisherigen Erfahrungen).',
    examRelevance: 'Die Arten der Konsumgütermärkte sind – bis auf die impulsive – auch organisational anwendbar.',
  },
  {
    id: 'c-prozessphasen-org', chapterId: 'k10', term: 'Prozessphasen organisationalen Kaufverhaltens',
    definition: '1. Problemerkennung, 2. Beschreibung des Bedarfs, 3. Festlegung der Produkt-/Dienstleistungseigenschaften, 4. Suche nach Lieferanten/Angeboten, 5. Einholung von Angeboten, 6. Auswahl der Lieferanten, 7. Festlegung des Bestellverfahrens, 8. Überprüfung von Qualität und Leistungsfähigkeit. (Bezieht sich auf Erstkäufe; Wiederkäufe verkürzt.)',
  },
  {
    id: 'c-buying-center', chapterId: 'k10', term: 'Buying Center',
    definition: 'Sammelbegriff für alle an einem Einkauf beteiligten Personen – keine eigene Abteilung. Rollen: u. a. Initiator, Beeinflusser, Informationsselektierer/Gatekeeper.',
    confusableWith: ['Einkaufsabteilung'],
    examRelevance: '„Keine eigene Abteilung“ ist die klassische Fangfrage.',
  },
  {
    id: 'c-org-determinanten', chapterId: 'k10', term: 'Determinanten des organisationalen Kaufprozesses',
    definition: 'Umweltdeterminanten (extern, z. B. Stand der Technik), innerorganisationale Determinanten (Ziele und Strukturen der Organisation), interpersonale und intrapersonale Determinanten (direkteste Einflüsse, z. B. Autorität, Stellung in der Hierarchie).',
  },
];
