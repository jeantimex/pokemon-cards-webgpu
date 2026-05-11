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

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

// --- Blend Modes ---

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, vec3f(0.0))), base > vec3f(0.25));
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(vec3f(0.5), blend));
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn rgb2hsl(c: vec3f) -> vec3f {
    let maxC = max(max(c.r, c.g), c.b);
    let minC = min(min(c.r, c.g), c.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == c.r) {
        h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
    } else if (maxC == c.g) {
        h = (c.b - c.r) / d + 2.0;
    } else {
        h = (c.r - c.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0/2.0) { return q; }
    if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0/3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0/3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHSL = rgb2hsl(base);
    let blendHSL = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHSL.x, baseHSL.y, baseHSL.z));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

// --- Sunpillar Colors ---
const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459); // hsl(2, 100%, 73%) - red
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376); // hsl(53, 100%, 69%) - yellow
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376); // hsl(93, 100%, 69%) - green
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);   // hsl(176, 100%, 76%) - cyan
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969); // hsl(228, 100%, 74%) - blue
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973); // hsl(283, 100%, 73%) - purple

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

// CSS repeating-linear-gradient(0deg, ...), with 5% stops over a 35% cycle.
fn verticalSunpillar(layerUv: vec2f) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35);

    if (t < 0.143) { return mix(SUNPILLAR_1, SUNPILLAR_2, t / 0.143); }
    if (t < 0.286) { return mix(SUNPILLAR_2, SUNPILLAR_3, (t - 0.143) / 0.143); }
    if (t < 0.429) { return mix(SUNPILLAR_3, SUNPILLAR_4, (t - 0.286) / 0.143); }
    if (t < 0.571) { return mix(SUNPILLAR_4, SUNPILLAR_5, (t - 0.429) / 0.143); }
    if (t < 0.714) { return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.571) / 0.143); }
    return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.714) / 0.286);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(133.0);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = dot(layerUv, dir);
    return fract(t / 0.12);
}

// CSS repeating-linear-gradient(133deg, ... 12%).
fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);

    let dark = vec3f(0.055, 0.082, 0.18);      // #0e152e - dark blue
    let gray = vec3f(0.557, 0.612, 0.612);     // hsl(180, 10%, 60%) - desaturated cyan
    let cyan = vec3f(0.525, 0.725, 0.725);     // hsl(180, 29%, 66%) - cyan

    let s1 = 0.317;  // 3.8/12
    let s2 = 0.375;  // 4.5/12
    let s3 = 0.433;  // 5.2/12
    let s4 = 0.833;  // 10/12

    if (cycle < s1) { return mix(dark, gray, cycle / s1); }
    if (cycle < s2) { return mix(gray, cyan, (cycle - s1) / (s2 - s1)); }
    if (cycle < s3) { return mix(cyan, gray, (cycle - s2) / (s3 - s2)); }
    if (cycle < s4) { return mix(gray, dark, (cycle - s3) / (s4 - s3)); }
    return dark;
}

fn diagonalBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhase(layerUv);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.12, distToPeak);
    let halo = 1.0 - smoothstep(0.06, 0.34, distToPeak);
    return clamp(core * 0.65 + halo * 0.5, 0.0, 1.0);
}

// Base radial gradient - subtle darkening at pointer
fn baseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    // CSS: hsla(0,0%,0%,0.1) 12%, hsla(0,0%,0%,0.15) 20%, hsla(0,0%,0%,0.25) 120%
    let a1 = 0.1;
    let a2 = 0.15;
    let a3 = 0.25;

    var alpha: f32;
    if (t < 0.12) {
        alpha = a1;
    } else if (t < 0.20) {
        alpha = mix(a1, a2, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(a2, a3, linearStep(0.20, 1.20, t));
    }

    return vec4f(0.0, 0.0, 0.0, alpha);
}

fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, blendMode: i32) -> vec4f {
    var blended: vec3f;
    if (blendMode == 0) {
        blended = screenBlend(bottom.rgb, top.rgb);
    } else if (blendMode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    }
    let rgb = mix(bottom.rgb, blended, top.a);
    let alpha = top.a + bottom.a * (1.0 - top.a);
    return vec4f(rgb, alpha);
}

fn pokemonVShineLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let diagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    let grain = textureSampleLevel(glitterTexture, linearSampler, fract(grainUv), 0.0);
    let sunUv = backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y));
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, diagonalPos);
    let sunColor = verticalSunpillar(sunUv);
    let sun = vec4f(sunColor, 1.0);
    let diagonal = vec4f(diagonalStripeColor(diagonalUv), 1.0);
    let radial = baseRadialGradient(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));

    // CSS paints background images from bottom to top:
    // radial-gradient, diagonal gradient, sunpillar gradient, then grain.
    // The blend-mode list applies to each top layer over the already-composited
    // layers beneath it: grain=screen, sunpillar=hue, diagonal=hard-light.
    var layer = radial;
    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, grain, 0);

    var filtered = select(
        applyFilter(layer.rgb, 0.8, 2.95, 0.65),
        applyFilter(layer.rgb, 1.0, 2.5, 1.75),
        afterLayer
    );
    let beam = diagonalBeamMask(diagonalUv);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let particleGrain = smoothstep(0.16, 0.82, grainLuma);
    let particleFlecks = smoothstep(0.48, 0.9, grainLuma);
    let particleMask = mix(0.5, 1.35, particleGrain) + particleFlecks * 1.15;
    let beamStrength = select(1.1, 0.62, afterLayer);
    let beamTint = mix(sunColor * 1.25, vec3f(1.0, 0.95, 0.76), particleFlecks * 0.45);
    filtered = screenBlend(filtered, beamTint * beam * particleMask * beamStrength);
    return vec4f(filtered, layer.a);
}

// Glare gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    // CSS: white 0%, hsla(210,3%,54%,0.33) 45%, hsla(0,0%,20%,0.9) 130%
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let grayish = vec4f(0.533, 0.541, 0.549, 0.33);
    let dark = vec4f(0.2, 0.2, 0.2, 0.9);

    if (t < 0.45) {
        return mix(white, grayish, linearStep(0.0, 0.45, t));
    }
    return mix(grayish, dark, linearStep(0.45, 1.30, t));
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

    // Card UV
    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    let shine = pokemonVShineLayer(cardUV, false);
    let shineBlended = colorDodgeBlend(cardRgb, shine.rgb);
    cardRgb = mix(cardRgb, shineBlended, shine.a * foilMask * uniforms.opacity * cardMask);

    // === .card__shine:after layer ===
    let afterShine = pokemonVShineLayer(cardUV, true);
    let afterBlended = softLightBlend(cardRgb, afterShine.rgb);
    cardRgb = mix(cardRgb, afterBlended, afterShine.a * foilMask * uniforms.opacity * cardMask);

    // === GLARE LAYER ===
    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    // CSS: opacity: calc(var(--card-opacity) * 0.5), mix-blend-mode: hard-light
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * 0.5 * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
