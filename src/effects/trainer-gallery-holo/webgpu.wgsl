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

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

// repeating-linear-gradient(-22deg, 7 hsla stops at 5% spacing, all at 0.75
// alpha): tile spans 5%..35%, i.e. period 30% with 6 intervals.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.685, 0.404, 0.796); }
        case 1: { return vec3f(0.893, 0.307, 0.287); }
        case 2: { return vec3f(0.845, 0.771, 0.215); }
        case 3: { return vec3f(0.493, 0.789, 0.251); }
        case 4: { return vec3f(0.310, 0.690, 0.665); }
        case 5: { return vec3f(0.540, 0.632, 1.000); }
        default: { return vec3f(0.693, 0.419, 0.801); }
    }
}

fn rainbowGradient(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let layerUv = backgroundSampleUv(uv, vec2f(3.0, 4.0), vec2f(0.0, bg.y));
    let tRaw = cssLinearGradientT(layerUv, -22.0, cardBox * vec2f(3.0, 4.0));
    let phase = fract((tRaw - 0.05) / 0.30) * 6.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// :after — farthest-corner ELLIPSE at (pointer * 0.5 + 25%) in a 400% x 500%
// layer: white 5%, deep magenta (0.6) 40%, dark gray 120%.
fn afterEllipse(uv: vec2f) -> vec4f {
    let size = vec2f(4.0, 5.0);
    let layerUv = backgroundSampleUv(uv, size, vec2f(0.5, 0.5));
    let center = uniforms.pointer * 0.5 + vec2f(0.25);
    let box = vec2f(0.718, 1.0) * size;

    // Farthest-side radii set the ellipse aspect; scale so it passes through
    // the farthest corner.
    let rx = max(center.x, 1.0 - center.x) * box.x;
    let ry = max(center.y, 1.0 - center.y) * box.y;
    let c0 = abs(vec2f(0.0, 0.0) - center) * box;
    let c1 = abs(vec2f(1.0, 0.0) - center) * box;
    let c2 = abs(vec2f(0.0, 1.0) - center) * box;
    let c3 = abs(vec2f(1.0, 1.0) - center) * box;
    let k0 = length(c0 / vec2f(rx, ry));
    let k1 = length(c1 / vec2f(rx, ry));
    let k2 = length(c2 / vec2f(rx, ry));
    let k3 = length(c3 / vec2f(rx, ry));
    let k = max(max(k0, k1), max(k2, k3));

    let d = (layerUv - center) * box;
    let t = length(d / vec2f(rx, ry)) / max(k, 0.001);

    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let magenta = vec4f(0.220, 0.000, 0.220, 0.6);
    let gray = vec4f(0.220, 0.220, 0.220, 1.0);
    if (t < 0.40) {
        return mix(white, magenta, linearStep(0.05, 0.40, t));
    }
    return mix(magenta, gray, linearStep(0.40, 1.20, t));
}

// Glare: soft-light radial, white 10%, white(0.6) 35%, slate 60%.
fn glareRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let faint = vec4f(1.0, 1.0, 1.0, 0.6);
    let slate = vec4f(0.311, 0.389, 0.389, 1.0);
    if (t < 0.10) {
        return white;
    }
    if (t < 0.35) {
        return mix(white, faint, linearStep(0.10, 0.35, t));
    }
    return mix(faint, slate, linearStep(0.35, 0.60, t));
}

// clip-path: var(--clip-borders) = inset(2.8% 4%) — shine stays inside the
// card border (the rounded corners are covered by the outer card mask).
fn borderClip(uv: vec2f) -> f32 {
    return select(0.0, 1.0, uv.x >= 0.04 && uv.x <= 0.96 && uv.y >= 0.028 && uv.y <= 0.972);
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

    // Shine group: the 0.75-alpha rainbow is the element background; the
    // ellipse :after (own filter) hard-lights into it; the element filter
    // applies to the composite, which color-dodges onto the card.
    let rainbow = rainbowGradient(cardUV, cardBox);
    let rainbowAlpha = 0.75;

    let after = afterEllipse(cardUV);
    let afterFiltered = applyFilter(after.rgb, pfc * 0.2 + 0.4, 0.85, 1.1);

    let groupRgb = after.a * (1.0 - rainbowAlpha) * afterFiltered
        + after.a * rainbowAlpha * hardLightBlend(rainbow, afterFiltered)
        + (1.0 - after.a) * rainbowAlpha * rainbow;
    let groupAlpha = after.a + rainbowAlpha * (1.0 - after.a);
    let shine = applyFilter(groupRgb / max(groupAlpha, 0.001), pfc * 0.3 + 0.5, 2.3, 1.0);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shine),
        groupAlpha * borderClip(cardUV) * foilMask * uniforms.opacity * cardMask
    );

    let glare = glareRadial(cardUV);
    cardRgb = mix(
        cardRgb,
        softLightBlend(cardRgb, glare.rgb),
        glare.a * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
