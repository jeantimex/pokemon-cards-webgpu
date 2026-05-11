struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    _pad0: f32,
    _pad1: f32,
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

// RGB to HSL conversion
fn rgbToHsl(rgb: vec3f) -> vec3f {
    let maxC = max(max(rgb.r, rgb.g), rgb.b);
    let minC = min(min(rgb.r, rgb.g), rgb.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == rgb.r) {
        h = (rgb.g - rgb.b) / d + select(0.0, 6.0, rgb.g < rgb.b);
    } else if (maxC == rgb.g) {
        h = (rgb.b - rgb.r) / d + 2.0;
    } else {
        h = (rgb.r - rgb.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hueToRgb(p: f32, q: f32, t_in: f32) -> f32 {
    var t = t_in;
    if (t < 0.0) { t += 1.0; }
    if (t > 1.0) { t -= 1.0; }
    if (t < 1.0 / 6.0) { return p + (q - p) * 6.0 * t; }
    if (t < 1.0 / 2.0) { return q; }
    if (t < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - t) * 6.0; }
    return p;
}

// HSL to RGB conversion
fn hslToRgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }

    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;

    return vec3f(
        hueToRgb(p, q, hsl.x + 1.0 / 3.0),
        hueToRgb(p, q, hsl.x),
        hueToRgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

// Blend modes
fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
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

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

// Saturation blend: takes hue and luminance from base, saturation from blend
fn saturationBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgbToHsl(base);
    let blendHsl = rgbToHsl(blend);
    return hslToRgb(vec3f(baseHsl.x, blendHsl.y, baseHsl.z));
}

// Apply brightness, contrast, saturate filter
fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Sunpillar colors
const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459); // hsl(2, 100%, 73%)
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376); // hsl(53, 100%, 69%)
const SUNPILLAR_3: vec3f = vec3f(0.573, 1.0, 0.376);   // hsl(93, 100%, 69%)
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);   // hsl(176, 100%, 76%)
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969); // hsl(228, 100%, 74%)
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973); // hsl(283, 100%, 73%)

// Sunpillar gradient (repeating linear gradient at 133deg)
fn sunpillarGradient(uv: vec2f, backgroundX: f32, backgroundY: f32) -> vec3f {
    let angle = radians(133.0);
    let dir = vec2f(cos(angle), sin(angle));

    // Background position offset based on pointer
    let offsetX = (0.5 - backgroundX) * 3.0;
    let offsetY = (0.5 - backgroundY) * 3.0;

    // Project UV onto gradient direction with large scale (400% x 800%)
    let scaledUv = (uv - 0.5) * vec2f(4.0, 8.0) + vec2f(0.5 + offsetX, 0.5 + offsetY);
    let t = dot(scaledUv, dir);

    // Space is 5% per color stop, 7 stops total = 35% repeat
    let space = 0.05;
    let cycleT = fract(t / (space * 7.0)) * 7.0;

    // Interpolate between colors based on position in cycle
    // Colors for :after are shifted: 6,1,2,3,4,5,6,1...
    if (cycleT < 1.0) {
        return mix(SUNPILLAR_6, SUNPILLAR_1, cycleT);
    } else if (cycleT < 2.0) {
        return mix(SUNPILLAR_1, SUNPILLAR_2, cycleT - 1.0);
    } else if (cycleT < 3.0) {
        return mix(SUNPILLAR_2, SUNPILLAR_3, cycleT - 2.0);
    } else if (cycleT < 4.0) {
        return mix(SUNPILLAR_3, SUNPILLAR_4, cycleT - 3.0);
    } else if (cycleT < 5.0) {
        return mix(SUNPILLAR_4, SUNPILLAR_5, cycleT - 4.0);
    } else if (cycleT < 6.0) {
        return mix(SUNPILLAR_5, SUNPILLAR_6, cycleT - 5.0);
    } else {
        return mix(SUNPILLAR_6, SUNPILLAR_1, cycleT - 6.0);
    }
}

// Shine layer radial gradient (returns vec4 with alpha for proper blending)
fn shineRadialGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(150, 20%, 10%, 1) at 10% -> hsla(177, 22%, 80%, 0.1) at 50% -> hsla(0, 0%, 95%, 0.98) at 90%
    // The alpha 0.1 at 50% is crucial - it makes the middle zone nearly transparent
    let color1 = vec4f(0.08, 0.12, 0.10, 1.0);     // alpha 1.0 at center
    let color2 = vec4f(0.624, 0.840, 0.824, 0.1);  // alpha 0.1 at 50% (very transparent!)
    let color3 = vec4f(0.95, 0.95, 0.95, 0.98);    // alpha 0.98 at edges

    if (t < 0.1) {
        return color1;
    } else if (t < 0.5) {
        return mix(color1, color2, (t - 0.1) / 0.4);
    } else if (t < 0.9) {
        return mix(color2, color3, (t - 0.5) / 0.4);
    } else {
        return color3;
    }
}

// Shine:before radial gradient
fn shineBeforeRadialGradient(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.95) at 10% -> rgba(181, 139, 164, 0.5) at 50% -> hsl(0, 0%, 0%) at 60%
    let color1 = vec3f(0.918, 0.902, 0.863); // hsl(50, 20%, 90%)
    let color2 = vec3f(0.710, 0.545, 0.643); // rgb(181, 139, 164)
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.1) {
        return color1;
    } else if (t < 0.5) {
        return mix(color1, color2, (t - 0.1) / 0.4);
    } else if (t < 0.6) {
        return mix(color2, color3, (t - 0.5) / 0.1);
    } else {
        return color3;
    }
}

// Glare radial gradient (for masked cards)
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.45) at 0% -> hsla(150, 20%, 30%, 0.45) at 45% -> hsla(0, 0%, 0%, 0.9) at 120%
    let color1 = vec3f(0.918, 0.902, 0.863); // hsl(50, 20%, 90%)
    let color2 = vec3f(0.24, 0.36, 0.30);    // hsl(150, 20%, 30%)
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.45) {
        let s = t / 0.45;
        return vec4f(mix(color1, color2, s), 0.45);
    } else {
        let s = clamp((t - 0.45) / 0.75, 0.0, 1.0);
        return vec4f(mix(color2, color3, s), mix(0.45, 0.9, s));
    }
}

// Glare:after radial gradient (masked)
fn glareAfterGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.75) at 0% -> hsla(150, 20%, 30%, 0.65) at 45% -> hsla(0, 0%, 0%, 1) at 90%
    let color1 = vec3f(0.918, 0.902, 0.863);
    let color2 = vec3f(0.24, 0.36, 0.30);
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.45) {
        let s = t / 0.45;
        return vec4f(mix(color1, color2, s), mix(0.75, 0.65, s));
    } else if (t < 0.9) {
        let s = (t - 0.45) / 0.45;
        return vec4f(mix(color2, color3, s), mix(0.65, 1.0, s));
    } else {
        return vec4f(color3, 1.0);
    }
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
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let foilMask = maskColor.a;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    // Sample glitter at two positions (--glittersize: 25%, positions: 40% 45% and 55% 55%)
    let glitterUv1 = fract(cardUV * 4.0 + vec2f(0.4, 0.45));
    let glitterUv2 = fract(cardUV * 4.0 + vec2f(0.55, 0.55));
    let glitter1 = textureSampleLevel(glitterTexture, linearSampler, glitterUv1, 0.0).rgb;
    let glitter2 = textureSampleLevel(glitterTexture, linearSampler, glitterUv2, 0.0).rgb;

    var cardRgb = textureColor.rgb;

    // Background position for gradients
    let backgroundX = mix(0.37, 0.63, uniforms.pointer.x);
    let backgroundY = mix(0.33, 0.67, uniforms.pointer.y);
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;

    // === Build .card__shine compositing group ===
    // In CSS, backgrounds are composited bottom-to-top:
    // 1. radial gradient (base)
    // 2. glitter2 color-burns onto radial
    // 3. glitter1 soft-lights onto result
    // The glitter positions are FIXED - they don't move with pointer.

    let shineRadial = shineRadialGradient(cardUV);
    let shineAlpha = shineRadial.a;

    // Combine glitter textures - soft-light blend between the two glitter layers
    let glitterCombined = softLightBlend(glitter1, glitter2);

    // Extract sparkle intensity - bright spots in glitter become sparkles
    let sparkleIntensity = max(max(glitterCombined.r, glitterCombined.g), glitterCombined.b);

    // Start with radial as base for the shine
    var shineMain = shineRadial.rgb;
    // Apply glitter via color-burn (darkens based on glitter, bright glitter = less darkening)
    shineMain = colorBurnBlend(shineMain, glitterCombined);
    shineMain = applyFilter(shineMain, 1.0, 1.0, 0.9);

    // Shine:before blends with shine main using lighten (NOT masked, opacity 0.5)
    var shineBefore = shineBeforeRadialGradient(cardUV);
    shineBefore = colorBurnBlend(shineBefore, foilColor);

    // Shine:after is sunpillar gradient with saturation blend
    var shineAfter = sunpillarGradient(cardUV, backgroundX, backgroundY);
    let shineAfterBrightness = 0.75 - (pointerFromCenter * 0.5);
    shineAfter = applyFilter(shineAfter, shineAfterBrightness, 1.0, 1.0);

    // Composite the shine group:
    // In artwork area: shineMain -> lighten(shineBefore) -> saturation(shineAfter)
    // Outside artwork: transparent -> lighten(shineBefore) -> saturation(shineAfter)

    // Inside artwork (foilMask > 0): full shine compositing
    var shineGroupArtwork = shineMain;
    shineGroupArtwork = mix(shineGroupArtwork, lightenBlend(shineGroupArtwork, shineBefore), 0.5);
    shineGroupArtwork = saturationBlend(shineGroupArtwork, shineAfter);

    // Outside artwork (foilMask = 0): only :before and :after
    var shineGroupOutside = shineBefore;
    shineGroupOutside = saturationBlend(shineGroupOutside, shineAfter);

    // Blend shine group with card using color-dodge
    // The shineAlpha controls how much the shine affects the card (key for matching CSS)
    // Artwork area: use full shine group, masked, modulated by shine alpha
    let shineArtworkBlended = colorDodgeBlend(cardRgb, shineGroupArtwork);
    cardRgb = mix(cardRgb, shineArtworkBlended, uniforms.opacity * foilMask * cardMask * shineAlpha);

    // Outside artwork: use shine:before + :after with lighten for :before, then color-dodge
    // But :before has opacity 0.5, so we blend it first
    let shineOutsideBase = mix(vec3f(0.0), shineBefore, 0.5);
    let shineOutsideWithSat = saturationBlend(shineOutsideBase, shineAfter);
    let shineOutsideBlended = colorDodgeBlend(cardRgb, shineOutsideWithSat);
    let outsideMask = (1.0 - foilMask) * cardMask;
    cardRgb = mix(cardRgb, shineOutsideBlended, uniforms.opacity * outsideMask * shineAlpha);

    // Add stable glitter sparkles overlay (fixed positions, not affected by pointer)
    // This creates the visible sparkle dots that stay in place
    let sparkleThreshold = 0.65;  // Only show brightest spots as sparkles
    let sparkle = smoothstep(sparkleThreshold, 0.9, sparkleIntensity);
    let sparkleColor = glitterCombined * sparkle;
    cardRgb = mix(cardRgb, cardRgb + sparkleColor * 0.4, uniforms.opacity * foilMask * cardMask);

    // === card__glare compositing group ===
    var glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.0, 2.0, 1.0);
    let glareBlended = overlayBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, min(glare.a * 1.08, 1.0) * uniforms.opacity * cardMask);

    // Glare:after (MASKED to artwork)
    var glareAfter = glareAfterGradient(cardUV);
    let glareAfterFiltered = applyFilter(glareAfter.rgb, 1.06, 1.5, 1.0);
    let glareAfterBlended = overlayBlend(cardRgb, glareAfterFiltered);
    cardRgb = mix(cardRgb, glareAfterBlended, glareAfter.a * foilMask * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
