import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createVMaxCategory(cards: Card[]) {
  return createCategory(
    'VMax',
    'The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.',
    cards
      .slice(37, 40)
      .filter((card) => card.rarity.toLowerCase() === 'rare holo vmax')
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}
