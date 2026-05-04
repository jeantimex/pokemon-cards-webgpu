# Galaxy / Cosmos Holofoil

This folder contains the shared galaxy and cosmos holofoil reference used by the
card effects that need a bright textured foil under the art window.

The point of this doc is to preserve the CSS behavior well enough that the
later WebGPU implementation can reproduce the same pointer response, masking,
and layer order without reverse engineering the effect again.

## Files

`cards.css`

Shared card geometry and pointer variables copied from:

```text
pokemon-cards-css/public/css/cards/cards.css
```

`cosmos-holo.css`

The actual galaxy/cosmos treatment copied from:

```text
pokemon-cards-css/public/css/cards/cosmos-holo.css
```

`index.css`

Imports both files:

```css
@import './cards.css';
@import './cosmos-holo.css';
```

## Trigger

The current category is `Galaxy / Cosmos Holofoil`.
The runtime renders cards in this section with:

```text
data-rarity="rare holo cosmos"
```

## Assets

The local resolver maps this family to the `cosmos` foil path:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_cosmos_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_cosmos_2x.webp
```

The visual texture itself comes from the shared image assets in `public/img`,
especially the galaxy and cosmos textures.

## CSS Behavior

This branch is not a single texture overlay. The effect is built from:

- the shared card clipping and layer stack from `cards.css`
- a texture-heavy galaxy/cosmos background
- pointer-driven background movement
- bright blending in the shine and glare layers
- subtype-aware clipping for trainer/support cards

The most important porting detail is that the card has to preserve the shared
geometry and then layer the galaxy effect on top of it.

## WebGPU Notes

For a WebGPU port, keep the following pieces separate:

1. card geometry and clip variables
2. the galaxy texture source
3. the gradient/blend stack
4. pointer-to-background position mapping
5. the glare response

If the effect looks wrong, the usual failure mode is that the texture motion is
correct but the blend order or clipping is not.
