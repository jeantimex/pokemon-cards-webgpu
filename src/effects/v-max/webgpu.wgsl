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
@group(0) @binding(5) var vmaxBgTexture: texture_2d<f32>;

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

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    return clamp(base + (blendLum - baseLum), vec3f(0.0), vec3f(1.0));
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

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
// mode: 0 soft-light, 1 hue, 2 hard-light, 3 difference, 4 luminosity
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 3) {
        blended = differenceBlend(bottom.rgb, top.rgb);
    } else {
        blended = luminosityBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

// The :after box uses the base.css :after custom-property rotation (+5).
fn sunpillarColor(index: i32) -> vec3f {
    let shifted = ((((index % 6) + 6) % 6) + 5) % 6;
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx), sunpillarColor(idx + 1), f);
}

// Element layer 4 (bottom): pastel radial, four stops all at alpha 0.6.
fn pastelRadial(layerUv: vec2f) -> vec3f {
    let t = distance(layerUv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let cyan = vec3f(0.595, 0.892, 0.945);
    let mint = vec3f(0.634, 0.906, 0.756);
    let lavender = vec3f(0.696, 0.519, 0.861);
    let pink = vec3f(0.877, 0.563, 0.589);
    if (t < 0.25) { return mix(cyan, mint, linearStep(0.0, 0.25, t)); }
    if (t < 0.50) { return mix(mint, lavender, linearStep(0.25, 0.50, t)); }
    return mix(lavender, pink, linearStep(0.50, 0.75, t));
}

// Element layer 3: repeating-linear-gradient(133deg, navy(0.5) 0%, gray 2.5%,
// green 5%, gray 7.5%, navy(0.5) 10%, navy(0.5) 15%) — color + alpha.
fn stripe133(tRaw: f32) -> vec4f {
    let navy = vec3f(0.056, 0.084, 0.184);
    let gray = vec3f(0.450, 0.550, 0.550);
    let green = vec3f(0.391, 0.525, 0.175);
    let ph = fract(tRaw / 0.15) * 0.15;
    if (ph < 0.025) {
        let f = linearStep(0.0, 0.025, ph);
        return vec4f(mix(navy, gray, f), mix(0.5, 1.0, f));
    }
    if (ph < 0.05) {
        return vec4f(mix(gray, green, linearStep(0.025, 0.05, ph)), 1.0);
    }
    if (ph < 0.075) {
        return vec4f(mix(green, gray, linearStep(0.05, 0.075, ph)), 1.0);
    }
    if (ph < 0.10) {
        let f = linearStep(0.075, 0.10, ph);
        return vec4f(mix(gray, navy, f), mix(1.0, 0.5, f));
    }
    return vec4f(navy, 0.5);
}

// Element layer 2: repeating-linear-gradient(-33deg, 5 colors at 6% spacing),
// tile spans 6%..36% of the gradient line.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 5) + 5) % 5) {
        case 0: { return vec3f(0.799, 0.163, 0.141); }
        case 1: { return vec3f(0.424, 0.510, 0.856); }
        case 2: { return vec3f(0.175, 0.605, 0.576); }
        case 3: { return vec3f(0.112, 0.588, 0.136); }
        default: { return vec3f(0.710, 0.248, 0.892); }
    }
}

fn rainbow33(tRaw: f32) -> vec3f {
    let phase = fract((tRaw - 0.06) / 0.30) * 5.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// :after bottom layer: the v-full-art 133deg stripe (12% cycle).
fn afterStripeColor(layerUv: vec2f, box: vec2f) -> vec3f {
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

fn sampleFoil(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    // No-mask fallback: vmaxbg tiled at 60% x 30%.
    return textureSampleLevel(vmaxBgTexture, linearSampler, fract(uv / vec2f(0.6, 0.3)), 0.0);
}

// Shine element background: foil (difference) over rainbow (luminosity) over
// 133deg stripe (soft-light) over the pastel radial (alpha 0.6).
fn shineBackground(uv: vec2f, cardBox: vec2f) -> vec4f {
    let bg = cssBackgroundPosition();

    let radialUv = backgroundSampleUv(uv, vec2f(2.0, 2.0), bg);
    var layer = vec4f(pastelRadial(radialUv), 0.6);

    let stripeUv = backgroundSampleUv(uv, vec2f(6.0, 6.0), bg);
    let stripe = stripe133(cssLinearGradientT(stripeUv, 133.0, cardBox * 6.0));
    layer = compositeBackgroundLayer(layer, stripe, 0);

    let rainbowUv = backgroundSampleUv(uv, vec2f(11.0, 11.0), bg);
    let rainbow = rainbow33(cssLinearGradientT(rainbowUv, -33.0, cardBox * 11.0));
    layer = compositeBackgroundLayer(layer, vec4f(rainbow, 1.0), 4);

    // Foil luma boosted so the etched marks read as strongly as the CSS pane.
    let foil = sampleFoil(uv);
    let boostedFoil = vec4f(min(foil.rgb * 1.5, vec3f(1.0)), foil.a);
    layer = compositeBackgroundLayer(layer, boostedFoil, 3);
    return layer;
}

// :after — shifted sunpillar (hue) over the v-full-art stripe, saturate(1.5),
// blended lighten into the shine element at 0.3 + 0.5 * pointer-from-center.
fn afterLayer(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let stripeUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), bg);
    var layer = vec4f(afterStripeColor(stripeUv, cardBox * vec2f(3.0, 1.0)), 1.0);
    let sunUv = backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y));
    layer = compositeBackgroundLayer(layer, vec4f(verticalSunpillar(sunUv), 1.0), 1);
    return applyFilter(layer.rgb, 1.0, 1.0, 1.5);
}

// VMAX glare: radial white(0.75) 0% -> black(1.0) 120%, hard-light,
// opacity 0.2 + 0.8 * pointer-from-center.
fn glareLayer(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let f = linearStep(0.0, 1.2, t);
    return vec4f(vec3f(1.0 - f), mix(0.75, 1.0, f));
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);

    let pfc = pointerFromCenter();
    let cardBox = vec2f(0.718, 1.0);

    let shine = shineBackground(cardUV, cardBox);
    let after = afterLayer(cardUV, cardBox);
    let afterOpacity = 0.3 + pfc * 0.5;

    let combined = mix(shine.rgb, lightenBlend(shine.rgb, after), afterOpacity);
    let shineFiltered = applyFilter(combined, pfc * 0.4 + 0.4, 2.0, 1.0);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineFiltered),
        foilMask * uniforms.opacity * cardMask
    );

    let glare = glareLayer(cardUV);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glare.rgb),
        glare.a * (0.2 + pfc * 0.8) * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
