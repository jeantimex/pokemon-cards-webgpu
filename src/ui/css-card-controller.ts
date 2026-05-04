import { getDisplayRarity, getLocalFoilImageUrl } from '../effects/asset-paths';
import type { EffectVariant } from '../effects/category-types';
import type { Card } from '../types';

type CssCardTarget = {
  pointerX: number;
  pointerY: number;
  rotateX: number;
  rotateY: number;
  backgroundX: number;
  backgroundY: number;
  opacity: number;
};

export type CardPointer = {
  x: number;
  y: number;
};

interface CssCardControllerOptions {
  cssCard: HTMLElement;
  cssCardImage: HTMLImageElement;
  cssCardFront: HTMLElement;
  cssCardRotator: HTMLButtonElement;
}

export interface CssCardController {
  updateCard(card: Card, imageUrl: string, categoryName: string, variant: EffectVariant): void;
  setPointer(pointer: CardPointer): void;
  handlePointerMove(event: PointerEvent): CardPointer;
  handlePointerLeave(): void;
  handleBlur(): void;
  tick(): void;
}

export function createCssCardController({
  cssCard,
  cssCardImage,
  cssCardFront,
  cssCardRotator,
}: CssCardControllerOptions): CssCardController {
  function clamp(value: number, min = 0, max = 100) {
    return Math.min(Math.max(value, min), max);
  }

  function round(value: number, precision = 3) {
    return parseFloat(value.toFixed(precision));
  }

  function adjust(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
    return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
  }

  function getCardClass(card: Card) {
    return ['card', 'interactive', ...(card.types ?? []).map((type) => type.toLowerCase())].join(
      ' ',
    );
  }

  const cssCardSeeds = new Map<string, { x: number; y: number }>();

  function getCssCardSeed(card: Card) {
    let seed = cssCardSeeds.get(card.id);
    if (!seed) {
      seed = {
        x: Math.random(),
        y: Math.random(),
      };
      cssCardSeeds.set(card.id, seed);
    }
    return seed;
  }

  let cssTarget: CssCardTarget = {
    pointerX: 50,
    pointerY: 50,
    rotateX: 0,
    rotateY: 0,
    backgroundX: 50,
    backgroundY: 50,
    opacity: 0,
  };
  let cssCurrent = { ...cssTarget };
  let cssResetTimer: number | undefined;

  function setCssCardVars(values: CssCardTarget) {
    const pointerFromCenter = clamp(
      Math.sqrt(
        (values.pointerY - 50) * (values.pointerY - 50) +
          (values.pointerX - 50) * (values.pointerX - 50),
      ) / 50,
      0,
      1,
    );

    cssCard.style.setProperty('--pointer-x', `${values.pointerX}%`);
    cssCard.style.setProperty('--pointer-y', `${values.pointerY}%`);
    cssCard.style.setProperty('--pointer-from-center', String(pointerFromCenter));
    cssCard.style.setProperty('--pointer-from-top', String(values.pointerY / 100));
    cssCard.style.setProperty('--pointer-from-left', String(values.pointerX / 100));
    cssCard.style.setProperty('--card-opacity', String(values.opacity));
    cssCard.style.setProperty('--rotate-x', `${values.rotateX}deg`);
    cssCard.style.setProperty('--rotate-y', `${values.rotateY}deg`);
    cssCard.style.setProperty('--background-x', `${values.backgroundX}%`);
    cssCard.style.setProperty('--background-y', `${values.backgroundY}%`);
    cssCard.style.setProperty('--card-scale', '1');
    cssCard.style.setProperty('--translate-x', '0px');
    cssCard.style.setProperty('--translate-y', '0px');
  }

  function resetCssCard(delay = 500) {
    window.clearTimeout(cssResetTimer);
    cssResetTimer = window.setTimeout(() => {
      cssCard.classList.remove('interacting');
      cssTarget = {
        pointerX: 50,
        pointerY: 50,
        rotateX: 0,
        rotateY: 0,
        backgroundX: 50,
        backgroundY: 50,
        opacity: 0,
      };
    }, delay);
  }

  function updateCard(card: Card, imageUrl: string, categoryName: string, variant: EffectVariant) {
    const randomSeed = getCssCardSeed(card);
    const cosmosPosition = {
      x: Math.floor(randomSeed.x * 734),
      y: Math.floor(randomSeed.y * 1280),
    };

    cssCard.className = `${getCardClass(card)} loading`;
    const maskUrl = getLocalFoilImageUrl(card, 'masks', categoryName, variant);
    const foilUrl = getLocalFoilImageUrl(card, 'foils', categoryName, variant);
    cssCard.classList.toggle('masked', !!maskUrl);
    cssCard.dataset.number = card.number.toLowerCase();
    cssCard.dataset.set = card.set;
    cssCard.dataset.subtypes = (card.subtypes ?? []).join(' ').toLowerCase();
    cssCard.dataset.supertype = card.supertype.toLowerCase();
    cssCard.dataset.rarity = getDisplayRarity(card, categoryName, variant);
    cssCard.dataset.trainerGallery = String(!!card.number.match(/^[tg]g/i));
    cssCardRotator.setAttribute('aria-label', `Expand the Pokemon Card; ${card.name}.`);
    cssCardImage.alt = `Front design of the ${card.name} Pokemon Card, with the stats and info around the edge`;
    cssCardFront.style.setProperty('--seedx', String(randomSeed.x));
    cssCardFront.style.setProperty('--seedy', String(randomSeed.y));
    cssCardFront.style.setProperty('--cosmosbg', `${cosmosPosition.x}px ${cosmosPosition.y}px`);
    if (maskUrl) {
      cssCardFront.style.setProperty('--mask', `url(${maskUrl})`);
      cssCardFront.style.setProperty('--foil', `url(${foilUrl})`);
    } else {
      cssCardFront.style.removeProperty('--mask');
      cssCardFront.style.removeProperty('--foil');
    }
    cssCardImage.onload = () => {
      cssCard.classList.remove('loading');
    };
    cssCardImage.src = imageUrl;
  }

  function setPointer(pointer: CardPointer) {
    window.clearTimeout(cssResetTimer);
    cssCard.classList.add('interacting');

    const percent = {
      x: clamp(round(pointer.x * 100)),
      y: clamp(round(pointer.y * 100)),
    };
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    cssTarget = {
      backgroundX: adjust(percent.x, 0, 100, 37, 63),
      backgroundY: adjust(percent.y, 0, 100, 33, 67),
      rotateX: round(-(center.x / 3.5)),
      rotateY: round(center.y / 3.5),
      pointerX: round(percent.x),
      pointerY: round(percent.y),
      opacity: 1,
    };
  }

  function handlePointerMove(e: PointerEvent) {
    const rect = cssCardRotator.getBoundingClientRect();
    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    const pointer = {
      x: clamp(absolute.x / rect.width, 0, 1),
      y: clamp(absolute.y / rect.height, 0, 1),
    };
    setPointer(pointer);
    return pointer;
  }

  function handlePointerLeave() {
    resetCssCard();
  }

  function handleBlur() {
    resetCssCard(0);
  }

  function tick() {
    cssCurrent = {
      pointerX: cssCurrent.pointerX + (cssTarget.pointerX - cssCurrent.pointerX) * 0.15,
      pointerY: cssCurrent.pointerY + (cssTarget.pointerY - cssCurrent.pointerY) * 0.15,
      rotateX: cssCurrent.rotateX + (cssTarget.rotateX - cssCurrent.rotateX) * 0.15,
      rotateY: cssCurrent.rotateY + (cssTarget.rotateY - cssCurrent.rotateY) * 0.15,
      backgroundX: cssCurrent.backgroundX + (cssTarget.backgroundX - cssCurrent.backgroundX) * 0.15,
      backgroundY: cssCurrent.backgroundY + (cssTarget.backgroundY - cssCurrent.backgroundY) * 0.15,
      opacity: cssCurrent.opacity + (cssTarget.opacity - cssCurrent.opacity) * 0.15,
    };
    setCssCardVars(cssCurrent);
  }

  return {
    updateCard,
    setPointer,
    handlePointerMove,
    handlePointerLeave,
    handleBlur,
    tick,
  };
}
