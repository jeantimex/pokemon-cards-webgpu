# VMax

This folder contains the reference CSS for regular Pokemon VMAX cards.
It is the standard VMAX holo treatment with a broader foil pattern, stronger
texture, and a `vmaxbg.jpg` fallback for unmasked cards.

## Files

`v-max.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/v-max.css
```

`index.css`

Imports the effect CSS:

```css
@import './v-max.css';
```

## Trigger

The current category is `VMax`.
Cards in this section render with:

```text
data-rarity="rare holo vmax"
```

## Assets

Regular VMAX cards use the etched sunpillar family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_sunpillar_2x.webp
```

For the no-mask branch, the CSS falls back to:

```text
/img/vmaxbg.jpg
```

## CSS Behavior

The effect is a layered composition:

- a broad background texture
- repeating color gradients
- a diagonally moving metallic layer
- a radial pointer gradient
- a hard-light glare

The VMAX motion is broader and more subtle than the smaller V cards.

## WebGPU Notes

For the port, keep:

1. the `vmaxbg.jpg` fallback
2. the broad gradient scale
3. the pointer-driven background movement
4. the hard-light glare
