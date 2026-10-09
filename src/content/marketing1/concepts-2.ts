import { Concept } from '@/lib/types';

/** Kapitel 2 – Produktpolitik (PDF S. 6–10). Definitionen eng am Skript. */
export const concepts2: Concept[] = [
  // ---------- 2.1 Begriffe der Produktpolitik (S. 6) ----------
  {
    id: 'mc-produktpolitik', chapterId: 'm2', term: 'Produktpolitik',
    definition: 'Fasst alle Entscheidungen zusammen, die die Gestaltung des Leistungsangebots eines Unternehmens betreffen (Bruhn 2016). Zentrale Frage: Was soll vermarktet werden?',
    context: 'Als eines der vier Ps ist die Produktpolitik das Herz des Marketingmix, denn ein zu vermarktendes Produkt ist die Grundvoraussetzung für jede Marketingtätigkeit.',
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
    id: 'mc-leistung-nutzen', chapterId: 'm2', term: 'Leistung vs. Nutzen',
    definition: 'Leistung ist das, was das Unternehmen bietet; Nutzen beschreibt, was der Kunde davon hat – Leistung führt meist zu Nutzen.',
    context: 'Es sind auch Leistungen ohne unmittelbaren Kundennutzen denkbar.',
    example: 'Die Pappverpackung einer Zahnpastatube kommt durch Stapelbarkeit eher dem Handel zugute als dem Kunden.',
  },

  // ---------- Produktebenen nach Nutzen (S. 7, Abbildung) ----------
  {
    id: 'mc-grundnutzen', chapterId: 'm2', term: 'Grundnutzen',
    definition: 'Befriedigung des ursprünglichen Bedürfnisses.',
    context: 'Ein Produkt, das nur den Grundnutzen erfüllt, ist meist nicht akzeptabel.',
    example: 'Eine Hose bekleidet und wärmt (Grundnutzen), soll aber auch dem Anlass angemessen sein, gut sitzen und ein gutes Gefühl geben.',
    confusableWith: ['Zusatznutzen', 'Produktebenen (nach Leistung)'],
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
    id: 'mc-nutzenkategorien', chapterId: 'm2', term: 'Produktebenen nach Nutzen (fünf Kategorien)',
    definition: 'Vom Nutzenstandpunkt aus ergeben sich fünf Kategorien – je mehr Nutzenkomponenten, desto höher die Kategorie: Grundnutzen, generisches Produkt, erwartetes Produkt, augmentiertes Produkt, potenzielles Produkt.',
  },

  // ---------- Qualität (S. 7) ----------
  {
    id: 'mc-qualitaet', chapterId: 'm2', term: 'Qualität',
    definition: '„Gesamtheit der Bestandteile und Eigenschaften eines Produkts oder einer Dienstleistung, die sich auf seine Fähigkeit auswirken […] Bedürfnisse zu befriedigen“ (Kotler/Keller/Opresnik 2015).',
    context: 'Je höher die Qualität, desto höher in der Regel auch der Nutzen. Qualität kann objektiv (messbare Eigenschaften) oder subjektiv (gemessen an den Vorstellungen des Konsumenten) diskutiert werden.',
  },
  {
    id: 'mc-qualitaetsdimensionen', chapterId: 'm2', term: 'Qualitätsdimensionen',
    definition: 'Nach Meffert/Burmann/Kirchgeorg (2015): Gebrauchsnutzen (Funktioniert das Produkt wie erwartet?), Haltbarkeit (Lebensdauer?), Zuverlässigkeit (Wie wahrscheinlich versagt es?), Ausstattung (Welche Zusatzvorzüge?), Normgerechtigkeit (Werden Gütenormen eingehalten?), Ästhetik (Gefällt das Produkt?), Umwelt- und Sozialverträglichkeit (Ist das Produkt nachhaltig?).',
  },

  // ---------- Produkttypologisierung (S. 7–8) ----------
  {
    id: 'mc-guetertypen', chapterId: 'm2', term: 'Produkttypologisierung',
    definition: 'Kategorisierung von Produkten nach Unterscheidungsmerkmalen (Walsh/Deseniss/Kilian 2013): Materialität, Konsumentengruppe, Nutzungsdauer, Nutzungshäufigkeit und Kaufgewohnheit.',
    context: 'Die Kategorisierung hilft dem Begriffsverständnis und ist für die Auswahl passender Marketingstrategien bedeutsam (z. B. eigene Handbücher für Dienstleistungs-, B2B- oder Destinationsmarketing).',
    synonyms: ['Typologisierung'],
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
    id: 'mc-gestaltungsfelder', chapterId: 'm2', term: 'Drei Gestaltungsfelder der Produktpolitik',
    definition: 'Grundsätzliche (erstmalige) Produktgestaltung, Variation von Produkten mit der Zeit und Kombination von Produkten zu Produktprogrammen.',
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
  },
  {
    id: 'mc-produktdiff', chapterId: 'm2', term: 'Produktdifferenzierung',
    definition: 'Abgewandelte Versionen sprechen neue Marktsegmente an – anders als bei der Variation erweitert sich das Produktprogramm, denn beide Varianten werden angeboten.',
    confusableWith: ['Produktvariation'],
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
  },
  {
    id: 'mc-programmtiefe', chapterId: 'm2', term: 'Programmtiefe',
    definition: 'Beschreibt die Zahl der Produkte pro Produktlinie.',
    confusableWith: ['Programmbreite'],
  },
  {
    id: 'mc-produktlinie', chapterId: 'm2', term: 'Produktlinie',
    definition: 'Gruppe von Produkten, die bestimmte Kriterien gemeinsam haben.',
    example: 'Abbildung im Skript: Produktlinien Baby- und Damenhygiene (Always, Pampers), Schönheitspflege (Olaz, Herbal Essences), Wasch- und Reinigungsmittel (Ariel, Lenor), Gesundheit und Rasur (blend-a-dent, Wick).',
  },
  {
    id: 'mc-programmstruktur', chapterId: 'm2', term: 'Leitlinien für die Ausrichtung der Programmstruktur',
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
    synonyms: ['Betriebsgrößenvorteile'],
  },
  {
    id: 'mc-skurve', chapterId: 'm2', term: 'S-Kurvenkonzept',
    definition: 'Konzept nach Foster (1986) mit dem Ziel, das Innovationsmanagement für technologische Diskontinuitäten zu sensibilisieren. Grundidee: Jede Technologie stößt irgendwann zwangsläufig an eine Leistungsgrenze (bedingt durch Größe, Komplexität oder Materialeigenschaften) und wird deshalb durch eine neue Technologie ersetzt.',
    context: 'Abbildung: Leistungsfähigkeit der Technologie über den kumulierten Aufwendungen für Forschung und Entwicklung; alte und neue Technologie mit jeweiliger Grenze. Unternehmen müssen die Grenzen ihrer Technologien abschätzen, um auf Technologiesprünge vorbereitet zu sein – F&E sollte kontinuierlich neue Produkte entwickeln und vorbereiten.',
    confusableWith: ['Produktlebenszyklus'],
  },
  {
    id: 'mc-adoption', chapterId: 'm2', term: 'Adoptionsprozess',
    definition: 'Übernahme eines neuen Produkts, generell in fünf Phasen unterteilt: Aufmerksamkeit, Interesse, Bewertung, Versuch und Annahme.',
    context: 'Es braucht oft Zeit, bis neue Produkte akzeptiert werden.',
    example: 'Sony brachte 1981 die erste filmlose Kamera, doch es dauerte weitere 20 Jahre bis zum Massenmarkt.',
    confusableWith: ['Diffusionsprozess'],
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
    confusableWith: ['Adoptionsprozess'],
  },
];
