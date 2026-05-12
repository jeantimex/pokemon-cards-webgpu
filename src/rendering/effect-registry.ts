import plainShaderCode from '../shaders.wgsl?raw';
import glareShaderCode from '../effects/common-and-uncommon/webgpu.wgsl?raw';
import reverseHoloShaderCode from '../effects/reverse-holo/webgpu.wgsl?raw';
import amazingRareShaderCode from '../effects/holofoil-amazing-rare/webgpu.wgsl?raw';
import radiantHoloShaderCode from '../effects/radiant-holofoil/webgpu.wgsl?raw';
import rainbowRareShaderCode from '../effects/rainbow-rare/webgpu.wgsl?raw';
import secretRareShaderCode from '../effects/secret-rare/webgpu.wgsl?raw';
import pokemonVShaderCode from '../effects/pokemon-v/webgpu.wgsl?raw';
import pokemonVAlternateArtShaderCode from '../effects/pokemon-v-alternate-art/webgpu.wgsl?raw';
import type { CardEffect } from './card-effect';

const GLARE_EFFECT: CardEffect = {
  id: 'glare',
  shaderCode: glareShaderCode,
};

const PLAIN_EFFECT: CardEffect = {
  id: 'plain',
  shaderCode: plainShaderCode,
};

const REVERSE_HOLO_EFFECT: CardEffect = {
  id: 'reverse-holo',
  shaderCode: reverseHoloShaderCode,
};

const AMAZING_RARE_EFFECT: CardEffect = {
  id: 'amazing-rare',
  shaderCode: amazingRareShaderCode,
};

const RADIANT_HOLO_EFFECT: CardEffect = {
  id: 'radiant-holo',
  shaderCode: radiantHoloShaderCode,
};

const RAINBOW_RARE_EFFECT: CardEffect = {
  id: 'rainbow-rare',
  shaderCode: rainbowRareShaderCode,
};

const SECRET_RARE_EFFECT: CardEffect = {
  id: 'secret-rare',
  shaderCode: secretRareShaderCode,
};

const POKEMON_V_EFFECT: CardEffect = {
  id: 'pokemon-v',
  shaderCode: pokemonVShaderCode,
  auxiliaryTextureUrl: 'img/grain.webp',
};

const POKEMON_V_ALTERNATE_ART_EFFECT: CardEffect = {
  id: 'pokemon-v-alternate-art',
  shaderCode: pokemonVAlternateArtShaderCode,
};

const REGISTRY: Record<string, CardEffect> = {
  'Reverse Holo non-rares': REVERSE_HOLO_EFFECT,
  'Trainer Gallery (V)': PLAIN_EFFECT,
  'Holofoil Amazing Rare': AMAZING_RARE_EFFECT,
  'Radiant Holofoil': RADIANT_HOLO_EFFECT,
  'Rainbow Rare': RAINBOW_RARE_EFFECT,
  'Secret Rare (Gold)': SECRET_RARE_EFFECT,
  'Pokemon V': POKEMON_V_EFFECT,
  'Pokemon V (Alternate Art)': POKEMON_V_ALTERNATE_ART_EFFECT,
};

export function getEffect(categoryName: string): CardEffect {
  return REGISTRY[categoryName] ?? GLARE_EFFECT;
}
