import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createSecretRareCategory(cards: Card[]) {
  return createCategory(
    'Secret Rare (Gold)',
    'GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.',
    cards.slice(58, 64),
  );
}
