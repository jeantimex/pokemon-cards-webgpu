# Trainer Gallery V

This folder contains the reference CSS for Trainer Gallery V cards.
These cards mostly behave like the normal full-art V branch, but the glare and
selector routing are trainer-gallery specific.

## Files

`trainer-gallery-v-regular.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/trainer-gallery-v-regular.css
```

`index.css`

Imports the effect CSS:

```css
@import './trainer-gallery-v-regular.css';
```

## Trigger

The current category is `Trainer Gallery (V)`.
Cards in this section render with:

```text
data-rarity="rare holo v"
data-trainer-gallery="true"
```

## Assets

Trainer Gallery V uses the same etched sunpillar family as the full-art V
branch:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_sunpillar_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_sunpillar_2x.webp
```

## CSS Behavior

The reference file is intentionally small. It mainly tweaks the glare opacity
for trainer-gallery V cards while keeping the full-art V shine stack.

The porting detail to remember is that the effect is driven by the combination
of:

- `rare holo v`
- `data-trainer-gallery="true"`

If either part is missing, the selector path changes.

## WebGPU Notes

For the port, preserve:

1. the full-art V shine family
2. the trainer-gallery glare adjustment
3. the shared sunpillar asset family
