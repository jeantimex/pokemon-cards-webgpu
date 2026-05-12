import { GUI } from 'lil-gui';
import type { Card } from '../types';
import type { CardLibrary } from '../effects/library';
import type { WebGpuCardRenderer } from '../rendering/webgpu-card-renderer';

interface CardLibraryGuiOptions {
  cardLibrary: CardLibrary;
  cards: Card[];
  initialCategory: string;
  initialCardId: string;
  onCardChange: (card: Card, categoryName: string) => Promise<void> | void;
  onSelectionChange?: (card: Card, categoryName: string) => void;
  webgpuRenderer?: WebGpuCardRenderer;
}

export function setupCardLibraryGui({
  cardLibrary,
  cards,
  initialCategory,
  initialCardId,
  onCardChange,
  onSelectionChange,
  webgpuRenderer,
}: CardLibraryGuiOptions) {
  const gui = new GUI({ title: 'Card Library' });
  gui.close();

  const radiantParams = {
    patternWidth: 0.2,
    patternHeight: 0.4,
  };

  function updateRadiantPattern(categoryName: string) {
    if (categoryName === 'Radiant Holofoil') {
      webgpuRenderer?.setPatternParams(radiantParams.patternWidth, radiantParams.patternHeight);
    }
  }

  const guiState = {
    category: cardLibrary.categoryNames.includes(initialCategory)
      ? initialCategory
      : cardLibrary.initialCategory,
    activeId: initialCardId,
  };

  const descEl = document.createElement('div');
  descEl.className = 'gui-description';

  const getCardMap = (cat: string) => {
    return Object.fromEntries(cardLibrary.categories[cat].map((c) => [c.name, c.id]));
  };

  const setSelection = async (card: Card, categoryName: string) => {
    guiState.category = categoryName;
    guiState.activeId = card.id;
    descEl.textContent = cardLibrary.descriptions[categoryName];
    cardDropdown.options(getCardMap(categoryName));
    cardDropdown.updateDisplay();
    updateRadiantPattern(categoryName);
    onSelectionChange?.(card, categoryName);
    await onCardChange(card, categoryName);
  };

  const typeController = gui
    .add(guiState, 'category', cardLibrary.categoryNames)
    .name('Type')
    .onChange(async (cat: string) => {
      const group = cardLibrary.categories[cat];
      if (group.length > 0) {
        await setSelection(group[0], cat);
      }
    });

  typeController.domElement.parentElement?.appendChild(descEl);
  descEl.textContent = cardLibrary.descriptions[guiState.category];

  const cardDropdown = gui
    .add(guiState, 'activeId', getCardMap(guiState.category))
    .name('Select Card')
    .onChange(async (id: string) => {
      const card = cards.find((c) => c.id === id);
      if (card) {
        await setSelection(card, guiState.category);
      }
    });

  const initialCard =
    cardLibrary.categories[guiState.category].find((card) => card.id === initialCardId) ??
    cardLibrary.categories[guiState.category][0];

  if (initialCard) {
    guiState.activeId = initialCard.id;
    void setSelection(initialCard, guiState.category);
  }
}
