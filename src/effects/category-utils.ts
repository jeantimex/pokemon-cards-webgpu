import type { Card } from '../types';
import type { EffectCategory, EffectVariant } from './category-types';

export function createCategory(
  name: string,
  description: string,
  cards: Card[],
  variant: EffectVariant = 'standard',
): EffectCategory {
  return { name, description, cards, variant };
}
