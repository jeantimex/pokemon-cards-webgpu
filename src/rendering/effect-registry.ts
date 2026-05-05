import plainShaderCode from '../shaders.wgsl?raw';
import glareShaderCode from '../effects/common-and-uncommon/webgpu.wgsl?raw';
import type { CardEffect } from './card-effect';

const GLARE_EFFECT: CardEffect = {
  id: 'glare',
  shaderCode: glareShaderCode,
};

const PLAIN_EFFECT: CardEffect = {
  id: 'plain',
  shaderCode: plainShaderCode,
};

const REGISTRY: Record<string, CardEffect> = {
  'Trainer Gallery (V)': PLAIN_EFFECT,
};

export function getEffect(categoryName: string): CardEffect {
  return REGISTRY[categoryName] ?? GLARE_EFFECT;
}
