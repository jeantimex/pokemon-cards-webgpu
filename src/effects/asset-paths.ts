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

export function getLocalFoilImageUrl(
  card: Card,
  type: 'foils' | 'masks',
  categoryName: string,
  variant: EffectVariant,
) {
  const rarity = getDisplayRarity(card, categoryName, variant);
  const assetRarity = rarity === 'trainer gallery rare holo' ? 'rare holo' : rarity;
  const isReverse = variant === 'reverse-holo';
  const isTrainerGalleryHolo = rarity === 'trainer gallery rare holo';

  if (
    assetRarity !== 'rare holo cosmos' &&
    assetRarity !== 'amazing rare' &&
    assetRarity !== 'rare holo' &&
    assetRarity !== 'rare holo v' &&
    assetRarity !== 'rare holo vmax' &&
    assetRarity !== 'rare holo vstar' &&
    assetRarity !== 'rare ultra' &&
    assetRarity !== 'rare secret' &&
    assetRarity !== 'rare rainbow' &&
    assetRarity !== 'rare rainbow alt' &&
    assetRarity !== 'rare shiny' &&
    assetRarity !== 'rare shiny v' &&
    assetRarity !== 'rare shiny vmax' &&
    !isReverse
  ) {
    return '';
  }

  const foilNumber = card.number.toString().toLowerCase().replace('swsh', '').padStart(3, '0');
  const foilSet = card.set
    .toString()
    .toLowerCase()
    .replace(/(tg|gg|sv)/, '');
  const isGallery = !!card.number.match(/^[tg]g/i);
  const isShiny = card.number.toLowerCase().startsWith('sv');
  const isVMaxAlt = assetRarity === 'rare rainbow alt' && card.subtypes?.includes('VMAX');
  const etch =
    assetRarity === 'amazing rare' ||
    assetRarity === 'rare ultra' ||
    assetRarity === 'rare secret' ||
    assetRarity === 'rare holo vmax' ||
    assetRarity === 'rare holo vstar' ||
    assetRarity === 'rare rainbow alt' ||
    assetRarity === 'rare rainbow' ||
    assetRarity === 'rare shiny' ||
    assetRarity === 'rare shiny v' ||
    assetRarity === 'rare shiny vmax' ||
    ((isGallery || isShiny || isTrainerGalleryHolo) && assetRarity === 'rare holo v')
      ? 'etched'
      : 'holo';
  const style =
    assetRarity === 'amazing rare'
      ? 'swsecret'
      : assetRarity === 'rare holo'
        ? isTrainerGalleryHolo || isGallery
          ? 'rainbow'
          : 'swholo'
        : assetRarity === 'rare holo v'
          ? 'sunpillar'
          : assetRarity === 'rare holo vmax'
            ? 'sunpillar'
            : assetRarity === 'rare holo vstar'
              ? 'sunpillar'
              : assetRarity === 'rare ultra'
                ? 'sunpillar'
                : assetRarity === 'rare secret'
                  ? 'swsecret'
                  : assetRarity === 'rare rainbow'
                    ? 'swsecret'
                    : assetRarity === 'rare rainbow alt'
                      ? isVMaxAlt
                        ? 'swsecret'
                        : 'sunpillar'
                      : assetRarity === 'rare shiny'
                        ? 'sunpillar'
                        : assetRarity === 'rare shiny v'
                          ? 'sunpillar'
                          : assetRarity === 'rare shiny vmax'
                            ? 'swsecret'
                            : isReverse
                              ? 'reverse'
                              : 'cosmos';

  return `/foils/${foilSet}/${type}/upscaled/${foilNumber}_foil_${etch}_${style}_2x.webp`;
}
