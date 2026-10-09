import { ScriptSection } from '@/lib/types';

/** Lernskript Kapitel 3 – Kommunikationspolitik (PDF S. 11–16). */
export const sections3: ScriptSection[] = [
  {
    id: 's3-kommpolitik', sub: '3.1', title: 'Integrierte Marketingkommunikation', pdfPages: '11',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-kommunikationspolitik', 'mc-integrierte-kommunikation'] },
      { kind: 'merke', text: 'Medienneutrale Planung: Alle Kommunikationsoptionen und -kanäle sollten bezüglich ihrer Effektivität (Nutzen) und Effizienz (betriebener Aufwand) objektiv bewertet werden.' },
      { kind: 'definitions', conceptIds: ['mc-medienneutral'] },
    ],
  },
  {
    id: 's3-ziele', sub: '3.1', title: 'Rolle und Ziele', pdfPages: '11',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-komm-aufgaben'] },
      { kind: 'definitions', conceptIds: ['mc-komm-ziele'] },
      { kind: 'list', title: 'Reine Kommunikationsziele (potenzialbezogen)', items: [
        'Kategoriebedürfnis',
        'Bekanntheitsgrad und Image',
        'Einstellungen der Nachfrager zum Unternehmen und zu den Produkten',
        'Kaufabsicht der Nachfrager',
      ] },
      { kind: 'merke', text: 'Wirtschaftliche Ziele (Marktanteil, Kundenzahl, Absatz, Rentabilität) beziehen sich auf den Marketingmix als Ganzes – nur die potenzialbezogenen Ziele sind reine Kommunikationsziele.' },
      { kind: 'definitions', conceptIds: ['mc-kategoriebeduerfnis'] },
    ],
  },
  {
    id: 's3-programme', sub: '3.1', title: 'Kommunikationsprogramme entwickeln', pdfPages: '11–12',
    blocks: [
      { kind: 'text', text: 'Erfolgreiche Kampagnen werden analytisch und stufenweise geplant – typischerweise in acht Schritten (Kotler/Keller/Opresnik 2015):' },
      { kind: 'table', columns: ['Schritt', 'Leitfrage / Inhalt', 'Beispiel aus dem Skript'], rows: [
        ['1. Zielgruppe auswählen', 'An wen richtet sich die Kommunikation? Deckungsgleich mit dem Marktsegment oder nur eine Teilmenge davon.', 'HelloFresh: E-Mails, persönliche Anrufe, Rückgewinnungsrabatte und Retargeting-Anzeigen für abgesprungene Kunden'],
        ['2. Kommunikationsziele festlegen', 'Welche konkreten Ziele sollen in einem bestimmten Zeitraum verfolgt werden?', 'Coca-Cola „New Guy“: das gesamte Portfolio emotional erlebbar machen, Markenassoziation stärken'],
        ['3. Kommunikationsbotschaft bestimmen', 'Was soll wie und von wem gesagt werden?', 'Nikes „Just Do It“, seit 1988 zentraler Bestandteil der Markenidentität'],
        ['4. Kommunikationskanäle auswählen', 'Auf welchem Träger wird die Botschaft vermittelt? Persönliche Kanäle vs. Massenkanäle – Grenzen verwischen durch soziale Medien, programmatische Werbung und KI.', 'KI-personalisierte Coupons in Retail-Apps von Lidl, REWE, dm'],
        ['5. Budget festlegen', 'Wie viel Geld? Nach finanziellen Möglichkeiten, als Prozentsatz des Umsatzes, orientiert an Mitbewerbern oder auf Basis von Zielen und Aufgaben (empfohlen).', '–'],
        ['6. Kommunikationsmix gestalten', 'Welche Medien und Kanäle? Merkmale und Kosten jedes Werkzeugs berücksichtigen – entscheidend ist die durchdachte Kombination.', 'Zara: praktisch keine Werbung, sondern exklusive Standorte, Store-Design, Mund-zu-Mund; H&M: klassische Werbung + digitale Präsenz'],
        ['7. Kommunikationsergebnisse messen', 'Welche Wirkung hatten die Maßnahmen? Konsumentenbefragungen, CTR, Conversion Rate, Engagement Rate.', 'Duolingo „Duo is Dead“: +51 % täglich aktive Nutzer auf 40,5 Mio.'],
        ['8. Marketingkommunikationsprozess steuern', 'Instrumente kontinuierlich überwachen, koordinieren und bei Bedarf anpassen – zunehmend über Marketing-Automatisierungssysteme.', 'Merit Beauty verlagerte 2025 sein Budget kurzfristig von TikTok auf andere Plattformen'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-8schritte-komm'] },
      { kind: 'definitions', conceptIds: ['mc-retargeting', 'mc-programmatic', 'mc-kpis'] },
    ],
  },
  {
    id: 's3-medien', sub: '3.1', title: 'Medien kombinieren', pdfPages: '12',
    blocks: [
      { kind: 'list', title: 'Jedes Kommunikationswerkzeug hat Vor- und Nachteile; Auswahl und Kombination hängen ab von:', items: ['Marktstellung des Unternehmens', 'Art des Produktmarkts (Konsum oder Industrie)', 'Charakteristiken der Zielgruppe', 'Kaufbereitschaft der Konsumenten und Art der Kaufentscheidung', 'Phase im Lebenszyklus', 'zur Verfügung stehendes Budget'], ordered: true },
      { kind: 'definitions', conceptIds: ['mc-kaufentscheidung'] },
      { kind: 'table', title: 'Sechs Kriterien zur Einschätzung von Effektivität und Effizienz (Keller/Swaminathan 2019)', columns: ['Kriterium', 'Leitfrage'], rows: [
        ['Reichweite', 'Wird die angestrebte Zielgruppe erreicht?'],
        ['Mitwirkung', 'Welche Auswirkung hat die Kommunikation auf die Zielgruppe?'],
        ['Gemeinsamkeit', 'Vermitteln die verschiedenen Kommunikationswege eine konsistente Botschaft?'],
        ['Komplementarität', 'Ergänzen sich die Kommunikationswege gegenseitig?'],
        ['Vielseitigkeit', 'Wirkt die Kommunikation sowohl bei Konsumenten, die nur von einem Werkzeug erreicht werden, als auch bei denen mit mehreren Kontakten?'],
        ['Kosten', 'Welche Kosten fallen an?'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-6kriterien'] },
    ],
  },
  {
    id: 's3-instrumente', sub: '3.2', title: 'Kommunikationsinstrumente: massenmedial vs. persönlich', pdfPages: '12–13',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-massenmedial', 'mc-fragmentierung', 'mc-persoenliche-komm'] },
      { kind: 'example', title: 'Fragmentierung', text: '„Wetten, dass?“: 20 Mio. Zuschauer in den 80ern, nur noch 6–7 Mio. vor der Einstellung 2014.' },
      { kind: 'table', columns: ['Massenmediale Kommunikationsinstrumente', 'Persönliche Kommunikationsinstrumente'], rows: [
        ['Werbung', 'Direktmarketing'],
        ['Verkaufsförderung', 'interaktives Marketing'],
        ['Sponsoring & Eventmarketing', 'Mund-zu-Mund-Kommunikation (WoM)'],
        ['Public Relations', 'persönlicher Verkauf'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-kommmix'] },
    ],
  },
  {
    id: 's3-werbung', sub: '3.2', title: 'Werbung (massenmedial)', pdfPages: '13',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-werbung'] },
      { kind: 'list', title: 'Kanäle', items: [
        'Printmedien (Zeitungen, Zeitschriften, Flyer, Prospekte)',
        'Übertragungsmedien (Radio, Fernsehen, Kino)',
        'Displaymedien (Plakate, Schilder, Werbeaufsteller)',
        'digitale Medien (soziale Netzwerke, Suchmaschinen, Websites, mobile Apps)',
      ] },
      { kind: 'list', title: 'Gängige Maßnahmen', items: ['TV-Spots', 'Zeitungsanzeigen', 'Social Ads', 'Suchmaschinenwerbung (SEA)', 'Video Ads auf YouTube/TikTok'] },
      { kind: 'definitions', conceptIds: ['mc-product-placement', 'mc-sea'] },
      { kind: 'proscons', pros: [
        'Erreichbarkeit einer großen Menge von Konsumenten',
        'starke Ausdruckskraft durch Bild, Ton, Farbe etc.',
        'Botschaft präsent und wiederholbar',
        'Aufbau eines positiven Images',
        'volle Kontrolle über die Produktpräsentation',
      ], cons: [
        'hohe Kosten',
        '„Werbemüdigkeit“ bei Konsumenten',
        'mögliches Ausblenden von Werbung durch neue Technologie',
        'individuelle Ansprache nicht möglich',
        'Effizienz und Effektivität schwer messbar',
      ] },
    ],
  },
  {
    id: 's3-vkf', sub: '3.2', title: 'Verkaufsförderung (massenmedial)', pdfPages: '13',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-verkaufsfoerderung'] },
      { kind: 'list', title: 'Instrumente', items: [
        'Warenproben', 'Coupons (heute oft digital als QR-Codes oder Gutscheincodes)', 'Geschenke', 'Preisnachlässe',
        'exklusive Online-Rabattaktionen (Flash Sales)', 'Gamification-Elemente in Apps', 'Kundenbindungsprogramme',
        'Finanzierungsangebote', 'Inzahlungnahme', 'Verbundwerbung', 'Geschäfts- und Käuferwerbung (Wettbewerbe unter den Verkäufern)',
      ] },
      { kind: 'definitions', conceptIds: ['mc-verbundwerbung'] },
      { kind: 'example', text: 'Black Friday – greifbarer, direkter Anreiz zum Handeln statt Wettbewerbsargument.' },
      { kind: 'merke', text: 'Zu starker oder zu häufiger Einsatz führt zu Wirkungsnachlass und kann dem Markenwert schaden.' },
      { kind: 'proscons', pros: [
        'kurzfristige messbare Effekte',
        'können direkt zum Kauf führen',
        'liefern einen Anreiz zum Kauf, der für den Kunden einen Zusatznutzen darstellt',
      ], cons: [
        'Ein zu starker Einsatz kann dem Markenwert schaden.',
        'Die Wirkung lässt mit der Zeit nach.',
        'Die Konsumenten blenden verkaufsfördernde Maßnahmen wegen Überfrachtung aus.',
      ] },
    ],
  },
  {
    id: 's3-sponsoring', sub: '3.2', title: 'Sponsoring und Eventmarketing (massenmedial)', pdfPages: '13–14',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-sponsoring'] },
      { kind: 'example', text: 'Mercedes sponsert die Fashion Week Berlin; Red Bull schafft mit Red Bull Music Academy und Flugtagen gemeinsame Erlebnisse; Firmenmuseen wie das Porschemuseum.' },
      { kind: 'list', title: 'Ziele (neben Umsatz, Gewinn, Marktanteil vor allem psychologisch)', items: [
        'Steigerung der Bekanntheit', 'Imageverbesserung', 'Kontaktpflege', 'Nachweis gesellschaftlichen Engagements und Verantwortung',
      ] },
      { kind: 'proscons', pros: [
        'direkte Beteiligung der Konsumenten',
        'aktive Teilhabe und emotionale Bindung',
        'langfristige Steigerung des Marktwerts, wenn richtig eingesetzt',
      ], cons: [
        'aufwendige Planung und Durchführung',
        'nicht beliebig wiederholbar',
        'Wirkung auf Zahl der Teilnehmer begrenzt',
      ] },
    ],
  },
  {
    id: 's3-pr', sub: '3.2', title: 'Public Relations (massenmedial)', pdfPages: '14',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-pr', 'mc-stakeholder'] },
      { kind: 'list', title: 'Bestandteile', items: [
        'Pressemappen, -termine, -mitteilungen', 'Lobbyarbeit und Kontaktpflege', 'Unternehmensmagazine, Jahresberichte', 'Corporate Blogs',
        'strategische Bespielung eigener Social-Media-Kanäle', 'Podcasts', 'LinkedIn-Thought-Leadership-Artikel', 'Spenden und Veröffentlichungen',
      ] },
      { kind: 'table', title: 'Funktionen der PR (Meffert et al. 2015)', columns: ['Funktion', 'Bedeutung'], rows: [
        ['Informationsfunktion', 'Vermittlung von Informationen an die Öffentlichkeit'],
        ['Kontaktfunktion', 'Aufbau und Aufrechterhaltung der Stakeholderverbindungen'],
        ['Imagefunktion', 'Aufbau, Änderung und Pflege des Unternehmensbildes'],
        ['Absatzförderungsfunktion', 'Verkaufsförderung durch Anerkennung und Vertrauen'],
        ['Sozialfunktion', 'Aufzeigen der gesellschaftlichen und sozialen Unternehmensleistungen'],
        ['Balancefunktion', 'Anreiz-Beitrags-Gleichgewicht der Unternehmensstakeholder'],
        ['Stabilisierungsfunktion', 'Erhöhung der Krisenfestigkeit aufgrund stabiler Beziehungen zu den Anspruchsgruppen'],
      ] },
      { kind: 'definitions', conceptIds: ['mc-pr-funktionen'] },
      { kind: 'example', text: 'BMW Minis „Mission Mini“: Schnitzeljagd durch Barcelona – PR erreicht auch Konsumenten, die Massenmedien meiden.' },
      { kind: 'proscons', pros: [
        'hohe Glaubwürdigkeit und Vertrauen',
        'Kosten vergleichsweise gering',
        'Erreichbarkeit auch von Konsumenten, die Massenmedien meiden',
        'PR erzählt Geschichten – Unternehmen und Produkte werden anschaulicher',
      ], cons: [
        'Das Unternehmen hat wenig Kontrolle darüber, ob und wie die Botschaft dargestellt wird.',
        'Aufgrund des Nachrichtenwerts können die Maßnahmen nicht beliebig oft wiederholt werden.',
      ] },
    ],
  },
  {
    id: 's3-direkt', sub: '3.2', title: 'Direktmarketing (persönlich)', pdfPages: '14–15',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-direktmarketing'] },
      { kind: 'list', title: 'Ziele', items: [
        'Neukundengewinnung', 'intensive Betreuung des bestehenden Kundenkreises', 'verbesserte Kundennähe, erhöhte Kundenbindung, bessere Effizienz der Kundenansprache',
      ] },
      { kind: 'merke', text: 'Viele Konsumenten lehnen Direktmarketing ab – u. a. wegen ethischer Probleme (Irreführung, Betrug, Ausnutzung, Verletzung der Privatsphäre); zudem müssen Kontaktinformationen gesammelt, gepflegt und verwaltet werden.' },
      { kind: 'proscons', pros: [
        'individuelle Ansprache', 'immer aktuelle Botschaft', 'kann interaktiv angepasst werden', 'Interessen der Konsumenten ermittelbar',
      ], cons: [
        'Verwaltung der Kontaktinformationen', 'Ablehnung des Direktmarketings durch viele Konsumenten', 'ethische Probleme der Irreführung, Betrug, Ausnutzung und Verletzung der Privatsphäre',
      ] },
    ],
  },
  {
    id: 's3-interaktiv', sub: '3.2', title: 'Interaktives Marketing (persönlich)', pdfPages: '15',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-interaktiv'] },
      { kind: 'list', title: 'Heutige Plattformen', items: [
        'E-Commerce', 'E-Mail', 'Webseiten mit Chatbots und KI-gestützter Personalisierung', 'Blogs', 'soziale Medien',
        'mobiles Marketing', 'Apps', 'Retargeting-Kampagnen', 'suchgebundene Anzeigen',
      ] },
      { kind: 'definitions', conceptIds: ['mc-suchgebunden'] },
      { kind: 'proscons', pros: [
        'individuelle Ansprache', 'immer aktuelle Botschaft', 'kann interaktiv angepasst werden', 'Interessen der Konsumenten ermittelbar (Analyse digitaler Daten)',
      ], cons: [
        'ethische Probleme der Irreführung, Betrug, Ausnutzung und Verletzung der Privatsphäre', 'mögliches Ausblenden der Botschaften durch Konsumenten',
      ] },
    ],
  },
  {
    id: 's3-wom', sub: '3.2', title: 'Mund-zu-Mund-Kommunikation (persönlich)', pdfPages: '15',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-wom'] },
      { kind: 'example', text: 'Amazon nutzt Kundenbewertungen gezielt zur Verbesserung der Angebote.' },
      { kind: 'proscons', pros: [
        'sehr einflussreich aufgrund persönlicher Bindung', 'Dialog', 'zeitnahe Kommunikation',
      ], cons: [
        'begrenzte Einflussmöglichkeiten von Unternehmen', 'Wirkung schwer messbar',
      ] },
    ],
  },
  {
    id: 's3-verkauf', sub: '3.2', title: 'Persönlicher Verkauf (persönlich)', pdfPages: '16',
    blocks: [
      { kind: 'definitions', conceptIds: ['mc-persoenlicher-verkauf'] },
      { kind: 'text', text: 'Es finden Verkaufspräsentationen und -meetings statt, meist werden Produkte auf Messen und Expos ausgestellt; im Geschäft werden auch Warenproben und Anreizprogramme angeboten.' },
      { kind: 'proscons', pros: [
        'effektivstes Mittel, um den Verkauf zu beeinflussen', 'direkte Interaktion zwischen Verkäufer und Konsumenten', 'unmittelbare Reaktion auf das Käuferverhalten', 'Kultivierung langfristiger Kundenbeziehungen',
      ], cons: [
        'hohe Kosten (Verkäufer und Reisekosten)',
      ] },
      { kind: 'merke', text: 'Der Marketingkommunikationsmix besteht aus acht Werkzeugen: Werbung, Verkaufsförderung, Sponsoring & Events, Public Relations, Direktmarketing, interaktives Marketing, Mund-zu-Mund-Kommunikation sowie persönlicher Verkauf – so kombinieren, dass eine einheitliche und stimmige Markenbotschaft entsteht.' },
    ],
  },
];
