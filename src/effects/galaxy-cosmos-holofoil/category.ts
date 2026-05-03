import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createGalaxyCosmosHolofoilCategory(cards: Card[]) {
  return createCategory(
    'Galaxy/Cosmos Holofoil',
    'Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.',
    cards.slice(13, 16),
  );
}
