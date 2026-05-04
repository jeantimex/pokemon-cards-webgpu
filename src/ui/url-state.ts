import type { Card } from '../types';
import type { CardLibrary } from '../effects/library';

export interface CardSelection {
  category: string;
  card: Card;
}

const DEFAULT_CATEGORY_ID = 'secret-rare-gold';
const DEFAULT_CARD_ID = 'swsh12pt5-160';

export function getCategoryId(categoryName: string) {
  return categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCategoryNameFromId(cardLibrary: CardLibrary, categoryId: string) {
  return (
    cardLibrary.categoryNames.find((name) => name === categoryId) ??
    cardLibrary.categoryNames.find((name) => getCategoryId(name) === categoryId)
  );
}

export function readCardSelectionFromUrl(cardLibrary: CardLibrary, cards: Card[]): CardSelection {
  const params = new URLSearchParams(window.location.search);
  const requestedCategoryId = params.get('type') ?? DEFAULT_CATEGORY_ID;
  const category =
    getCategoryNameFromId(cardLibrary, requestedCategoryId) ?? cardLibrary.initialCategory;

  const categoryCards = cardLibrary.categories[category];
  const requestedCardId = params.get('card') ?? DEFAULT_CARD_ID;
  const card =
    categoryCards.find((item) => item.id === requestedCardId) ?? categoryCards[0] ?? cards[0];

  return {
    category,
    card,
  };
}

export function writeCardSelectionToUrl(category: string, card: Card) {
  const url = new URL(window.location.href);
  url.searchParams.set('type', getCategoryId(category));
  url.searchParams.set('card', card.id);
  history.replaceState({}, '', url);
}
