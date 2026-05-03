import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createHolofoilRareCategory(cards: Card[]) {
  return createCategory(
    'Holofoil Rare',
    'Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.',
    cards.slice(7, 13),
  );
}
