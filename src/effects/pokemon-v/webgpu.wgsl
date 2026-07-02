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
@group(0) @binding(5) var grainTexture: texture_2d<f32>;

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

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
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

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / 0.12);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);
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
// mode: 1 hue, 2 hard-light, 3 screen
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else {
        blended = screenBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// Grain layer: 500px wide (CSS layout px), full height, centered, tiled.
fn sampleGrain(uv: vec2f) -> vec4f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    return textureSampleLevel(grainTexture, linearSampler, fract(grainUv), 0.0);
}

// Raw (unfiltered) v-regular shine stack: grain (screen) over sunpillar (hue)
// over 133deg diagonal stripe (hard-light) over a pointer radial.
fn shineLayer(uv: vec2f, afterLayer: bool) -> vec3f {
    let bg = cssBackgroundPosition();
    let layerDiagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    var layer = shineRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let grain = sampleGrain(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, grain, 3);

    return layer.rgb;
}

// :after (soft-light) composites into the shine element, then the element's
// own filter applies to the whole group.
fn combinedShine(uv: vec2f) -> vec3f {
    let front = shineLayer(uv, false);
    let after = shineLayer(uv, true);
    let afterFiltered = applyFilter(after, 1.0, 2.5, 1.75);
    let combined = softLightBlend(front, afterFiltered);
    if (uniforms.hasMask < 0.5) {
        return applyFilter(combined, 0.7, 2.0, 0.5);
    }
    return applyFilter(combined, 0.8, 2.95, 0.65);
}

// V glare: white -> gray(0.33) 45% -> dark(0.9) 130%, hard-light at 0.5.
fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
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

    var cardRgb = textureColor.rgb;

    let shine = combinedShine(cardUV);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine), foilMask * uniforms.opacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glareFiltered),
        glare.a * 0.5 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
