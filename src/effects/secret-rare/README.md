# Secret Rare

This folder contains the reference CSS for Secret Rare cards.
It also covers the trainer-gallery secret-rare branch, which shares the same
gold foil family with a separate selector path.

## Files

`secret-rare.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/secret-rare.css
```

`trainer-gallery-secret-rare.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/trainer-gallery-secret-rare.css
```

`index.css`

Imports both files:

```css
@import './secret-rare.css';
@import './trainer-gallery-secret-rare.css';
```

## Trigger

The current category is `Secret Rare (Gold)`.
Cards in this section render with:

```text
data-rarity="rare secret"
```

## Assets

The local resolver maps Secret Rare cards to the `swsecret` family:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

## CSS Behavior

The effect is a gold foil treatment with:

- etched shine
- a trainer-gallery-specific selector branch
- a glare layer tied to the pointer
- no-mask fallback handling

The trainer-gallery cards reuse the same gold family, so the category split is
mostly about selector routing rather than a different texture family.

## WebGPU Notes

For the port, preserve:

1. the gold foil family
2. the trainer-gallery selector override
3. the glare layer
4. the unmasked fallback behavior
