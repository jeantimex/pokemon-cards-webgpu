# Trainer Holo

This folder contains the reference CSS for trainer full-art holo cards.
These are the supporter full-art cards that use the stronger trainer glow and a
special background fallback when the card is not masked.

## Files

`trainer-full-art.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/trainer-full-art.css
```

`index.css`

Imports the effect CSS:

```css
@import './trainer-full-art.css';
```

## Trigger

The current category is `Trainer Holo`.
Cards in this section render with:

```text
data-rarity="rare ultra"
data-subtypes*="supporter"
```

## Assets

The local resolver maps these cards to the etched `swsecret` family.
When the card is not masked, the CSS falls back to:

```text
/img/trainerbg.png
```

## CSS Behavior

This branch is a full-art trainer effect, not a regular Pokemon full-art effect.
The main differences are:

- a brighter shine response
- a stronger support-card glare
- a trainer-background no-mask fallback
- selector routing based on the `supporter` subtype

## WebGPU Notes

For the later port, preserve:

1. the trainer-specific brightness curve
2. the glare response
3. the `trainerbg.png` fallback
4. the support-card selector path

This is a distinct visual branch even though it shares `rare ultra` with the
Pokemon full-art category.
