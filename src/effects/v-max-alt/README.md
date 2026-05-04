# VMax Alternate / Rainbow

This folder contains the reference CSS for the alternate-art VMAX branch.
The same visual family is also used by Trainer Gallery VMAX cards.

## Files

`rainbow-alt.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/rainbow-alt.css
```

`index.css`

Imports the effect CSS:

```css
@import './rainbow-alt.css';
```

## Trigger

The current category is `VMax (Alternate/Rainbow)`.
Cards in this section render with:

```text
data-rarity="rare rainbow alt"
```

## Assets

The local resolver maps these cards to the etched `swsecret` family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

## CSS Behavior

This effect is built from:

- a repeating rainbow stripe gradient
- a glitter overlay
- a large moving color gradient
- an exclusion-blended after-layer
- a color-dodge shine response

Trainer Gallery VMAX cards reuse the same visual family, so the port should
keep the selector split but share the underlying shader logic.

## WebGPU Notes

Preserve these parts separately:

1. the rainbow banding
2. the glitter texture
3. the after-layer motion
4. the glare response
