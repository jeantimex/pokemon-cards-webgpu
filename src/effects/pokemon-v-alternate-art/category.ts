import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createPokemonVAlternateArtCategory(cards: Card[]) {
  return createCategory(
    'Pokemon V (Alternate Art)',
    'Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.',
    cards.slice(28, 34),
  );
}
