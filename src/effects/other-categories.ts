import type { Card } from '../types';
import { createCategory } from './category-utils';

export function createOtherCategories(cards: Card[]) {
  return [
    createCategory(
      'Secret Rare (Gold)',
      'GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.',
      cards.slice(58, 64),
    ),
    createCategory(
      'Trainer Gallery Holofoil',
      'Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.',
      cards.slice(19, 22),
    ),
    createCategory(
      'VMax',
      'The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.',
      cards.slice(37, 40),
    ),
    createCategory(
      'VMax (Alternate/Rainbow)',
      'Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.',
      cards.slice(40, 43),
    ),
    createCategory(
      'VStar',
      'Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.',
      cards.slice(43, 46),
    ),
    createCategory(
      'Trainer Holo',
      'Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.',
      cards.slice(46, 52),
    ),
    createCategory(
      'Trainer Gallery (V / VMax)',
      'Generally quite similar to the normal V and VMax cards, with a different background texture.',
      cards.slice(64, 70),
    ),
    createCategory(
      'Shiny Vault',
      'Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.',
      cards.slice(85, 91),
    ),
  ];
}
