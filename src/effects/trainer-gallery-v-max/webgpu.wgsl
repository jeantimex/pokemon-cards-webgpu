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

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
// Returns t in [0,1] across the gradient line for points inside the box.
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

// linear-gradient(-30deg / -60deg, r-clr 1..7 repeated three times + r-clr-1):
// 22 stops evenly spaced, i.e. 21 intervals cycling through 7 colors.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.581, 0.159, 0.159); }
        case 1: { return vec3f(0.597, 0.459, 0.183); }
        case 2: { return vec3f(0.350, 0.560, 0.140); }
        case 3: { return vec3f(0.140, 0.560, 0.560); }
        case 4: { return vec3f(0.140, 0.560, 0.560); }
        case 5: { return vec3f(0.168, 0.390, 0.612); }
        default: { return vec3f(0.367, 0.140, 0.480); }
    }
}

fn rainbowGradient(t: f32) -> vec3f {
    let tt = clamp(t, 0.0, 1.0) * 21.0;
    let idx = i32(floor(min(tt, 20.0)));
    let f = tt - floor(tt);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// repeating-linear-gradient(133deg, 7 hsla stops at 6% spacing):
// tile spans 6%..42%, i.e. period 36% with 6 intervals.
fn hueStripeColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.685, 0.404, 0.796); }
        case 1: { return vec3f(0.874, 0.306, 0.286); }
        case 2: { return vec3f(0.845, 0.771, 0.215); }
        case 3: { return vec3f(0.493, 0.789, 0.251); }
        case 4: { return vec3f(0.310, 0.690, 0.665); }
        case 5: { return vec3f(0.540, 0.632, 1.000); }
        default: { return vec3f(0.693, 0.419, 0.801); }
    }
}

fn hueStripeGradient(tRaw: f32) -> vec3f {
    let phase = fract((tRaw - 0.06) / 0.36) * 6.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(hueStripeColor(idx), hueStripeColor(idx + 1), f);
}

// background-size: 25% 25% tiling with background-position: center.
fn sampleGlitter(uv: vec2f) -> vec4f {
    return textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.375)) / 0.25), 0.0);
}

// Shine element background: 0.75-alpha hue stripes (luminosity) over
// glitter (overlay) over the -30deg rainbow gradient.
fn shineBackground(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -30.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    let hueUv = backgroundSampleUv(uv, vec2f(2.0, 4.0), vec2f(0.0, bg.y));
    let hue = hueStripeGradient(cssLinearGradientT(hueUv, 133.0, cardBox * vec2f(2.0, 4.0)));
    return mix(layer, luminosityBlend(layer, hue), 0.75);
}

// :after layer: glitter (overlay) over the -60deg rainbow, own filter.
// mask-image is forced to none in CSS, so this covers the whole card.
fn afterLayer(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), -bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -60.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    return applyFilter(layer, pointerFromCenter() * 0.5 + 0.6, 3.0, 1.0);
}

// Trainer-gallery VMAX glare: hard-light radial, opacity driven by pointer.
fn glareGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec3f(0.930, 0.920, 0.870);
    let mid = vec3f(0.380, 0.420, 0.408);
    let dark = vec3f(0.0, 0.0, 0.0);
    if (t < 0.5) {
        return mix(light, mid, linearStep(0.0, 0.5, t));
    }
    return mix(mid, dark, linearStep(0.5, 1.2, t));
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
    // Only the layer aspect matters for gradient geometry.
    let cardBox = vec2f(0.718, 1.0);

    var shine = shineBackground(cardUV, cardBox);

    // :before — foil texture, color-dodge, confined to the mask.
    if (hasMask) {
        let foil = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0);
        let foilFiltered = applyFilter(foil.rgb, 1.5, 1.5, 1.0);
        let beforeOpacity = (pfc + 0.6) * 0.4;
        shine = mix(shine, colorDodgeBlend(shine, foilFiltered), beforeOpacity * foilMask);
    }

    let after = afterLayer(cardUV, cardBox);
    let afterOpacity = clamp(1.2 - pfc * 0.5, 0.0, 1.0);

    // Inside the mask: full stack (background + before + after), parent filter on top.
    let shineIn = applyFilter(
        mix(shine, colorDodgeBlend(shine, after), afterOpacity),
        pfc * 0.3 + 0.3, 3.0, 1.8
    );
    // Outside the mask: only the unmasked :after paints.
    let shineOut = applyFilter(after, pfc * 0.3 + 0.3, 3.0, 1.8);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineIn), foilMask * uniforms.opacity * cardMask);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineOut),
        (1.0 - foilMask) * afterOpacity * uniforms.opacity * cardMask
    );

    let glare = glareGradient(cardUV);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glare),
        pfc * 0.85 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
