import { Concept } from '@/lib/types';

/** Kapitel 5 – Distributionspolitik (PDF S. 20–24). Definitionen eng am Skript. */
export const concepts5: Concept[] = [
  // ---------- 5.1 Grundlagen der Distributionspolitik (S. 20) ----------
  {
    id: 'mc-distribution', chapterId: 'm5', term: 'Distributionspolitik (Vertriebspolitik)',
    definition: 'Bezieht sich auf die Verteilung von Leistungen von der Produktion zur Konsumption (Meffert/Burmann/Kirchgeorg 2015).',
    context: 'Der Erfolg hängt nicht nur von der Qualität der Leistungen, sondern auch von der Qualität der Vertriebskanäle ab – die besten Produkte nutzen wenig, wenn sie nicht kostengünstig und zeitnah bei den Konsumenten ankommen.',
    synonyms: ['Vertriebspolitik', 'Distribution', 'Place'],
  },
  {
    id: 'mc-vertriebsziele', chapterId: 'm5', term: 'Vertriebsziele',
    definition: 'Aufgabe des Vertriebs ist es, die Verfügbarkeit von Leistungen für die Kunden zu gewährleisten; drei Arten von Zielen werden parallel verfolgt: psychologische Ziele (einzigartiges, markentreues und positives Kauferlebnis), versorgungsorientierte Ziele (lückenlose Verfügbarkeit) und ökonomische Ziele (Absatzmenge, Preisniveau und Vertriebskosten optimieren).',
  },

  // ---------- Begriffe der Distributionspolitik (S. 20–21) ----------
  {
    id: 'mc-vertriebskanal', chapterId: 'm5', term: 'Vertriebskanal',
    definition: 'Gesamtheit aller Organisationen, die ein Produkt von seiner Herstellung bis hin zum Endverbraucher leiten und transportieren (Kotler/Keller/Opresnik 2015).',
    synonyms: ['Vertriebsweg', 'Distributionskanal', 'Absatzkanal'],
  },
  {
    id: 'mc-push-pull', chapterId: 'm5', term: 'Push-Strategie',
    definition: '„Drückt“ Produkte in den Handel, etwa durch Absatzförderungsmaßnahmen wie Rabatte, Boni oder Exklusivrechte.',
    context: 'In der Regel wenden Unternehmen Push- und Pull-Strategie gleichzeitig an.',
    confusableWith: ['Pull-Strategie'],
    synonyms: ['Push'],
  },
  {
    id: 'mc-pull', chapterId: 'm5', term: 'Pull-Strategie',
    definition: 'Erzeugt einen Nachfragesog: richtet sich direkt an die Endkunden, um durch Kommunikationsmaßnahmen ein positives Image zu schaffen (Social-Media-Kampagnen, Content Marketing, gute Platzierung in Suchmaschinen/SEO), das die Konsumenten ins Geschäft oder in den Onlineshop zieht.',
    context: 'Sinnvoll, wenn Kunden markentreu und stärker in den Kauf involviert sind. In der Regel wenden Unternehmen beide Strategien gleichzeitig an.',
    confusableWith: ['Push-Strategie'],
    synonyms: ['Pull', 'Nachfragesog'],
  },
  {
    id: 'mc-involvement', chapterId: 'm5', term: 'Involvement',
    definition: 'Man spricht von Involvement, wenn ein Konsument beim Produktkauf eine starke Beteiligung verspürt und viel Zeit in die Entscheidung investiert.',
    context: 'Bei stärker involvierten, markentreuen Kunden ist die Pull-Strategie sinnvoll.',
  },
  {
    id: 'mc-content-marketing', chapterId: 'm5', term: 'Content Marketing',
    definition: 'Gezielte Bereitstellung nützlicher Inhalte zur Kundenansprache und -bindung.',
    example: 'Blog mit Tipps, YouTube-Tutorials, Rezeptideen von Lebensmittelmarken.',
  },
  {
    id: 'mc-seo', chapterId: 'm5', term: 'Search Engine Optimization (SEO)',
    definition: 'Optimierung von Webseiten für höhere Sichtbarkeit und ein besseres Ranking in den Ergebnissen der Suchmaschinen wie etwa Google.',
    confusableWith: ['Search Engine Advertising (SEA)'],
    synonyms: ['Suchmaschinenoptimierung', 'SEO'],
  },

  // ---------- Wertschöpfung durch den Handel (S. 21–22) ----------
  {
    id: 'mc-intermediaere', chapterId: 'm5', term: 'Intermediäre',
    definition: 'Kaufen und verkaufen Sachgüter; sie bearbeiten diese zwar nicht weiter, verbinden sie aber oft mit relevanten Dienstleistungen.',
    synonyms: ['Handel'],
  },
  {
    id: 'mc-ueberbrueckung', chapterId: 'm5', term: 'Überbrückung von Lücken (Diskrepanzen)',
    definition: 'Handelsunternehmen steigern den Kundennutzen insbesondere durch die Überbrückung von Lücken (Diskrepanzen) zwischen Herstellung und Konsum: räumliche Überbrückung, zeitliche Überbrückung und Sortimentsgestaltung.',
    synonyms: ['Diskrepanzen'],
  },
  {
    id: 'mc-disintermediation', chapterId: 'm5', term: 'Disintermediation',
    definition: 'Trend zur Ausschaltung von Intermediären – geschieht oft, wenn sie keinen Zusatznutzen mehr bringen; weiterer Grund ist die Einsparung der Handelsmarge.',
    example: 'Durch E-Commerce verkaufen Hersteller direkt an Endverbraucher (D2C), z. B. Adidas oder „Social Brands“, die ausschließlich über Instagram verkaufen. Gegenbeispiel: Nordstrom Local – Café-Atmosphäre mit professioneller Stylistenberatung statt Kleiderständern; die zusammengestellten Outfits werden geliefert.',
    confusableWith: ['Vertikale Integration'],
  },
  {
    id: 'mc-vertikale-integration', chapterId: 'm5', term: 'Vertikale Integration',
    definition: 'Ein Unternehmen gliedert vor- oder nachgelagerte Wertschöpfungsstufen ein, die vormals von eigenständigen Akteuren erbracht wurden.',
    example: 'Edeka betreibt in Hamburg eine eigene Bananenreiferei – die Funktion wird nicht beseitigt, sondern integriert.',
    confusableWith: ['Disintermediation'],
  },

  // ---------- 5.2 Vertikale Gestaltung (S. 22) ----------
  {
    id: 'mc-vertriebsorgane', chapterId: 'm5', term: 'Vertriebsorgane',
    definition: 'Alle unternehmensinternen oder -externen Personen, Abteilungen oder Institutionen, die Vertriebsaktivitäten am Markt direkt durchführen oder unterstützen.',
  },
  {
    id: 'mc-vertikale-gestaltung', chapterId: 'm5', term: 'Vertikale Gestaltung des Vertriebssystems',
    definition: 'Betrachtet die verschiedenen Stufen möglicher Vertriebsorgane – also die Länge von Vertriebskanälen.',
    confusableWith: ['Horizontale Gestaltung des Vertriebssystems'],
  },
  {
    id: 'mc-direkt-indirekt', chapterId: 'm5', term: 'Direkter Vertrieb',
    definition: 'Das Unternehmen verkauft selbst direkt an Endkunden – organisiert durch unternehmensinterne Vertriebsorgane (z. B. Vertriebsinnen- und -außendienst); teils werden Absatzhelfer (Vertriebsagenturen, Logistikdienstleister) eingeschaltet, die aber nicht wirtschaftlich unabhängig sind.',
    context: 'Wird auch nullstufiger Vertriebsweg genannt. Stärken: enge Kundenbeziehung, Kontrolle, ungefilterte Kundeninformationen; Schwäche: hoher Aufwand.',
    example: 'Klassisch: Hofläden; durch E-Commerce auch eigene Onlineshops, Social-Commerce-Funktionen (z. B. Instagram) oder markeneigene Apps.',
    confusableWith: ['Indirekter Vertrieb'],
    synonyms: ['nullstufiger Vertriebsweg'],
  },
  {
    id: 'mc-indirekt', chapterId: 'm5', term: 'Indirekter Vertrieb',
    definition: 'Vertriebsaufgaben werden mit externen Marktakteuren geteilt. Werden unternehmensunabhängige, externe Vertriebsorgane mit einer wesentlichen akquisitorischen Funktion beauftragt, spricht man von indirektem Vertrieb (Homburg 2017).',
    context: 'Stärken: Arbeitsteilung und Marktkenntnis der Intermediäre; Schwächen: Handelsmargen, Abhängigkeit, weniger Kontrolle.',
    confusableWith: ['Direkter Vertrieb'],
    synonyms: ['indirekter Vertriebsweg'],
  },
  {
    id: 'mc-vertriebsagentur', chapterId: 'm5', term: 'Vertriebsagentur',
    definition: 'Externer Dienstleister, der die Aufgaben und Funktionen des Vertriebs übernimmt.',
  },
  {
    id: 'mc-vertragshaendler', chapterId: 'm5', term: 'Vertragshändler',
    definition: 'Rechtlich selbstständig, aber durch Verträge fest in die Vertriebsstrategie des Anbieters eingebunden.',
    example: 'Typisch für die Automobilbranche.',
    confusableWith: ['Franchising'],
  },
  {
    id: 'mc-franchising', chapterId: 'm5', term: 'Franchising',
    definition: 'Der Franchisenehmer übernimmt gegen Zahlung von Gebühren an den Franchisegeber ein bestehendes Franchisekonzept und setzt dieses vor Ort um.',
    context: 'Franchisepartner sind noch stärker gebunden als Vertragshändler: Der Anbieter hat gegenüber dem Franchisenehmer ein Weisungsrecht und darf dessen Verhalten und Ergebnisse kontrollieren.',
    example: 'Fast-Food-Restaurants.',
    confusableWith: ['Vertragshändler'],
    synonyms: ['Franchisepartner', 'Franchisenehmer', 'Franchisegeber'],
  },
  {
    id: 'mc-absatzhelfer-mittler', chapterId: 'm5', term: 'Absatzhelfer',
    definition: 'Handelsvertreter, Kommissionäre und Makler – sie erwerben im Gegensatz zu den Absatzmittlern KEIN Eigentum an den abzusetzenden Produkten.',
    context: 'Sie unterscheiden sich durch Tätigkeit (Abschluss oder Vermittlung von Verträgen), Dauer (ständig oder von Fall zu Fall) und Art des Vergütungsanspruchs (Fixum oder Provision).',
    example: 'Handelsvertreter (z. B. Kosmetikbranche), Kommissionäre (z. B. Antiquitäten), Makler (z. B. Immobilien, Versicherungen).',
    confusableWith: ['Absatzmittler'],
    synonyms: ['Handelsvertreter', 'Kommissionär', 'Makler'],
  },
  {
    id: 'mc-absatzmittler', chapterId: 'm5', term: 'Absatzmittler',
    definition: 'Groß- und Einzelhandel – erwerben (anders als Absatzhelfer) Eigentum an den Produkten. Der Großhandel verkauft in großen Mengen an gewerbliche Nachfrager; die Kunden des Einzelhandels sind private Endverbraucher.',
    confusableWith: ['Absatzhelfer'],
    synonyms: ['Großhandel', 'Einzelhandel'],
  },
  {
    id: 'mc-vertriebsweglaenge', chapterId: 'm5', term: 'Länge des Vertriebsweges',
    definition: 'Je mehr verschiedene Vertriebsorgane zwischen Hersteller und Endverbraucher stehen, desto länger ist der Vertriebsweg. Der direkte Vertrieb wird daher auch nullstufiger Vertriebsweg genannt.',
    context: 'Daneben existieren alternative Varianten und Mischformen wie Pop-up-Stores. Abbildung: einstufiger (Einzelhandel, z. B. Konsumgüter), zweistufiger (Groß- und Einzelhandel, z. B. Pharmaprodukte) und dreistufiger Vertriebsweg (Absatzhelfer, Groß- und Einzelhandel, z. B. exotische Früchte).',
    synonyms: ['nullstufig', 'einstufig', 'zweistufig', 'dreistufig', 'Pop-up-Store'],
  },

  // ---------- 5.3 Horizontale Gestaltung (S. 23–24) ----------
  {
    id: 'mc-horizontale-gestaltung', chapterId: 'm5', term: 'Horizontale Gestaltung des Vertriebssystems',
    definition: 'Bezieht sich auf die Zahl der unterschiedlichen Absatzmittler innerhalb der einzuschaltenden Absatzstufen – während die vertikale Gestaltung die Länge von Vertriebskanälen betrifft.',
    confusableWith: ['Vertikale Gestaltung des Vertriebssystems'],
  },
  {
    id: 'mc-breite', chapterId: 'm5', term: 'Breite des Vertriebssystems',
    definition: 'Hängt von der Zahl der gewählten Vertriebskanäle ab (Homburg 2017): Einkanalsystem, Mehrkanalvertrieb (Multichannel-Marketing) oder Omnichannel-Marketing.',
  },
  {
    id: 'mc-multi-omni', chapterId: 'm5', term: 'Mehrkanalvertrieb (Multichannel-Marketing)',
    definition: 'Heute die Regel: Unternehmen bedienen sich mehrerer Vertriebskanäle, um Kundensegmente zu erreichen.',
    example: 'möve: eigene Flagship-Stores, Outlet-Stores, Onlineshop, Shop-in-Shops bei Karstadt/Kaufhof, europäische Fachhändler, möve Professional für Hotels und Friseure.',
    confusableWith: ['Omnichannel-Marketing'],
    synonyms: ['Multichannel', 'Multichannel-Marketing', 'Mehrkanalvertrieb'],
  },
  {
    id: 'mc-omnichannel', chapterId: 'm5', term: 'Omnichannel-Marketing',
    definition: 'Über alle Kanäle hinweg vernetzt und konsistent sein: Bisher getrennt agierende Kanäle werden nahtlos verknüpft, um ein durchgängiges und widerspruchsfreies Kundenerlebnis zu schaffen.',
    example: 'Verfügbarkeit online prüfen, per Click & Collect reservieren, vor Ort abholen und App-Treuepunkte einlösen.',
    confusableWith: ['Mehrkanalvertrieb (Multichannel-Marketing)'],
    synonyms: ['Omnichannel'],
  },
  {
    id: 'mc-shop-in-shop', chapterId: 'm5', term: 'Shop-in-Shop-Prinzip',
    definition: 'Ein großer Verkaufsraum wird in mehrere separate Bereiche aufgeteilt, um Waren in der jeweils passenden Atmosphäre anbieten zu können.',
    example: 'möve-Shop-in-Shops bei Karstadt/Kaufhof.',
  },
  {
    id: 'mc-click-collect', chapterId: 'm5', term: 'Click & Collect',
    definition: 'Kunden bestellen digital und erhalten die Ware persönlich im Geschäft.',
    example: 'Laptop online bestellen und im Anschluss im Markt abholen.',
  },
  {
    id: 'mc-distributionsgrad', chapterId: 'm5', term: 'Distributionsgrad (Vertriebswegedifferenzierung)',
    definition: 'Auch innerhalb der einzelnen Vertriebskanäle kann die Breite variieren – beschrieben durch den Distributionsgrad des Vertriebswegs: Je breiter ein Vertriebsweg ist, je mehr Vertriebsorgane also auf einer Stufe eingesetzt werden, desto intensiver ist der Vertrieb (intensiver, selektiver, exklusiver Vertrieb).',
    synonyms: ['Vertriebswegedifferenzierung'],
  },
  {
    id: 'mc-einflussfaktoren-vertrieb', chapterId: 'm5', term: 'Einflussfaktoren auf die Wahl des Vertriebssystems',
    definition: 'Produkt (Wie erklärungsbedürftig? Wie oft gebraucht? Transport- und lagerfähig? Wie viel Kundendienst?), Unternehmen (Größe, Finanzkraft, Erfahrung, Marktstellung, Strategie), Markt (Marktposition und Wachstumsraten der Vertriebskanäle), Kunden (Einkaufsverhalten), Absatzmittler (vertragliche Bindung, Flexibilität, Standort, Größe, Image, Beeinflussbarkeit, Vertriebskosten), Konkurrenz (Vertriebsstrategie der Konkurrenz), Umfeld (Technologie, Gesetzgebung, soziokulturelle Veränderungen).',
  },
];
