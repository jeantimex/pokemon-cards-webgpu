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

// Rainbow colors from CSS
fn getRainbowColor(index: i32) -> vec3f {
    switch(index % 7) {
        case 0: { return vec3f(0.576, 0.200, 0.200); } // hsl(0, 57%, 37%) - Red
        case 1: { return vec3f(0.597, 0.424, 0.183); } // hsl(40, 53%, 39%) - Orange
        case 2: { return vec3f(0.350, 0.560, 0.140); } // hsl(90, 60%, 35%) - Green
        case 3: { return vec3f(0.140, 0.560, 0.560); } // hsl(180, 60%, 35%) - Cyan
        case 4: { return vec3f(0.140, 0.560, 0.560); } // hsl(180, 60%, 35%) - Cyan
        case 5: { return vec3f(0.218, 0.350, 0.612); } // hsl(210, 57%, 39%) - Blue
        case 6: { return vec3f(0.345, 0.140, 0.480); } // hsl(280, 55%, 31%) - Purple
        default: { return vec3f(0.576, 0.200, 0.200); }
    }
}

// Rainbow gradient along an angle (smooth gradient through 7 colors repeated 3x)
fn rainbowGradient(uv: vec2f, angleDeg: f32, bgPos: vec2f, scale: f32) -> vec3f {
    let angle = radians(angleDeg);
    let dir = vec2f(cos(angle), sin(angle));

    // Scale and offset UV - background-size is 400%, so divide by 4
    let scaledUv = (uv + bgPos) / scale;
    let t = dot(scaledUv, dir) + 0.5;

    // Smooth gradient through colors (not repeating bands)
    let cycleT = fract(t * 3.0) * 7.0; // 3 cycles of 7 colors
    let idx = i32(cycleT);
    let frac = fract(cycleT);

    let color1 = getRainbowColor(idx);
    let color2 = getRainbowColor(idx + 1);

    return mix(color1, color2, smoothstep(0.0, 1.0, frac));
}

// Simple diagonal gradient (2 colors)
fn diagonalGradient(uv: vec2f, bgPos: vec2f) -> vec3f {
    let angle = radians(-45.0);
    let dir = vec2f(cos(angle), sin(angle));

    // Scale 200% and offset
    let scaledUv = (uv - 0.5) * 2.0 + 0.5 + bgPos;
    let t = clamp(dot(scaledUv, dir), 0.0, 1.0);

    let color1 = vec3f(0.576, 0.200, 0.200); // Red
    let color5 = vec3f(0.140, 0.560, 0.560); // Cyan

    return mix(color1, color5, t);
}

// Blend modes
fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    let diff = blendLum - baseLum;
    return clamp(base + diff, vec3f(0.0), vec3f(1.0));
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    if (blend <= 0.5) {
        return base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    } else {
        let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(base), base > 0.25);
        return base + (2.0 * blend - 1.0) * (d - base);
    }
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Glare radial gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsl(0, 0%, 80%) -> hsla(187, 10%, 85%, 0.25) at 30% -> hsl(197, 6%, 25%) at 120%
    let color1 = vec3f(0.8, 0.8, 0.8);
    let color2 = vec3f(0.81, 0.86, 0.87);
    let color3 = vec3f(0.235, 0.26, 0.265);

    var color: vec3f;
    var alpha: f32;

    if (t < 0.3) {
        let s = t / 0.3;
        color = mix(color1, color2, s);
        alpha = mix(1.0, 0.25, s);
    } else {
        let s = (t - 0.3) / 0.9; // extends to 120%
        color = mix(color2, color3, clamp(s, 0.0, 1.0));
        alpha = mix(0.25, 1.0, clamp(s, 0.0, 1.0));
    }

    return vec4f(color, alpha);
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

    // Pointer calculations
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.7071;
    let pointerFromLeft = uniforms.pointer.x;
    let pointerFromTop = uniforms.pointer.y;

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    // Background position calculations
    let bgPos1 = vec2f(0.25 + 0.5 * pointerFromLeft, 0.25 + 0.5 * pointerFromTop) - 0.5;
    let bgPos3 = vec2f(0.25 + uniforms.pointer.x * 0.5, 0.25 + uniforms.pointer.y * 0.5) - 0.5;

    // Layer 1: -45deg diagonal gradient (red to cyan)
    let diag = diagonalGradient(cardUV, bgPos1);

    // Layer 2: Glitter (fixed position)
    let glitterUv = fract(cardUV / 0.15);
    let glitter = textureSampleLevel(glitterTexture, linearSampler, glitterUv, 0.0).rgb;

    // Layer 3: -30deg rainbow gradient (400% scale)
    let rainbow30 = rainbowGradient(cardUV, -30.0, bgPos3, 4.0);

    // CSS blend order: luminosity, soft-light (bottom to top)
    // rainbow30 is base, glitter blends with soft-light, then diag blends with luminosity
    var shineLayer = rainbow30;
    shineLayer = softLightBlend(shineLayer, glitter);
    shineLayer = luminosityBlend(shineLayer, diag);

    // Filter: brightness varies with pointer distance
    let shineBrightness = (pointerFromCenter * 0.25) + 0.6;
    shineLayer = applyFilter(shineLayer, shineBrightness, 2.2, 0.75);

    // === .card__shine:before (foil layer) ===
    // Filter: brightness(2.5) contrast(1)
    var foilLayer = applyFilter(foilColor, 2.5, 1.0, 1.0);
    // Background blend: difference (within the layer)
    // Mix blend: darken
    let foilOpacity = (pointerFromCenter + 0.4) * 0.6;

    // === .card__shine:after layer ===
    let bgPosAfter = uniforms.pointer - 0.5;
    let rainbow60 = rainbowGradient(cardUV, -60.0, bgPosAfter, 4.0);

    // Soft-light blend glitter with rainbow
    var afterLayer = softLightBlend(rainbow60, glitter);

    // Filter: brightness varies
    let afterBrightness = (pointerFromCenter * 0.3) + 0.55;
    afterLayer = applyFilter(afterLayer, afterBrightness, 2.0, 1.0);

    // === Composite layers ===
    // The shine layers overlay the card - they don't replace it
    // Use softer blending to keep card visible

    // Apply shine layer with soft-light to preserve card details
    let shineSoftLight = softLightBlend(cardRgb, shineLayer);
    cardRgb = mix(cardRgb, shineSoftLight, uniforms.opacity * 0.7 * cardMask);

    // Apply foil with darken blend (subtle)
    let foilDarkened = darkenBlend(cardRgb, foilLayer);
    cardRgb = mix(cardRgb, foilDarkened, foilOpacity * uniforms.opacity * 0.3 * cardMask);

    // Apply :after with color-dodge (this creates the rainbow shimmer)
    let afterDodged = colorDodgeBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterDodged, uniforms.opacity * 0.5 * cardMask);

    // === .card__glare layer ===
    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    let glareOpacity = pointerFromCenter * 0.9;

    // Hard-light blend
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * glareOpacity * uniforms.opacity * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
