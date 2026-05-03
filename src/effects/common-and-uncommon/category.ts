import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createCommonAndUncommonCategory(cards: Card[]) {
  return createCategory(
    'Common & Uncommon',
    'All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.',
    cards.slice(1, 4),
  );
}
