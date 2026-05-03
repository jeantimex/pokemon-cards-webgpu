import type { Card } from '../types';
import { createCategory } from './category-utils';

export function createOtherCategories(cards: Card[]) {
  return [
    createCategory(
      'Trainer Gallery Holofoil',
      'Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.',
      cards.slice(19, 22),
    ),
    createCategory(
      'VMax',
      'The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.',
      cards.slice(37, 40),
    ),
    createCategory(
      'VMax (Alternate/Rainbow)',
      'Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.',
      cards.slice(40, 43),
    ),
    createCategory(
      'VStar',
      'Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.',
      cards.slice(43, 46),
    ),
    createCategory(
      'Trainer Holo',
      'Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.',
      cards.slice(46, 52),
    ),
  ];
}
