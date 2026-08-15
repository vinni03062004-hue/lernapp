import { LearningModule } from '@/lib/types';

// --- Modul: Konsumentenverhalten ---
import { chapters as kvChapters } from './konsumentenverhalten/chapters';
import { concepts as kvConcepts } from './konsumentenverhalten/concepts';
import { figures as kvFigures } from './konsumentenverhalten/figures';
import { questions15 as kvQ15 } from './konsumentenverhalten/questions-1-5';
import { questions610 as kvQ610 } from './konsumentenverhalten/questions-6-10';
import { questionsImages as kvQImages } from './konsumentenverhalten/questions-images';

// --- Modul: Marketing 1 ---
import { chapters as m1Chapters } from './marketing1/chapters';
import { concepts as m1Concepts } from './marketing1/concepts';
import { figures as m1Figures } from './marketing1/figures';
import { questions13 as m1Q13 } from './marketing1/questions-1-3';
import { questions45 as m1Q45 } from './marketing1/questions-4-5';
import { questionsImages as m1QImages } from './marketing1/questions-images';

const konsumentenverhalten: LearningModule = {
  id: 'konsumentenverhalten',
  title: 'Konsumentenverhalten',
  studyProgram: 'Online-Marketing',
  imageDir: 'kv',
  chapters: kvChapters,
  concepts: kvConcepts,
  questions: [...kvQ15, ...kvQ610, ...kvQImages],
  figures: kvFigures,
};

const marketing1: LearningModule = {
  id: 'marketing1',
  title: 'Marketing 1',
  studyProgram: 'Online-Marketing',
  imageDir: 'mkt',
  chapters: m1Chapters,
  concepts: m1Concepts,
  questions: [...m1Q13, ...m1Q45, ...m1QImages],
  figures: m1Figures,
};

/**
 * Modul-Registry. Alle Module sind GLOBAL – jedes Profil kann sie sehen und
 * auswählen; nur der Speicherstand (Fortschritt) ist pro Profil UND Modul getrennt.
 */
const registry: Record<string, LearningModule> = {
  [konsumentenverhalten.id]: konsumentenverhalten,
  [marketing1.id]: marketing1,
};

/** Reihenfolge in der Auswahl. */
const ORDER = ['konsumentenverhalten', 'marketing1'];

export const DEFAULT_MODULE_ID = 'konsumentenverhalten';
export const MODULE_IDS = ORDER.filter((id) => registry[id]);

/** Aktives Modul aus dem Cookie "module" (server-seitig, synchron). */
export function getActiveModuleId(): string {
  try {
    // dynamisch, damit Client-Bundles/Tests nicht an next/headers hängen
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } = require('next/headers');
    const v = cookies().get('module')?.value;
    if (v && registry[v]) return v;
  } catch {
    // kein Request-Kontext (Tests) -> Standard
  }
  return DEFAULT_MODULE_ID;
}

/** Modul nach ID – ohne Argument das aktive Modul (aus Cookie). */
export function getModule(id?: string): LearningModule {
  const key = id ?? getActiveModuleId();
  return registry[key] ?? registry[DEFAULT_MODULE_ID];
}

export function getModuleById(id: string): LearningModule | undefined {
  return registry[id];
}

/** Kurzinfos aller Module (für Switcher/Übersicht). */
export function listModuleSummaries(): { id: string; title: string; studyProgram: string }[] {
  return MODULE_IDS.map((id) => {
    const m = registry[id];
    return { id: m.id, title: m.title, studyProgram: m.studyProgram };
  });
}

/** Alle Studiengänge mit ihren Modulen. */
export function listStudyPrograms(): { program: string; modules: { id: string; title: string }[] }[] {
  const byProgram = new Map<string, { id: string; title: string }[]>();
  for (const id of MODULE_IDS) {
    const m = registry[id];
    if (!byProgram.has(m.studyProgram)) byProgram.set(m.studyProgram, []);
    byProgram.get(m.studyProgram)!.push({ id: m.id, title: m.title });
  }
  return Array.from(byProgram.entries()).map(([program, modules]) => ({ program, modules }));
}
