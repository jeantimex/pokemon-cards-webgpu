import type { Card } from '../types';
import type { EffectCategory } from './category-types';
import { createCommonAndUncommonCategory } from './common-and-uncommon/category';
import { createGalaxyCosmosHolofoilCategory } from './galaxy-cosmos-holofoil/category';
import { createHolofoilAmazingRareCategory } from './holofoil-amazing-rare/category';
import { createHolofoilRareCategory } from './holofoil-rare/category';
import { createTrainerGalleryHoloCategory } from './trainer-gallery-holo/category';
import { createSecretRareCategory } from './secret-rare/category';
import { createShinyVaultCategory } from './shiny-vault/category';
import { createPokemonVAlternateArtCategory } from './pokemon-v-alternate-art/category';
import { createPokemonVCategory } from './pokemon-v/category';
import { createPokemonVFullArtCategory } from './pokemon-v-full-art/category';
import { createRadiantHolofoilCategory } from './radiant-holofoil/category';
import { createRainbowRareCategory } from './rainbow-rare/category';
import { createReverseHoloCategory } from './reverse-holo/category';
import { createTrainerGalleryVMaxCategory } from './trainer-gallery-v-max/category';
import { createTrainerGalleryVCategory } from './trainer-gallery-v/category';
import { createTrainerHoloCategory } from './trainer-holo/category';
import { createOtherCategories } from './other-categories';

export interface CardLibrary {
  categories: Record<string, Card[]>;
  descriptions: Record<string, string>;
  variants: Record<string, EffectCategory['variant']>;
  categoryNames: string[];
  initialCategory: string;
  initialCard: Card;
}

export function buildCardLibrary(cards: Card[], excludedCardIds: Set<string>): CardLibrary {
  const definitions = [
    createSecretRareCategory(cards),
    createCommonAndUncommonCategory(cards),
    createReverseHoloCategory(cards),
    createHolofoilRareCategory(cards),
    createTrainerGalleryHoloCategory(cards),
    createGalaxyCosmosHolofoilCategory(cards),
    createHolofoilAmazingRareCategory(cards),
    createRadiantHolofoilCategory(cards),
    createPokemonVCategory(cards),
    createPokemonVFullArtCategory(cards),
    createPokemonVAlternateArtCategory(cards),
    createRainbowRareCategory(cards),
    createShinyVaultCategory(cards),
    createTrainerGalleryVCategory(cards),
    createTrainerGalleryVMaxCategory(cards),
    createTrainerHoloCategory(cards),
    ...createOtherCategories(cards),
  ]
    .map((definition) => ({
      ...definition,
      cards: definition.cards
        .filter((card) => !excludedCardIds.has(card.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((definition) => definition.cards.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const categories = Object.fromEntries(
    definitions.map((definition) => [definition.name, definition.cards]),
  );
  const descriptions = Object.fromEntries(
    definitions.map((definition) => [definition.name, definition.description]),
  );
  const variants = Object.fromEntries(
    definitions.map((definition) => [definition.name, definition.variant]),
  );
  const categoryNames = definitions.map((definition) => definition.name);
  const initialCategory = categoryNames[0];
  const initialCard = categories[initialCategory][0];

  return {
    categories,
    descriptions,
    variants,
    categoryNames,
    initialCategory,
    initialCard,
  };
}
