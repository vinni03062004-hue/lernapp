import { Concept } from '@/lib/types';
import { concepts1 } from './concepts-1';
import { concepts2 } from './concepts-2';
import { concepts3 } from './concepts-3';
import { concepts4 } from './concepts-4';
import { concepts5 } from './concepts-5';
import { cardOverrides, overviewIds } from './lernkarten';

/**
 * Alle Begriffe des Moduls Marketing I (Kapitel 1–5), aus dem Skript extrahiert –
 * ergänzt um die Lernkarten-Fassung (Kurzdefinition/Stichpunkte, siehe lernkarten.ts).
 */
export const concepts: Concept[] = [...concepts1, ...concepts2, ...concepts3, ...concepts4, ...concepts5].map((c) => ({
  ...c,
  ...(cardOverrides[c.id] ?? {}),
  ...(overviewIds.has(c.id) ? { overview: true } : {}),
}));
