# Pokemon V Full Art

This folder contains the reference CSS for the full-art Pokemon V family.
It is the base visual branch for the more decorative V cards and the trainer
gallery V cards that share the same sunpillar-style foil family.

## Files

`v-full-art.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/v-full-art.css
```

`index.css`

Imports the effect CSS:

```css
@import './v-full-art.css';
```

## Trigger

The current category is `Pokemon V (Full Art)`.
The main selector uses:

```text
data-rarity="rare ultra"
```

with additional support for the trainer-gallery V selector:

```text
data-rarity="rare holo v"
data-trainer-gallery="true"
```

## Assets

The local resolver maps this family to the etched sunpillar files:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_sunpillar_2x.webp
```

The original CSS also falls back to `illusion.png` when the card is not masked.

## CSS Behavior

This branch is a layered gradient stack rather than a single texture:

- a sunpillar base layer
- a diagonal metallic layer
- a radial pointer gradient
- a secondary after-layer with inverted movement
- a glare layer that stays tied to the pointer

The trainer-gallery V branch keeps the same shine family and only changes the
selector and glare response.

## WebGPU Notes

The important porting pieces are:

1. the 4-layer shine stack
2. the opposite-direction motion in the after-layer
3. the trainer-gallery selector branch
4. the no-mask fallback texture

This effect is close to regular V, but it is broader and flatter, so the
geometry and brightness curve should not be reused blindly.
