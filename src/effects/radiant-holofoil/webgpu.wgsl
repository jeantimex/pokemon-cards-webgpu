struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

// Blend modes
fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Grayscale bar pattern for criss-cross effect
// Creates stepped gradient: 10% -> 20% -> 35% -> 42.5% -> 50% -> 42.5% -> 35% -> 20% -> 10% -> 0%
fn barPattern(t: f32) -> f32 {
    let barwidth = 0.012; // 1.2%
    let cycleLen = barwidth * 10.0;
    let pos = fract(t / cycleLen) * 10.0;

    // Step function matching CSS gradient stops
    if (pos < 1.0) { return 0.10; }
    if (pos < 2.0) { return 0.20; }
    if (pos < 3.0) { return 0.35; }
    if (pos < 4.0) { return 0.425; }
    if (pos < 5.0) { return 0.50; }
    if (pos < 6.0) { return 0.425; }
    if (pos < 7.0) { return 0.35; }
    if (pos < 8.0) { return 0.20; }
    if (pos < 9.0) { return 0.10; }
    return 0.0;
}

// Criss-cross diamond pattern from two opposing 45deg gradients
fn crissCrossPattern(uv: vec2f) -> vec3f {
    // Card aspect ratio (width/height)
    let cardAspect = 0.718;

    // Center the UV coordinates (0,0 at center instead of corner)
    let centeredUv = uv - vec2f(0.5, 0.5);

    // CSS: background-position: calc(((var(--background-x) - 50%) * 1.5) + 50%)
    let bgX = mix(0.37, 0.63, uniforms.pointer.x);
    let bgY = mix(0.33, 0.67, uniforms.pointer.y);
    let offsetX = (bgX - 0.5) * 1.5;
    let offsetY = (bgY - 0.5) * 1.5;

    // Apply offset
    let offsetUv = centeredUv + vec2f(offsetX, offsetY);

    // Multiply by card aspect ratio to stretch the pattern vertically even more,
    // matching the vertical elongation seen in the CSS implementation.
    let aspectCorrectedUv = vec2f(offsetUv.x, offsetUv.y * cardAspect);

    // Apply pattern scale
    let scaledUv = aspectCorrectedUv * vec2f(uniforms.patternScaleX, uniforms.patternScaleY);

    // Simple 45deg rotation: t45 = x + y, tNeg45 = x - y
    // This naturally creates perpendicular stripes at 45 and -45 degrees
    let t45 = scaledUv.x + scaledUv.y;
    let pattern45 = barPattern(t45);

    let tNeg45 = scaledUv.x - scaledUv.y;
    let patternNeg45 = barPattern(tNeg45);

    return vec3f(pattern45, patternNeg45, 0.0);
}

// Radial gradient for shine center
fn shineRadialGradient(uv: vec2f) -> vec3f {
    // Follow mouse exactly to avoid the "offset" disk look
    let center = uniforms.pointer;
    let dist = distance(uv, center);

    // Use smoothstep for a soft fade instead of a hard-edged disk
    let t = smoothstep(0.0, 1.2, dist);
    let white = vec3f(0.95);
    let glow = vec3f(0.1, 0.1, 0.15);

    return mix(white, glow, t);
}

// Rainbow gradient for :after layer (55deg repeating)
fn rainbowGradient(uv: vec2f) -> vec3f {
    // Background position: ((background - 50%) * -2.5) + 50% (moves opposite)
    let bgX = mix(0.37, 0.63, uniforms.pointer.x);
    let bgY = mix(0.33, 0.67, uniforms.pointer.y);
    let offsetX = (bgX - 0.5) * -2.5;
    let offsetY = (bgY - 0.5) * -2.5;

    // Scale to 400% x 100%
    let scaledUv = (uv - 0.5) * vec2f(4.0, 1.0) + vec2f(0.5 + offsetX, 0.5 + offsetY);

    let angle = radians(55.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = dot(scaledUv, dir);

    // 7 color stops over 200px * 7 = 1400px total, repeating
    let space = 0.15; // approximate spacing in UV
    let cycleT = fract(t / (space * 7.0)) * 7.0;

    // Rainbow colors from CSS
    let color1 = vec3f(0.973, 0.667, 0.667); // hsl(3, 95%, 85%)
    let color2 = vec3f(0.635, 0.835, 0.976); // hsl(207, 100%, 84%)
    let color3 = vec3f(0.976, 0.804, 0.635); // hsl(29, 100%, 85%)
    let color4 = vec3f(0.635, 0.976, 0.827); // hsl(160, 100%, 86%)
    let color5 = vec3f(0.949, 0.663, 0.973); // hsl(309, 94%, 87%)
    let color6 = vec3f(0.635, 0.941, 0.976); // hsl(188, 95%, 85%)

    if (cycleT < 1.0) {
        return mix(color1, color2, cycleT);
    } else if (cycleT < 2.0) {
        return mix(color2, color3, cycleT - 1.0);
    } else if (cycleT < 3.0) {
        return mix(color3, color4, cycleT - 2.0);
    } else if (cycleT < 4.0) {
        return mix(color4, color5, cycleT - 3.0);
    } else if (cycleT < 5.0) {
        return mix(color5, color6, cycleT - 4.0);
    } else if (cycleT < 6.0) {
        return mix(color6, color1, cycleT - 5.0);
    } else {
        return mix(color1, color2, cycleT - 6.0);
    }
}

// Glitter radial gradient for :before layer
fn glitterRadialGradient(uv: vec2f) -> vec3f {
    let center = uniforms.pointer;
    let dist = distance(uv, center);
    
    // Soft glare for glitter
    let t = smoothstep(0.0, 0.8, dist);
    return mix(vec3f(0.58), vec3f(0.20), t);
}

// Glare layer radial gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(0, 0%, 100%, 0.33) at 0% -> hsl(0, 0%, 25%) at 110%
    let white = vec3f(1.0);
    let gray = vec3f(0.25);

    let s = t / 1.1; // extend to 110%
    let color = mix(white, gray, clamp(s, 0.0, 1.0));
    let alpha = mix(0.33, 1.0, clamp(s, 0.0, 1.0));

    return vec4f(color, alpha);
}

// Check if UV is within artwork clip area (--clip: inset(9.85% 8% 52.85% 8%))
fn isInArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let right = 0.08;
    let bottom = 0.5285;
    let left = 0.08;

    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);

    return inX * inY;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    // Artwork area mask for :after layer
    let artworkMask = isInArtworkArea(cardUV);

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    // Build criss-cross pattern with blend modes
    let crissCross = crissCrossPattern(cardUV);
    let pattern45 = vec3f(crissCross.r);
    let patternNeg45 = vec3f(crissCross.g);
    let radialShine = shineRadialGradient(cardUV);

    // CSS blend order (bottom to top): -45deg base -> 45deg (darken) -> radial (exclusion)
    var shineBase = patternNeg45;
    shineBase = darkenBlend(shineBase, pattern45);
    shineBase = exclusionBlend(shineBase, radialShine);

    // CSS: filter: brightness(.5) contrast(2) saturate(1.75)
    // Slightly increased brightness to better match CSS grid visibility
    shineBase = applyFilter(shineBase, 0.55, 2.0, 1.75);

    // Mix-blend-mode: color-dodge (whole shine layer onto card)
    let shineBlended = colorDodgeBlend(cardRgb, shineBase);
    cardRgb = mix(cardRgb, shineBlended, uniforms.opacity * cardMask);

    // === .card__shine:after layer (rainbow, artwork area only) ===
    let rainbow = rainbowGradient(cardUV);

    // hard-light blend foil with rainbow
    var afterLayer = hardLightBlend(rainbow, foilColor);

    // CSS: filter: brightness(.6) contrast(3) saturate(2)
    afterLayer = applyFilter(afterLayer, 0.6, 3.0, 2.0);

    // Mix-blend-mode: color-dodge
    let afterBlended = colorDodgeBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterBlended, uniforms.opacity * artworkMask * cardMask);

    // === .card__shine:before layer (glitter sparkle overlay) ===
    let glitterUv = fract(cardUV / 0.15); // 15% size
    let glitter = textureSampleLevel(glitterTexture, linearSampler, glitterUv, 0.0).rgb;
    let glitterRadial = glitterRadialGradient(cardUV);

    // Use a softer multiply instead of color-dodge to combine glitter with radial glare
    var beforeLayer = glitter * glitterRadial;

    // CSS: filter: brightness(.56) contrast(1.75) saturate(.45)
    // Significantly lowered to remove the "coarse/rough" look
    beforeLayer = applyFilter(beforeLayer, 0.35, 1.2, 0.35);

    // Mix-blend-mode: overlay
    let beforeBlended = overlayBlend(cardRgb, beforeLayer);
    cardRgb = mix(cardRgb, beforeBlended, uniforms.opacity * 0.5 * cardMask);

    // === .card__glare layer ===
    let glare = glareGradient(cardUV);

    // CSS: filter: brightness(1) contrast(1.5)
    let glareFiltered = applyFilter(glare.rgb, 1.0, 1.5, 1.0);

    // CSS: mix-blend-mode: hard-light
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
