import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createReverseHoloCategory(cards: Card[]) {
  return createCategory(
    'Reverse Holo non-rares',
    'Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.',
    [...cards.slice(4, 7), ...cards.slice(70, 76)],
    'reverse-holo',
  );
}
