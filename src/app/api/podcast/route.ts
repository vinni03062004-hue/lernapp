import { NextRequest, NextResponse } from 'next/server';
import { getModule } from '@/content';
import { buildPodcastScript } from '@/lib/podcast';
import { loadState, saveState } from '@/lib/store';

export const dynamic = 'force-dynamic';

/**
 * Podcast-Modus.
 *  - GET /api/podcast                → Kapitelliste [{ id, index, title }]
 *  - GET /api/podcast?chapter=k1     → { chapterId, index, title, script }
 *  - GET /api/podcast?chapter=k1&refresh=1 → Skript neu erzeugen (Cache umgehen)
 *
 * Skripte werden im Zustand gecacht, damit sie nur einmal erzeugt werden.
 */
export async function GET(req: NextRequest) {
  try {
    const mod = getModule();
    const chapterId = req.nextUrl.searchParams.get('chapter');
    const refresh = req.nextUrl.searchParams.get('refresh') === '1';

    if (!chapterId) {
      return NextResponse.json({
        chapters: mod.chapters.map((c) => ({ id: c.id, index: c.index, title: c.title })),
      });
    }

    const chapter = mod.chapters.find((c) => c.id === chapterId);
    if (!chapter) {
      return NextResponse.json({ error: 'Kapitel nicht gefunden.' }, { status: 404 });
    }

    const state = await loadState();
    const cache = state.podcastScripts ?? {};
    const cached = cache[chapterId];
    if (cached && !refresh) {
      return NextResponse.json({ chapterId, index: chapter.index, title: chapter.title, script: cached.script, cached: true });
    }

    const result = await buildPodcastScript(mod, chapterId);
    if (!result) {
      return NextResponse.json({ error: 'Skript konnte nicht erstellt werden.' }, { status: 500 });
    }

    // Cache aktualisieren (bestleistungsfähig – Fehler beim Speichern sind unkritisch).
    try {
      cache[chapterId] = { title: result.title, script: result.script, generatedAt: Date.now() };
      state.podcastScripts = cache;
      await saveState(state);
    } catch (e) {
      console.error('[api/podcast] Cache-Speichern fehlgeschlagen (unkritisch):', e);
    }

    return NextResponse.json({ chapterId, index: result.index, title: result.title, script: result.script, cached: false });
  } catch (err) {
    console.error('[api/podcast]', err);
    return NextResponse.json({ error: 'Podcast konnte nicht geladen werden.' }, { status: 500 });
  }
}
