import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createTrainerGalleryVMaxCategory(cards: Card[]) {
  return createCategory(
    'Trainer Gallery (VMax)',
    'Generally quite similar to the normal V and VMax cards, with a different background texture.',
    cards
      .slice(64, 70)
      .filter((card) => card.rarity.toLowerCase() === 'rare holo vmax')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
