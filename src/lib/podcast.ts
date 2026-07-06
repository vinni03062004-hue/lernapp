/**
 * Podcast-Modus: erzeugt pro Kapitel ein natürlich gesprochenes Erklär-Skript.
 *
 * Primär schreibt Gemini (Textmodell, im Free-Tier nutzbar) ein warmes,
 * verständliches Skript im Podcast-/Tutor-Stil. Fällt Gemini aus (kein Key
 * oder Fehler), wird deterministisch ein Skript aus den Kapitelinhalten
 * zusammengesetzt – die Funktion liefert also IMMER ein brauchbares Ergebnis.
 *
 * Das Ergebnis ist reiner, vorlesbarer Fließtext (keine Markdown-Zeichen,
 * keine Aufzählungen, keine Seitenzahlen), damit die Sprachausgabe im Browser
 * ihn sauber vorlesen kann.
 */

import { geminiAvailable, geminiGenerate } from './gemini';
import { LearningModule } from './types';

export interface PodcastScript {
  chapterId: string;
  index: number;
  title: string;
  script: string;
}

const SYSTEM_PROMPT = `Du bist der ruhige, sympathische Host einer Lern-Podcast-Folge zum Hochschulmodul "Konsumentenverhalten" (Online-Marketing).
Du schreibst das gesprochene Skript für EIN Kapitel, das anschließend von einer Sprachausgabe vorgelesen wird.

Regeln:
1. Schreibe ausschließlich den zu sprechenden Text – natürlicher, warmer Fließtext in ganzen Sätzen.
2. KEINE Regieanweisungen, KEINE Sternchen, KEINE Aufzählungszeichen, KEINE Überschriften, KEIN Markdown, KEINE Seitenzahlen oder Quellenangaben.
3. Beginne mit einer kurzen, freundlichen Begrüßung und nenne Kapitelnummer und Titel. Sprich die zuhörende Person direkt an (locker, aber fachlich korrekt).
4. Erkläre die Kernideen des Kapitels verständlich und in sinnvoller Reihenfolge, mit kurzen Alltagsbeispielen. Verbinde die Gedanken mit natürlichen Übergängen.
5. Schließe mit einer knappen Zusammenfassung der wichtigsten Punkte und einem ruhigen Ausklang.
6. Länge: etwa 400 bis 650 Wörter. Deutsch.`;

function chapterContext(mod: LearningModule, chapterId: string): string {
  const ch = mod.chapters.find((c) => c.id === chapterId);
  if (!ch) return '';
  const concepts = mod.concepts.filter((c) => c.chapterId === chapterId);
  const parts: string[] = [];
  parts.push(`KAPITEL ${ch.index}: ${ch.title}`);
  if (ch.subchapters?.length) parts.push(`Unterthemen: ${ch.subchapters.join(', ')}`);
  parts.push('Kernideen:');
  parts.push(ch.keyIdeas.map((k) => `- ${k}`).join('\n'));
  if (concepts.length) {
    parts.push('Wichtige Begriffe:');
    parts.push(
      concepts
        .slice(0, 18)
        .map((c) => `- ${c.term}: ${c.definition}${c.example ? ` (Beispiel: ${c.example})` : ''}`)
        .join('\n')
    );
  }
  return parts.join('\n');
}

/** Entfernt versehentliche Markdown-/Sonderzeichen, damit TTS sauber vorliest. */
function cleanForSpeech(text: string): string {
  return text
    .replace(/[*_#`>]+/g, ' ')
    .replace(/^\s*[-•]\s*/gm, '')
    .replace(/\s*\n\s*\n\s*/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/** Deterministischer Fallback ohne KI: Skript aus den Kapitelinhalten. */
function fallbackScript(mod: LearningModule, chapterId: string): string {
  const ch = mod.chapters.find((c) => c.id === chapterId)!;
  const concepts = mod.concepts.filter((c) => c.chapterId === chapterId);
  const lines: string[] = [];
  lines.push(
    `Willkommen zu Kapitel ${ch.index}: ${ch.title}. Wir gehen die wichtigsten Punkte in Ruhe gemeinsam durch.`
  );
  for (const idea of ch.keyIdeas) {
    lines.push(idea);
  }
  if (concepts.length) {
    lines.push('Schauen wir uns noch die zentralen Begriffe an.');
    for (const c of concepts.slice(0, 12)) {
      lines.push(`${c.term}: ${c.definition}${c.example ? ` Ein Beispiel dafür ist ${c.example}.` : ''}`);
    }
  }
  lines.push(
    `Damit sind wir am Ende von Kapitel ${ch.index}, ${ch.title}. Wenn du magst, lass die wichtigsten Gedanken noch einmal nachklingen.`
  );
  return cleanForSpeech(lines.join(' '));
}

/**
 * Baut das Podcast-Skript für ein Kapitel.
 * Nutzt Gemini, wenn verfügbar; sonst den deterministischen Fallback.
 */
export async function buildPodcastScript(mod: LearningModule, chapterId: string): Promise<PodcastScript | null> {
  const ch = mod.chapters.find((c) => c.id === chapterId);
  if (!ch) return null;

  let script = '';
  if (geminiAvailable()) {
    const text = await geminiGenerate({
      system: SYSTEM_PROMPT,
      turns: [{ role: 'user', text: `Erstelle das Podcast-Skript für dieses Kapitel:\n\n${chapterContext(mod, chapterId)}` }],
      maxTokens: 1600,
      temperature: 0.6,
    });
    if (text) script = cleanForSpeech(text);
  }
  if (!script) script = fallbackScript(mod, chapterId);

  return { chapterId, index: ch.index, title: ch.title, script };
}
