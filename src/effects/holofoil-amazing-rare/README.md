# Holofoil Amazing Rare

This folder contains the reference CSS for Amazing Rare cards.
The effect is brighter and shinier than a standard holo, and the foil extends
past the frame with a mask-driven glitter treatment.

## Files

`amazing-rare.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/amazing-rare.css
```

`index.css`

Imports the effect CSS:

```css
@import './amazing-rare.css';
```

## Trigger

The current category is `Holofoil Amazing Rare`.
Cards in this section render with:

```text
data-rarity="amazing rare"
```

## Assets

The local resolver maps Amazing Rare to the `swsecret` etched family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

The effect also uses the shared glitter texture from `public/img/glitter.png`.

## CSS Behavior

This branch is defined by three things:

- a brighter foil response than a normal holo
- a glitter overlay on top of the foil mask
- a lighter blend mode so the foil blooms beyond the card frame

The effect is mostly a mask and compositing problem. The shape of the shine is
more important than the exact texture.

## WebGPU Notes

For the later GPU port, preserve:

1. the outer shine shape
2. the glitter overlay
3. the bright masked foil
4. the `lighten`-style compositing

The main risk is over-saturating the art. The original implementation keeps the
foil intense while still leaving the card readable.
