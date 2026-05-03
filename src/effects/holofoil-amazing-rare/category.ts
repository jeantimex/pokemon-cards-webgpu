import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createHolofoilAmazingRareCategory(cards: Card[]) {
  return createCategory(
    'Holofoil Amazing Rare',
    'Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.',
    cards.slice(76, 85),
  );
}
