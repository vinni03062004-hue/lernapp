import { LearningModule } from '@/lib/types';
import { chapters } from './konsumentenverhalten/chapters';
import { concepts } from './konsumentenverhalten/concepts';
import { figures } from './konsumentenverhalten/figures';
import { questions15 } from './konsumentenverhalten/questions-1-5';
import { questions610 } from './konsumentenverhalten/questions-6-10';
import { questionsImages } from './konsumentenverhalten/questions-images';

/**
 * Modul-Registry. Aktuell ein Modul (Konsumentenverhalten);
 * weitere Module können hier ergänzt werden.
 */
const konsumentenverhalten: LearningModule = {
  id: 'konsumentenverhalten',
  title: 'Konsumentenverhalten',
  studyProgram: 'Online-Marketing',
  chapters,
  concepts,
  questions: [...questions15, ...questions610, ...questionsImages],
  figures,
};

export function getModule(): LearningModule {
  return konsumentenverhalten;
}
