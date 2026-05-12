export interface CardEffect {
  readonly id: string;
  readonly shaderCode: string;
  readonly auxiliaryTextureUrl?: string;
  readonly auxiliaryTextureUrls?: readonly string[];
}
