import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createVStarCategory(cards: Card[]) {
  return createCategory(
    'VStar',
    'Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.',
    cards
      .slice(43, 46)
      .filter((card) => card.rarity.toLowerCase() === 'rare holo vstar')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
