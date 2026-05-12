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

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
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

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarGradient(y: f32) -> vec3f {
    let t = fract(y * 2.857);
    if (t < 0.143) { return mix(SUNPILLAR_1, SUNPILLAR_2, t / 0.143); }
    if (t < 0.286) { return mix(SUNPILLAR_2, SUNPILLAR_3, (t - 0.143) / 0.143); }
    if (t < 0.429) { return mix(SUNPILLAR_3, SUNPILLAR_4, (t - 0.286) / 0.143); }
    if (t < 0.571) { return mix(SUNPILLAR_4, SUNPILLAR_5, (t - 0.429) / 0.143); }
    if (t < 0.714) { return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.571) / 0.143); }
    return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.714) / 0.286);
}

fn diagonalStripePhase(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(133.0);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = dot(layerUv, dir);
    return fract(t / repeatSize);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv, 0.12);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    let s1 = 0.317;
    let s2 = 0.375;
    let s3 = 0.433;
    let s4 = 0.833;
    if (cycle < s1) { return mix(dark, gray, cycle / s1); }
    if (cycle < s2) { return mix(gray, cyan, (cycle - s1) / (s2 - s1)); }
    if (cycle < s3) { return mix(cyan, gray, (cycle - s2) / (s3 - s2)); }
    if (cycle < s4) { return mix(gray, dark, (cycle - s3) / (s4 - s3)); }
    return dark;
}

// Beam mask - creates wider, softer beam effect
fn diagonalBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhase(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    // Core beam - tight center
    let core = 1.0 - smoothstep(0.0, 0.08, distToPeak);
    // Halo - soft glow
    let halo = 1.0 - smoothstep(0.04, 0.20, distToPeak);
    return clamp(core * 0.8 + halo * 0.5, 0.0, 1.0);
}

fn baseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.0, 0.0, 0.0, 0.1);
    let pale = vec4f(0.0, 0.0, 0.0, 0.25);
    return vec4f(0.0, 0.0, 0.0, mix(dark.a, pale.a, linearStep(0.12, 1.2, t)));
}

fn overlayRadialGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let pale = vec3f(0.918, 0.882, 0.863);
    let black = vec3f(0.0, 0.0, 0.0);
    return mix(pale, black, linearStep(0.10, 0.70, t));
}

fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.812, 0.807, 0.788, 0.30);
    let dark = vec4f(0.138, 0.116, 0.102, 1.0);
    return vec4f(mix(light.rgb, dark.rgb, linearStep(0.0, 1.8, t)), mix(light.a, dark.a, linearStep(0.0, 1.8, t)));
}

fn composeAltArtLayer(
    uv: vec2f,
    diagonalSize: vec2f,
    beamOffset: vec2f,
    isBackLayer: bool,
    pointerFromCenter: f32,
) -> vec3f {
    let foil = textureSampleLevel(foilTexture, linearSampler, uv, 0.0).rgb;
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, beamOffset);
    let radialUv = backgroundSampleUv(uv, vec2f(2.0, 1.0), beamOffset);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), isBackLayer);
    let sunOffset = select(vec2f(0.0, beamOffset.y), vec2f(0.0, -beamOffset.y), isBackLayer);
    let sun = sunpillarGradient(backgroundSampleUv(uv, sunSize, sunOffset).y);
    let diagonal = diagonalStripeColor(diagonalUv);
    let radial = baseRadialGradient(radialUv).a;

    var layer = vec3f(radial);
    layer = hardLightBlend(layer, diagonal);
    layer = hueBlend(layer, sun);
    layer = softLightBlend(layer, foil);

    // CSS uses brightness that varies with pointer position
    let frontBrightness = 0.8 + pointerFromCenter * 0.4;
    let backBrightness = 1.0 + pointerFromCenter * 0.4;

    var filtered = select(
        applyFilter(layer, frontBrightness, 1.4, 2.25),
        applyFilter(layer, backBrightness, 1.5, 1.25),
        isBackLayer
    );

    // Add beam highlights for front layer only
    // Back layer beams are applied separately after exclusion blend
    if (!isBackLayer) {
        let beam = diagonalBeamMask(diagonalUv);
        let beamColor = sun * 1.2;
        filtered = screenBlend(filtered, beamColor * beam);
    }

    return filtered;
}

fn getBackBeamHighlight(uv: vec2f, beamOffset: vec2f) -> vec3f {
    let diagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), beamOffset);
    // Use same sun color calculation as front layer for consistent colors
    let bg = cssBackgroundPosition();
    let sunUv = backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y));
    let sun = sunpillarGradient(sunUv.y);
    let beam = diagonalBeamMask(diagonalUv);
    return sun * 1.2 * beam;
}

fn beforeOverlay(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = overlayRadialGradient(uv);
    let alpha = 0.75 * (1.0 - linearStep(0.0, 0.4, t));
    return light * alpha;
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
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;

    // CSS var(--pointer-from-center) is distance from center normalized to ~1 at corners
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;
    let shineOpacity = clamp((1.35 * uniforms.opacity) - pointerFromCenter * 0.15, 0.0, 1.0);

    let bg = cssBackgroundPosition();
    let beamPos = vec2f(bg.x + (bg.y * 0.2), bg.y);
    // Use same diagonal size for both layers so beams have identical width
    let diagonalSize = vec2f(3.0, 1.0);
    let frontLayer = composeAltArtLayer(cardUV, diagonalSize, beamPos, false, pointerFromCenter);
    let backLayer = composeAltArtLayer(cardUV, diagonalSize, -beamPos, true, pointerFromCenter);

    var cardRgb = textureColor.rgb;
    let frontShine = colorDodgeBlend(cardRgb, frontLayer);
    cardRgb = mix(cardRgb, frontShine, shineOpacity * foilMask * cardMask);

    let backShine = exclusionBlend(cardRgb, backLayer);
    cardRgb = mix(cardRgb, backShine, shineOpacity * 0.65 * foilMask * cardMask);

    // Apply back beam highlights after exclusion blend using screen
    let backBeam = getBackBeamHighlight(cardUV, -beamPos);
    cardRgb = screenBlend(cardRgb, backBeam * shineOpacity * 0.8 * foilMask * cardMask);

    let before = beforeOverlay(cardUV);
    let beforeBlend = overlayBlend(cardRgb, before);
    cardRgb = mix(cardRgb, beforeBlend, 0.75 * shineOpacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.0, 1.2, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * 0.75 * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
