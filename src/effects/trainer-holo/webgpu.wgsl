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
    cosmosOffsetX: f32,
    cosmosOffsetY: f32,
    clipMode: f32,
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var trainerBgTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
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

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = 1.0 - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarColor(index: i32, afterLayer: bool) -> vec3f {
    let wrapped = ((index % 6) + 6) % 6;
    let shifted = select(wrapped, (wrapped + 5) % 6, afterLayer);
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f, afterLayer: bool) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

// 133deg repeating stripe, projected in the layer's px box so both the
// front and :after layers render parallel beams (only spacing differs).
fn diagonalStripeColor(layerUv: vec2f, box: vec2f) -> vec3f {
    let cycle = fract(cssLinearGradientT(layerUv, 133.0, box) / 0.12);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    var alpha: f32;
    if (t < 0.12) {
        alpha = 0.1;
    } else if (t < 0.20) {
        alpha = mix(0.1, 0.15, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(0.15, 0.25, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// Masked cards use the per-card foil; unmasked supporters fall back to the
// trainerbg texture tiled at 20% with color-burn.
fn sampleFoilOrTrainerBg(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(trainerBgTexture, linearSampler, fract(uv / 0.2), 0.0);
}

// Raw (unfiltered) v-full-art shine stack shared by the element and :after.
fn shineLayer(uv: vec2f, afterLayer: bool) -> vec3f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let diagonalPos = vec2f(bg.x + bg.y * 0.2, bg.y);
    let layerDiagonalPos = select(diagonalPos, -diagonalPos, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    var layer = shineRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(
        backgroundSampleUv(uv, diagonalSize, layerDiagonalPos),
        vec2f(0.718, 1.0) * diagonalSize,
    ), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrTrainerBg(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 3, noMask));

    return layer.rgb;
}

// :before — white radial glow (0% -> transparent at 80%), screen blend,
// opacity 0.5, explicitly unmasked in the CSS.
fn beforeGlowAlpha(uv: vec2f) -> f32 {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    return (1.0 - linearStep(0.0, 0.8, t)) * 0.5;
}

// Supporter glare: v-full-art radial colors in a 170% x 170% centered layer,
// multiply blend with brightness(1.5) contrast(1.4).
fn glareColor(uv: vec2f) -> vec3f {
    let size = vec2f(1.7, 1.7);
    let layerUv = backgroundSampleUv(uv, size, vec2f(0.5, 0.5));
    let boxAspect = vec2f(0.718, 1.0) * size;
    let d = length((layerUv - uniforms.pointer) * boxAspect);
    let c0 = abs(vec2f(0.0, 0.0) - uniforms.pointer) * boxAspect;
    let c1 = abs(vec2f(1.0, 0.0) - uniforms.pointer) * boxAspect;
    let c2 = abs(vec2f(0.0, 1.0) - uniforms.pointer) * boxAspect;
    let c3 = abs(vec2f(1.0, 1.0) - uniforms.pointer) * boxAspect;
    let farthest = max(max(length(c0), length(c1)), max(length(c2), length(c3)));
    let t = d / max(farthest, 0.001);

    let light = vec3f(0.750, 0.750, 0.750);
    let mid = vec3f(0.332, 0.356, 0.367);
    let dark = vec3f(0.140, 0.060, 0.113);
    if (t < 0.60) {
        return mix(light, mid, linearStep(0.05, 0.60, t));
    }
    return mix(mid, dark, linearStep(0.60, 1.50, t));
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
    let hasMask = uniforms.hasMask > 0.5;
    let foilMask = select(1.0, maskColor.a, hasMask);

    let pfc = pointerFromCenter();
    let front = shineLayer(cardUV, false);
    let after = shineLayer(cardUV, true);
    let beforeAlpha = beforeGlowAlpha(cardUV);

    var shineIn: vec3f;
    var shineOut: vec3f;
    if (hasMask) {
        let afterFiltered = applyFilter(after, pfc * 0.4 + 0.85, 2.0, 0.5);
        var combined = mix(front, vec3f(1.0), beforeAlpha);
        combined = exclusionBlend(combined, afterFiltered);
        shineIn = applyFilter(combined, pfc * 0.05 + 0.8, 1.75, 1.2);
        // Outside the mask only the unmasked white :before glow paints.
        shineOut = applyFilter(vec3f(1.0), pfc * 0.05 + 0.8, 1.75, 1.2);
    } else {
        let afterFiltered = applyFilter(after, pfc * 0.05 + 0.6, 1.5, 1.2);
        var combined = mix(front, vec3f(1.0), beforeAlpha);
        combined = exclusionBlend(combined, afterFiltered);
        shineIn = applyFilter(combined, pfc * 0.05 + 0.6, 1.5, 1.2);
        shineOut = shineIn;
    }

    var cardRgb = textureColor.rgb;
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineIn), foilMask * uniforms.opacity * cardMask);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineOut),
        (1.0 - foilMask) * beforeAlpha * uniforms.opacity * cardMask
    );

    let glare = applyFilter(glareColor(cardUV), 1.5, 1.4, 1.0);
    cardRgb = mix(
        cardRgb,
        multiplyBlend(cardRgb, glare),
        0.75 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
