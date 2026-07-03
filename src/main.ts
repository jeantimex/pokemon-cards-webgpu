import './style.css';
import './effects/common-and-uncommon/index.css';
import './effects/galaxy-cosmos-holofoil/index.css';
import './effects/holofoil-amazing-rare/index.css';
import './effects/holofoil-rare/index.css';
import './effects/trainer-gallery-holo/index.css';
import './effects/secret-rare/index.css';
import './effects/reverse-holo/index.css';
import './effects/pokemon-v/index.css';
import './effects/pokemon-v-full-art/index.css';
import './effects/pokemon-v-alternate-art/index.css';
// trainer-holo must load after the v-full-art styles: its equal-specificity
// overrides for supporter cards win by order, matching the original project.
import './effects/trainer-holo/index.css';
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

  const githubLink = document.createElement('a');
  githubLink.className = 'github-link';
  githubLink.href = 'https://github.com/jeantimex/pokemon-cards-webgpu';
  githubLink.target = '_blank';
  githubLink.rel = 'noreferrer noopener';
  githubLink.setAttribute('aria-label', 'GitHub profile for jeantimex');
  githubLink.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.17-3.37-1.17-.46-1.18-1.11-1.49-1.11-1.49-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.66.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.69.92.69 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>
    <span>jeantimex</span>
  `;
  document.body.appendChild(githubLink);

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
    await webgpuRenderer.updateTexture(
      imageUrl,
      categoryName,
      card,
      cardLibrary.variants[categoryName],
    );
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
    webgpuRenderer,
  });

  cssCardRotator.addEventListener('pointermove', (event) => {
    const pointer = cssCardController.handlePointerMove(event);
    webgpuRenderer.setPointer(pointer);
  });
  cssCardRotator.addEventListener('pointerleave', () => {
    cssCardController.handlePointerLeave();
    webgpuRenderer.handlePointerLeave();
  });
  cssCardRotator.addEventListener('blur', () => {
    cssCardController.handleBlur();
    webgpuRenderer.resetPointer();
  });

  webgpuPane.addEventListener('pointermove', (event) => {
    const pointer = webgpuRenderer.handlePointerMove(event);
    cssCardController.setPointer(pointer);
  });
  webgpuPane.addEventListener('pointerleave', () => {
    webgpuRenderer.handlePointerLeave();
    cssCardController.handlePointerLeave();
  });
  window.addEventListener('blur', () => {
    webgpuRenderer.resetPointer();
    cssCardController.handleBlur();
  });

  function frame() {
    cssCardController.tick();
    webgpuRenderer.render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

void init();
