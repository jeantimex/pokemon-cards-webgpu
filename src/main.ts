import './style.css';
import './effects/common-and-uncommon/index.css';
import './effects/galaxy-cosmos-holofoil/index.css';
import './effects/holofoil-amazing-rare/index.css';
import './effects/holofoil-rare/index.css';
import './effects/trainer-gallery-holo/index.css';
import './effects/trainer-holo/index.css';
import './effects/secret-rare/index.css';
import './effects/reverse-holo/index.css';
import './effects/pokemon-v/index.css';
import './effects/pokemon-v-full-art/index.css';
import './effects/pokemon-v-alternate-art/index.css';
import './effects/v-max/index.css';
import './effects/v-max-alt/index.css';
import './effects/v-star/index.css';
import './effects/trainer-gallery-v/index.css';
import './effects/trainer-gallery-v-max/index.css';
import './effects/radiant-holofoil/index.css';
import './effects/rainbow-rare/index.css';
import './effects/shiny-vault/index.css';
import { getLocalCardImageUrl } from './effects/asset-paths';
import { buildCardLibrary } from './effects/library';
import { appUrl, applyAssetUrlVariables } from './app/asset-url';
import { createCssCardController } from './ui/css-card-controller';
import { setupCardLibraryGui } from './ui/card-library-gui';
import { readCardSelectionFromUrl, writeCardSelectionToUrl } from './ui/url-state';
import { createWebGpuCardRenderer } from './rendering/webgpu-card-renderer';
import type { Card } from './types';

async function init() {
  applyAssetUrlVariables();

  const canvas = document.querySelector<HTMLCanvasElement>('#webgpu-canvas')!;
  const cssCard = document.querySelector<HTMLElement>('#css-card')!;
  const cssCardImage = document.querySelector<HTMLImageElement>('#css-card-image')!;
  const cssCardFront = document.querySelector<HTMLElement>('.pane-css .card__front')!;
  const cssCardRotator = document.querySelector<HTMLButtonElement>('.pane-css .card__rotator')!;
  const webgpuPane = document.querySelector<HTMLElement>('.pane-webgpu')!;

  const cardsResponse = await fetch(appUrl('cards.json'));
  const cards: Card[] = await cardsResponse.json();
  const excludedCardIds = new Set<string>();
  const cardLibrary = buildCardLibrary(cards, excludedCardIds);
  const initialSelection = readCardSelectionFromUrl(cardLibrary, cards);

  const cssCardController = createCssCardController({
    cssCard,
    cssCardImage,
    cssCardFront,
    cssCardRotator,
  });

  const webgpuRenderer = await createWebGpuCardRenderer({
    canvas,
    webgpuPane,
  });

  const updateCard = async (card: Card, categoryName: string) => {
    const imageUrl = getLocalCardImageUrl(card.images.large);
    cssCardController.updateCard(card, imageUrl, categoryName, cardLibrary.variants[categoryName]);
    await webgpuRenderer.updateTexture(imageUrl, card, categoryName, cardLibrary.variants[categoryName]);
  };

  setupCardLibraryGui({
    cardLibrary,
    cards,
    initialCategory: initialSelection.category,
    initialCardId: initialSelection.card.id,
    onCardChange: updateCard,
    onSelectionChange: (card, categoryName) => {
      writeCardSelectionToUrl(categoryName, card);
    },
  });

  cssCardRotator.addEventListener('pointermove', (event) => {
    cssCardController.handlePointerMove(event);
  });
  cssCardRotator.addEventListener('pointerleave', () => {
    cssCardController.handlePointerLeave();
  });
  cssCardRotator.addEventListener('blur', () => {
    cssCardController.handleBlur();
  });

  canvas.addEventListener('pointermove', (event) => {
    webgpuRenderer.handlePointerMove(event);
  });
  canvas.addEventListener('pointerleave', () => {
    webgpuRenderer.handlePointerLeave();
  });
  window.addEventListener('blur', () => {
    webgpuRenderer.resetPointer();
  });

  function frame() {
    cssCardController.tick();
    webgpuRenderer.render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

void init();
