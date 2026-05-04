import type { Card } from '../types';
import type { EffectVariant } from './category-types';

export function getLocalCardImageUrl(imageUrl: string) {
  const url = new URL(imageUrl);
  return `/cards${url.pathname}`;
}

export function getDisplayRarity(card: Card, categoryName: string, variant: EffectVariant) {
  const rarity = card.rarity.toLowerCase();
  const isShiny = card.number.toLowerCase().startsWith('sv');

  if (variant === 'reverse-holo') {
    return `${rarity} reverse holo`;
  }

  if (categoryName === 'Shiny Vault' && isShiny) {
    if (rarity === 'rare holo vmax' || card.subtypes?.includes('VMAX')) {
      return 'rare shiny vmax';
    }

    if (rarity === 'rare holo v' || card.subtypes?.includes('V')) {
      return 'rare shiny v';
    }

    return 'rare shiny';
  }

  if (categoryName === 'VMax (Alternate/Rainbow)') {
    return 'rare rainbow alt';
  }

  return rarity;
}

type FoilResolution = {
  etch: 'etched' | 'holo';
  style: string;
};

const BASE_FOIL_RESOLUTIONS: Record<string, FoilResolution> = {
  'amazing rare': { etch: 'etched', style: 'swsecret' },
  'rare holo cosmos': { etch: 'holo', style: 'cosmos' },
  'rare holo': { etch: 'holo', style: 'swholo' },
  'rare holo v': { etch: 'holo', style: 'sunpillar' },
  'rare holo vmax': { etch: 'etched', style: 'sunpillar' },
  'rare holo vstar': { etch: 'etched', style: 'sunpillar' },
  'rare ultra': { etch: 'etched', style: 'sunpillar' },
  'rare secret': { etch: 'etched', style: 'swsecret' },
  'rare rainbow': { etch: 'etched', style: 'swsecret' },
  'rare shiny': { etch: 'etched', style: 'sunpillar' },
  'rare shiny v': { etch: 'etched', style: 'sunpillar' },
  'rare shiny vmax': { etch: 'etched', style: 'swsecret' },
};

function resolveFoil(card: Card, rarity: string): FoilResolution | null {
  if (rarity.endsWith('reverse holo')) {
    return { etch: 'holo', style: 'reverse' };
  }

  if (rarity === 'trainer gallery rare holo') {
    return { etch: 'holo', style: 'rainbow' };
  }

  if (rarity === 'rare holo v') {
    return {
      etch: card.number.match(/^[tg]g/i) ? 'etched' : 'holo',
      style: 'sunpillar',
    };
  }

  if (rarity === 'rare rainbow alt') {
    return {
      etch: 'etched',
      style: card.subtypes?.includes('VMAX') ? 'swsecret' : 'sunpillar',
    };
  }

  return BASE_FOIL_RESOLUTIONS[rarity] ?? null;
}

export function getLocalFoilImageUrl(
  card: Card,
  type: 'foils' | 'masks',
  categoryName: string,
  variant: EffectVariant,
) {
  const rarity = getDisplayRarity(card, categoryName, variant);
  const assetRarity = rarity === 'trainer gallery rare holo' ? 'rare holo' : rarity;
  const isTrainerGalleryHolo = rarity === 'trainer gallery rare holo';
  const resolution =
    assetRarity === 'rare holo' && (isTrainerGalleryHolo || card.number.match(/^[tg]g/i))
      ? { etch: 'holo', style: 'rainbow' }
      : resolveFoil(card, assetRarity);

  if (!resolution) {
    return '';
  }

  const foilNumber = card.number.toString().toLowerCase().replace('swsh', '').padStart(3, '0');
  const foilSet = card.set
    .toString()
    .toLowerCase()
    .replace(/(tg|gg|sv)/, '');
  const etch = resolution?.etch ?? 'holo';
  const style = resolution?.style ?? 'cosmos';

  return `/foils/${foilSet}/${type}/upscaled/${foilNumber}_foil_${etch}_${style}_2x.webp`;
}
