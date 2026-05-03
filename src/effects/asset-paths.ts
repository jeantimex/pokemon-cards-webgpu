import type { Card } from '../types';
import type { EffectVariant } from './category-types';

export function getLocalCardImageUrl(imageUrl: string) {
  const url = new URL(imageUrl);
  return `/cards${url.pathname}`;
}

export function getLocalFoilImageUrl(card: Card, type: 'foils' | 'masks', variant: EffectVariant) {
  const rarity = card.rarity.toLowerCase();
  const isReverse = variant === 'reverse-holo';
  if (
    rarity !== 'rare holo cosmos' &&
    rarity !== 'amazing rare' &&
    rarity !== 'rare holo' &&
    rarity !== 'rare holo v' &&
    rarity !== 'rare ultra' &&
    rarity !== 'rare secret' &&
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
  const etch =
    rarity === 'amazing rare' ||
    rarity === 'rare ultra' ||
    rarity === 'rare secret' ||
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
          : rarity === 'rare ultra'
            ? 'sunpillar'
            : rarity === 'rare secret'
              ? 'swsecret'
              : isReverse
                ? 'reverse'
                : 'cosmos';

  return `/foils/${foilSet}/${type}/upscaled/${foilNumber}_foil_${etch}_${style}_2x.webp`;
}
