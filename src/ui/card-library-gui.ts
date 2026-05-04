import { GUI } from 'lil-gui';
import type { Card } from '../types';
import type { CardLibrary } from '../effects/library';

interface CardLibraryGuiOptions {
  cardLibrary: CardLibrary;
  cards: Card[];
  onCardChange: (card: Card, categoryName: string) => Promise<void> | void;
}

export function setupCardLibraryGui({ cardLibrary, cards, onCardChange }: CardLibraryGuiOptions) {
  const gui = new GUI({ title: 'Card Library' });
  const guiState = {
    category: cardLibrary.initialCategory,
    activeId: cardLibrary.initialCard.id,
  };

  const descEl = document.createElement('div');
  descEl.className = 'gui-description';
  descEl.textContent = cardLibrary.descriptions[guiState.category];

  const getCardMap = (cat: string) => {
    return Object.fromEntries(cardLibrary.categories[cat].map((c) => [c.name, c.id]));
  };

  const typeController = gui
    .add(guiState, 'category', cardLibrary.categoryNames)
    .name('Type')
    .onChange(async (cat: string) => {
      const group = cardLibrary.categories[cat];
      if (group.length > 0) {
        const firstCard = group[0];
        guiState.activeId = firstCard.id;

        descEl.textContent = cardLibrary.descriptions[cat];
        cardDropdown.options(getCardMap(cat));
        cardDropdown.updateDisplay();

        await onCardChange(firstCard, cat);
      }
    });

  typeController.domElement.parentElement?.appendChild(descEl);

  const cardDropdown = gui
    .add(guiState, 'activeId', getCardMap(guiState.category))
    .name('Select Card')
    .onChange(async (id: string) => {
      const card = cards.find((c) => c.id === id);
      if (card) {
        await onCardChange(card, guiState.category);
      }
    });

  void onCardChange(cardLibrary.initialCard, guiState.category);
}
