import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createTrainerHoloCategory(cards: Card[]) {
  return createCategory(
    'Trainer Holo',
    'Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.',
    cards
      .filter(
        (card) =>
          card.rarity.toLowerCase() === 'rare ultra' && card.subtypes?.includes('Supporter'),
      )
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
