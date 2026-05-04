# Rainbow Rare

This folder contains the reference CSS for Rainbow Rare cards.
The effect combines rainbow gradients, glitter, and strong compositing to create
a saturated foil that changes as the card tilts.

## Files

`rainbow-holo.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/rainbow-holo.css
```

`index.css`

Imports the effect CSS:

```css
@import './rainbow-holo.css';
```

## Trigger

The current category is `Rainbow Rare`.
Cards in this section render with:

```text
data-rarity="rare rainbow"
```

## Assets

The local resolver maps Rainbow Rare to the `swsecret` etched family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

## CSS Behavior

This branch is mostly a compositing stack:

- rainbow gradient bands
- glitter overlay
- a second after-layer with different motion
- a pointer-driven glare layer

The effect changes a lot with pointer position because the background positions
are driven by the same variables that control the card rotation.

## WebGPU Notes

Keep these pieces separate in the port:

1. the rainbow banding
2. the glitter texture
3. the color-dodge / overlay blending
4. the glare layer

The alternate/rainbow VMAX branch reuses the same visual ideas, but the card
selectors and asset resolution are different.
