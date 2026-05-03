# Galaxy/Cosmos Holofoil Effect

This folder contains the CSS reference implementation for the left-hand card when the selected type is `Galaxy/Cosmos Holofoil`.

The goal is to preserve the original `pokemon-cards-css` behavior so the WebGPU port can be implemented against a stable visual target.

## Files

`cards.css`

Copied directly from:

```text
pokemon-cards-css/public/css/cards.css
```

This defines shared variables used by multiple holo effects:

- texture asset variables like `--grain` and `--glitter`
- color variables like `--red`, `--yellow`, `--green`, `--blue`, `--violet`
- clipping variables like `--clip`, `--clip-stage`, and `--clip-trainer`

`cosmos-holo.css`

Copied directly from:

```text
pokemon-cards-css/public/css/cards/cosmos-holo.css
```

This contains the Galaxy/Cosmos-specific layer styling.

`index.css`

Imports the reference CSS in dependency order:

```css
@import './cards.css';
@import './cosmos-holo.css';
```

`base.css` is not imported here because it is already imported by `src/effects/common-and-uncommon/index.css`. The app currently has one shared card DOM, so `base.css` only needs to be loaded once.

## Trigger

The effect is activated by card metadata, not by a separate class.

The key selector is:

```css
.card[data-rarity="rare holo cosmos"]
```

For the current dataset, the `Galaxy/Cosmos Holofoil` category contains cards with:

```text
data-rarity="rare holo cosmos"
```

The runtime in `src/main.ts` sets:

```text
data-number
data-set
data-subtypes
data-supertype
data-rarity
data-trainer-gallery
```

Those attributes allow the copied CSS selectors to behave the same way as the original Svelte implementation.

## DOM Layers

This effect uses the same card structure as the original:

```html
<div class="card interactive masked" data-rarity="rare holo cosmos">
  <div class="card__translater">
    <button class="card__rotator">
      <img class="card__back" />
      <div class="card__front" style="--mask: url(...); --foil: url(...); --cosmosbg: ...;">
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

## Masking

The original implementation uses generated mask images so the galaxy effect appears in the card artwork/foil region without washing over the main character.

The base CSS applies this when `.card.masked` is present:

```css
.card.masked .card__shine,
.card.masked .card__shine:before,
.card.masked .card__shine:after {
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
}
```

For `Rare Holo Cosmos`, `src/main.ts` generates local asset paths that mirror `CardProxy.svelte`:

```text
/foils/<set>/masks/upscaled/<number>_foil_holo_cosmos_2x.webp
/foils/<set>/foils/upscaled/<number>_foil_holo_cosmos_2x.webp
```

Example:

```text
/foils/swshp/masks/upscaled/127_foil_holo_cosmos_2x.webp
/foils/swshp/foils/upscaled/127_foil_holo_cosmos_2x.webp
```

The app sets:

```text
class="card ... masked"
--mask: url(...)
--foil: url(...)
```

`cosmos-holo.css` mostly uses the built-in cosmos sheet assets rather than `--foil`, but `--foil` is still set for parity with the original runtime.

## Cosmos Background Position

The original Svelte component creates a random seed once per card instance:

```js
const randomSeed = {
  x: Math.random(),
  y: Math.random(),
};

const cosmosPosition = {
  x: Math.floor(randomSeed.x * 734),
  y: Math.floor(randomSeed.y * 1280),
};
```

Then it writes:

```text
--cosmosbg: <x>px <y>px;
```

This project caches one random seed per card id for the lifetime of the page. That gives stable behavior when switching away from and back to the same card, while preserving the original "random per card instance" behavior.

For pixel-perfect repeatability across reloads, replace the random seed with a deterministic seed per card id.

## Shine Layers

### `.card__shine`

Main cosmos layer.

Uses:

```css
background-image:
  url('/img/cosmos-bottom.png'), repeating-linear-gradient(...), radial-gradient(...);
```

Important properties:

```css
background-blend-mode: color-burn, multiply;

background-position:
  var(--cosmosbg, center center),
  calc(10% + (var(--pointer-from-left) * 80%)) calc(10% + (var(--pointer-from-top) * 80%)),
  center center;

background-size:
  cover,
  400% 900%,
  cover;

filter: brightness(1) contrast(1) saturate(0.8);
mix-blend-mode: color-dodge;
```

WebGPU port notes:

- Sample `cosmos-bottom.png`.
- Overlay a repeating rainbow gradient at angle `82deg`.
- Add a radial pointer light.
- Use color-burn/multiply style compositing internally, then color-dodge the result over the card face.
- Mask this whole layer with the card-specific mask texture.

### `.card__shine::before`

Middle cosmos layer.

Uses:

```css
background-image: url('/img/cosmos-middle-trans.png'), repeating-linear-gradient(...);
```

Important properties:

```css
background-blend-mode: lighten, multiply;

background-position:
  var(--cosmosbg, center center),
  calc(15% + (var(--pointer-from-left) * 70%)) calc(15% + (var(--pointer-from-top) * 70%)),
  center center;

background-size:
  cover,
  400% 900%,
  cover;

filter: brightness(1.25) contrast(1.75) saturate(0.8);
mix-blend-mode: overlay;
```

WebGPU port notes:

- Sample `cosmos-middle-trans.png`.
- Reuse the same rainbow gradient pattern.
- Move the gradient less than the base layer: `15% + pointer * 70%`.
- Composite with overlay over the main card result.
- Apply the same mask.

### `.card__shine::after`

Top cosmos layer.

Uses:

```css
background-image: url('/img/cosmos-top-trans.png'), repeating-linear-gradient(...);
```

Important properties:

```css
background-blend-mode: multiply, multiply;

background-position:
  var(--cosmosbg, center center),
  calc(20% + (var(--pointer-from-left) * 60%)) calc(20% + (var(--pointer-from-top) * 60%)),
  center center;

background-size:
  cover,
  400% 900%,
  cover;

filter: brightness(1.25) contrast(1.75) saturate(0.8);
mix-blend-mode: multiply;
```

WebGPU port notes:

- Sample `cosmos-top-trans.png`.
- Reuse the rainbow gradient.
- Move this gradient least: `20% + pointer * 60%`.
- Multiply it into the result.
- Apply the same mask.

## Glare Layers

### `.card__glare`

Pointer-following overlay.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(204, 100%, 95%, 0.8) 5%,
  hsla(250, 15%, 20%, 1) 150%
);

filter: brightness(0.75) contrast(2) saturate(2);
mix-blend-mode: overlay;
opacity: calc(var(--card-opacity) * (0.25 + var(--pointer-from-center)));
```

WebGPU port notes:

- Generate a radial gradient centered at pointer UV.
- Opacity increases as the pointer moves away from the center.
- Apply brightness/contrast/saturation.
- Composite with overlay.

### `.card__glare::after`

Secondary glare layer.

Uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsl(280, 100%, 96%) 5%,
  hsl(0, 0%, 10%) 60%
);

filter: brightness(0.75) contrast(2.5) saturate(2);
mix-blend-mode: soft-light;
opacity: calc(1 - var(--pointer-from-top) * 0.75);
```

WebGPU port notes:

- Generate a second radial gradient.
- Its opacity fades as the pointer moves downward.
- Composite with soft-light.

## Clipping

The default cosmos shine and glare use:

```css
clip-path: var(--clip);
```

Stage cards use:

```css
clip-path: var(--clip-stage);
```

Supporter cards use:

```css
clip-path: var(--clip-trainer);
```

The current Galaxy/Cosmos cards include Basic and Supporter examples, so both default and trainer clipping matter.

For WebGPU, these clip regions can be represented as:

- hard-coded UV rectangles/polygons,
- signed distance masks,
- or precomputed alpha masks.

The card-specific `--mask` texture is still required to avoid covering the subject art.

## Pointer Variables

The runtime updates the same variables used by the original Svelte component:

```text
--pointer-x
--pointer-y
--pointer-from-center
--pointer-from-top
--pointer-from-left
--card-opacity
--background-x
--background-y
```

For cosmos, the most important ones are:

- `--pointer-x`
- `--pointer-y`
- `--pointer-from-center`
- `--pointer-from-top`
- `--pointer-from-left`
- `--card-opacity`
- `--cosmosbg`

## Blend/Filter Porting Checklist

When porting this to WebGPU, implement or approximate:

```text
color-burn
multiply
lighten
overlay
color-dodge
soft-light
brightness()
contrast()
saturate()
radial-gradient()
repeating-linear-gradient(82deg)
mask-image alpha sampling
clip-path regions
```

The expected high-level layer order is:

1. Card face image.
2. Masked `.card__shine` base cosmos layer.
3. Masked `.card__shine::before` middle cosmos layer.
4. Masked `.card__shine::after` top cosmos layer.
5. `.card__glare`.
6. `.card__glare::after`.

## Assets

Cosmos sheet assets:

```text
/img/cosmos-bottom.png
/img/cosmos-middle-trans.png
/img/cosmos-top-trans.png
```

Card-specific local foil/mask assets:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_cosmos_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_cosmos_2x.webp
```

These were downloaded from the same CDN paths generated by the original `CardProxy.svelte`.
