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

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
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

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn contrastMask(value: f32, contrast: f32) -> f32 {
    return clamp((value - 0.5) * contrast + 0.5, 0.0, 1.0);
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn secretConicGradient(uv: vec2f) -> vec3f {
    let delta = uv - vec2f(0.5);
    var t = atan2(delta.y, delta.x) / 6.28318531 + 0.5;
    t = fract(t + 0.125);

    if (t < 0.25) {
        return mix(SUNPILLAR_4, SUNPILLAR_5, t * 4.0);
    }
    if (t < 0.5) {
        return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.25) * 4.0);
    }
    if (t < 0.75) {
        return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.5) * 4.0);
    }
    return mix(SUNPILLAR_1, SUNPILLAR_4, (t - 0.75) * 4.0);
}

// CSS radial-gradient uses LINEAR interpolation between color stops
fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn baseRadialGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(150,0%,0%,.98) 10%, hsla(0,0%,95%,.15) 90%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.0, 0.0, 0.0, 0.98);
    let pale = vec4f(0.95, 0.95, 0.95, 0.15);
    let s = linearStep(0.10, 0.90, t);
    return mix(dark, pale, s);
}

fn beforeRadialGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(10,20%,90%,0.95) 10%, hsl(0,0%,0%) 70%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let pale = vec4f(0.918, 0.882, 0.863, 0.95);
    let black = vec4f(0.0, 0.0, 0.0, 1.0);
    let s = linearStep(0.10, 0.70, t);
    return mix(pale, black, s);
}

fn glareGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(45,8%,80%,0.3) 0%, hsl(22,15%,12%) 180%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.812, 0.807, 0.788, 0.30);
    let dark = vec4f(0.138, 0.116, 0.102, 1.0);
    let s = linearStep(0.0, 1.8, t);
    return mix(light, dark, s);
}

fn goldLinearGradient(uv: vec2f) -> vec3f {
    let dir = normalize(vec2f(1.0, 1.0));
    let t = clamp(dot(uv - vec2f(0.5), dir) + 0.5, 0.0, 1.0);
    return mix(vec3f(0.902, 0.718, 0.078), vec3f(0.969, 0.878, 0.376), t);
}

fn sampleGlitter(uv: vec2f, offset: vec2f) -> vec3f {
    let raw = textureSampleLevel(glitterTexture, linearSampler, fract((uv * 3.0) + offset), 0.0).rgb;
    let luma = dot(raw, vec3f(0.2126, 0.7152, 0.0722));
    let sparkle = smoothstep(0.70, 1.0, luma);
    return mix(vec3f(0.5), raw, sparkle * 0.45);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

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
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = max(maskColor.a, 0.78);
    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);

    var cardRgb = textureColor.rgb;

    let baseShine = baseRadialGradient(cardUV);
    var baseShineRgb = baseShine.rgb;
    let conic = secretConicGradient(cardUV);
    let glitterA = sampleGlitter(cardUV, vec2f(0.45, 0.45));
    let glitterB = sampleGlitter(cardUV, vec2f(0.55, 0.55));
    baseShineRgb = overlayBlend(baseShineRgb, conic);
    baseShineRgb = hardLightBlend(baseShineRgb, glitterB);
    baseShineRgb = softLightBlend(baseShineRgb, glitterA);
    baseShineRgb = applyFilter(baseShineRgb, 0.4 + pointerFromCenter * 0.2, 1.0, 2.7);

    let baseDodged = colorDodgeBlend(cardRgb, baseShineRgb);
    // In CSS, the radial gradient alpha (0.98 at pointer, 0.15 far) controls element opacity
    cardRgb = mix(cardRgb, baseDodged, baseShine.a * uniforms.opacity * foilMask * cardMask);

    let beforeLayer = beforeRadialGradient(cardUV);
    var beforeLayerRgb = beforeLayer.rgb;
    let gold = goldLinearGradient(cardUV);
    // CSS blend order: radial (base) -> gold with multiply -> foil with hard-light
    beforeLayerRgb = multiplyBlend(beforeLayerRgb, gold);
    beforeLayerRgb = hardLightBlend(beforeLayerRgb, foilColor);
    // CSS filter applies AFTER all background blending
    beforeLayerRgb = applyFilter(beforeLayerRgb, 1.25, 1.25, 0.35);
    let beforeLightened = lightenBlend(cardRgb, beforeLayerRgb);
    // CSS has opacity: 0.8 on :before element
    cardRgb = mix(cardRgb, beforeLightened, 0.8 * uniforms.opacity * foilMask * cardMask);

    let shiftedUv = cardUV + (vec2f(0.5) - uniforms.pointer) * 0.006;
    var afterGlitter = sampleGlitter(shiftedUv, vec2f(0.50, 0.50));
    // CSS: filter brightness varies with pointer position (0.6 at center, 1.2 at edge)
    afterGlitter = applyFilter(afterGlitter, pointerFromCenter * 0.6 + 0.6, 1.5, 1.0);
    let afterOverlay = overlayBlend(cardRgb, afterGlitter);
    // :after is child of .card__shine, so affected by parent's alpha (baseShine.a)
    cardRgb = mix(cardRgb, afterOverlay, baseShine.a * uniforms.opacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.3, 1.5, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * cardMask * 0.3);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
