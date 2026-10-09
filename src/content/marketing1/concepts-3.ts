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
    examRelevance: 'Begründen können, warum Abstimmung nötig ist, und die sechs Bewertungskriterien nennen.',
  },
  {
    id: 'mc-medienneutral', chapterId: 'm3', term: 'Medienneutrale Planung',
    definition: 'Alle Kommunikationsoptionen und -kanäle sollten bezüglich ihrer Effektivität (Nutzen) und Effizienz (betriebener Aufwand) objektiv bewertet werden.',
    mnemonic: 'Effektivität = Nutzen; Effizienz = Aufwand.',
  },
  {
    id: 'mc-komm-aufgaben', chapterId: 'm3', term: 'Aufgaben der Marketingkommunikation',
    definition: 'In Dialog mit den Konsumenten treten, um sie über Produkte und Marken zu informieren, von Produkten und Marken zu überzeugen und an Produkte und Marken zu erinnern.',
    mnemonic: 'Informieren – Überzeugen – Erinnern.',
  },
  {
    id: 'mc-komm-ziele', chapterId: 'm3', term: 'Kommunikationsziele (ökonomisch vs. vorökonomisch)',
    definition: 'Ziele werden in ökonomische (wirtschaftliche) und vorökonomische (potenzialbezogene) Größen unterteilt. Wirtschaftliche Ziele (Marktanteil, Kundenzahl, Absatz, Rentabilität) beziehen sich auf den Marketingmix als Ganzes – nur die potenzialbezogenen Ziele sind reine Kommunikationsziele: Kategoriebedürfnis, Bekanntheitsgrad und Image, Einstellungen der Nachfrager zum Unternehmen und zu den Produkten, Kaufabsicht der Nachfrager.',
    context: 'Schritt 2 der Kommunikationsplanung: Welche konkreten Ziele sollen in einem bestimmten Zeitraum verfolgt werden?',
    example: 'Coca-Cola-Kampagne „New Guy“: das gesamte Portfolio emotional erlebbar machen und die Markenassoziation stärken.',
    examRelevance: 'Klassische Abgrenzung: Warum sind Marktanteil/Absatz KEINE reinen Kommunikationsziele?',
    synonyms: ['reine Kommunikationsziele', 'vorökonomische Ziele', 'potenzialbezogene Ziele'],
  },
  {
    id: 'mc-kategoriebeduerfnis', chapterId: 'm3', term: 'Kategoriebedürfnis',
    definition: 'Bezieht sich auf die Schaffung neuer Kategorien: Völlig neue, innovative Produkte lösen oft Probleme, denen sich Konsumenten nicht aktiv bewusst sind, sodass es noch keine Nachfrage nach der Lösung gibt – das Bedürfnis muss erst etabliert werden.',
  },

  // ---------- Kommunikationsprogramme entwickeln (S. 11–12) ----------
  {
    id: 'mc-8schritte-komm', chapterId: 'm3', term: 'Acht Schritte der Kommunikationsplanung',
    definition: 'Erfolgreiche Kampagnen werden analytisch und stufenweise geplant (Kotler/Keller/Opresnik 2015): 1. Zielgruppe auswählen, 2. Kommunikationsziele festlegen, 3. Kommunikationsbotschaft bestimmen, 4. Kommunikationskanäle auswählen, 5. Budget festlegen, 6. Kommunikationsmix gestalten, 7. Kommunikationsergebnisse messen, 8. Marketingkommunikationsprozess steuern.',
    mnemonic: 'Wen? Wozu? Was? Worüber? Wie viel? Welcher Mix? Was hat’s gebracht? Wie steuern?',
    examRelevance: 'Reihenfolge + je ein Satz Erklärung, idealerweise mit Skript-Beispiel.',
  },
  {
    id: 'mc-zielgruppe', chapterId: 'm3', term: 'Zielgruppe auswählen (Schritt 1)',
    definition: 'An wen richtet sich die Kommunikation? Die Zielgruppe kann deckungsgleich mit dem Marktsegment oder nur eine Teilmenge davon sein.',
    example: 'HelloFresh: E-Mails, persönliche Anrufe, Rückgewinnungsrabatte und Retargeting-Anzeigen für abgesprungene Kunden.',
    synonyms: ['Zielgruppe'],
  },
  {
    id: 'mc-botschaft', chapterId: 'm3', term: 'Kommunikationsbotschaft bestimmen (Schritt 3)',
    definition: 'Was soll wie und von wem gesagt werden?',
    example: 'Nikes „Just Do It“, seit 1988 zentraler Bestandteil der Markenidentität.',
    synonyms: ['Kommunikationsbotschaft'],
  },
  {
    id: 'mc-kanaele', chapterId: 'm3', term: 'Kommunikationskanäle auswählen (Schritt 4)',
    definition: 'Auf welchem Träger soll die Botschaft vermittelt werden? Grob: persönliche Kanäle vs. Massenkanäle – die Grenzen verwischen jedoch durch soziale Medien, programmatische Werbung und KI.',
    example: 'KI-personalisierte Coupons in Retail-Apps von Lidl, REWE, dm.',
    synonyms: ['Kommunikationskanäle'],
  },
  {
    id: 'mc-budget', chapterId: 'm3', term: 'Kommunikationsbudget festlegen (Schritt 5)',
    definition: 'Wie viel Geld soll ausgegeben werden? Möglichkeiten: nach finanziellen Möglichkeiten, als Prozentsatz des Umsatzes, orientiert an den Mitbewerbern oder auf Basis von Zielen und Aufgaben – Letzteres ist der empfehlenswerte Weg.',
    examRelevance: 'Vier Methoden nennen und die ziel-/aufgabenorientierte als empfohlene kennzeichnen.',
    synonyms: ['Budgetierung', 'Werbebudget'],
  },
  {
    id: 'mc-ergebnismessung', chapterId: 'm3', term: 'Kommunikationsergebnisse messen (Schritt 7)',
    definition: 'Welche Wirkung hatten die Maßnahmen? Gemessen über Konsumentenbefragungen sowie digitale Messgrößen wie CTR, Conversion Rate oder Engagement Rate.',
    example: 'Duolingo „Duo is Dead“: +51 % täglich aktive Nutzer auf 40,5 Mio.',
  },
  {
    id: 'mc-prozesssteuerung', chapterId: 'm3', term: 'Marketingkommunikationsprozess steuern (Schritt 8)',
    definition: 'Instrumente dürfen nicht isoliert laufen, sondern müssen kontinuierlich überwacht, koordiniert und bei Bedarf angepasst werden – zunehmend über Marketing-Automatisierungssysteme.',
    example: 'Merit Beauty verlagerte 2025 sein Budget kurzfristig von TikTok auf andere Plattformen.',
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
    id: 'mc-kpis', chapterId: 'm3', term: 'Digitale Messgrößen (CTR, Conversion Rate, Engagement Rate)',
    definition: 'Digitale Kennzahlen zur Messung der Kommunikationsergebnisse (Schritt 7): Click-Through-Rate, Conversion Rate und Engagement Rate.',
    synonyms: ['KPIs', 'Kennzahlen'],
  },
  {
    id: 'mc-ctr', chapterId: 'm3', term: 'Click-Through-Rate (CTR)',
    definition: 'Kennzahl für die Klickhäufigkeit von Anzeigen.',
    example: 'Ein Banner wird gesehen, 1 % klickt.',
    confusableWith: ['Conversion Rate'],
  },
  {
    id: 'mc-conversion', chapterId: 'm3', term: 'Conversion Rate',
    definition: 'Anteil der Besucher, die Zielhandlungen ausführen.',
    example: '100 Besucher, 5 Käufe = 5 %.',
    confusableWith: ['Click-Through-Rate (CTR)'],
  },
  {
    id: 'mc-engagement', chapterId: 'm3', term: 'Engagement Rate',
    definition: 'Misst, wie aktiv Nutzer reagieren.',
    example: 'Kommentare, Shares und Likes pro Post.',
  },

  // ---------- Medien kombinieren (S. 12) ----------
  {
    id: 'mc-medienkombination', chapterId: 'm3', term: 'Einflussfaktoren der Medienkombination',
    definition: 'Jedes Kommunikationswerkzeug hat Vor- und Nachteile; Auswahl und Kombination hängen ab von (1) der Marktstellung des Unternehmens, (2) der Art des Produktmarkts (Konsum oder Industrie), (3) den Charakteristiken der Zielgruppe, (4) der Kaufbereitschaft der Konsumenten und der Art der Kaufentscheidung, (5) der Phase im Lebenszyklus und (6) dem zur Verfügung stehenden Budget.',
    examRelevance: 'Sechs Faktoren aufzählen können.',
  },
  {
    id: 'mc-kaufentscheidung', chapterId: 'm3', term: 'Kaufentscheidung',
    definition: 'Bezieht sich darauf, mit welchem kognitiven und sonstigen Aufwand ein Kauf verbunden ist: impulsive, habituelle, limitierte und extensive Kaufentscheidungen.',
    synonyms: ['impulsive Kaufentscheidung', 'habituelle Kaufentscheidung', 'limitierte Kaufentscheidung', 'extensive Kaufentscheidung'],
  },
  {
    id: 'mc-6kriterien', chapterId: 'm3', term: 'Sechs Kriterien der integrierten Marketingkommunikation',
    definition: 'Zur Einschätzung von Effektivität und Effizienz (Keller/Swaminathan 2019): Reichweite (Wird die angestrebte Zielgruppe erreicht?), Mitwirkung (Welche Auswirkung hat die Kommunikation auf die Zielgruppe?), Gemeinsamkeit (Vermitteln die Kommunikationswege eine konsistente Botschaft?), Komplementarität (Ergänzen sich die Kommunikationswege gegenseitig?), Vielseitigkeit (Wirkt die Kommunikation bei Konsumenten mit einem wie mit mehreren Kontakten?), Kosten (Welche Kosten fallen an?).',
    mnemonic: 'R-M-G-K-V-K: Reichweite, Mitwirkung, Gemeinsamkeit, Komplementarität, Vielseitigkeit, Kosten.',
    examRelevance: 'Alle sechs mit Leitfrage; Gemeinsamkeit (konsistente Botschaft) und Komplementarität (gegenseitige Ergänzung) nicht vertauschen.',
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
    mnemonic: '4 massenmedial (W-V-S-P) + 4 persönlich (D-I-M-P) = 8.',
    synonyms: ['Kommunikationsmix', 'Kommunikationsinstrumente'],
  },

  // ---------- Werbung (S. 13) ----------
  {
    id: 'mc-werbung', chapterId: 'm3', term: 'Werbung',
    definition: 'Die unpersönliche, durch einen dabei explizit genannten Auftraggeber bezahlte Präsentation von Produkten (massenmedial).',
    context: 'Vier Kanalgruppen: Print-, Übertragungs-, Display- und digitale Medien. Stärken sind Reichweite, Ausdruckskraft und volle Kontrolle über die Produktpräsentation; Schwächen hohe Kosten, Werbemüdigkeit und fehlende individuelle Ansprache.',
    examRelevance: 'Definition (unpersönlich, bezahlt, genannter Auftraggeber) + je mindestens drei Vor- und Nachteile.',
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
  {
    id: 'mc-werbemuedigkeit', chapterId: 'm3', term: 'Werbemüdigkeit',
    definition: 'Werbung wird umso störender empfunden, je drastischer sie die Mediennutzung unterbricht; hinzu kommen „Werbemüdigkeit“ der Konsumenten und das Ausblenden von Werbung durch neue Technologien.',
  },

  // ---------- Verkaufsförderung (S. 13) ----------
  {
    id: 'mc-verkaufsfoerderung', chapterId: 'm3', term: 'Verkaufsförderung (Promotion)',
    definition: 'Kurzfristige Anregung von Verkauf durch gezielte Anreize (massenmedial) – hat an Bedeutung gewonnen, weil die Wirkung klassischer Werbung nachlässt.',
    context: 'Durch die zeitliche Limitierung lassen sich die Effekte messen. Verkaufsförderung liefert keine Argumente im Sinne von Wettbewerbsvorteilen, sondern greifbare, direkte Anreize zum Handeln. Zu starker oder zu häufiger Einsatz führt zu Wirkungsnachlass und kann dem Markenwert schaden.',
    example: 'Black Friday.',
    mnemonic: 'VKF = kurzfristiger Anreiz, kein Wettbewerbsargument.',
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
    mnemonic: 'I-K-I-A-S-B-S: „Ich Kann Immer Aus Sieben Bausteinen Schöpfen.“',
    examRelevance: 'Typische Aufzählungsfrage: die sieben Funktionen mit kurzer Erklärung.',
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
    mnemonic: 'Direkt = Einbahnstraße zum Kunden; interaktiv = Austausch in beide Richtungen.',
  },
  {
    id: 'mc-suchgebunden', chapterId: 'm3', term: 'Suchgebundene Anzeigen',
    definition: 'Werden von Suchmaschinen neben den eigentlichen Abfrageergebnissen angezeigt und erleichtern die gezielte Ansprache von Kunden, die sich gerade in der Suchphase des Kaufentscheidungsprozesses befinden.',
  },

  // ---------- Mund-zu-Mund-Kommunikation (S. 15) ----------
  {
    id: 'mc-wom', chapterId: 'm3', term: 'Mund-zu-Mund-Kommunikation (Word-of-Mouth)',
    definition: 'Persönliche Kommunikation von Konsumenten untereinander, die sich über ihre Erfahrungen mit Unternehmen und Produkten austauschen – zunehmend elektronisch (soziale Medien, Blogs).',
    context: 'Aufgrund der persönlichen Bindung sehr einflussreich; die Kommunikation erfolgt sehr zeitnah. Formen: Buzz Marketing, Viral Marketing, Influencer-Marketing.',
    example: 'Amazon nutzt Kundenbewertungen gezielt zur Verbesserung der Angebote.',
    synonyms: ['Word-of-Mouth', 'WoM', 'Mundpropaganda'],
  },
  {
    id: 'mc-buzz', chapterId: 'm3', term: 'Buzz Marketing',
    definition: 'Mundpropaganda in Foren, auf Bewertungsplattformen oder Social-Media-Plattformen wie Instagram oder Reddit.',
    confusableWith: ['Viral Marketing'],
  },
  {
    id: 'mc-viral', chapterId: 'm3', term: 'Viral Marketing',
    definition: 'Die Verbreitung von Inhalten wird über Influencer oder Onlinemedien multipliziert – viraler Effekt.',
    confusableWith: ['Buzz Marketing', 'Influencer-Marketing'],
  },
  {
    id: 'mc-influencer', chapterId: 'm3', term: 'Influencer-Marketing',
    definition: 'Gezielte strategische Nutzung des viralen Effekts: Kooperation mit reichweitenstarken Personen, um deren authentische Stimme und Glaubwürdigkeit für die Markenbotschaft zu nutzen.',
    confusableWith: ['Viral Marketing'],
  },

  // ---------- Persönlicher Verkauf (S. 16) ----------
  {
    id: 'mc-persoenlicher-verkauf', chapterId: 'm3', term: 'Persönlicher Verkauf',
    definition: 'Präsentation eines Angebots oder Produkts durch einen Verkäufer (persönlich) – besonders im B2B-Geschäft verbreitet.',
    context: 'Der persönliche Verkauf ist das effektivste Mittel, um einen Kauf zu beeinflussen: Der Verkäufer kann unmittelbar auf die Reaktion des Konsumenten eingehen und langfristige Kundenbeziehungen kultivieren – bei hohen Kosten (Verkäufer und Reisekosten).',
    example: 'Medizinische Großgeräte an Krankenhäuser, Pharmareferent beim Arzt.',
  },
];
