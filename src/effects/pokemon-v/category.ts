import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createPokemonVCategory(cards: Card[]) {
  return createCategory(
    'Pokemon V',
    'Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.',
    cards.slice(22, 25),
  );
}
