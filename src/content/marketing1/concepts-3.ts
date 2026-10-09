import { Concept } from '@/lib/types';

/** Kapitel 3 – Kommunikationspolitik (PDF S. 11–16). Definitionen eng am Skript. */
export const concepts3: Concept[] = [
  // ---------- 3.1 Integrierte Marketingkommunikation (S. 11) ----------
  {
    id: 'mc-kommunikationspolitik', chapterId: 'm3', term: 'Kommunikationspolitik',
    definition: 'Gestaltet und übermittelt Informationen, um die Konsumenten im Sinne der Unternehmensziele zu beeinflussen (Homburg 2017).',
    context: 'Eine kohärente Marketingkommunikation macht Marken bekannt und füllt sie mit Inhalt (schafft Markenassoziationen) – stimmige Botschaften und strategische Positionierung.',
    synonyms: ['Marketingkommunikation', 'Promotion'],
  },
  {
    id: 'mc-integrierte-kommunikation', chapterId: 'm3', term: 'Integrierte Marketingkommunikation',
    definition: 'Kommunikationsaktivitäten müssen integriert und aufeinander abgestimmt werden, damit eine kohärente Marketingkommunikation Marken bekannt macht und mit Inhalt füllt (Markenassoziationen).',
    context: 'Ziel des Kommunikationsmix: so kombinieren, dass eine einheitliche und stimmige Markenbotschaft entsteht.',
  },
  {
    id: 'mc-medienneutral', chapterId: 'm3', term: 'Medienneutrale Planung',
    definition: 'Alle Kommunikationsoptionen und -kanäle sollten bezüglich ihrer Effektivität (Nutzen) und Effizienz (betriebener Aufwand) objektiv bewertet werden.',
  },
  {
    id: 'mc-komm-aufgaben', chapterId: 'm3', term: 'Aufgabe der Marketingkommunikation',
    definition: 'In Dialog mit den Konsumenten treten, um sie über Produkte und Marken zu informieren, von Produkten und Marken zu überzeugen und an Produkte und Marken zu erinnern.',
  },
  {
    id: 'mc-komm-ziele', chapterId: 'm3', term: 'Kommunikationsziele (ökonomisch vs. vorökonomisch)',
    definition: 'Ziele werden in ökonomische (wirtschaftliche) und vorökonomische (potenzialbezogene) Größen unterteilt. Wirtschaftliche Ziele (Marktanteil, Kundenzahl, Absatz, Rentabilität) beziehen sich auf den Marketingmix als Ganzes – nur die potenzialbezogenen Ziele sind reine Kommunikationsziele: Kategoriebedürfnis, Bekanntheitsgrad und Image, Einstellungen der Nachfrager zum Unternehmen und zu den Produkten, Kaufabsicht der Nachfrager.',
    context: 'Schritt 2 der Kommunikationsplanung: Welche konkreten Ziele sollen in einem bestimmten Zeitraum verfolgt werden?',
    example: 'Coca-Cola-Kampagne „New Guy“: das gesamte Portfolio emotional erlebbar machen und die Markenassoziation stärken.',
    synonyms: ['reine Kommunikationsziele', 'vorökonomische Ziele', 'potenzialbezogene Ziele'],
  },
  {
    id: 'mc-kategoriebeduerfnis', chapterId: 'm3', term: 'Kategoriebedürfnis',
    definition: 'Bezieht sich auf die Schaffung neuer Kategorien: Völlig neue, innovative Produkte lösen oft Probleme, denen sich Konsumenten nicht aktiv bewusst sind, sodass es noch keine Nachfrage nach der Lösung gibt – das Bedürfnis muss erst etabliert werden.',
  },

  // ---------- Kommunikationsprogramme entwickeln (S. 11–12) ----------
  {
    id: 'mc-8schritte-komm', chapterId: 'm3', term: 'Kommunikationsprogramme entwickeln (acht Schritte)',
    definition: 'Erfolgreiche Kampagnen werden analytisch und stufenweise geplant (Kotler/Keller/Opresnik 2015): 1. Zielgruppe auswählen, 2. Kommunikationsziele festlegen, 3. Kommunikationsbotschaft bestimmen, 4. Kommunikationskanäle auswählen, 5. Budget festlegen, 6. Kommunikationsmix gestalten, 7. Kommunikationsergebnisse messen, 8. Marketingkommunikationsprozess steuern.',
    example: 'HelloFresh (Zielgruppe), Coca-Cola „New Guy“ (Ziele), Nike „Just Do It“ (Botschaft), KI-Coupons von Lidl, REWE, dm (Kanäle), Zara vs. H&M (Mix), Duolingo „Duo is Dead“ (Messung), Merit Beauty (Steuerung).',
    context: 'Budget-Möglichkeiten: nach finanziellen Möglichkeiten, als Prozentsatz des Umsatzes, orientiert an den Mitbewerbern oder auf Basis von Zielen und Aufgaben – Letzteres ist der empfehlenswerte Weg.',
  },
  {
    id: 'mc-retargeting', chapterId: 'm3', term: 'Retargeting',
    definition: 'Onlinestrategie, bei der ehemalige Besucher gezielt erneut angesprochen werden.',
    example: 'Instagram-Anzeige für zuvor angesehene Produkte.',
  },
  {
    id: 'mc-programmatic', chapterId: 'm3', term: 'Programmatische Werbung (Programmatic Advertising)',
    definition: 'Automatisierter Anzeigenhandel über Algorithmen, die Werbeflächen in Echtzeit ersteigern.',
    synonyms: ['Programmatic Advertising'],
  },
  {
    id: 'mc-kpis', chapterId: 'm3', term: 'Digitale Messgrößen: CTR, Conversion Rate, Engagement Rate',
    definition: 'Digitale Kennzahlen zur Messung der Kommunikationsergebnisse (Schritt 7): Click-Through-Rate, Conversion Rate und Engagement Rate.',
    synonyms: ['Kennzahlen', 'CTR', 'Conversion Rate', 'Engagement Rate'],
  },

  // ---------- Medien kombinieren (S. 12) ----------
  {
    id: 'mc-kaufentscheidung', chapterId: 'm3', term: 'Kaufentscheidung',
    definition: 'Bezieht sich darauf, mit welchem kognitiven und sonstigen Aufwand ein Kauf verbunden ist: impulsive, habituelle, limitierte und extensive Kaufentscheidungen.',
    synonyms: ['impulsive Kaufentscheidung', 'habituelle Kaufentscheidung', 'limitierte Kaufentscheidung', 'extensive Kaufentscheidung'],
  },
  {
    id: 'mc-6kriterien', chapterId: 'm3', term: 'Sechs Kriterien der integrierten Marketingkommunikation (Keller/Swaminathan 2019)',
    definition: 'Zur Einschätzung von Effektivität und Effizienz (Keller/Swaminathan 2019): Reichweite (Wird die angestrebte Zielgruppe erreicht?), Mitwirkung (Welche Auswirkung hat die Kommunikation auf die Zielgruppe?), Gemeinsamkeit (Vermitteln die Kommunikationswege eine konsistente Botschaft?), Komplementarität (Ergänzen sich die Kommunikationswege gegenseitig?), Vielseitigkeit (Wirkt die Kommunikation bei Konsumenten mit einem wie mit mehreren Kontakten?), Kosten (Welche Kosten fallen an?).',
    synonyms: ['Reichweite', 'Mitwirkung', 'Gemeinsamkeit', 'Komplementarität', 'Vielseitigkeit'],
  },

  // ---------- 3.2 Kommunikationsinstrumente (S. 12–13) ----------
  {
    id: 'mc-massenmedial', chapterId: 'm3', term: 'Massenmediale Kommunikation',
    definition: 'Die Botschaft richtet sich an eine Masse von Empfängern und ist nicht individuell auf Personen abgestimmt.',
    context: 'Durch die Fragmentierung der Medienlandschaft wird es einfacher, genau definierte Zielgruppen zu erreichen, aber schwieriger, viele Konsumenten über ein einziges Medium zu erreichen. Massenmediale Instrumente: Werbung, Verkaufsförderung, Sponsoring & Eventmarketing, Public Relations.',
    confusableWith: ['Persönliche Kommunikation'],
  },
  {
    id: 'mc-fragmentierung', chapterId: 'm3', term: 'Fragmentierung (der Medienlandschaft)',
    definition: 'Änderung der Struktur der Medienlandschaft: Klassische Mainstreammedien verlieren an Reichweite, stattdessen gibt es immer mehr Angebote mit sehr spitzen Zielgruppensegmenten.',
    example: '„Wetten, dass?“: 20 Mio. Zuschauer in den 80ern, nur noch 6–7 Mio. vor der Einstellung 2014.',
  },
  {
    id: 'mc-persoenliche-komm', chapterId: 'm3', term: 'Persönliche Kommunikation',
    definition: 'Richtet sich an individuelle Konsumenten und kann in Form und Inhalt angepasst werden.',
    context: 'Persönliche Instrumente: Direktmarketing, interaktives Marketing, Mund-zu-Mund-Kommunikation (WoM), persönlicher Verkauf.',
    confusableWith: ['Massenmediale Kommunikation'],
  },
  {
    id: 'mc-kommmix', chapterId: 'm3', term: 'Marketingkommunikationsmix (acht Werkzeuge)',
    definition: 'Der Marketingkommunikationsmix besteht aus acht Werkzeugen: Werbung, Verkaufsförderung, Sponsoring & Events, Public Relations (massenmedial) sowie Direktmarketing, interaktives Marketing, Mund-zu-Mund-Kommunikation und persönlicher Verkauf (persönlich) – so zu kombinieren, dass eine einheitliche und stimmige Markenbotschaft entsteht.',
    context: 'Schritt 6 der Planung („Kommunikationsmix gestalten“): Welche Medien und Kanäle werden ausgewählt? Merkmale und Kosten jedes Werkzeugs berücksichtigen – entscheidend ist nicht die bloße Auswahl, sondern die durchdachte Kombination.',
    example: 'Zara: praktisch keine Werbung, sondern exklusive Standorte, Store-Design und Mund-zu-Mund-Kommunikation; H&M: klassische Werbung + digitale Präsenz.',
    synonyms: ['Kommunikationsmix', 'Kommunikationsinstrumente'],
  },

  // ---------- Werbung (S. 13) ----------
  {
    id: 'mc-werbung', chapterId: 'm3', term: 'Werbung',
    definition: 'Die unpersönliche, durch einen dabei explizit genannten Auftraggeber bezahlte Präsentation von Produkten (massenmedial).',
    context: 'Kanäle: Print-, Übertragungs-, Display- und digitale Medien. Werbung wird umso störender empfunden, je drastischer sie die Mediennutzung unterbricht – zusätzlich „Werbemüdigkeit“ und Ausblenden durch neue Technologien.',
  },
  {
    id: 'mc-product-placement', chapterId: 'm3', term: 'Product Placement',
    definition: 'Gezielte, in den Kontext eingebundene Darstellung von Markenprodukten in Medien, z. B. Film, Fernsehen oder Videospiele.',
  },
  {
    id: 'mc-sea', chapterId: 'm3', term: 'Search Engine Advertising (SEA)',
    definition: 'Bezahlte Einblendungen innerhalb von Suchmaschinen-Ergebnisseiten.',
    confusableWith: ['Search Engine Optimization (SEO)'],
    synonyms: ['Suchmaschinenwerbung', 'SEA'],
  },

  // ---------- Verkaufsförderung (S. 13) ----------
  {
    id: 'mc-verkaufsfoerderung', chapterId: 'm3', term: 'Verkaufsförderung (Promotion)',
    definition: 'Kurzfristige Anregung von Verkauf durch gezielte Anreize (massenmedial) – hat an Bedeutung gewonnen, weil die Wirkung klassischer Werbung nachlässt.',
    context: 'Durch die zeitliche Limitierung lassen sich die Effekte messen. Verkaufsförderung liefert keine Argumente im Sinne von Wettbewerbsvorteilen, sondern greifbare, direkte Anreize zum Handeln. Zu starker oder zu häufiger Einsatz führt zu Wirkungsnachlass und kann dem Markenwert schaden.',
    example: 'Black Friday.',
    synonyms: ['Promotion', 'Sales Promotion'],
  },
  {
    id: 'mc-verbundwerbung', chapterId: 'm3', term: 'Verbundwerbung',
    definition: 'Unternehmen unterschiedlicher Branchen, die die gleichen Konsumenten ansprechen, schließen sich zu einer gemeinsamen Werbeaktion zusammen.',
  },

  // ---------- Sponsoring und Eventmarketing (S. 13–14) ----------
  {
    id: 'mc-sponsoring', chapterId: 'm3', term: 'Sponsoring und Eventmarketing',
    definition: 'Unternehmen organisieren und/oder unterstützen finanziell Aktivitäten und Programme in Sport, Kunst, Unterhaltung oder Wohltätigkeit; auch Festivals, virtuelle Events, Webinare, Werksbesichtigungen, Firmenmuseen und Aktivitäten in Fußgängerzonen (massenmedial).',
    context: 'Der Sponsor tritt in markenaufbauenden Kontakt und schafft durch gemeinsame Erlebnisse eine emotionale Bindung. Neben ökonomischen Größen werden vor allem psychologische Ziele verfolgt: Bekanntheit, Image, Kontaktpflege, Nachweis gesellschaftlichen Engagements und Verantwortung.',
    example: 'Mercedes sponsert die Fashion Week Berlin; Red Bull schafft mit Red Bull Music Academy und Flugtagen gemeinsame Erlebnisse; Porschemuseum.',
    synonyms: ['Eventmarketing', 'Sponsoring'],
  },

  // ---------- Public Relations (S. 14) ----------
  {
    id: 'mc-pr', chapterId: 'm3', term: 'Public Relations (Öffentlichkeitsarbeit)',
    definition: 'Versucht durch gezielte, transparente Kommunikation den Dialog mit allen Anspruchsgruppen aufzunehmen und so die öffentliche Meinung zu beeinflussen – Ziel: Verbesserung des Unternehmensimages (massenmedial).',
    context: 'PR genießt im Gegensatz zur Werbung höheres Vertrauen und Glaubwürdigkeit und erreicht auch Konsumenten, die Massenmedien meiden. Dafür hat das Unternehmen wenig Kontrolle darüber, ob und wie die Botschaft dargestellt wird.',
    example: 'BMW Minis „Mission Mini“: Schnitzeljagd durch Barcelona.',
    synonyms: ['PR', 'Öffentlichkeitsarbeit'],
  },
  {
    id: 'mc-stakeholder', chapterId: 'm3', term: 'Anspruchsgruppen (Stakeholders)',
    definition: 'Personen oder Gruppen von Personen, die von der Tätigkeit eines Unternehmens auf irgendeine Weise betroffen sind.',
    synonyms: ['Stakeholder', 'Stakeholders'],
  },
  {
    id: 'mc-pr-funktionen', chapterId: 'm3', term: 'Funktionen der PR',
    definition: 'Nach Meffert et al. (2015): Informationsfunktion (Vermittlung von Informationen an die Öffentlichkeit), Kontaktfunktion (Aufbau und Aufrechterhaltung der Stakeholderverbindungen), Imagefunktion (Aufbau, Änderung und Pflege des Unternehmensbildes), Absatzförderungsfunktion (Verkaufsförderung durch Anerkennung und Vertrauen), Sozialfunktion (Aufzeigen der gesellschaftlichen und sozialen Unternehmensleistungen), Balancefunktion (Anreiz-Beitrags-Gleichgewicht der Unternehmensstakeholder), Stabilisierungsfunktion (Erhöhung der Krisenfestigkeit aufgrund stabiler Beziehungen zu den Anspruchsgruppen).',
    synonyms: ['Informationsfunktion', 'Kontaktfunktion', 'Imagefunktion', 'Absatzförderungsfunktion', 'Sozialfunktion', 'Balancefunktion', 'Stabilisierungsfunktion'],
  },

  // ---------- Direktmarketing (S. 14–15) ----------
  {
    id: 'mc-direktmarketing', chapterId: 'm3', term: 'Direktmarketing',
    definition: 'Werbemaßnahmen, mit denen Konsumenten direkt angesprochen werden (persönlich) – z. B. Postwurfsendung von Katalogen, Telefonmarketing, E-Mail bzw. SMS oder TV-Shopping.',
    context: 'Ziele: Neukundengewinnung und intensive Betreuung des bestehenden Kundenkreises (Kundennähe, Kundenbindung, effizientere Ansprache). Viele Konsumenten lehnen Direktmarketing wegen ethischer Probleme ab; zudem müssen Kontaktinformationen gesammelt, gepflegt und verwaltet werden.',
    example: 'Versenden von Müsliproben.',
    confusableWith: ['Interaktives Marketing'],
  },

  // ---------- Interaktives Marketing (S. 15) ----------
  {
    id: 'mc-interaktiv', chapterId: 'm3', term: 'Interaktives Marketing',
    definition: 'Weiterentwicklung des Direktmarketings – es findet ein Austausch zwischen Konsument und Unternehmen statt (früher z. B. Rückantwortkarten) (persönlich).',
    context: 'Die Vorteile entsprechen denen des Direktmarketings; zusätzlich können durch die Analyse digitaler Daten die Interessen der Konsumenten ermittelt werden – zielgerechte Ansprache.',
    confusableWith: ['Direktmarketing'],
  },
  {
    id: 'mc-suchgebunden', chapterId: 'm3', term: 'Suchgebundene Anzeigen',
    definition: 'Werden von Suchmaschinen neben den eigentlichen Abfrageergebnissen angezeigt und erleichtern die gezielte Ansprache von Kunden, die sich gerade in der Suchphase des Kaufentscheidungsprozesses befinden.',
  },

  // ---------- Mund-zu-Mund-Kommunikation (S. 15) ----------
  {
    id: 'mc-wom', chapterId: 'm3', term: 'Mund-zu-Mund-Kommunikation (Word-of-Mouth)',
    definition: 'Persönliche Kommunikation von Konsumenten untereinander, die sich über ihre Erfahrungen mit Unternehmen und Produkten austauschen – zunehmend elektronisch (soziale Medien, Blogs).',
    context: 'Aufgrund der persönlichen Bindung sehr einflussreich; die Kommunikation erfolgt sehr zeitnah.',
    example: 'Amazon nutzt Kundenbewertungen gezielt zur Verbesserung der Angebote.',
    synonyms: ['Word-of-Mouth', 'WoM', 'Mundpropaganda'],
  },

  // ---------- Persönlicher Verkauf (S. 16) ----------
  {
    id: 'mc-persoenlicher-verkauf', chapterId: 'm3', term: 'Persönlicher Verkauf',
    definition: 'Präsentation eines Angebots oder Produkts durch einen Verkäufer (persönlich) – besonders im B2B-Geschäft verbreitet.',
    context: 'Der persönliche Verkauf ist das effektivste Mittel, um einen Kauf zu beeinflussen: Der Verkäufer kann unmittelbar auf die Reaktion des Konsumenten eingehen und langfristige Kundenbeziehungen kultivieren – bei hohen Kosten (Verkäufer und Reisekosten).',
    example: 'Medizinische Großgeräte an Krankenhäuser, Pharmareferent beim Arzt.',
  },
];
