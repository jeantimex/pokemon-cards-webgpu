import type { Card } from '../types';

export type EffectVariant = 'standard' | 'reverse-holo';

export interface EffectCategory {
  name: string;
  description: string;
  cards: Card[];
  variant: EffectVariant;
}
