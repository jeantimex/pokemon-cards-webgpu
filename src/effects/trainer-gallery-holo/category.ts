import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createTrainerGalleryHoloCategory(cards: Card[]) {
  return createCategory(
    'Trainer Gallery Holofoil',
    'Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.',
    cards
      .filter((card) => card.rarity.toLowerCase() === 'trainer gallery rare holo')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
