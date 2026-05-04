# Radiant Holofoil

This folder contains the reference CSS for Radiant cards.
The effect is brighter and more textured than a normal holo, but it still needs
to leave the artwork readable.

## Files

`radiant-holo.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/radiant-holo.css
```

`index.css`

Imports the effect CSS:

```css
@import './radiant-holo.css';
```

## Trigger

The current category is `Radiant Holofoil`.
Cards in this section render with:

```text
data-rarity="radiant rare"
```

## Assets

The local resolver maps Radiant cards to the etched radiant holo family in
`public/foils`.

## CSS Behavior

The effect is built from:

- a bright radiant shine stack
- a glitter or sparkle overlay
- a strong outer glow
- a glare layer that follows the pointer

The original implementation uses very strong highlights, but the art still has
to remain visible. In practice, this means the effect is mostly about tuning
brightness and blend modes.

## WebGPU Notes

The GPU version should preserve:

1. the bright radiant core
2. the textured overlay
3. the pointer-driven glare
4. the softer art preservation compared to a standard holo

If the effect feels too strong, the art wash is usually the first thing to
reduce.
