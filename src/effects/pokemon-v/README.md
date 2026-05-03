# Pokemon V Effect

This folder contains the CSS reference implementation for the left-hand card when the selected type is `Pokemon V`.

The goal is to preserve the original `pokemon-cards-css` behavior so the later WebGPU implementation can be built against a clear visual and technical target.

## Files

`v-regular.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/v-regular.css
```

This file contains the regular Pokemon V holo treatment:

- diagonal sunpillar gradients
- opposite-direction gradient motion while tilting
- grain/noise texture
- color-dodge style shine
- hard-light glare

`index.css`

Imports the effect CSS:

```css
@import './v-regular.css';
```

Shared card styles are loaded by other effect entry files:

- `base.css` from `src/effects/common-and-uncommon/index.css`
- `cards.css` from `src/effects/galaxy-cosmos-holofoil/index.css`

The current app has one shared card DOM, so those shared reference styles only need to be loaded once.

## Trigger

The effect is activated by card metadata:

```css
.card[data-rarity="rare holo v"]
```

The same CSS also supports V-UNION cards:

```css
.card[data-subtypes="v-union"]
```

The current `Pokemon V` category contains cards with:

```text
data-rarity="rare holo v"
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

Pokemon V uses the shared card layer stack:

```html
<div class="card interactive masked" data-rarity="rare holo v">
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
- `.card__shine::after`
- `.card__glare`

Unlike some other effects, this file does not define a `.card__shine::before` layer.

## Foil And Mask Assets

The original `CardProxy.svelte` maps regular `Rare Holo V` to:

```text
etch = "holo"
style = "sunpillar"
```

Then it generates:

```text
<cdn>/foils/<set>/<type>/upscaled/<number>_foil_holo_sunpillar_2x.webp
```

where `<type>` is either:

```text
foils
masks
```

This project mirrors that path locally:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_sunpillar_2x.webp
```

Example:

```text
/foils/swsh7/foils/upscaled/110_foil_holo_sunpillar_2x.webp
/foils/swsh7/masks/upscaled/110_foil_holo_sunpillar_2x.webp
```

For Trainer Gallery or Shiny V cards, the original proxy switches to:

```text
etch = "etched"
style = "sunpillar"
```

The shared downloader and runtime mapping account for that too, even though the current `Pokemon V` category uses the regular `holo/sunpillar` path.

At runtime, `src/main.ts` sets:

```text
class="card ... masked"
--mask: url(...)
--foil: url(...)
```

The copied `v-regular.css` uses generated gradients and `--grain` directly. The foil/mask variables are still provided because the original component provides them and shared `base.css` uses `--mask` for masked shine layers.

## Shine Layers

### No-Mask Adjustment

The CSS includes a no-mask brightness adjustment:

```css
.card[data-rarity='rare holo v']:not(.masked) .card__shine,
.card[data-subtypes='v-union']:not(.masked) .card__shine {
  filter: brightness(0.7) contrast(2) saturate(0.5);
}
```

In this project, the known Pokemon V cards have local mask assets, so the masked branch should be used.

### `.card__shine`

Main Pokemon V diagonal holo layer.

Defines:

```css
--space: 5%;
--angle: 133deg;
--imgsize: 500px;
```

Uses four background layers:

```css
background-image:
  var(--grain), repeating-linear-gradient(0deg, ...), repeating-linear-gradient(var(--angle), ...),
  radial-gradient(...);
```

Layer meanings:

1. `var(--grain)` is a subtle noise texture from `/img/grain.webp`.
2. The `0deg` repeating gradient is the vertical rainbow/sunpillar band.
3. The `var(--angle)` repeating gradient creates diagonal metallic streaks.
4. The radial gradient darkens/lightens around the pointer.

Important properties:

```css
background-blend-mode: screen, hue, hard-light;

background-size:
  var(--imgsize) 100%,
  200% 700%,
  300% 100%,
  200% 100%;

background-position:
  center,
  0% var(--background-y),
  var(--background-x) var(--background-y),
  var(--background-x) var(--background-y);

filter: brightness(0.8) contrast(2.95) saturate(0.65);
```

WebGPU port notes:

- Sample `/img/grain.webp`.
- Generate a vertical repeating sunpillar gradient.
- Generate a diagonal repeating metallic gradient at `133deg`.
- Generate a radial pointer gradient.
- Move the vertical gradient with `--background-y`.
- Move the diagonal and radial layers with `--background-x/y`.
- Apply screen, hue, and hard-light blend behavior between the generated layers.
- Apply brightness/contrast/saturation.
- Apply the card-specific mask.

### `.card__shine::after`

Secondary shine layer that moves in the opposite direction.

Uses the same background stack as `.card__shine`, but changes the diagonal layer position:

```css
background-position:
  center,
  0% var(--background-y),
  calc(var(--background-x) * -1) calc(var(--background-y) * -1),
  var(--background-x) var(--background-y);
```

Important properties:

```css
background-size:
  var(--imgsize) 100%,
  200% 400%,
  195% 100%,
  200% 100%;

filter: brightness(1) contrast(2.5) saturate(1.75);
mix-blend-mode: soft-light;
```

This is the key "travels in opposite directions" part of the Pokemon V effect.

WebGPU port notes:

- Reuse the same generated layer stack.
- Move the diagonal gradient with negative `--background-x/y`.
- Use the smaller `195% 100%` scale for the diagonal layer.
- Composite with soft-light.
- Apply the card-specific mask.

## Glare Layer

### `.card__glare`

Pointer-following hard-light glare.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsl(0, 0%, 100%) 0%,
  hsla(210, 3%, 54%, 0.33) 45%,
  hsla(0, 0%, 20%, 0.9) 130%
);

opacity: calc(var(--card-opacity) * 0.5);
mix-blend-mode: hard-light;
filter: brightness(0.9) contrast(1.75);
```

WebGPU port notes:

- Generate a pointer-centered radial gradient.
- Multiply opacity by `0.5`.
- Apply brightness/contrast.
- Composite with hard-light.

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

For Pokemon V, the most important variables are:

```text
--pointer-x
--pointer-y
--background-x
--background-y
--card-opacity
```

The moving holo effect is driven mainly by `--background-x/y`; glare follows `--pointer-x/y`.

## Blend/Filter Porting Checklist

When porting this effect to WebGPU, implement or approximate:

```text
screen
hue
hard-light
soft-light
brightness()
contrast()
saturate()
radial-gradient()
repeating-linear-gradient(0deg)
repeating-linear-gradient(133deg)
grain texture sampling
mask-image alpha sampling
```

Expected high-level layer order:

1. Card face image.
2. `.card__shine` base grain + sunpillar + diagonal + radial layer.
3. `.card__shine::after` opposite-motion shine layer.
4. `.card__glare` hard-light radial glare.

## Assets

Shared texture:

```text
/img/grain.webp
```

Card-specific regular Pokemon V assets:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_sunpillar_2x.webp
```

Related Trainer Gallery/Shiny V assets may use:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_sunpillar_2x.webp
```

These local assets are downloaded by:

```text
scripts/download-foil-assets.mjs
```
