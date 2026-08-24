/**
 * Generates a 32-bit hash from a string seed.
 * Standard xmur3 algorithm.
 */
export function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/**
 * Generates a pseudo-random float between 0 (inclusive) and 1 (exclusive) based on a 32-bit integer seed.
 * Standard Mulberry32 algorithm.
 */
export function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a seeded random generator function from a string seed.
 */
export function getSeededRandom(seedStr: string): () => number {
  const hash = xmur3(seedStr);
  return mulberry32(hash());
}

/**
 * Generates a random seed string in the format KF-XXXXXX
 */
export function generateRandomSeed(): string {
  return `KF-${Math.floor(100000 + Math.random() * 900000)}`;
}
