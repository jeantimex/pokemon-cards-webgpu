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
import { createCssCardController } from './ui/css-card-controller';
import { setupCardLibraryGui } from './ui/card-library-gui';
import { createWebGpuCardRenderer } from './rendering/webgpu-card-renderer';
import type { Card } from './types';

async function init() {
  const canvas = document.querySelector<HTMLCanvasElement>('#webgpu-canvas')!;
  const cssCard = document.querySelector<HTMLElement>('#css-card')!;
  const cssCardImage = document.querySelector<HTMLImageElement>('#css-card-image')!;
  const cssPane = document.querySelector<HTMLElement>('.pane-css')!;
  const cssCardFront = document.querySelector<HTMLElement>('.pane-css .card__front')!;
  const cssCardRotator = document.querySelector<HTMLButtonElement>('.pane-css .card__rotator')!;
  const webgpuPane = document.querySelector<HTMLElement>('.pane-webgpu')!;

  const cardsResponse = await fetch('/cards.json');
  const cards: Card[] = await cardsResponse.json();
  const excludedCardIds = new Set(['swsh12pt5-160']);
  const cardLibrary = buildCardLibrary(cards, excludedCardIds);

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
    await webgpuRenderer.updateTexture(imageUrl);
  };

  setupCardLibraryGui({
    cardLibrary,
    cards,
    onCardChange: updateCard,
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

  window.addEventListener('pointermove', (event) => {
    const cssRect = cssPane.getBoundingClientRect();
    const isOverCssPane =
      event.clientX >= cssRect.left &&
      event.clientX <= cssRect.right &&
      event.clientY >= cssRect.top &&
      event.clientY <= cssRect.bottom;
    const webgpuRect = canvas.getBoundingClientRect();
    const isOverWebgpuPane =
      event.clientX >= webgpuRect.left &&
      event.clientX <= webgpuRect.right &&
      event.clientY >= webgpuRect.top &&
      event.clientY <= webgpuRect.bottom;
    const activeRect = isOverCssPane ? cssRect : isOverWebgpuPane ? webgpuRect : null;

    if (!activeRect) {
      webgpuRenderer.resetPointer();
      return;
    }

    const mouseX = (event.clientX - activeRect.left) / activeRect.width;
    const mouseY = (event.clientY - activeRect.top) / activeRect.height;
    webgpuRenderer.setPointer(mouseX, mouseY);
  });

  window.addEventListener('pointerout', (event) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && document.contains(relatedTarget)) {
      return;
    }

    webgpuRenderer.resetPointer();
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
