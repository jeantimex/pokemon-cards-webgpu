# Pokémon Cards (WebGPU vs CSS)

A side-by-side visual comparison and port of the gorgeous holographic card effects from [pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css) by [@simeydotme](https://github.com/simeydotme) to **WebGPU / WGSL**.

This project renders Pokémon card styles (ranging from Common, Holofoil Rare, and Secret Rare to V-Max, Rainbow, and Radiant cards) using modern WebGPU graphics APIs alongside their original CSS counterparts, synchronized in real-time under pointer interactions.

---

## 🌟 Features

- **Side-by-Side Comparison:** Direct visual comparison of CSS 3D transforms and radial gradients versus hardware-accelerated WebGPU/WGSL shaders.
- **Pointer Tracking & Physics:** Shared, synchronized cursor movement and 3D card tilt/glare between the two rendering targets.
- **Rich Holographic Types:** Ported shader logic for:
  - Common & Uncommon
  - Galaxy & Cosmos Holofoil
  - Amazing Rare
  - Rare / Regular Holofoil
  - Trainer Gallery Holofoil & V / VMax
  - Secret Rare & Rainbow Rare
  - Reverse Holo
  - Pokémon V, VMax, V-Max Alt, and VStar
  - Radiant Holofoil
  - Shiny Vault
- **Dynamic Controls:** Built-in interactive library UI powered by `lil-gui` to toggle card variants, adjust rendering parameters, and test different effects instantly.

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

### Why GPL-3.0?

This project copies and ports CSS stylesheets, layouts, mathematical formulas, and Svelte component logic directly from the [pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css) repository (licensed under GPL-3.0). As a derivative work distributed over the web, this repository must also be licensed under the GPL-3.0 license.

See the full [LICENSE](file:///Users/jeantimex/Workspace/github/pokemon-cards-webgpu/LICENSE) file for details.
