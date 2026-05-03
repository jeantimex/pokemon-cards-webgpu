import type { Card } from '../../types';
import { createCategory } from '../category-utils';

export function createShinyVaultCategory(cards: Card[]) {
  return createCategory(
    'Shiny Vault',
    'Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.',
    cards.slice(85, 91),
  );
}
