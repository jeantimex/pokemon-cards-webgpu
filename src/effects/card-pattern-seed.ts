import type { Card } from '../types';

export interface CardPatternSeed {
  x: number;
  y: number;
  cosmosPixels: {
    x: number;
    y: number;
  };
}

function hashString(value: string, seed: number) {
  let hash = seed;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function toUnit(value: number) {
  return value / 0xffffffff;
}

export function getCardPatternSeed(card: Card): CardPatternSeed {
  const key = `${card.id}:${card.set}:${card.number}`;
  const x = toUnit(hashString(key, 2166136261));
  const y = toUnit(hashString(key, 709607));
  const cosmosPixels = {
    x: Math.floor(x * 734),
    y: Math.floor(y * 1280),
  };

  return {
    x,
    y,
    cosmosPixels,
  };
}
