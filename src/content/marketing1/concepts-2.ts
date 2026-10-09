import { Concept } from '@/lib/types';

/** Kapitel 2 – Produktpolitik (PDF S. 6–10). Definitionen eng am Skript. */
export const concepts2: Concept[] = [
  // ---------- 2.1 Begriffe der Produktpolitik (S. 6) ----------
  {
    id: 'mc-produktpolitik', chapterId: 'm2', term: 'Produktpolitik',
    definition: 'Fasst alle Entscheidungen zusammen, die die Gestaltung des Leistungsangebots eines Unternehmens betreffen (Bruhn 2016). Zentrale Frage: Was soll vermarktet werden?',
    context: 'Als eines der vier Ps ist die Produktpolitik das Herz des Marketingmix, denn ein zu vermarktendes Produkt ist die Grundvoraussetzung für jede Marketingtätigkeit.',
    examRelevance: 'Definition + Begründung, warum sie das „Herz“ des Marketingmix ist.',
  },
  {
    id: 'mc-produkt', chapterId: 'm2', term: 'Produkt',
    definition: 'Bündel von Attributen (Ausstattung, Funktionen, Nutzen und Verwendung), das ausgetauscht oder verwendet werden kann – alles, was ein Konsument in einem Austauschprozess zur Bedürfnisbefriedigung erhalten kann.',
    context: 'Produkte können materieller („berührbar“) und immaterieller Natur sein; auch Ideen (Liedtext, Melodie) und digitale Güter (In-Game-Items, Online-Coaching) können Produkte sein.',
    example: 'Materiell: Smartphone. Immateriell: das Streamen eines Liedes.',
  },
  {
    id: 'mc-leistungspolitik', chapterId: 'm2', term: 'Leistungspolitik',
    definition: 'Um die große Vielfalt materieller und immaterieller Produkte zu erfassen, wird oft der Begriff Leistungspolitik statt Produktpolitik verwendet.',
    context: 'Zur Leistungspolitik gehören neben der Kernleistung meist auch Zusatz- und Serviceleistungen; übergeordnetes Ziel ist, den Kundennutzen zu maximieren.',
    synonyms: ['Leistungsangebot'],
  },

  // ---------- Produktebenen nach Leistung (S. 6–7, Abbildung) ----------
  {
    id: 'mc-produktebenen-leistung', chapterId: 'm2', term: 'Produktebenen (nach Leistung)',
    definition: 'Zur Leistungspolitik gehören neben der Kernleistung meist auch Zusatz- und Serviceleistungen; übergeordnetes Ziel ist, den Kundennutzen zu maximieren. Die Abbildung unterscheidet Kernprodukt, reales Produkt und erweitertes Produkt.',
    context: 'In gesättigten Märkten unterscheiden sich Produkte oft nur geringfügig – Zusatzleistungen werden immer bedeutender, um sich aus Kundensicht vom Wettbewerb abzuheben.',
    example: 'Küche = Schränke/Geräte + Planung, Beratung, Lieferung, Montage, Garantie.',
  },
  {
    id: 'mc-kernprodukt', chapterId: 'm2', term: 'Kernprodukt',
    definition: 'Kernleistung des Produkts, d. h. die Befriedigung eines Bedürfnisses bzw. die Lösung eines Problems.',
    example: 'E-Bike: Ein Fahrrad ermöglicht Fortbewegung auf zwei Rädern; durch den Elektroantrieb wird das Fahren erleichtert.',
    confusableWith: ['Reales Produkt', 'Grundnutzen'],
  },
  {
    id: 'mc-reales-produkt', chapterId: 'm2', term: 'Reales Produkt',
    definition: 'Umsetzung des Kernprodukts in ein sichtbares, real kaufbares Produkt mit spezifischem Design, technischer Qualität, Funktionalitäten, Verpackung und Markennamen.',
    example: 'E-Bike: Rahmen mit integriertem Akku und Motor, verschiedene Unterstützungsstufen sowie ein Display zur Steuerung.',
    confusableWith: ['Kernprodukt', 'Erweitertes Produkt'],
  },
  {
    id: 'mc-erweitertes-produkt', chapterId: 'm2', term: 'Erweitertes Produkt',
    definition: 'Produkt mit allen Zusatzleistungen, z. B. Lieferung, Finanzierung, Garantie, Beratung, Installation, Service.',
    example: 'E-Bike: regelmäßige Software-Updates, Wartungsservices beim Fachhändler.',
    confusableWith: ['Reales Produkt', 'Augmentiertes Produkt'],
  },
  {
    id: 'mc-leistung-nutzen', chapterId: 'm2', term: 'Leistung vs. Nutzen',
    definition: 'Leistung ist das, was das Unternehmen bietet; Nutzen beschreibt, was der Kunde davon hat – Leistung führt meist zu Nutzen.',
    context: 'Es sind auch Leistungen ohne unmittelbaren Kundennutzen denkbar.',
    example: 'Die Pappverpackung einer Zahnpastatube kommt durch Stapelbarkeit eher dem Handel zugute als dem Kunden.',
    mnemonic: 'Leistung = Sicht des Anbieters, Nutzen = Sicht des Kunden.',
  },

  // ---------- Produktebenen nach Nutzen (S. 7, Abbildung) ----------
  {
    id: 'mc-grundnutzen', chapterId: 'm2', term: 'Grundnutzen',
    definition: 'Befriedigung des ursprünglichen Bedürfnisses.',
    context: 'Ein Produkt, das nur den Grundnutzen erfüllt, ist meist nicht akzeptabel.',
    example: 'Eine Hose bekleidet und wärmt (Grundnutzen), soll aber auch dem Anlass angemessen sein, gut sitzen und ein gutes Gefühl geben.',
    confusableWith: ['Zusatznutzen', 'Kernprodukt'],
  },
  {
    id: 'mc-zusatznutzen', chapterId: 'm2', term: 'Zusatznutzen',
    definition: 'Nutzen über den Grundnutzen hinaus: sozialer Nutzen / Geltungsnutzen (dem Anlass angemessen), Erbauungsnutzen (gut sitzen, der Figur schmeicheln) und emotionaler Nutzen (Marke, gutes Gefühl).',
    context: 'Die Zusatznutzen sind nicht an eine Reihenfolge gebunden und müssen nicht zwangsläufig vorhanden sein.',
    example: 'Hose: dem Anlass angemessen (Geltungsnutzen), gut sitzen (Erbauungsnutzen), Marke/gutes Gefühl (emotionaler Nutzen).',
    confusableWith: ['Grundnutzen'],
    synonyms: ['Geltungsnutzen', 'sozialer Nutzen', 'Erbauungsnutzen', 'emotionaler Nutzen'],
  },
  {
    id: 'mc-nutzenkategorien', chapterId: 'm2', term: 'Fünf Nutzenkategorien (Produktebenen nach Nutzen)',
    definition: 'Vom Nutzenstandpunkt aus ergeben sich fünf Kategorien – je mehr Nutzenkomponenten, desto höher die Kategorie: Grundnutzen, generisches Produkt, erwartetes Produkt, augmentiertes Produkt, potenzielles Produkt.',
    example: 'Hose: Grundnutzen (bekleiden und wärmen, ein ausreichend großes Stück Stoff) → generisch (Hosenbeine geschneidert) → erwartet (bequemer Sitz, gefälliges Design) → augmentiert (Markenname, wasserabweisend, Thermo, modisch) → potenziell (Extrafunktionalitäten, „smart clothing“).',
    examRelevance: 'Die fünf Stufen in der richtigen Reihenfolge mit dem Hosen-Beispiel erklären können.',
  },
  {
    id: 'mc-generisches-produkt', chapterId: 'm2', term: 'Generisches Produkt',
    definition: 'Zweite Nutzenkategorie über dem Grundnutzen: die grundlegende Ausführung des Produkts.',
    example: 'Hose: Hosenbeine geschneidert.',
  },
  {
    id: 'mc-erwartetes-produkt', chapterId: 'm2', term: 'Erwartetes Produkt',
    definition: 'Dritte Nutzenkategorie: Eigenschaften, die Kunden von dem Produkt erwarten.',
    example: 'Hose: bequemer Sitz und gefälliges Design.',
    confusableWith: ['Augmentiertes Produkt'],
  },
  {
    id: 'mc-augmentiertes-produkt', chapterId: 'm2', term: 'Augmentiertes Produkt',
    definition: 'Vierte Nutzenkategorie: zusätzliche Nutzenkomponenten über das Erwartete hinaus.',
    example: 'Hose: Markenname, wasserabweisend, Thermo, modisch.',
    confusableWith: ['Erwartetes Produkt', 'Erweitertes Produkt'],
  },
  {
    id: 'mc-potenzielles-produkt', chapterId: 'm2', term: 'Potenzielles Produkt',
    definition: 'Höchste Nutzenkategorie: mögliche Extrafunktionalitäten.',
    example: 'Hose: Extrafunktionalitäten, „smart clothing“.',
  },

  // ---------- Qualität (S. 7) ----------
  {
    id: 'mc-qualitaet', chapterId: 'm2', term: 'Qualität',
    definition: '„Gesamtheit der Bestandteile und Eigenschaften eines Produkts oder einer Dienstleistung, die sich auf seine Fähigkeit auswirken […] Bedürfnisse zu befriedigen“ (Kotler/Keller/Opresnik 2015).',
    context: 'Je höher die Qualität, desto höher in der Regel auch der Nutzen. Qualität kann objektiv (messbare Eigenschaften) oder subjektiv (gemessen an den Vorstellungen des Konsumenten) diskutiert werden.',
    examRelevance: 'Definition + objektive vs. subjektive Qualität + Qualitätsdimensionen.',
  },
  {
    id: 'mc-qualitaetsdimensionen', chapterId: 'm2', term: 'Qualitätsdimensionen',
    definition: 'Nach Meffert/Burmann/Kirchgeorg (2015): Gebrauchsnutzen (Funktioniert das Produkt wie erwartet?), Haltbarkeit (Lebensdauer?), Zuverlässigkeit (Wie wahrscheinlich versagt es?), Ausstattung (Welche Zusatzvorzüge?), Normgerechtigkeit (Werden Gütenormen eingehalten?), Ästhetik (Gefällt das Produkt?), Umwelt- und Sozialverträglichkeit (Ist das Produkt nachhaltig?).',
    mnemonic: 'Sieben Fragen von „Funktioniert es?“ bis „Ist es nachhaltig?“',
    examRelevance: 'Mindestens fünf Dimensionen mit Leitfrage nennen können.',
  },

  // ---------- Produkttypologisierung (S. 7–8) ----------
  {
    id: 'mc-guetertypen', chapterId: 'm2', term: 'Produkttypologisierung',
    definition: 'Kategorisierung von Produkten nach Unterscheidungsmerkmalen (Walsh/Deseniss/Kilian 2013): Materialität, Konsumentengruppe, Nutzungsdauer, Nutzungshäufigkeit und Kaufgewohnheit.',
    context: 'Die Kategorisierung hilft dem Begriffsverständnis und ist für die Auswahl passender Marketingstrategien bedeutsam (z. B. eigene Handbücher für Dienstleistungs-, B2B- oder Destinationsmarketing).',
    examRelevance: 'Alle fünf Merkmale mit jeweiligem Gegensatzpaar und Beispiel.',
    synonyms: ['Typologisierung', 'Gütertypen'],
  },
  {
    id: 'mc-sachgueter-dl', chapterId: 'm2', term: 'Sachgüter vs. Dienstleistungen (Materialität)',
    definition: 'Physisch berührbare Produkte sind Sachgüter; nicht materielle Produkte sind Dienstleistungen.',
    example: 'Sachgüter: Bleistift, Auto. Dienstleistungen: Haarschnitt, Ölwechsel, Steuererklärung.',
    synonyms: ['Sachgüter', 'Dienstleistungen', 'Materialität'],
  },
  {
    id: 'mc-konsum-invest', chapterId: 'm2', term: 'Konsumgüter (B2C) vs. Investitionsgüter (B2B)',
    definition: 'Unterscheidung nach Konsumentengruppe: Konsumgüter sind für Endkonsumenten zum privaten Gebrauch; Investitionsgüter für Unternehmen zum Weiterverkauf oder zur Verwendung.',
    context: 'Manche Produkte fallen in beide Kategorien.',
    example: 'Büromaterial gehört zu beiden Kategorien.',
    synonyms: ['Konsumgüter', 'Investitionsgüter'],
  },
  {
    id: 'mc-verbrauch-gebrauch', chapterId: 'm2', term: 'Verbrauchsgüter vs. Gebrauchsgüter',
    definition: 'Unterscheidung nach Nutzungsdauer: Verbrauchsgüter werden schnell aufgebraucht, Gebrauchsgüter länger benutzt.',
    example: 'Verbrauchsgut: Lebensmittel. Gebrauchsgut: Fahrrad.',
    synonyms: ['Verbrauchsgüter', 'Gebrauchsgüter', 'Nutzungsdauer'],
  },
  {
    id: 'mc-bedarf', chapterId: 'm2', term: 'Waren des täglichen vs. des aperiodischen Bedarfs',
    definition: 'Unterscheidung nach Nutzungshäufigkeit.',
    example: 'Zahnpasta (täglicher Bedarf) vs. Weihnachtsbäume (aperiodischer Bedarf).',
    synonyms: ['Nutzungshäufigkeit', 'aperiodischer Bedarf'],
  },
  {
    id: 'mc-kaufgewohnheit', chapterId: 'm2', term: 'Güter nach Kaufgewohnheit',
    definition: 'Unterscheidung nach Kaufgewohnheit: Convenience Goods, Shopping Goods, Specialty Goods und Unsought Goods.',
    examRelevance: 'Die vier Typen mit Definition und Skript-Beispiel abgrenzen; sie tauchen in der Distributionspolitik (Distributionsgrad) wieder auf.',
  },
  {
    id: 'mc-convenience', chapterId: 'm2', term: 'Convenience Goods',
    definition: 'Güter, die mühelos, ohne viel Aufwand und regelmäßig gekauft werden.',
    example: 'Shampoo, Brot.',
    confusableWith: ['Shopping Goods'],
  },
  {
    id: 'mc-shopping', chapterId: 'm2', term: 'Shopping Goods',
    definition: 'Güter, die seltener und mit mehr Such- und Vergleichsaufwand gekauft werden.',
    example: 'Kleidung, Möbel.',
    confusableWith: ['Convenience Goods', 'Specialty Goods'],
  },
  {
    id: 'mc-specialty', chapterId: 'm2', term: 'Specialty Goods',
    definition: 'Sonderprodukte mit einzigartigen Eigenschaften.',
    example: 'Antiquitäten, hochpreisige Modemarken.',
    confusableWith: ['Shopping Goods'],
  },
  {
    id: 'mc-unsought', chapterId: 'm2', term: 'Unsought Goods',
    definition: 'Güter, die nicht aktiv nachgefragt werden, weil sie unbekannt oder unattraktiv sind.',
    example: 'Versicherungen.',
  },

  // ---------- 2.2 Gestaltungsfelder der Produktpolitik (S. 8) ----------
  {
    id: 'mc-produktmanager', chapterId: 'm2', term: 'Produktmanager',
    definition: 'Treffen die produktpolitischen Entscheidungen; sie sind für Entwicklung und Führung der Produkte am Markt zuständig (Bruhn 2016).',
  },
  {
    id: 'mc-ziele-produktpolitik', chapterId: 'm2', term: 'Ziele der Produktpolitik',
    definition: 'Ökonomische Ziele (verkaufte Mengen, Ansprache bestimmter Segmente) oder psychologische Ziele (Image, Konsumenteneinstellungen).',
  },
  {
    id: 'mc-gestaltungsfelder', chapterId: 'm2', term: 'Drei Gestaltungsfelder der Produktpolitik',
    definition: 'Grundsätzliche (erstmalige) Produktgestaltung, Variation von Produkten mit der Zeit und Kombination von Produkten zu Produktprogrammen.',
    mnemonic: 'Gestalten – Verändern – Kombinieren.',
  },
  {
    id: 'mc-produktprogramm', chapterId: 'm2', term: 'Produktprogramm',
    definition: 'Gesamtheit aller Leistungen, die ein Anbieter zum Kauf bereitstellt.',
    synonyms: ['Portfolio', 'Sortiment'],
  },
  {
    id: 'mc-produktgestaltung', chapterId: 'm2', term: 'Produktgestaltung',
    definition: 'Entwickelt die Gesamtheit von Kern- und Zusatzleistungen, um Kundenbedürfnisse zu befriedigen; umfasst technisch-funktionale Eigenschaften, Produktdesign, Produktverpackung, Qualitätsmanagement und Servicepolitik.',
    example: 'Pampers von Procter & Gamble.',
    examRelevance: 'Die fünf Gestaltungsaspekte jeweils mit Leitfrage und Pampers-Beispiel.',
  },
  {
    id: 'mc-technisch-funktional', chapterId: 'm2', term: 'Technisch-funktionale Eigenschaften',
    definition: 'Aspekt der Produktgestaltung: Wie kann der Kernnutzen bereitgestellt werden?',
    example: 'Pampers: Material, das saugstark und zugleich sanft ist.',
  },
  {
    id: 'mc-produktdesign', chapterId: 'm2', term: 'Produktdesign',
    definition: 'Aspekt der Produktgestaltung: Wie ist das Produkt äußerlich durch Farbe, Form usw. gestaltet?',
    example: 'Pampers: Schnitt, Farben, Muster.',
  },
  {
    id: 'mc-verpackung', chapterId: 'm2', term: 'Produktverpackung',
    definition: 'Aspekt der Produktgestaltung: Eine gute Verpackung sollte das Produkt (1) schützen, (2) werblich anpreisen, (3) anwenderfreundlich sowie (4) möglichst leicht und ökologisch sinnvoll zu entsorgen sein.',
    mnemonic: 'Schützen – Anpreisen – Anwenden – Entsorgen.',
  },
  {
    id: 'mc-qualitaetsmanagement', chapterId: 'm2', term: 'Qualitätsmanagement',
    definition: 'Aspekt der Produktgestaltung: Wie können die funktional-technischen Eigenschaften dauerhaft gesichert werden? Dient der Optimierung von Arbeitsabläufen und Prozessen.',
  },
  {
    id: 'mc-servicepolitik', chapterId: 'm2', term: 'Servicepolitik',
    definition: 'Aspekt der Produktgestaltung: Sollen weitere Serviceleistungen wie Garantien, Lieferung, Kundendienst oder Value Added Services angeboten werden?',
    example: 'Pampers-Onlinebabyratgeber, Schwangerschaftstipps.',
    synonyms: ['Value Added Services'],
  },
  {
    id: 'mc-serviceleistungen', chapterId: 'm2', term: 'Serviceleistungen',
    definition: '„Immaterielle, die Primärleistung unterstützende oder eigenständige Leistungen, die den Kundennutzen steigern“ (Bruhn 2016).',
  },

  // ---------- Produktpolitische Entscheidungen im Lebenszyklus (S. 8–9) ----------
  {
    id: 'mc-produktvariation', chapterId: 'm2', term: 'Produktvariation',
    definition: 'Bewusste Veränderung von Nutzenkomponenten – die Basisfunktion bleibt bestehen, während Design, Farbe, Geschmack etc. variiert werden.',
    context: 'Nötig, wenn sich Kundenbedürfnisse ändern oder die Marktposition verteidigt werden muss (Walsh/Deseniss/Kilian 2013).',
    confusableWith: ['Produktdifferenzierung'],
    mnemonic: 'Variation = Veränderung des bestehenden Produkts.',
  },
  {
    id: 'mc-produktdiff', chapterId: 'm2', term: 'Produktdifferenzierung',
    definition: 'Abgewandelte Versionen sprechen neue Marktsegmente an – anders als bei der Variation erweitert sich das Produktprogramm, denn beide Varianten werden angeboten.',
    confusableWith: ['Produktvariation'],
    mnemonic: 'Differenzierung = beide Versionen bleiben → Programm wird breiter/tiefer.',
  },
  {
    id: 'mc-produktelimination', chapterId: 'm2', term: 'Produktelimination',
    definition: 'Dient ein Produkt den Unternehmenszielen nicht mehr, wird es aus dem Angebot entfernt.',
  },

  // ---------- Produktportfoliomanagement (S. 9) ----------
  {
    id: 'mc-portfoliomanagement', chapterId: 'm2', term: 'Produktportfoliomanagement',
    definition: 'Steuert die Marketingziele aller Produkte/Marken im Portfolio und verteilt die Ressourcen entsprechend; auch Sortimentserweiterung und -bereinigung gehören dazu.',
  },
  {
    id: 'mc-programmbreite', chapterId: 'm2', term: 'Programmbreite',
    definition: 'Definiert durch die Anzahl der Produktlinien.',
    confusableWith: ['Programmtiefe'],
    mnemonic: 'Breite = wie viele Linien (nebeneinander).',
  },
  {
    id: 'mc-programmtiefe', chapterId: 'm2', term: 'Programmtiefe',
    definition: 'Beschreibt die Zahl der Produkte pro Produktlinie.',
    confusableWith: ['Programmbreite'],
    mnemonic: 'Tiefe = wie viele Produkte je Linie (untereinander).',
  },
  {
    id: 'mc-produktlinie', chapterId: 'm2', term: 'Produktlinie',
    definition: 'Gruppe von Produkten, die bestimmte Kriterien gemeinsam haben.',
    example: 'Procter & Gamble: Produktlinien Baby- und Damenhygiene (Always, Pampers), Schönheitspflege (Olaz, Herbal Essences), Wasch- und Reinigungsmittel (Ariel, Lenor), Gesundheit und Rasur (blend-a-dent, Wick).',
  },
  {
    id: 'mc-programmstruktur', chapterId: 'm2', term: 'Leitlinien der Programmstruktur',
    definition: 'Ausrichtung der Programmstruktur (Walsh/Deseniss/Kilian 2013) am Material oder der Herkunft der Güter, an bestimmten Preislagen oder an Bedarfskreisen.',
    example: 'Material/Herkunft: Kraft Heinz Company (Lebensmittel). Preislagen: LVMH (heterogenes Markenprogramm zu sehr hohen Preisen). Bedarfskreise: Procter & Gamble (Bedarfsfeld Hygiene).',
  },

  // ---------- 2.3 Innovationsmanagement (S. 9–10) ----------
  {
    id: 'mc-innovationsmgmt', chapterId: 'm2', term: 'Innovationsmanagement',
    definition: 'Bewusste Gestaltung eines Innovationssystems zur Entwicklung von Neuprodukten und die damit verbundenen Veränderungen in einem Unternehmen – heute Voraussetzung für wirtschaftlichen Erfolg.',
    example: 'Kodak: Die erste Digitalkamera wurde 1975 von einem Kodak-Mitarbeiter erfunden, jedoch nicht als Strategie verfolgt – 2012 Insolvenz. Kodak hat die digitale Revolution nicht verschlafen, sondern bewusst vernachlässigt.',
  },
  {
    id: 'mc-lebenszyklus', chapterId: 'm2', term: 'Produktlebenszyklus',
    definition: 'Idealtypische Darstellung der Phasen, die ein Produkt von der Neueinführung bis zur Eliminierung durchläuft: Einführungs-, Wachstums-, Reife-, Sättigungs- und Verfallsphase.',
    context: 'Der Produktlebenszyklus nutzt hauptsächlich die Erklärungsvariable Zeit und erklärt deshalb Technologiesprünge nicht (→ S-Kurvenkonzept).',
    examRelevance: 'Alle fünf Phasen mit Merkmalen; Reifephase = höchste Erfahrungskurven- und Economies-of-Scale-Effekte.',
  },
  {
    id: 'mc-einfuehrungsphase', chapterId: 'm2', term: 'Einführungsphase',
    definition: 'Erste Phase des Produktlebenszyklus: hohe Investitionen, geringe Umsätze.',
    context: 'Typische Marketingaktivität laut Abbildung: Einführungsaktivitäten, um Nachfrage zu stimulieren.',
  },
  {
    id: 'mc-wachstumsphase', chapterId: 'm2', term: 'Wachstumsphase',
    definition: 'Zweite Phase des Produktlebenszyklus: überdurchschnittlicher Zuwachs – die Gewinnzone wird erreicht.',
    context: 'Typische Marketingaktivität laut Abbildung: Kampf um Marktanteile über Preis und Konditionen.',
  },
  {
    id: 'mc-reifephase', chapterId: 'm2', term: 'Reifephase',
    definition: 'Dritte Phase des Produktlebenszyklus: Der Markt dehnt sich weiter aus, die Wachstumsraten sinken; Erfahrungskurveneffekte und Economies of Scale sind am höchsten.',
    context: 'Typische Marketingaktivität laut Abbildung: Erhöhung der Werbeausgaben, Produktdifferenzierung.',
    confusableWith: ['Sättigungsphase'],
  },
  {
    id: 'mc-saettigungsphase', chapterId: 'm2', term: 'Sättigungsphase',
    definition: 'Vierte Phase des Produktlebenszyklus: Der Markt ist gesättigt, die Umsätze gehen zurück.',
    context: 'Typische Marketingaktivität laut Abbildung: Preissenkungen.',
    confusableWith: ['Reifephase', 'Verfallsphase'],
  },
  {
    id: 'mc-verfallsphase', chapterId: 'm2', term: 'Verfallsphase',
    definition: 'Letzte Phase des Produktlebenszyklus: kaum noch Bedarf, Umsatz stark rückläufig – Ende des Zyklus.',
    context: 'Typische Marketingaktivität laut Abbildung: Produkt wird nicht mehr unterstützt.',
  },
  {
    id: 'mc-erfahrungskurve', chapterId: 'm2', term: 'Erfahrungskurveneffekte',
    definition: 'Effizienzsteigerung dadurch, dass bereits Erfahrung im Markt und mit dem Produkt gesammelt wurde und auf dieser Basis Verbesserungen vorgenommen werden können.',
    context: 'In der Reifephase des Produktlebenszyklus am höchsten.',
    confusableWith: ['Economies of Scale'],
  },
  {
    id: 'mc-economies-of-scale', chapterId: 'm2', term: 'Economies of Scale',
    definition: 'Betriebsgrößenvorteile, z. B. günstigere Einkaufskonditionen durch Mengenrabatte oder sinkende Stückkosten wegen besserer Verwaltungskostenumlage.',
    context: 'In der Reifephase des Produktlebenszyklus am höchsten.',
    confusableWith: ['Erfahrungskurveneffekte', 'Kostendegression'],
    synonyms: ['Betriebsgrößenvorteile', 'Skaleneffekte'],
  },
  {
    id: 'mc-skurve', chapterId: 'm2', term: 'S-Kurvenkonzept',
    definition: 'Konzept nach Foster (1986) mit dem Ziel, das Innovationsmanagement für technologische Diskontinuitäten zu sensibilisieren. Grundidee: Jede Technologie stößt irgendwann zwangsläufig an eine Leistungsgrenze (bedingt durch Größe, Komplexität oder Materialeigenschaften) und wird deshalb durch eine neue Technologie ersetzt.',
    context: 'Abbildung: Leistungsfähigkeit der Technologie über den kumulierten Aufwendungen für Forschung und Entwicklung; alte und neue Technologie mit jeweiliger Grenze. Unternehmen müssen die Grenzen ihrer Technologien abschätzen, um auf Technologiesprünge vorbereitet zu sein – F&E sollte kontinuierlich neue Produkte entwickeln und vorbereiten.',
    confusableWith: ['Produktlebenszyklus'],
    examRelevance: 'Grundidee, Ursachen der Leistungsgrenze, Achsen der Abbildung und die Konsequenz für F&E.',
  },
  {
    id: 'mc-diskontinuitaet', chapterId: 'm2', term: 'Technologische Diskontinuität (Technologiesprung)',
    definition: 'Ablösung einer Technologie, die an ihre Leistungsgrenze stößt, durch eine neue Technologie – wird vom Produktlebenszyklus (Erklärungsvariable Zeit) nicht erklärt, wohl aber vom S-Kurvenkonzept.',
    synonyms: ['Technologiesprung', 'Leistungsgrenze'],
  },
  {
    id: 'mc-adoption', chapterId: 'm2', term: 'Adoptionsprozess',
    definition: 'Übernahme eines neuen Produkts, generell in fünf Phasen unterteilt: Aufmerksamkeit, Interesse, Bewertung, Versuch und Annahme.',
    context: 'Es braucht oft Zeit, bis neue Produkte akzeptiert werden.',
    example: 'Sony brachte 1981 die erste filmlose Kamera, doch es dauerte weitere 20 Jahre bis zum Massenmarkt.',
    confusableWith: ['Diffusionsprozess'],
    mnemonic: 'A-I-B-V-A: Aufmerksamkeit, Interesse, Bewertung, Versuch, Annahme.',
  },
  {
    id: 'mc-innovatoren', chapterId: 'm2', term: 'Innovatoren und frühe Adopter',
    definition: 'Hochinformierte Konsumenten mit großem Interesse am Produkt – heute oft als Tech-Blogger, YouTuber oder Fachexperten aktiv und damit einflussreiche Multiplikatoren (Influencer).',
    context: 'Die gezielte Ansprache dieser Gruppen ist äußerst wichtig, um den Diffusionsprozess von Produktinnovationen voranzutreiben (Rogers 2003).',
    synonyms: ['Frühadopter', 'Multiplikatoren'],
  },
  {
    id: 'mc-diffusion', chapterId: 'm2', term: 'Diffusionsprozess',
    definition: 'Beschreibt die kumulierte Adoption einer Neuerung im Zeitablauf.',
    context: 'Verlauf der Diffusionskurve: Zunächst übernehmen nur wenige das Produkt, dann steigt die Zahl der Neukäufer stark an, gegen Ende nimmt sie wieder ab. Anstieg in der Mitte: Das Produkt wird bekannter, Unsicherheit und Preise sinken, die Verfügbarkeit steigt, soziale Empfehlungen wirken. Verlangsamung am Schluss: Der Markt ist weitgehend gesättigt.',
    confusableWith: ['Adoptionsprozess'],
    mnemonic: 'Adoption = Weg des Einzelnen; Diffusion = Verbreitung im Markt über die Zeit.',
  },
  {
    id: 'mc-adopterkategorien', chapterId: 'm2', term: 'Adopterkategorien',
    definition: 'Einteilung der Übernehmer nach Adoptionszeit (Abbildung): Innovatoren (2,5 %), Frühadopter (13,5 %), frühe Mehrheit (34 %), späte Mehrheit (34 %), Nachzügler (16 %).',
    context: 'Auch die Skimmingstrategie der Preispolitik nutzt diese Einteilung: zuerst Innovatoren und Frühadopter, dann frühe und späte Mehrheit.',
    synonyms: ['frühe Mehrheit', 'späte Mehrheit', 'Nachzügler'],
  },
];
