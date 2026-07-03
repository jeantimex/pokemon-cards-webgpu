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
@group(0) @binding(5) var cosmosBottomTexture: texture_2d<f32>;
@group(0) @binding(6) var cosmosMiddleTexture: texture_2d<f32>;
@group(0) @binding(7) var cosmosTopTexture: texture_2d<f32>;

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

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
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

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = 1.0 - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.0));
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
// mode: 0 multiply, 1 color-burn, 2 lighten
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = multiplyBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    } else {
        blended = lightenBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// repeating-linear-gradient(82deg, 12 stops at 4% spacing): a rainbow that
// runs up and mirrors back down. Tile spans 4%..48% (period 44%, 11 intervals).
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 11) + 11) % 11) {
        case 0: { return vec3f(0.860, 0.799, 0.340); }
        case 1: { return vec3f(0.472, 0.780, 0.220); }
        case 2: { return vec3f(0.225, 0.755, 0.719); }
        case 3: { return vec3f(0.284, 0.391, 0.816); }
        case 4: { return vec3f(0.667, 0.280, 0.820); }
        case 5: { return vec3f(0.799, 0.221, 0.549); }
        case 6: { return vec3f(0.799, 0.221, 0.549); }
        case 7: { return vec3f(0.667, 0.280, 0.820); }
        case 8: { return vec3f(0.284, 0.391, 0.816); }
        case 9: { return vec3f(0.225, 0.755, 0.719); }
        default: { return vec3f(0.472, 0.780, 0.220); }
    }
}

// The 12th stop wraps back to the 1st color, so interval 10 ends on stop 0.
fn rainbow82(uv: vec2f, pos: vec2f, cardBox: vec2f) -> vec3f {
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 9.0), pos);
    let tRaw = cssLinearGradientT(layerUv, 82.0, cardBox * vec2f(4.0, 9.0));
    let phase = fract((tRaw - 0.04) / 0.44) * 11.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    let c0 = rainbowColor(idx);
    let c1 = select(rainbowColor(idx + 1), vec3f(0.860, 0.799, 0.340), idx == 10);
    return mix(c0, c1, f);
}

// The galaxy textures tile with a per-card pixel offset (--cosmosbg).
fn cosmosUv(uv: vec2f) -> vec2f {
    let offset = vec2f(uniforms.cosmosOffsetX, uniforms.cosmosOffsetY) / vec2f(734.0, 1024.0);
    return fract(uv - offset);
}

// Element bottom layer: radial with per-stop alpha (0.5 / 0.3 / 1.0).
fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.780, 1.000, 1.000, 0.5);
    let mid = vec4f(0.510, 0.630, 0.630, 0.3);
    let dark = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.40) {
        return mix(light, mid, linearStep(0.05, 0.40, t));
    }
    return mix(mid, dark, linearStep(0.40, 1.30, t));
}

// Artwork clip: 0 = basic (--clip), 1 = stage (--clip-stage approximated as
// its bounding inset), 2 = trainer (--clip-trainer).
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

// Combined shine content of the element and its pseudo-layers, before the
// parent filter. Each pseudo has its own filter, then blends into the group.
fn combinedShine(uv: vec2f, cardBox: vec2f) -> vec3f {
    let galaxyUv = cosmosUv(uv);
    let pfl = clamp(uniforms.pointer.x, 0.0, 1.0);
    let pft = clamp(uniforms.pointer.y, 0.0, 1.0);

    // Element: cosmos-bottom (color-burn) over rainbow (multiply) over radial.
    let bottomTex = textureSampleLevel(cosmosBottomTexture, linearSampler, galaxyUv, 0.0);
    var layer = shineRadial(uv);
    let rainbowA = rainbow82(uv, vec2f(0.10 + pfl * 0.80, 0.10 + pft * 0.80), cardBox);
    layer = compositeBackgroundLayer(layer, vec4f(rainbowA, 1.0), 0);
    layer = compositeBackgroundLayer(layer, bottomTex, 1);

    // :before — cosmos-middle (lighten) over rainbow, overlay into the group.
    let middleTex = textureSampleLevel(cosmosMiddleTexture, linearSampler, galaxyUv, 0.0);
    let rainbowB = rainbow82(uv, vec2f(0.15 + pfl * 0.70, 0.15 + pft * 0.70), cardBox);
    var before = compositeBackgroundLayer(vec4f(rainbowB, 1.0), middleTex, 2);
    let beforeFiltered = applyFilter(before.rgb, 1.25, 1.75, 0.8);
    var group = overlayBlend(layer.rgb, beforeFiltered);

    // :after — cosmos-top (multiply) over rainbow, multiply into the group.
    let topTex = textureSampleLevel(cosmosTopTexture, linearSampler, galaxyUv, 0.0);
    let rainbowC = rainbow82(uv, vec2f(0.20 + pfl * 0.60, 0.20 + pft * 0.60), cardBox);
    var after = compositeBackgroundLayer(vec4f(rainbowC, 1.0), topTex, 0);
    let afterFiltered = applyFilter(after.rgb, 1.25, 1.75, 0.8);
    group = multiplyBlend(group, afterFiltered);

    // Parent filter: brightness(1) contrast(1) saturate(0.8).
    return applyFilter(group, 1.0, 1.0, 0.8);
}

// Glare element: radial with per-stop alpha (0.8 -> 1.0), overlay blend.
fn glareRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.900, 0.960, 1.000, 0.8);
    let dark = vec4f(0.180, 0.170, 0.230, 1.0);
    return mix(light, dark, linearStep(0.05, 1.50, t));
}

// Glare :after: soft-light radial, opacity 1 - pointer-from-top * 0.75.
fn glareAfterRadial(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec3f(0.973, 0.920, 1.000);
    let dark = vec3f(0.10, 0.10, 0.10);
    return mix(light, dark, linearStep(0.05, 0.60, t));
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
    let pfc = pointerFromCenter();
    let cardBox = vec2f(0.718, 1.0);

    var cardRgb = textureColor.rgb;

    let shine = combinedShine(cardUV, cardBox);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shine),
        clipMask * foilMask * uniforms.opacity * cardMask
    );

    // Glare group: :after soft-lights over the glare radial, parent filter on
    // the composite, overlay onto the card at (0.25 + pfc) * card-opacity.
    let glareBg = glareRadial(cardUV);
    let glareAfter = applyFilter(glareAfterRadial(cardUV), 0.75, 2.5, 2.0);
    var afterOpacity = 1.0 - clamp(uniforms.pointer.y, 0.0, 1.0) * 0.75;
    // Stage/supporter cards clip the glare :after to the artwork.
    if (uniforms.clipMode > 0.5) {
        afterOpacity *= clipMask;
    }
    let glareRgb = applyFilter(
        mix(glareBg.rgb, softLightBlend(glareBg.rgb, glareAfter), afterOpacity),
        0.75, 2.0, 2.0
    );
    let glareAlpha = afterOpacity + glareBg.a * (1.0 - afterOpacity);
    cardRgb = mix(
        cardRgb,
        overlayBlend(cardRgb, glareRgb),
        glareAlpha * clamp(0.25 + pfc, 0.0, 1.0) * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
