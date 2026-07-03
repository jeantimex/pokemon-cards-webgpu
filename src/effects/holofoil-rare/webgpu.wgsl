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
@group(0) @binding(4) var maskTexture: texture_2d<f32>;

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

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
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

// --violet, --blue, --green, --yellow, --red from base.css.
fn holoRainbowColor(index: i32) -> vec3f {
    switch (((index % 5) + 5) % 5) {
        case 0: { return vec3f(0.788, 0.161, 0.945); }
        case 1: { return vec3f(0.051, 0.741, 0.914); }
        case 2: { return vec3f(0.129, 0.914, 0.522); }
        case 3: { return vec3f(0.933, 0.875, 0.063); }
        default: { return vec3f(0.973, 0.055, 0.208); }
    }
}

// 110deg gradient with 15 evenly-spaced stops (5 colors x 3): 14 intervals.
fn holoRainbow(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let pos = vec2f((0.5 - bg.x) * 2.6 + 0.5, (0.5 - bg.y) * 3.5 + 0.5);
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), pos);
    let t = clamp(cssLinearGradientT(layerUv, 110.0, cardBox * 4.0), 0.0, 1.0) * 14.0;
    let idx = i32(floor(min(t, 13.0)));
    let f = t - floor(t);
    return mix(holoRainbowColor(idx), holoRainbowColor(idx + 1), f);
}

// Vertical scanlines: 90deg repeating gradient, 2px dark / 2px light (#666),
// measured in CSS layout pixels.
fn scanlines(uv: vec2f) -> vec3f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let px = uv.x * cardWidthPx;
    return select(vec3f(0.4), vec3f(0.0), fract(px / 4.0) < 0.5);
}

// :before bar gradient: black background with two gray beams per tile.
// Stops at 6% / 9% / 10.5% / 12% / 15% of the gradient line, tile ends at
// tileEnd (42% for the first layer, 30% for the second).
fn barGradient(x: f32, tileEnd: f32) -> vec3f {
    let barColor = vec3f(0.7);
    let barBg = vec3f(0.0);
    let period = tileEnd - 0.06;
    let p = fract((x - 0.06) / period) * period;
    if (p < 0.03) { return mix(barBg, barColor, linearStep(0.0, 0.03, p)); }
    if (p < 0.045) { return mix(barColor, barBg, linearStep(0.03, 0.045, p)); }
    if (p < 0.06) { return mix(barBg, barColor, linearStep(0.045, 0.06, p)); }
    if (p < 0.09) { return mix(barColor, barBg, linearStep(0.06, 0.09, p)); }
    return barBg;
}

// :before — two 90deg beam layers, screen-blended, then hard-light.
fn beamLayer(uv: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let pos1 = vec2f((0.5 - bg.x) * 1.65 + 0.5 + bg.y * 0.5, bg.x);
    let pos2 = vec2f((0.5 - bg.x) * -0.9 + 0.5 - bg.y * 0.75, bg.y);
    let x1 = backgroundSampleUv(uv, vec2f(2.0, 2.0), pos1).x;
    let x2 = backgroundSampleUv(uv, vec2f(2.0, 2.0), pos2).x;
    let layer = screenBlend(barGradient(x2, 0.30), barGradient(x1, 0.42));
    return applyFilter(layer, 1.15, 1.1, 1.0);
}

// :after — luminosity radial with per-stop alpha (0.8 / 0.1 / 1.0).
fn luminosityRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.90, 0.90, 0.90, 0.8);
    let mid = vec4f(0.78, 0.78, 0.78, 0.1);
    let dark = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.25) {
        return mix(light, mid, linearStep(0.0, 0.25, t));
    }
    return mix(mid, dark, linearStep(0.25, 0.90, t));
}

// Artwork clip: 0 = basic (--clip), 1 = stage, 2 = trainer/item/supporter.
fn artworkClip(uv: vec2f) -> f32 {
    if (uniforms.clipMode < 0.5) {
        return select(0.0, 1.0, uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.0985 && uv.y <= 0.4715);
    }
    if (uniforms.clipMode < 1.5) {
        let base = uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.16 && uv.y <= 0.4715;
        let topLeft = uv.x >= 0.12 && uv.x < 0.17 && uv.y >= mix(0.16, 0.12, linearStep(0.12, 0.17, uv.x)) && uv.y <= 0.4715;
        let topMid = uv.x >= 0.17 && uv.x < 0.54 && uv.y >= 0.12 && uv.y <= 0.4715;
        let topRight = uv.x >= 0.54 && uv.x < 0.57 && uv.y >= mix(0.12, 0.0985, linearStep(0.54, 0.57, uv.x)) && uv.y <= 0.4715;
        let right = uv.x >= 0.57 && uv.x <= 0.915 && uv.y >= 0.0985 && uv.y <= 0.4715;
        return select(0.0, 1.0, base || topLeft || topMid || topRight || right);
    }
    return select(0.0, 1.0, uv.x >= 0.085 && uv.x <= 0.915 && uv.y >= 0.145 && uv.y <= 0.518);
}

// Base .card__glare radial: white(0.8) 10%, white(0.65) 20%, black(0.5) 90%.
fn glareRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    if (t < 0.10) {
        return vec4f(1.0, 1.0, 1.0, 0.8);
    }
    if (t < 0.20) {
        return vec4f(1.0, 1.0, 1.0, mix(0.8, 0.65, linearStep(0.10, 0.20, t)));
    }
    let f = linearStep(0.20, 0.90, t);
    return vec4f(vec3f(1.0 - f), mix(0.65, 0.5, f));
}

// Glare :after radial: cyan-white 5%, gray(0.25) 55%, black(0.36) 110%.
fn glareAfterRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.90, 1.00, 1.00, 1.0);
    let mid = vec4f(0.39, 0.39, 0.39, 0.25);
    let dark = vec4f(0.0, 0.0, 0.0, 0.36);
    if (t < 0.55) {
        return mix(light, mid, linearStep(0.05, 0.55, t));
    }
    return mix(mid, dark, linearStep(0.55, 1.10, t));
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
    let clipMask = artworkClip(cardUV);
    let cardBox = vec2f(0.718, 1.0);

    // Shine group: rainbow (overlay) over scanlines, beams hard-light,
    // luminosity radial, then the parent filter over the composite.
    var group = overlayBlend(scanlines(cardUV), holoRainbow(cardUV, cardBox));
    group = hardLightBlend(group, beamLayer(cardUV));
    let lumRadial = luminosityRadial(cardUV);
    let lumFiltered = applyFilter(lumRadial.rgb, 0.6, 4.0, 1.0);
    group = mix(group, luminosityBlend(group, lumFiltered), lumRadial.a);
    group = applyFilter(group, 1.1, 1.1, 1.2);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, group),
        clipMask * foilMask * uniforms.opacity * cardMask
    );

    // Glare group: :after overlays onto the base glare radial, parent filter
    // brightness(0.8) contrast(1.5), overlay onto the card at 0.8 opacity.
    let glareBg = glareRadial(cardUV);
    var glareAfter = glareAfterRadial(cardUV);
    var afterAlpha = glareAfter.a;
    // Stage/trainer cards clip the glare :after to the artwork.
    if (uniforms.clipMode > 0.5) {
        afterAlpha *= clipMask;
    }
    let glareAfterFiltered = applyFilter(glareAfter.rgb, 0.6, 3.0, 1.0);
    let glareRgb = applyFilter(
        mix(glareBg.rgb, overlayBlend(glareBg.rgb, glareAfterFiltered), afterAlpha),
        0.8, 1.5, 1.0
    );
    let glareAlpha = afterAlpha + glareBg.a * (1.0 - afterAlpha);
    cardRgb = mix(
        cardRgb,
        overlayBlend(cardRgb, glareRgb),
        glareAlpha * 0.8 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
