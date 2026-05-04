import type { Card } from '../types';
import { createCategory } from './category-utils';

export function createOtherCategories(cards: Card[]) {
  return [
    createCategory(
      'VStar',
      'Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.',
      cards.slice(43, 46),
    ),
  ];
}
