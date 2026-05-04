# Shiny Vault

This folder contains the reference CSS for Shiny Vault cards.
It is tricky because the visual treatment changes based on whether the card is
a plain shiny card, a shiny V card, or a shiny VMAX card.

## Files

`shiny-rare.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/shiny-rare.css
```

`shiny-v.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/shiny-v.css
```

`shiny-vmax.css`

Copied from:

```text
pokemon-cards-css/public/css/cards/shiny-vmax.css
```

`index.css`

Imports all three files:

```css
@import './shiny-rare.css';
@import './shiny-v.css';
@import './shiny-vmax.css';
```

## Trigger

The current category is `Shiny Vault`.
The runtime rewrites the displayed rarity from the `sv` number prefix into one
of three values:

- `rare shiny`
- `rare shiny v`
- `rare shiny vmax`

## Assets

The local resolver maps the shiny branches to the same foil families used by
the original proxy, mostly etched sunpillar and swsecret variants.

## CSS Behavior

The key detail is not just the CSS. The runtime has to rewrite the rarity so
the correct selector fires:

- plain shiny cards
- shiny V cards
- shiny VMAX cards

Without that rewrite, the selectors do not match and the effect falls back to a
normal non-shiny render.

## WebGPU Notes

For the port, keep the branch split explicit:

1. the shiny rarity rewrite
2. the V branch
3. the VMAX branch
4. the shared glitter and shine logic

This family is a good example of why the asset resolver and the CSS selectors
must be designed together.
