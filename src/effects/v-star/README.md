# VStar

This folder contains the reference CSS for VSTAR cards.
It is another diagonal holo family, but with a brighter pastel balance and a
special ancient-texture fallback when the card is not masked.

## Files

`v-star.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/v-star.css
```

`index.css`

Imports the effect CSS:

```css
@import './v-star.css';
```

## Trigger

The current category is `VStar`.
Cards in this section render with:

```text
data-rarity="rare holo vstar"
```

## Assets

The local resolver maps VSTAR cards to the sunpillar family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_sunpillar_2x.webp
```

The no-mask branch uses:

```text
/img/ancient.png
```

## CSS Behavior

The effect uses:

- a masked shine layer
- a pastel bright after-layer
- a hard-light highlight layer
- a hard-light glare layer

The no-mask branch changes the look a lot, so the fallback texture matters for
matching the reference output.

## WebGPU Notes

For the port, preserve:

1. the masked shine stack
2. the ancient-texture fallback
3. the bright after-layer
4. the pastel glare response
