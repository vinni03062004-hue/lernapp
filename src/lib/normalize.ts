/**
 * Text-Normalisierung für Antwortvergleich und Retrieval.
 * Deutsch-tauglich: Umlaute, ß, Groß-/Kleinschreibung, einfache Stammformen.
 */

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set(
  (
    'der die das den dem des ein eine einen einem einer eines und oder aber auch nicht kein keine ist sind war waren wird werden wurde wurden hat haben hatte hatten kann koennen muss muessen soll sollen darf duerfen mit ohne von vom zum zur im in am an auf fuer bei durch ueber unter nach vor aus als wie wenn dann dass weil denn was wer wo wann warum welche welcher welches es er sie wir ihr ich du man sich noch nur sehr mehr etwas alle allem allen alles zwischen gegen um bis seit beim also sowie bzw z b zb etc'
  ).split(' ')
);

export function tokenize(s: string): string[] {
  return normalize(s)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/** einfache deutsche Stammform: schneidet häufige Endungen ab */
export function stem(t: string): string {
  let w = t;
  for (const suf of ['ungen', 'ung', 'heiten', 'heit', 'keiten', 'keit', 'ionen', 'ion', 'isch', 'lich', 'ende', 'enden', 'ern', 'en', 'er', 'es', 'e', 's', 'n']) {
    if (w.length - suf.length >= 4 && w.endsWith(suf)) {
      w = w.slice(0, -suf.length);
      break;
    }
  }
  return w;
}

export function stems(s: string): string[] {
  return tokenize(s).map(stem);
}

/** Levenshtein-Distanz (für Tippfehler-Toleranz bei Lückentexten). */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[n];
}

/** Fuzzy-Gleichheit zweier kurzer Antworten (Tippfehler-tolerant). */
export function fuzzyEquals(input: string, expected: string): boolean {
  const a = normalize(input);
  const b = normalize(expected);
  if (a === b) return true;
  if (a.length >= 5 && b.length >= 5) {
    const dist = levenshtein(a, b);
    return dist <= Math.max(1, Math.floor(b.length * 0.2));
  }
  return false;
}

/** Enthält der Text eines der Stichworte (stamm- und fuzzy-tolerant)? */
export function containsKeyword(text: string, keyword: string): boolean {
  const textNorm = normalize(text);
  const kwNorm = normalize(keyword);
  if (kwNorm.includes(' ')) {
    // Mehrwort-Stichwort: als Phrase oder alle Wörter einzeln
    if (textNorm.includes(kwNorm)) return true;
    const kwTokens = stems(keyword);
    const textStems = new Set(stems(text));
    return kwTokens.length > 0 && kwTokens.every((k) => textStems.has(k));
  }
  if (textNorm.includes(kwNorm)) return true;
  const kwStem = stem(kwNorm);
  for (const ts of stems(text)) {
    if (ts === kwStem) return true;
    if (kwStem.length >= 5 && levenshtein(ts, kwStem) <= 1) return true;
  }
  return false;
}
