# Common & Uncommon Effect

This folder contains the CSS implementation for the left-hand reference card when the selected type is `Common & Uncommon`.

The goal of this effect is to match the original `pokemon-cards-css` implementation as closely as possible before porting the same behavior to WebGPU. For this type, the visual treatment is intentionally simple:

- The whole card rotates in 3D based on pointer position.
- A radial glare follows the pointer across the card face.
- Basic non-holo cards do not use foil textures, masks, or animated holo layers.

## Files

`base.css`

Copied directly from:

```text
pokemon-cards-css/public/css/cards/base.css
```

This file defines the shared card rendering system from the reference project:

- CSS custom properties for pointer position, rotation, opacity, card glow, and clipping regions.
- The card layer stack: `.card`, `.card__translater`, `.card__rotator`, `.card__front`, `.card__shine`, and `.card__glare`.
- The 3D transform rules.
- The default shadow.
- The glare radial gradient.
- Shared shine/glare masking behavior used by other card types.

`basic.css`

Copied directly from:

```text
pokemon-cards-css/public/css/cards/basic.css
```

For this card type, the reference `basic.css` is mostly a placeholder. The basic card effect comes from `base.css`, especially `.card__glare`.

`index.css`

This project's local entry point for the effect. It imports the copied reference files and adds only comparison-pane sizing glue:

```css
@import "./base.css";
@import "./basic.css";

.pane-css .card {
  width: min(60cqh, calc(100cqw - 48px));
}

.pane-css .card__rotator {
  width: 100%;
}
```

That sizing keeps the CSS card aligned with the right-hand WebGPU comparison card.

## Required DOM Structure

The reference CSS expects this layer structure:

```html
<div class="card interactive">
  <div class="card__translater">
    <button class="card__rotator">
      <img class="card__back" />
      <div class="card__front">
        <img />
        <div class="card__shine"></div>
        <div class="card__glare"></div>
      </div>
    </button>
  </div>
</div>
```

Each layer has a specific job:

- `.card` owns the CSS variables and data attributes.
- `.card__translater` applies translation and scale.
- `.card__rotator` applies the 3D rotation and shadow.
- `.card__front` contains the visible card face plus effect overlays.
- `.card__shine` exists for shared compatibility with other card types.
- `.card__glare` draws the basic glare effect.

For Common & Uncommon, `.card__glare` is the important visual layer. In `base.css`, it uses:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(0, 0%, 100%, 0.8) 10%,
  hsla(0, 0%, 100%, 0.65) 20%,
  hsla(0, 0%, 0%, 0.5) 90%
);

opacity: var(--card-opacity);
mix-blend-mode: overlay;
```

## Runtime Data

The app updates the `.card` element whenever the selected card changes. This happens in `src/main.ts` in `updateCssCard`.

It sets:

- Card classes, including the Pokemon type, such as `grass`, `fire`, or `water`.
- Data attributes used by the reference CSS:
  - `data-number`
  - `data-set`
  - `data-subtypes`
  - `data-supertype`
  - `data-rarity`
  - `data-trainer-gallery`
- Image `src` and `alt` text.
- Static reference variables on `.card__front`:
  - `--seedx`
  - `--seedy`
  - `--cosmosbg`

The seed variables are not visually important for basic cards, but they are kept because the reference component sets them and other effect types will need the same pattern.

## Pointer Math

The reference Svelte component computes pointer position relative to `.card__rotator`, not the full pane. This project does the same.

On pointer movement:

1. Get the card bounds with `getBoundingClientRect()`.
2. Convert pointer coordinates to a 0-100 percent position inside the card.
3. Convert that percent position to a center-relative offset.
4. Update CSS variables for rotation, glare, and background position.

The formulas match `pokemon-cards-css/src/lib/components/Card.svelte`:

```ts
const percent = {
  x: clamp(round((100 / rect.width) * absolute.x)),
  y: clamp(round((100 / rect.height) * absolute.y)),
};

const center = {
  x: percent.x - 50,
  y: percent.y - 50,
};

cssTarget = {
  backgroundX: adjust(percent.x, 0, 100, 37, 63),
  backgroundY: adjust(percent.y, 0, 100, 33, 67),
  rotateX: round(-(center.x / 3.5)),
  rotateY: round(center.y / 3.5),
  pointerX: round(percent.x),
  pointerY: round(percent.y),
  opacity: 1,
};
```

These values are written to the CSS variables expected by `base.css`:

```text
--pointer-x
--pointer-y
--pointer-from-center
--pointer-from-top
--pointer-from-left
--card-opacity
--rotate-x
--rotate-y
--background-x
--background-y
--card-scale
--translate-x
--translate-y
```

## Rotation

The reference CSS applies rotation on `.card__rotator`:

```css
transform: rotateY(var(--rotate-x)) rotateX(var(--rotate-y));
```

The variable names are a little counterintuitive:

- `--rotate-x` is used by `rotateY(...)`.
- `--rotate-y` is used by `rotateX(...)`.

This project preserves those names because the copied CSS expects them.

## Motion

The original Svelte version uses `spring` from `svelte/motion`. This project is plain TypeScript, so it approximates the same smoothing in the render loop:

```ts
current += (target - current) * 0.15;
```

This is applied to pointer position, rotation, background position, and glare opacity before writing CSS variables. On pointer leave, the target values reset to:

```text
pointer: 50%, 50%
rotation: 0deg, 0deg
background: 50%, 50%
opacity: 0
```

## Current Scope

This folder only implements the CSS reference effect for the left pane. The right pane WebGPU card is intentionally not affected by these files.

When adding the next type, follow the same pattern:

1. Create a folder under `src/effects/<type-name>/`.
2. Copy the matching reference CSS files from `pokemon-cards-css/public/css/cards/`.
3. Add a small `index.css` that imports those files and contains only project-local glue.
4. Add any runtime metadata, mask, foil, or CSS variables needed by that type in `src/main.ts`.
