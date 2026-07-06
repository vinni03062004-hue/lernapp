'use client';

/**
 * Podcast-Modus (kostenlose Browser-Sprachausgabe).
 *
 * - Skripte kommen von /api/podcast (KI-erzeugt, gecacht).
 * - Vorgelesen wird mit der Web-Speech-API (SpeechSynthesis) des Browsers.
 * - Kapitel einzeln abspielbar ODER "Alles ab Kapitel 1" mit Autoplay.
 *
 * Robustheit:
 * - Satzweise Wiedergabe (umgeht den Chrome-15-Sekunden-Abbruch bei langen Texten).
 * - playToken invalidiert veraltete onend-Callbacks bei Kapitelwechsel/Stopp.
 * - Keep-alive-Resume gegen das Einfrieren der Sprachausgabe.
 * - Feature-Detection + sauberes Aufräumen beim Verlassen der Seite.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface ChapterRef {
  id: string;
  index: number;
  title: string;
}

type Status = 'idle' | 'loading' | 'playing' | 'paused';

function splitSentences(text: string): string[] {
  const rough = text
    .replace(/\s+/g, ' ')
    .trim()
    .match(/[^.!?…]+[.!?…]+|\S[^.!?…]*$/g) ?? [];
  const chunks: string[] = [];
  for (const raw of rough) {
    const s = raw.trim();
    if (!s) continue;
    if (s.length <= 200) {
      chunks.push(s);
    } else {
      // sehr lange Sätze weiter an Kommas/Semikolons zerlegen
      let buf = '';
      for (const part of s.split(/(?<=[,;:])\s/)) {
        if ((buf + ' ' + part).trim().length > 200 && buf) {
          chunks.push(buf.trim());
          buf = part;
        } else {
          buf = (buf ? buf + ' ' : '') + part;
        }
      }
      if (buf.trim()) chunks.push(buf.trim());
    }
  }
  return chunks;
}

export default function PodcastPage() {
  const [supported, setSupported] = useState(true);
  const [chapters, setChapters] = useState<ChapterRef[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>('');
  const [rate, setRate] = useState(0.95);
  const [playAll, setPlayAll] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [currentId, setCurrentId] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [error, setError] = useState<string>('');

  // Refs für Werte, die aktuelle Callbacks zur Laufzeit brauchen
  const tokenRef = useRef(0);
  const playAllRef = useRef(false);
  const rateRef = useRef(0.95);
  const voiceRef = useRef<string>('');
  const chaptersRef = useRef<ChapterRef[]>([]);
  const sentencesRef = useRef<string[]>([]);
  const cacheRef = useRef<Map<string, { title: string; script: string }>>(new Map());
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIdRef = useRef<string>('');
  const speakFromRef = useRef<(startIdx: number) => void>(() => {});
  const playChapterRef = useRef<(chapterId: string, fromUserClick: boolean) => Promise<void>>(async () => {});

  useEffect(() => { playAllRef.current = playAll; }, [playAll]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
  useEffect(() => { voiceRef.current = voiceURI; }, [voiceURI]);
  useEffect(() => { chaptersRef.current = chapters; }, [chapters]);
  useEffect(() => { sentencesRef.current = sentences; }, [sentences]);

  // Feature-Detection + Stimmen laden
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      if (!all.length) return;
      const de = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith('de'));
      const list = de.length ? de : all;
      setVoices(list);
      setVoiceURI((prev) => {
        if (prev && list.some((v) => v.voiceURI === prev)) return prev;
        // bevorzugt eine deutsche, möglichst hochwertige Stimme
        const preferred =
          list.find((v) => /google/i.test(v.name) && v.lang.toLowerCase().startsWith('de')) ||
          list.find((v) => v.lang.toLowerCase() === 'de-de') ||
          list[0];
        return preferred ? preferred.voiceURI : '';
      });
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Keep-alive gegen das Einfrieren der Sprachausgabe (bekannter Chrome-Bug)
    keepAliveRef.current = setInterval(() => {
      const s = window.speechSynthesis;
      if (s.speaking && !s.paused) {
        s.resume();
      }
    }, 10000);

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      tokenRef.current++;
      try { window.speechSynthesis.cancel(); } catch {}
    };
  }, []);

  // Kapitelliste laden
  useEffect(() => {
    fetch('/api/podcast')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d.chapters)) setChapters(d.chapters); })
      .catch(() => setError('Kapitel konnten nicht geladen werden.'));
  }, []);

  const fetchScript = useCallback(async (chapterId: string): Promise<{ title: string; script: string } | null> => {
    const cached = cacheRef.current.get(chapterId);
    if (cached) return cached;
    try {
      const res = await fetch(`/api/podcast?chapter=${encodeURIComponent(chapterId)}`);
      const data = await res.json();
      if (!res.ok || !data.script) return null;
      const entry = { title: data.title as string, script: data.script as string };
      cacheRef.current.set(chapterId, entry);
      return entry;
    } catch {
      return null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    tokenRef.current++;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    setStatus('idle');
  }, []);

  // Kern: Sätze eines Kapitels nacheinander sprechen
  const speakFrom = useCallback((startIdx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const token = ++tokenRef.current;

    const speakNext = (i: number) => {
      if (token !== tokenRef.current) return; // veralteter Ablauf → abbrechen
      const list = sentencesRef.current;
      if (i >= list.length) {
        // Kapitel fertig
        if (playAllRef.current) {
          const chs = chaptersRef.current;
          const pos = chs.findIndex((c) => c.id === currentIdRef.current);
          const next = pos >= 0 ? chs[pos + 1] : undefined;
          if (next) { void playChapterRef.current(next.id, false); return; }
        }
        setStatus('idle');
        return;
      }
      setSentenceIdx(i);
      const u = new SpeechSynthesisUtterance(list[i]);
      const v = voices.find((vv) => vv.voiceURI === voiceRef.current);
      if (v) u.voice = v;
      u.lang = v?.lang || 'de-DE';
      u.rate = rateRef.current;
      u.pitch = 0.95; // etwas tiefer/wärmer
      u.onend = () => { if (token === tokenRef.current) speakNext(i + 1); };
      u.onerror = () => { if (token === tokenRef.current) speakNext(i + 1); };
      synth.speak(u);
    };

    // kleiner Delay: manche Browser ignorieren speak() direkt nach cancel()
    setStatus('playing');
    setTimeout(() => { if (token === tokenRef.current) speakNext(startIdx); }, 60);
  }, [voices]);

  // Refs auf aktuelle Funktionen/IDs (für Autoplay-Verkettung ohne Stale-Closure)
  useEffect(() => { currentIdRef.current = currentId; }, [currentId]);
  useEffect(() => { speakFromRef.current = speakFrom; }, [speakFrom]);

  const playChapter = useCallback(async (chapterId: string, fromUserClick: boolean) => {
    setError('');
    stopSpeech();
    const myToken = tokenRef.current; // erkennt zwischenzeitliche Klicks/Stopps
    setStatus('loading');
    const data = await fetchScript(chapterId);
    // Wurde inzwischen ein anderes Kapitel gestartet oder gestoppt? Dann abbrechen.
    if (tokenRef.current !== myToken) return;
    if (!data) {
      setError('Dieses Kapitel konnte nicht geladen werden. Bitte erneut versuchen.');
      setStatus('idle');
      return;
    }
    const sents = splitSentences(data.script);
    setCurrentId(chapterId);
    currentIdRef.current = chapterId;
    setCurrentTitle(data.title);
    setSentences(sents);
    sentencesRef.current = sents;
    setSentenceIdx(0);
    // nächstes Kapitel im Hintergrund vorladen (flüssiger Autoplay)
    const chs = chaptersRef.current;
    const pos = chs.findIndex((c) => c.id === chapterId);
    if (pos >= 0 && chs[pos + 1]) void fetchScript(chs[pos + 1].id);
    speakFromRef.current(0);
    void fromUserClick;
  }, [fetchScript, stopSpeech]);

  useEffect(() => { playChapterRef.current = playChapter; }, [playChapter]);

  // Steuerung
  const onPlayAllFromStart = useCallback(() => {
    const chs = chaptersRef.current;
    if (!chs.length) return;
    setPlayAll(true);
    playAllRef.current = true;
    void playChapter(chs[0].id, true);
  }, [playChapter]);

  const onPause = useCallback(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  }, []);

  const onResume = useCallback(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus('playing');
    } else if (currentIdRef.current && status !== 'playing') {
      // nichts pausiert, aber ein Kapitel gewählt → ab aktuellem Satz starten
      speakFromRef.current(sentenceIdx);
    }
  }, [status, sentenceIdx]);

  const onStop = useCallback(() => {
    setPlayAll(false);
    playAllRef.current = false;
    stopSpeech();
    setSentenceIdx(0);
  }, [stopSpeech]);

  if (!supported) {
    return (
      <div>
        <h1>Podcast-Modus</h1>
        <div className="card">
          <p>
            Dein Browser unterstützt die Sprachausgabe leider nicht. Öffne die App in einem aktuellen
            Chrome, Edge, Safari oder Firefox, um den Podcast-Modus zu nutzen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Podcast-Modus</h1>
      <p className="page-sub">
        Lehne dich zurück und hör dir die Kapitel erklären an – einzeln oder komplett am Stück. Ideal für den Abend
        oder zum Nebenbei-Wiederholen.
      </p>

      {error && <div className="feedback-box bad" style={{ marginBottom: 12 }}>{error}</div>}

      <div className="grid cols-2" style={{ alignItems: 'start' }}>
        {/* Player */}
        <div className="card">
          <h2>Wiedergabe</h2>
          {currentTitle ? (
            <>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{currentTitle}</div>
              <div className="small dim" style={{ marginBottom: 8 }}>
                {status === 'loading' ? 'Skript wird vorbereitet …' :
                  sentences.length ? `Abschnitt ${Math.min(sentenceIdx + 1, sentences.length)} von ${sentences.length}` : ''}
                {playAll && ' · Autoplay aktiv'}
              </div>
              <div className="progress-track" style={{ marginBottom: 12 }}>
                <div className="progress-fill" style={{ width: `${sentences.length ? ((sentenceIdx + 1) / sentences.length) * 100 : 0}%` }} />
              </div>
              {sentences[sentenceIdx] && (
                <div className="card" style={{ background: 'transparent', fontSize: '1.05rem', lineHeight: 1.5 }}>
                  {sentences[sentenceIdx]}
                </div>
              )}
            </>
          ) : (
            <div className="empty-state small">Wähle rechts ein Kapitel oder starte alle Kapitel am Stück.</div>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {status === 'playing' ? (
              <button className="btn" onClick={onPause}>⏸ Pause</button>
            ) : (
              <button className="btn primary" onClick={onResume} disabled={!currentId && status !== 'paused'}>▸ Weiter</button>
            )}
            <button className="btn" onClick={onStop} disabled={status === 'idle' && !currentId}>■ Stopp</button>
            <button className="btn" onClick={onPlayAllFromStart}>⭢ Alles ab Kapitel 1</button>
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="small dim">Stimme</label>
            <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)} style={{ width: '100%', marginTop: 4 }}>
              {voices.length === 0 && <option value="">(lädt Stimmen …)</option>}
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
              ))}
            </select>
            <p className="small dim" style={{ marginTop: 6 }}>
              Tipp: „Google Deutsch" klingt in Chrome am natürlichsten. Verfügbare Stimmen hängen vom Gerät/Browser ab.
            </p>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="small dim">Tempo: {rate.toFixed(2)}×</label>
            <input type="range" min={0.7} max={1.3} step={0.05} value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>

        {/* Kapitelliste */}
        <div className="card">
          <h2>Kapitel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chapters.map((c) => (
              <button
                key={c.id}
                className={`btn ${c.id === currentId ? 'primary' : ''}`}
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => { setPlayAll(false); playAllRef.current = false; void playChapter(c.id, true); }}
              >
                <span aria-hidden style={{ marginRight: 8 }}>▸</span>
                Kapitel {c.index}: {c.title}
              </button>
            ))}
            {chapters.length === 0 && <div className="empty-state small">Kapitel werden geladen …</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
