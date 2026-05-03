# Holofoil Amazing Rare Effect

This folder contains the CSS reference implementation for the left-hand card when the selected type is `Holofoil Amazing Rare`.

The goal is to preserve the original `pokemon-cards-css` behavior so the later WebGPU implementation can be built against a clear visual and technical target.

## Files

`amazing-rare.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/amazing-rare.css
```

This file contains the Amazing Rare-specific shine and glare rules.

`index.css`

Imports the effect CSS:

```css
@import './amazing-rare.css';
```

Shared card styles are loaded elsewhere:

- `base.css` is imported by `src/effects/common-and-uncommon/index.css`.
- `cards.css` is imported by `src/effects/galaxy-cosmos-holofoil/index.css`.

The current app has one shared card DOM, so those shared reference styles only need to be loaded once.

## Trigger

The effect is activated by card metadata:

```css
.card[data-rarity="amazing rare"]
```

The current `Holofoil Amazing Rare` category contains cards with:

```text
data-rarity="amazing rare"
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

Amazing Rare uses the same card layer stack as the other reference effects:

```html
<div class="card interactive masked" data-rarity="amazing rare">
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

The original `CardProxy.svelte` maps `Amazing Rare` to:

```text
etch = "etched"
style = "swsecret"
```

Then it generates:

```text
<cdn>/foils/<set>/<type>/upscaled/<number>_foil_etched_swsecret_2x.webp
```

where `<type>` is either:

```text
foils
masks
```

This project mirrors that path locally:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

Example:

```text
/foils/swsh4/foils/upscaled/009_foil_etched_swsecret_2x.webp
/foils/swsh4/masks/upscaled/009_foil_etched_swsecret_2x.webp
```

At runtime, `src/main.ts` sets:

```text
class="card ... masked"
--mask: url(...)
--foil: url(...)
```

The `.masked` class is important because shared `base.css` applies `--mask` to the shine layers.

## Shine Layers

### `.card__shine`

Main glitter and radial dark/light layer.

Uses:

```css
background-image: var(--glitter), var(--glitter), radial-gradient(...);
```

Important properties:

```css
background-size:
  var(--glittersize) var(--glittersize),
  var(--glittersize) var(--glittersize),
  cover;

background-position:
  40% 45%,
  55% 55%,
  center center;

background-blend-mode: soft-light, color-burn;
filter: brightness(1) contrast(1) saturate(0.9);
```

WebGPU port notes:

- Sample `/img/glitter.png` twice at different fixed offsets.
- Add a pointer-centered radial gradient.
- Blend the glitter layers using soft-light and color-burn behavior.
- Apply the card-specific mask inherited from `.card.masked`.

### `.card__shine::before`

Foil texture layer.

Uses:

```css
background-image: var(--foil), radial-gradient(...);
```

Important properties:

```css
-webkit-mask-image: none !important;
mask-image: none !important;

background-size: cover, cover;
background-position:
  center center,
  center center;
background-blend-mode: color-burn;

mix-blend-mode: lighten;
filter: brightness(1) contrast(1) saturate(1);
opacity: 0.5;
```

This layer explicitly disables the inherited mask:

```css
-webkit-mask-image: none !important;
mask-image: none !important;
```

That is different from many other holo effects. The result is that the foil can extend past the normal image frame, matching the Amazing Rare treatment.

WebGPU port notes:

- Sample the card-specific `--foil` texture.
- Add the pointer-centered radial gradient.
- Combine them with color-burn.
- Composite the result with lighten at `0.5` opacity.
- Do not apply the card mask to this layer.

### `.card__shine::after`

Rainbow/sunpillar saturation layer.

Uses:

```css
background-image: repeating-linear-gradient(
  calc(var(--angle)),
  var(--sunpillar-clr-1) calc(var(--space) * 1),
  ... var(--sunpillar-clr-1) calc(var(--space) * 7)
);
```

Important properties:

```css
-webkit-mask-image: none !important;
mask-image: none !important;

background-size: 400% 800%;
background-position: calc(50% + (50% - var(--background-x)) * 3)
  calc(50% + (50% - var(--background-y)) * 3);

filter: brightness(calc(0.75 - (var(--pointer-from-center) * 0.5))) contrast(1) saturate(1);
mix-blend-mode: saturation;
```

This layer also disables the inherited mask, allowing the rainbow treatment to extend beyond the normal artwork mask.

WebGPU port notes:

- Generate a repeating linear rainbow gradient at `--angle`.
- Move it based on `--background-x/y`.
- Brightness decreases as the pointer moves away from center.
- Composite with saturation blend behavior.
- Do not apply the card mask to this layer.

## Glare Layers

### `.card.masked[data-rarity="amazing rare"] .card__glare`

Main glare layer for masked Amazing Rare cards.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(50, 20%, 90%, 0.45) 0%,
  hsla(150, 20%, 30%, 0.45) 45%,
  hsla(0, 0%, 0%, 0.9) 120%
);

filter: brightness(0.9) contrast(2);
```

WebGPU port notes:

- Generate a pointer-centered radial gradient.
- Apply brightness and contrast.
- This layer uses the normal `.card__glare` behavior from `base.css` as its foundation.

### `.card.masked[data-rarity="amazing rare"] .card__glare::after`

Masked secondary glare layer.

Uses:

```css
-webkit-mask-image: var(--mask);
mask-image: var(--mask);
-webkit-mask-size: cover;
mask-size: cover;

background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(50, 20%, 90%, 0.75) 0%,
  hsla(150, 20%, 30%, 0.65) 45%,
  hsla(0, 0%, 0%, 1) 90%
);

filter: brightness(1) contrast(1.5);
mix-blend-mode: overlay;
opacity: 1;
```

WebGPU port notes:

- Generate a second pointer-centered radial gradient.
- Apply the card-specific mask.
- Composite with overlay.

## No-Mask Fallback

The original CSS includes fallback selectors for cards without generated masks:

```css
.card:not(.masked)[data-rarity='amazing rare'] .card__shine {
  clip-path: var(--clip);
}

.card:not(.masked)[data-rarity='amazing rare'] .card__glare {
  background-image: radial-gradient(...);
  mix-blend-mode: multiply;
}
```

In this project, the known Amazing Rare cards have downloaded mask and foil assets, so the masked branch should be used.

## Pointer Variables

The runtime updates the same CSS variables used by the original component:

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

For Amazing Rare, the most important variables are:

```text
--pointer-x
--pointer-y
--pointer-from-center
--background-x
--background-y
--card-opacity
--foil
--mask
```

## Blend/Filter Porting Checklist

When porting this effect to WebGPU, implement or approximate:

```text
soft-light
color-burn
lighten
saturation
overlay
brightness()
contrast()
saturate()
radial-gradient()
repeating-linear-gradient()
mask-image alpha sampling
```

Expected high-level layer order:

1. Card face image.
2. `.card__shine` glitter/radial layer, masked by the card mask.
3. `.card__shine::before` foil layer, unmasked, lighten blend at 0.5 opacity.
4. `.card__shine::after` rainbow saturation layer, unmasked.
5. `.card__glare`.
6. `.card__glare::after`, masked, overlay blend.

## Assets

Shared texture:

```text
/img/glitter.png
```

Card-specific Amazing Rare assets:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

These local assets are downloaded by:

```text
scripts/download-foil-assets.mjs
```
