import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createRadiantHolofoilCategory(cards: Card[]) {
  return createCategory(
    'Radiant Holofoil',
    'The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.',
    cards.slice(16, 19),
  );
}
