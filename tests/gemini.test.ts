import { afterEach, describe, expect, it, vi } from 'vitest';
import { geminiGenerate, normalizeModelName, thinkingConfigFor } from '@/lib/gemini';

describe('Gemini-Client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('wählt die Denk-Einstellung passend zur Modellgeneration', () => {
    expect(thinkingConfigFor('gemini-2.5-flash', 0)).toEqual({ thinkingBudget: 0 });
    expect(thinkingConfigFor('gemini-3.5-flash-lite', 0)).toEqual({ thinkingLevel: 'minimal' });
    expect(thinkingConfigFor('gemini-3.1-flash-lite', 0)).toEqual({ thinkingLevel: 'minimal' });
    expect(thinkingConfigFor('gemini-3.8-flash', 0)).toEqual({ thinkingLevel: 'low' });
    expect(thinkingConfigFor('gemini-3.5-flash-lite', undefined)).toBeUndefined();
  });

  it('normalisiert Modellnamen aus der Umgebungsvariable', () => {
    expect(normalizeModelName('Gemini 3.5 Flash Lite')).toBe('gemini-3.5-flash-lite');
    expect(normalizeModelName('models/gemini-3.5-flash-lite')).toBe('gemini-3.5-flash-lite');
    expect(normalizeModelName('  gemini-2.5-flash ')).toBe('gemini-2.5-flash');
    expect(normalizeModelName(undefined)).toBe('gemini-3.5-flash-lite');
  });

  it('sendet thinkingLevel statt thinkingBudget und wiederholt bei HTTP 400 ohne Denk-Einstellung', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-key');
    vi.stubEnv('GEMINI_MODEL', 'gemini-3.5-flash-lite');
    const bodies: any[] = [];
    const fetchMock = vi.fn(async (_url: string, init: any) => {
      bodies.push(JSON.parse(init.body));
      if (bodies.length === 1) return new Response('{"error":{"code":400,"status":"INVALID_ARGUMENT"}}', { status: 400 });
      return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Antwort' }] } }] }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);
    const text = await geminiGenerate({ system: 's', turns: [{ role: 'user', text: 'Frage' }], thinkingBudget: 0 });
    expect(text).toBe('Antwort');
    expect(bodies[0].generationConfig.thinkingConfig).toEqual({ thinkingLevel: 'minimal' });
    expect(bodies[1].generationConfig.thinkingConfig).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('liefert null (Offline-Fallback) bei dauerhaftem Fehler', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-key');
    vi.stubEnv('GEMINI_MODEL', 'gemini-3.5-flash-lite');
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 500 })));
    const text = await geminiGenerate({ system: 's', turns: [{ role: 'user', text: 'Frage' }] });
    expect(text).toBeNull();
  });
});
