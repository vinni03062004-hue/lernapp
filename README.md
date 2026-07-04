# Lernapp – Konsumentenverhalten (Online-Marketing)

Eine KI-gestützte Lernapp nach wissenschaftlichen Lernprinzipien (Retrieval Practice, Spacing, Interleaving, Metakognition) – mit dem vollständigen Inhalt des Moduls **Konsumentenverhalten** als erstem Fach: 10 Kapitel, 126 Fragen, 107 Konzepte und alle 29 Abbildungen aus dem Original-PDF.

---

## Schnellstart

Voraussetzung: [Node.js](https://nodejs.org) ab Version 18.17 (empfohlen: Version 20 oder neuer).

```bash
npm install
npm run dev
```

Danach im Browser öffnen: **http://localhost:3000**

Für den Produktivbetrieb:

```bash
npm run build
npm start
```

Tests ausführen (38 Unit-Tests für Bewertung, Spacing, Fortschritt, Fehlerklassifikation, Retrieval und Inhaltsvalidierung):

```bash
npm test
```

---

## Die Modi

| Modus | Beschreibung |
|---|---|
| **Lernmodus** | Aktiver Abruf mit direktem Feedback, Erklärung, PDF-Quellenverweis und Sicherheitsabfrage. Falsche Antworten kommen am Sessionende erneut und werden adaptiv (Spacing) neu eingeplant. |
| **Kapitelmodus** | Beherrschungsgrad je Kapitel, offene Lücken, wiederholt falsche Fragen, letzte Aktivität, Abschlusskriterien. Ein Kapitel gilt erst als abgeschlossen, wenn es **stabil** beherrscht wird. |
| **Mischmodus** | Interleaving über alle Kapitel und Fragetypen – realistische Prüfungsvorbereitung statt Blocklernen. |
| **Fehlerfokus** | Trainiert nur offene Fehler und instabile Inhalte. |
| **Prüfungsmodus** | Kein Feedback während der Beantwortung; MC + Freitext kombiniert; optionales Zeitlimit; am Ende Gesamtbewertung, „nur auswendig“-Kennzeichnung, Fehleranalyse und Empfehlungen. |
| **Bild-Lernmodus** | Alle Abbildungen exakt wie im PDF, mit Kapitelname, Bildtitel, einfacher + fachlicher Erklärung, Bildelementen, typischen Fehlinterpretationen und bildbezogenen Übungsfragen. |
| **Bild-Prüfmodus** | Prüfung ausschließlich mit bild-/diagrammbezogenen Aufgaben (erklären, Prinzip darlegen, zuordnen) inkl. Teilpunkten. |
| **Erklärmodus & Fach-Chatbot** | Wissensbasierte Antworten aus dem PDF-Wissensmodell mit Quellenangabe, doppelter Quellenprüfung und Unsicherheits-Kennzeichnung. Funktioniert offline – ohne API-Key. |
| **Analyse** | Fehlerarten-Verteilung, Problembegriffe (inkl. Verwechslungen), Fehler je Kapitel, Leistung je Fragetyp, Verlaufsdiagramm, Lernbericht-Export. |

## Die zwei Prozentwerte

- **Lernfortschritt** = 40 % Stoffabdeckung + 30 % Korrektheit auf Mindestniveau + 20 % Wiederholung + 10 % stabile Kernkonzepte.
- **Prüfungsbereitschaft** = 30 % aktuelle Trefferquote + 25 % Stabilität über Sitzungen/Zeitabstand + 20 % Leistung bei schweren Fragen + 15 % Korrekturquote früherer Fehler + 10 % Kapitelabdeckung. Läuft Multiple Choice deutlich besser als Freitext, wird der Wert bewusst gedämpft – keine Schein-Motivation.

Alle Gewichte und Schwellen sind zentral und kommentiert konfigurierbar in **`src/config/learning.ts`**.

## Wichtig zu wissen

- **Ehrliche Werte:** Direkt nach der ersten Session wirken die Prozentwerte niedrig – das ist Absicht. Stabilität entsteht erst durch Wiederholung mit Zeitabstand (Spacing-Effekt). Wiederhole am Folgetag, dann steigen Stabilität und Bereitschaft.
- **Sicherheitsabfrage:** Die Angabe „Unsicher/Mittel/Sicher“ fließt in die Lernlogik ein (Zufallstreffer werden abgefedert, „richtig aber unsicher“ wird getrackt).
- **Speicherung:** Der komplette Lernstand liegt in `data/state.json` (atomar geschrieben, übersteht Neustarts). Zurücksetzen: Einstellungen → „Lernstand zurücksetzen“.
- **Debug-Bereich:** Einstellungen → Debug zeigt Inhaltsvalidierung, Bildprüfketten-Status, gemeldete Fragen und die aktiven Gewichte.

---

## Architekturüberblick

```
lernapp/
├── src/
│   ├── config/learning.ts        ← alle Gewichte & Schwellen (dokumentiert)
│   ├── lib/                      ← Kernlogik (serverseitig, getestet)
│   │   ├── types.ts              ← Datenmodell (Question, MasteryState, ErrorPattern …)
│   │   ├── scoring.ts            ← Bewertungsengine (MC exakt, Freitext rubrikbasiert mit Teilpunkten)
│   │   ├── scheduler.ts          ← Adaptive Engine: Spacing (SM-2-artig), Interleaving, Frageauswahl
│   │   ├── errors.ts             ← Fehlerklassifikation (Wissenslücke, Verwechslung, Anwendung, Flüchtigkeit, unsicher-richtig)
│   │   ├── progress.ts           ← Lernfortschritt, Prüfungsbereitschaft, Kapitelabschluss
│   │   ├── retrieval.ts          ← Offline-Retrieval für Erklärmodus/Chatbot (mit doppelter Quellenprüfung)
│   │   ├── analytics.ts          ← Handlungsempfehlungen, Fehleranalyse, Fragetyp-Statistik
│   │   ├── attempt-service.ts    ← Antwortverarbeitung als „Transaktion“
│   │   ├── session-service.ts    ← Session-Erstellung (Lösungen bleiben serverseitig), Prüfungsauswertung
│   │   └── store.ts              ← Persistenz (JSON, atomar; Repository-Pattern → später gegen PostgreSQL austauschbar)
│   ├── content/                  ← Wissensmodell des Moduls
│   │   └── konsumentenverhalten/ ← Kapitel, Konzepte, Fragen (Kap. 1–10), Abbildungen inkl. 4-facher Bildprüfkette
│   ├── app/                      ← Next.js App Router: Seiten + API-Routen
│   └── components/               ← SessionPlayer (alle Fragetypen), Navigation
├── tests/                        ← Vitest: 38 Tests
├── public/images/kv/             ← die 29 Abbildungen aus dem Modul-PDF
└── data/state.json               ← Lernstand (wird automatisch angelegt)
```

**Zentrale Designentscheidungen**

- **Bewertung serverseitig:** Fragen werden ohne Lösungen an den Client geschickt; Scoring, Fehlerklassifikation und Mastery-Updates laufen in den API-Routen. Kein „Black-Box“-Frontend, keine manipulierbaren Werte.
- **Kein Datenbank-Setup nötig:** Persistenz über eine gekapselte JSON-Store-Schicht. Wer später PostgreSQL/pgvector will, tauscht nur `store.ts` aus – das Datenmodell ist darauf ausgelegt.
- **Offline-KI:** Erklärmodus/Chatbot arbeiten über ein TF-IDF-ähnliches Retrieval auf dem strukturierten Wissensmodell (Konzepte, Kapitel-Kernaussagen, Bildbeschreibungen). Dadurch garantiert quellentreu, ohne API-Kosten. Eine spätere Anbindung der Claude-API kann in `src/app/api/explain/route.ts` ergänzt werden.
- **Vierstufige Bildprüfkette:** Jede Abbildung durchlief (1) technische Erfassung, (2) semantische Beschreibung (Elemente, Kernaussage), (3) didaktische Integration (Fragen + Erklärungen) und (4) Validierung. Der Status ist im Debug-Bereich einsehbar; die Inhaltsvalidierung läuft zusätzlich als Unit-Test.

## Hosting auf Vercel (Nutzung am Handy als App)

Die App unterstützt zwei Speicher-Backends: lokal eine JSON-Datei, in der Cloud eine Postgres-Datenbank (nötig, weil das Dateisystem bei Vercel flüchtig ist). Die Umschaltung passiert automatisch über die Umgebungsvariable `DATABASE_URL`.

**Schritt 1 – Code zu GitHub hochladen** (im `lernapp`-Ordner):

```bash
git init
git add .
git commit -m "Lernapp Konsumentenverhalten"
```

Dann auf github.com ein neues (privates) Repository erstellen, z. B. `lernapp`, und:

```bash
git remote add origin https://github.com/DEIN-NUTZERNAME/lernapp.git
git branch -M main
git push -u origin main
```

**Schritt 2 – Bei Vercel deployen:**

1. Auf [vercel.com](https://vercel.com) mit dem GitHub-Konto anmelden (Hobby-Plan ist kostenlos).
2. „Add New → Project“ → dein `lernapp`-Repository importieren → Framework wird automatisch als Next.js erkannt → „Deploy“.

**Schritt 3 – Datenbank anbinden (wichtig, sonst geht der Fortschritt verloren):**

1. Im Vercel-Projekt: Tab **Storage** → „Create Database“ → **Neon (Postgres)** auswählen (kostenloser Plan reicht völlig).
2. Vercel setzt die Umgebungsvariable `DATABASE_URL` automatisch.
3. Einmal neu deployen (Deployments → „Redeploy“). Die App legt ihre Tabelle beim ersten Start selbst an – kein weiteres Setup nötig.

**Schritt 4 – Am Handy als App installieren:**

- **iPhone (Safari):** Deine Vercel-URL öffnen → Teilen-Symbol → **„Zum Home-Bildschirm“**.
- **Android (Chrome):** URL öffnen → Menü (⋮) → **„App installieren“** / „Zum Startbildschirm hinzufügen“.

Die App startet dann im Vollbild mit eigenem Icon wie eine native App.

**Hinweis:** Die App hat keinen Login und ist für eine Person gedacht. Halte die Vercel-URL privat (sie ist nicht öffentlich auffindbar, aber jeder mit dem Link könnte deinen Lernstand sehen und verändern).

## Neues Modul hinzufügen

1. Ordner `src/content/<modulname>/` anlegen (Struktur wie `konsumentenverhalten/`): `chapters.ts`, `concepts.ts`, `questions-*.ts`, `figures.ts`.
2. Abbildungen nach `public/images/<kürzel>/` legen.
3. Modul in `src/content/index.ts` registrieren.

Die gesamte Lernlogik (Spacing, Bewertung, Analyse, Modi) funktioniert modulunabhängig.

## Qualitätssicherung

- `npm test` → 38 Unit-Tests: Bewertungslogik aller Fragetypen, Teilpunkte, Tippfehler-Toleranz, Spacing-/Mastery-Regeln, Fehler-Rehabilitation (2× in Folge korrekt), Interleaving, Kapitelabschluss-Kriterien, MC-vs-Freitext-Dämpfung, Fehlerklassifikation, Retrieval-Qualität und vollständige Inhaltsvalidierung des Fragenkatalogs.
- Zusätzlich verifiziert: Production-Build und End-to-End-Smoke-Test aller API-Flows (Lernsession, Prüfung ohne Feedback-Leak, Bild-Modi, Fehlerfokus, Erklärmodus, Export, Persistenz).
