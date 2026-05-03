import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createRainbowRareCategory(cards: Card[]) {
  return createCategory(
    'Rainbow Rare',
    'Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.',
    cards.slice(52, 58),
  );
}
