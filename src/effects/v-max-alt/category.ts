import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createVMaxAlternateRainbowCategory(cards: Card[]) {
  return createCategory(
    'VMax (Alternate/Rainbow)',
    'Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.',
    cards
      .slice(40, 43)
      .filter((card) => card.rarity.toLowerCase() === 'rare rainbow')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
