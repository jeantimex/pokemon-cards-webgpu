import glareShaderCode from '../effects/common-and-uncommon/webgpu.wgsl?raw';
import galaxyCosmosHoloShaderCode from '../effects/galaxy-cosmos-holofoil/webgpu.wgsl?raw';
import holofoilRareShaderCode from '../effects/holofoil-rare/webgpu.wgsl?raw';
import reverseHoloShaderCode from '../effects/reverse-holo/webgpu.wgsl?raw';
import amazingRareShaderCode from '../effects/holofoil-amazing-rare/webgpu.wgsl?raw';
import radiantHoloShaderCode from '../effects/radiant-holofoil/webgpu.wgsl?raw';
import rainbowRareShaderCode from '../effects/rainbow-rare/webgpu.wgsl?raw';
import secretRareShaderCode from '../effects/secret-rare/webgpu.wgsl?raw';
import trainerGalleryHoloShaderCode from '../effects/trainer-gallery-holo/webgpu.wgsl?raw';
import trainerGalleryVShaderCode from '../effects/trainer-gallery-v/webgpu.wgsl?raw';
import trainerGalleryVMaxShaderCode from '../effects/trainer-gallery-v-max/webgpu.wgsl?raw';
import pokemonVShaderCode from '../effects/pokemon-v/webgpu.wgsl?raw';
import pokemonVAlternateArtShaderCode from '../effects/pokemon-v-alternate-art/webgpu.wgsl?raw';
import pokemonVFullArtShaderCode from '../effects/pokemon-v-full-art/webgpu.wgsl?raw';
import vMaxShaderCode from '../effects/v-max/webgpu.wgsl?raw';
import shinyVaultShaderCode from '../effects/shiny-vault/webgpu.wgsl?raw';
import type { CardEffect } from './card-effect';

const GLARE_EFFECT: CardEffect = {
  id: 'glare',
  shaderCode: glareShaderCode,
};

const REVERSE_HOLO_EFFECT: CardEffect = {
  id: 'reverse-holo',
  shaderCode: reverseHoloShaderCode,
};

const AMAZING_RARE_EFFECT: CardEffect = {
  id: 'amazing-rare',
  shaderCode: amazingRareShaderCode,
};

const GALAXY_COSMOS_HOLO_EFFECT: CardEffect = {
  id: 'galaxy-cosmos-holo',
  shaderCode: galaxyCosmosHoloShaderCode,
  auxiliaryTextureUrls: [
    'img/cosmos-bottom.png',
    'img/cosmos-middle-trans.png',
    'img/cosmos-top-trans.png',
  ],
};

const HOLOFOIL_RARE_EFFECT: CardEffect = {
  id: 'holofoil-rare',
  shaderCode: holofoilRareShaderCode,
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

const TRAINER_GALLERY_HOLO_EFFECT: CardEffect = {
  id: 'trainer-gallery-holo',
  shaderCode: trainerGalleryHoloShaderCode,
};

const TRAINER_GALLERY_V_EFFECT: CardEffect = {
  id: 'trainer-gallery-v',
  shaderCode: trainerGalleryVShaderCode,
  auxiliaryTextureUrl: 'img/illusion.png',
};

const TRAINER_GALLERY_V_MAX_EFFECT: CardEffect = {
  id: 'trainer-gallery-v-max',
  shaderCode: trainerGalleryVMaxShaderCode,
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

const POKEMON_V_FULL_ART_EFFECT: CardEffect = {
  id: 'pokemon-v-full-art',
  shaderCode: pokemonVFullArtShaderCode,
};

const V_MAX_EFFECT: CardEffect = {
  id: 'v-max',
  shaderCode: vMaxShaderCode,
};

const SHINY_VAULT_EFFECT: CardEffect = {
  id: 'shiny-vault',
  shaderCode: shinyVaultShaderCode,
  auxiliaryTextureUrls: [
    'img/glitter.png',
    'img/illusion.png',
    'img/grain.webp',
  ],
};

const REGISTRY: Record<string, CardEffect> = {
  'Reverse Holo non-rares': REVERSE_HOLO_EFFECT,
  'Holofoil Rare': HOLOFOIL_RARE_EFFECT,
  'Trainer Gallery (V)': TRAINER_GALLERY_V_EFFECT,
  'Trainer Gallery (VMax)': TRAINER_GALLERY_V_MAX_EFFECT,
  'Holofoil Amazing Rare': AMAZING_RARE_EFFECT,
  'Galaxy/Cosmos Holofoil': GALAXY_COSMOS_HOLO_EFFECT,
  'Trainer Gallery Holofoil': TRAINER_GALLERY_HOLO_EFFECT,
  'Radiant Holofoil': RADIANT_HOLO_EFFECT,
  'Rainbow Rare': RAINBOW_RARE_EFFECT,
  'Secret Rare (Gold)': SECRET_RARE_EFFECT,
  'Pokemon V': POKEMON_V_EFFECT,
  'Pokemon V (Alternate Art)': POKEMON_V_ALTERNATE_ART_EFFECT,
  'Pokemon V (Full Art)': POKEMON_V_FULL_ART_EFFECT,
  'VMax': V_MAX_EFFECT,
  'Shiny Vault': SHINY_VAULT_EFFECT,
};

export function getEffect(categoryName: string): CardEffect {
  return REGISTRY[categoryName] ?? GLARE_EFFECT;
}
