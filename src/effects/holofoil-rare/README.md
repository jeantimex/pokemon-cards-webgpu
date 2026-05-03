# Holofoil Rare Effect

This folder contains the CSS reference implementation for the left-hand card when the selected type is `Holofoil Rare`.

The goal is to preserve the original `pokemon-cards-css` behavior so the later WebGPU implementation can be built against a clear visual and technical target.

## Files

`regular-holo.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/regular-holo.css
```

This file contains the standard Sword/Shield holofoil effect:

- clipped holo shine regions
- repeating rainbow gradients
- scanline texture
- vertical beam/bar layers
- pointer-following radial glare

`index.css`

Imports the effect CSS:

```css
@import './regular-holo.css';
```

Shared card styles are loaded by other effect entry files:

- `base.css` from `src/effects/common-and-uncommon/index.css`
- `cards.css` from `src/effects/galaxy-cosmos-holofoil/index.css`

The current app has one shared card DOM, so those shared reference styles only need to be loaded once.

## Trigger

The effect is activated by card metadata:

```css
.card[data-rarity="rare holo"]
```

The current `Holofoil Rare` category contains cards with:

```text
data-rarity="rare holo"
```

The runtime in `src/main.ts` sets the same metadata attributes used by the original Svelte component:

```text
data-number
data-set
data-subtypes
data-supertype
data-rarity
data-trainer-gallery
```

## Required DOM Structure

Holofoil Rare uses the shared card layer stack:

```html
<div class="card interactive masked" data-rarity="rare holo">
  <div class="card__translater">
    <button class="card__rotator">
      <img class="card__back" />
      <div class="card__front" style="--mask: url(...); --foil: url(...);">
        <img />
        <div class="card__shine"></div>
        <div class="card__glare"></div>
      </div>
    </button>
  </div>
</div>
```

The visible effect is composed from:

- `.card__shine`
- `.card__shine::before`
- `.card__shine::after`
- `.card__glare`
- `.card__glare::after`

## Foil And Mask Assets

The original `CardProxy.svelte` maps `Rare Holo` to:

```text
etch = "holo"
style = "swholo"
```

Then it generates:

```text
<cdn>/foils/<set>/<type>/upscaled/<number>_foil_holo_swholo_2x.webp
```

where `<type>` is either:

```text
foils
masks
```

This project mirrors that path locally:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_swholo_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_swholo_2x.webp
```

Example:

```text
/foils/pgo/foils/upscaled/024_foil_holo_swholo_2x.webp
/foils/pgo/masks/upscaled/024_foil_holo_swholo_2x.webp
```

At runtime, `src/main.ts` sets:

```text
class="card ... masked"
--mask: url(...)
--foil: url(...)
```

The copied `regular-holo.css` does not directly sample `--foil`, but the original component still provides foil/mask values through `CardProxy.svelte`. Keeping those variables available preserves the reference runtime shape and supports shared masking behavior from `base.css`.

## Clipping

The Holofoil Rare effect changes clip regions based on card subtype.

Default holo region:

```css
.card[data-rarity='rare holo'] .card__shine {
  clip-path: var(--clip);
}
```

Stage cards:

```css
.card[data-rarity='rare holo'][data-subtypes^='stage'] .card__shine,
.card[data-rarity='rare holo'][data-subtypes^='stage'] .card__glare:after {
  clip-path: var(--clip-stage);
}
```

Trainer cards:

```css
.card[data-rarity='rare holo'][data-subtypes^='supporter'] .card__shine,
.card[data-rarity='rare holo'][data-subtypes^='supporter'] .card__glare:after,
.card[data-rarity='rare holo'][data-subtypes^='item'] .card__shine,
.card[data-rarity='rare holo'][data-subtypes^='item'] .card__glare:after {
  clip-path: var(--clip-trainer);
}
```

This matters for the current category:

- Articuno, Zapdos, Moltres: `Basic`
- Gengar, Tyranitar: `Stage 2`
- Boss's Orders: `Supporter`

For WebGPU, these clip regions can be represented as:

- UV rectangles/polygons matching `--clip`, `--clip-stage`, and `--clip-trainer`
- signed distance masks
- alpha masks

The subtype-based switch should match the CSS selector logic.

## Shine Layers

### `.card__shine`

Main rainbow scanline layer.

Defines local variables:

```css
--scanlines-space: 1px;
--scanlines-light: #666;
--scanlines-dark: black;

--bars: 3%;
--bar-color: hsla(0, 0%, 70%, 1);
--bar-bg: hsla(0, 0%, 0%, 1);
```

Uses:

```css
background-image: repeating-linear-gradient(110deg, ...), repeating-linear-gradient(90deg, ...);
```

Important properties:

```css
background-position:
  calc(((50% - var(--background-x)) * 2.6) + 50%) calc(((50% - var(--background-y)) * 3.5) + 50%),
  center center;

background-size:
  400% 400%,
  cover;

background-blend-mode: overlay;
filter: brightness(1.1) contrast(1.1) saturate(1.2);
mix-blend-mode: color-dodge;
```

WebGPU port notes:

- Generate a `110deg` repeating rainbow gradient.
- Generate a `90deg` scanline gradient.
- Move the rainbow layer based on `--background-x/y`.
- Blend the two generated layers with overlay.
- Composite over the card with color-dodge.
- Apply the subtype clip region and card mask.

### `.card__shine::before`

Vertical beam/bar holo layer.

Uses two repeating `90deg` linear gradients:

```css
background-image: repeating-linear-gradient(90deg, ...), repeating-linear-gradient(90deg, ...);
```

Important properties:

```css
background-position:
  calc((((50% - var(--background-x)) * 1.65) + 50%) + (var(--background-y) * 0.5))
    var(--background-x),
  calc((((50% - var(--background-x)) * -0.9) + 50%) - (var(--background-y) * 0.75))
    var(--background-y);

background-size:
  200% 200%,
  200% 200%;

background-blend-mode: screen;
filter: brightness(1.15) contrast(1.1);
mix-blend-mode: hard-light;
```

This is the extra vertical beam effect described in the original demo.

WebGPU port notes:

- Generate two bar patterns based on `--bars`.
- Move both patterns with different formulas using `--background-x/y`.
- Blend the bar patterns with screen.
- Composite with hard-light.
- Apply the same clip/mask behavior as the shine layer.

### `.card__shine::after`

Pointer-centered luminosity layer.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(0, 0%, 90%, 0.8) 0%,
  hsla(0, 0%, 78%, 0.1) 25%,
  hsl(0, 0%, 0%) 90%
);
```

Important properties:

```css
background-position: center center;
background-size: cover;
mix-blend-mode: luminosity;
filter: brightness(0.6) contrast(4);
```

WebGPU port notes:

- Generate a pointer-centered radial gradient.
- Apply brightness/contrast.
- Composite with luminosity behavior.

## Responsive Scanlines

The original CSS tightens scanlines on smaller screens:

```css
@media screen and (max-width: 900px) {
  .card[data-rarity='rare holo'] .card__shine {
    --scanlines-space: 0.5px;
  }
}
```

For WebGPU, the scanline spacing should be expressed in CSS pixels or derived from the canvas DPR so it stays visually comparable.

## Glare Layers

### `.card__glare`

Main glare layer.

Uses:

```css
opacity: calc(var(--card-opacity) * 0.8);
filter: brightness(0.8) contrast(1.5);
mix-blend-mode: overlay;
```

WebGPU port notes:

- Reuse the base glare surface.
- Multiply opacity by `0.8`.
- Apply brightness/contrast.
- Composite with overlay.

### `.card__glare::after`

Secondary clipped glare.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsl(180, 100%, 95%) 5%,
  hsla(0, 0%, 39%, 0.25) 55%,
  hsla(0, 0%, 0%, 0.36) 110%
);

mix-blend-mode: overlay;
filter: brightness(0.6) contrast(3);
```

This layer follows the same subtype clip switching as `.card__shine`.

WebGPU port notes:

- Generate a pointer-centered radial gradient.
- Apply brightness/contrast.
- Composite with overlay.
- Apply the same subtype clip region.

## Pointer Variables

The runtime updates the same variables used by the original component:

```text
--pointer-x
--pointer-y
--pointer-from-center
--pointer-from-top
--pointer-from-left
--card-opacity
--background-x
--background-y
--rotate-x
--rotate-y
```

For Holofoil Rare, the most important variables are:

```text
--pointer-x
--pointer-y
--background-x
--background-y
--card-opacity
```

The moving holo effect is mostly driven by `--background-x/y`, while glare follows `--pointer-x/y`.

## Blend/Filter Porting Checklist

When porting this effect to WebGPU, implement or approximate:

```text
color-dodge
overlay
screen
hard-light
luminosity
brightness()
contrast()
saturate()
radial-gradient()
repeating-linear-gradient()
clip-path regions
mask-image alpha sampling
```

Expected high-level layer order:

1. Card face image.
2. `.card__shine` rainbow + scanline layer.
3. `.card__shine::before` vertical beam/bar layer.
4. `.card__shine::after` luminosity radial layer.
5. `.card__glare`.
6. `.card__glare::after`.

Each shine/glare overlay must use the correct clip region for Basic, Stage, or Trainer cards.

## Assets

Card-specific local foil/mask assets:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_swholo_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_swholo_2x.webp
```

These local assets are downloaded by:

```text
scripts/download-foil-assets.mjs
```
