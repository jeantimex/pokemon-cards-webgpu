# Reverse Holo Non-Rares

This folder contains the CSS reference implementation for the left-hand card when the selected type is `Reverse Holo non-rares`.

The goal is to preserve the original `pokemon-cards-css` behavior so the later WebGPU implementation can be built against a clear visual and technical target.

This effect is trickier than the others because the card dataset does not store these as a dedicated reverse-holo rarity. In the source data, the cards are still `Common` or `Uncommon`. The app has to synthesize the reverse-holo state from the selected category, then point the card at the reverse foil and mask assets.

## Files

`reverse-holo.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/reverse-holo.css
```

This file contains the reverse-holo treatment:

- inverted holo clipping
- foil pattern over the card backplate
- pointer-driven brightness and opacity
- subtype-specific glare clipping
- type-specific foil brightness adjustments

`index.css`

Imports the effect CSS:

```css
@import './reverse-holo.css';
```

Shared card styles are loaded by other effect entry files:

- `base.css` from `src/effects/common-and-uncommon/index.css`
- `cards.css` from `src/effects/galaxy-cosmos-holofoil/index.css`

The current app has one shared card DOM, so those shared reference styles only need to be loaded once.

## Trigger

The effect is activated by the selected category, not by the raw rarity coming from the dataset.

The cards in this section are still ordinary card rarities:

```text
Common
Uncommon
```

But `src/main.ts` rewrites the displayed rarity to a synthetic reverse-holo string for this category:

```text
common reverse holo
uncommon reverse holo
```

That matters because the CSS selectors are written against the reverse-holo suffix:

```css
.card[data-rarity$='reverse holo']
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

Reverse Holo uses the shared card layer stack:

```html
<div class="card interactive masked" data-rarity="common reverse holo">
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
- `.card__glare`
- `.card__glare::after`

The key detail is that the shine layer is clipped with an inverted card window so the holo effect appears in the background frame rather than over the image window.

## Foil And Mask Assets

The original `CardProxy.svelte` does not infer reverse holo from rarity alone. In the original app, the reverse-holo demo cards are passed an `isReverse` flag, and that flag changes the generated foil path to a reverse-specific style.

In this port, the reverse-holo cards are selected by category, and the runtime maps them to:

```text
etch = "holo"
style = "reverse"
```

That generates:

```text
<cdn>/foils/<set>/<type>/upscaled/<number>_foil_holo_reverse_2x.webp
```

where `<type>` is either:

```text
foils
masks
```

This project mirrors that path locally:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_reverse_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_reverse_2x.webp
```

Example:

```text
/foils/swsh9/foils/upscaled/120_foil_holo_reverse_2x.webp
/foils/swsh9/masks/upscaled/120_foil_holo_reverse_2x.webp
```

The cards in the current section are:

- Togedemaru
- Dedenne
- Morpeko
- Bidoof
- Pikachu
- Onix
- PokéStop
- Poké Kid
- Ultra Ball

Those are all ordinary common/uncommon cards in the data, but the reverse-holo category gives them the reverse foil treatment.

## Category Rewrite

The most important implementation detail is the category-to-rarity rewrite in `src/main.ts`.

For this category, the app does two things:

1. Appends `reverse holo` to the displayed rarity string so the CSS selectors match.
2. Selects the reverse foil and mask files from `public/foils`.

Without both of those steps, the card can look like a normal non-holo card even though it is selected from the reverse-holo section.

This was the failure mode we had to fix in practice: the pattern was present in the CSS, but the runtime was still asking for the wrong asset family.

## Shine Layer

### `.card__shine`

Main reverse-holo foil layer.

The layer uses:

```css
background-image:
  radial-gradient(circle at var(--pointer-x) var(--pointer-y), #fff 5%, #000 50%, #fff 80%),
  linear-gradient(-45deg, #000 15%, #fff, #000 85%), var(--foil);
```

Layer meaning:

1. A pointer-following radial contrast wash.
2. A diagonal contrast stripe that creates the reverse-holo shimmer.
3. The reverse foil texture itself.

Important properties:

```css
background-blend-mode: soft-light, difference;
background-size:
  120% 120%,
  200% 200%,
  cover;
filter: brightness(var(--foil-brightness)) contrast(1.5) saturate(1);
mix-blend-mode: color-dodge;
opacity: calc((1.5 * var(--card-opacity)) - var(--pointer-from-center));
```

The `--foil-brightness` variable is adjusted by type:

```css
.card.lightning {
  --foil-brightness: 0.7;
}
.card.darkness {
  --foil-brightness: 0.8;
}
.card.metal {
  --foil-brightness: 0.6;
}
```

That keeps the reverse foil from reading too bright on certain card types.

### `.card__glare`

Pointer-driven glare layer.

The reverse holo glare is subtler than regular holo effects, but it still needs to follow the pointer:

```css
background-image: radial-gradient(
  farthest-corner circle at var(--pointer-x) var(--pointer-y),
  hsla(0, 0%, 100%, 0.8) 10%,
  hsla(0, 0%, 100%, 0.5) 20%,
  hsla(0, 0%, 0%, 0.75) 90%
);
```

And a second glare layer is used for detail:

```css
.card[data-rarity$='reverse holo'] .card__glare:after
```

### Clip Paths

The reverse-holo effect inverts the normal holo clip:

```css
.card:not(.masked)[data-rarity$='reverse holo'] .card__shine {
  clip-path: var(--clip-invert);
}
```

That is the main visual difference from standard holo cards. The holo pattern belongs in the background frame, not the image window.

Subtype-specific glare clipping is also preserved:

```css
.card:not(.masked)[data-rarity$='reverse holo'][data-subtypes^='stage'] .card__glare:after {
  clip-path: var(--clip-stage-invert);
}

.card:not(.masked)[data-rarity$='reverse holo'][data-supertype='trainer'] .card__glare:after {
  clip-path: var(--clip-trainer-invert);
}
```

That keeps stage cards and trainers aligned with the original selector behavior.

## Runtime Notes

The local port keeps the reverse-holo implementation split across two responsibilities:

- `src/main.ts` decides when a card should behave like reverse holo.
- `src/effects/reverse-holo/reverse-holo.css` defines how that card should look.

That separation matches the original project shape:

- data classification happens in the card proxy
- visual styling happens in CSS

For the WebGPU port later, the important pieces to preserve are:

1. reverse-holo category detection
2. reverse-specific foil asset selection
3. inverted clip geometry
4. type-specific brightness tuning
5. subtype-specific glare clipping

If any one of those is missing, the effect still looks like a generic light foil instead of a real reverse-holo card.
