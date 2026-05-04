# Trainer Gallery Holofoil

This folder contains the reference CSS for the Trainer Gallery holofoil branch.
It is a special holo variant with a different gradient stack and a centered
radial after-layer.

## Files

`trainer-gallery-holo.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/trainer-gallery-holo.css
```

`index.css`

Imports the effect CSS:

```css
@import './trainer-gallery-holo.css';
```

## Trigger

The current category is `Trainer Gallery Holofoil`.
Cards in this section render with:

```text
data-rarity="trainer gallery rare holo"
```

The original proxy also uses the `rare holo` + `data-trainer-gallery="true"`
selector path.

## Assets

The effect uses the regular holo family underneath, but the selector and glare
treatment are unique.

The local resolver maps these cards to:

```text
/foils/<set>/foils/upscaled/<number>_foil_holo_rainbow_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_holo_rainbow_2x.webp
```

## CSS Behavior

The reference implementation uses:

- a clipped rainbow shine layer
- a centered radial after-layer
- a soft-light glare layer
- no before-layer on the glare

The important distinction is that this is not just a standard holo card with a
different rarity label. The gradient shape is different, and the runtime needs
to preserve the trainer-gallery flag.

## WebGPU Notes

Keep these pieces separate:

1. the display rarity
2. the trainer-gallery selector path
3. the rainbow foil family
4. the glare layering
