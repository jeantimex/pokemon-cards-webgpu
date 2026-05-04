# Trainer Gallery VMax

This folder contains the reference CSS for Trainer Gallery VMAX cards.
It reuses the alternate-rainbow VMAX shine stack and only changes the glare
response.

## Files

`rainbow-alt.css`

Shared rainbow-alt stack copied from:

```text
pokemon-cards-css/public/css/cards/rainbow-alt.css
```

`trainer-gallery-v-max.css`

Trainer-gallery-specific glare override copied from:

```text
pokemon-cards-css/public/css/cards/trainer-gallery-v-max.css
```

`index.css`

Imports both files:

```css
@import '../v-max-alt/rainbow-alt.css';
@import './trainer-gallery-v-max.css';
```

## Trigger

The current category is `Trainer Gallery (VMax)`.
Cards in this section render with:

```text
data-rarity="rare holo vmax"
data-trainer-gallery="true"
```

## Assets

Trainer Gallery VMAX uses the same local etched/swsecret family as the VMAX
alternate/rainbow branch:

```text
/foils/<set>/foils/upscaled/<number>_foil_etched_swsecret_2x.webp
/foils/<set>/masks/upscaled/<number>_foil_etched_swsecret_2x.webp
```

## CSS Behavior

The effect is mostly inherited from the rainbow-alt branch:

- rainbow stripe stack
- glitter overlay
- color-dodge after-layer
- foil-influenced before-layer

The trainer-gallery file only changes the glare composition and opacity.

## WebGPU Notes

For the port, keep the following separate:

1. the shared rainbow-alt stack
2. the trainer-gallery glare override
3. the `rare holo vmax` display rarity
4. the `data-trainer-gallery="true"` selector path
