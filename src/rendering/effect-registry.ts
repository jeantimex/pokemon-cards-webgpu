import plainShaderCode from '../shaders.wgsl?raw';
import glareShaderCode from '../effects/common-and-uncommon/webgpu.wgsl?raw';
import reverseHoloShaderCode from '../effects/reverse-holo/webgpu.wgsl?raw';
import amazingRareShaderCode from '../effects/holofoil-amazing-rare/webgpu.wgsl?raw';
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

const REGISTRY: Record<string, CardEffect> = {
  'Reverse Holo non-rares': REVERSE_HOLO_EFFECT,
  'Trainer Gallery (V)': PLAIN_EFFECT,
  'Holofoil Amazing Rare': AMAZING_RARE_EFFECT,
};

export function getEffect(categoryName: string): CardEffect {
  return REGISTRY[categoryName] ?? GLARE_EFFECT;
}
