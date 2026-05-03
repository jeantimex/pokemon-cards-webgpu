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

  return rarity;
}

export function getLocalFoilImageUrl(
  card: Card,
  type: 'foils' | 'masks',
  categoryName: string,
  variant: EffectVariant,
) {
  const rarity = getDisplayRarity(card, categoryName, variant);
  const isReverse = variant === 'reverse-holo';

  if (
    rarity !== 'rare holo cosmos' &&
    rarity !== 'amazing rare' &&
    rarity !== 'rare holo' &&
    rarity !== 'rare holo v' &&
    rarity !== 'rare holo vmax' &&
    rarity !== 'rare holo vstar' &&
    rarity !== 'rare ultra' &&
    rarity !== 'rare secret' &&
    rarity !== 'rare rainbow alt' &&
    rarity !== 'rare shiny' &&
    rarity !== 'rare shiny v' &&
    rarity !== 'rare shiny vmax' &&
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
  const isVMaxAlt = rarity === 'rare rainbow alt' && card.subtypes?.includes('VMAX');
  const etch =
    rarity === 'amazing rare' ||
    rarity === 'rare ultra' ||
    rarity === 'rare secret' ||
    rarity === 'rare holo vmax' ||
    rarity === 'rare holo vstar' ||
    rarity === 'rare rainbow alt' ||
    rarity === 'rare shiny' ||
    rarity === 'rare shiny v' ||
    rarity === 'rare shiny vmax' ||
    ((isGallery || isShiny) && rarity === 'rare holo v')
      ? 'etched'
      : 'holo';
  const style =
    rarity === 'amazing rare'
      ? 'swsecret'
      : rarity === 'rare holo'
        ? 'swholo'
        : rarity === 'rare holo v'
          ? 'sunpillar'
          : rarity === 'rare holo vmax'
            ? 'sunpillar'
            : rarity === 'rare holo vstar'
              ? 'sunpillar'
              : rarity === 'rare ultra'
                ? 'sunpillar'
                : rarity === 'rare secret'
                  ? 'swsecret'
                  : rarity === 'rare rainbow alt'
                    ? isVMaxAlt
                      ? 'swsecret'
                      : 'sunpillar'
                    : rarity === 'rare shiny'
                      ? 'sunpillar'
                      : rarity === 'rare shiny v'
                        ? 'sunpillar'
                        : rarity === 'rare shiny vmax'
                          ? 'swsecret'
                          : isReverse
                            ? 'reverse'
                            : 'cosmos';

  return `/foils/${foilSet}/${type}/upscaled/${foilNumber}_foil_${etch}_${style}_2x.webp`;
}
