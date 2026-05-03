import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createTrainerGalleryVCategory(cards: Card[]) {
  return createCategory(
    'Trainer Gallery (V)',
    'Generally quite similar to the normal V and VMax cards, with a different background texture.',
    cards
      .slice(64, 70)
      .filter((card) => card.rarity.toLowerCase() === 'rare holo v')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
