import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createPokemonVFullArtCategory(cards: Card[]) {
  return createCategory(
    'Pokemon V (Full Art)',
    'Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.',
    cards.slice(25, 28),
  );
}
