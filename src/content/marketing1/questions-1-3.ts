import { Question } from '@/lib/types';
import { questions1 } from './questions-1';
import { questions2 } from './questions-2';
import { questions3 } from './questions-3';

/** Fragen zu Kapitel 1–3 (Grundlagen, Produktpolitik, Kommunikationspolitik). */
export const questions13: Question[] = [...questions1, ...questions2, ...questions3];
