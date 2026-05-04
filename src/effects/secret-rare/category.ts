import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createSecretRareCategory(cards: Card[]) {
  const pikachu = cards.find((card) => card.id === 'swsh12pt5-160');
  return createCategory(
    'Secret Rare (Gold)',
    'GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.',
    [cards[58], cards[59], cards[60], cards[61], cards[62], cards[63], pikachu].filter(
      (card): card is Card => !!card,
    ),
  );
}
