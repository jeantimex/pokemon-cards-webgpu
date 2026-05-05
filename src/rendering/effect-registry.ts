import baseShaderCode from '../shaders.wgsl?raw';
import commonGlareShaderCode from '../effects/common-and-uncommon/webgpu.wgsl?raw';
import type { CardEffect } from './card-effect';

const BASE_EFFECT: CardEffect = {
  id: 'base',
  shaderCode: baseShaderCode,
};

const COMMON_UNCOMMON_EFFECT: CardEffect = {
  id: 'common-and-uncommon',
  shaderCode: commonGlareShaderCode,
};

const REGISTRY: Record<string, CardEffect> = {
  'Common & Uncommon': COMMON_UNCOMMON_EFFECT,
};

export function getEffect(categoryName: string): CardEffect {
  return REGISTRY[categoryName] ?? BASE_EFFECT;
}
