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
    _pad2: f32,
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

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - (vec3f(1.0) - base) * (vec3f(1.0) - blend);
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
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = vec3f(1.0) - min((vec3f(1.0) - base) / max(blend, vec3f(0.00001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.00001));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn coolRainbow(color: vec3f) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let cool = vec3f(luma * 0.72, luma * 0.94, luma * 1.18);
    return clamp(mix(color, cool, 0.06), vec3f(0.0), vec3f(1.0));
}

fn pearlTone(color: vec3f) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let pearl = vec3f(luma * 0.92, luma * 1.04, luma * 1.12);
    return clamp(mix(color, pearl, 0.10), vec3f(0.0), vec3f(1.0));
}

fn sparkleBoost(color: vec3f, amount: f32) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let sparkle = smoothstep(0.52, 0.92, luma);
    let hueLight = mix(color, vec3f(1.0), 0.28);
    return clamp(color + hueLight * sparkle * amount, vec3f(0.0), vec3f(1.0));
}

fn specularBoost(color: vec3f, mask: f32, amount: f32) -> vec3f {
    let hot = pow(clamp(mask, 0.0, 1.0), 2.35);
    let hueSpecular = mix(color, vec3f(1.0), 0.18);
    return clamp(color + hueSpecular * hot * amount, vec3f(0.0), vec3f(1.0));
}

fn isInArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let right = 0.08;
    let bottom = 0.5285;
    let left = 0.08;

    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);
    return inX * inY;
}

fn backgroundUv(uv: vec2f, scale: vec2f, position: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - scale) * position;
    return (uv - origin) / scale;
}

fn cosmosUv(uv: vec2f, cardSize: vec2f) -> vec2f {
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let cardHeightPx = max(cardSize.y * uniforms.resolution.y / uniforms.dpr, 1.0);
    let offset = vec2f(
        uniforms.cosmosOffsetX / cardWidthPx,
        uniforms.cosmosOffsetY / cardHeightPx
    );
    return fract(uv - offset);
}

fn cosmosRainbow(uv: vec2f, position: vec2f) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(4.0, 9.0), position);
    let angle = radians(82.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir) / 0.48);

    let c1 = vec3f(0.804, 0.706, 0.396); // hsl(53, 65%, 60%)
    let c2 = vec3f(0.455, 0.780, 0.220); // hsl(93, 56%, 50%)
    let c3 = vec3f(0.225, 0.755, 0.720); // hsl(176, 54%, 49%)
    let c4 = vec3f(0.302, 0.396, 0.798); // hsl(228, 59%, 55%)
    let c5 = vec3f(0.616, 0.302, 0.798); // hsl(283, 60%, 55%)
    let c6 = vec3f(0.808, 0.212, 0.555); // hsl(326, 59%, 51%)

    if (t < 0.083) { return mix(c1, c2, t / 0.083); }
    if (t < 0.167) { return mix(c2, c3, (t - 0.083) / 0.084); }
    if (t < 0.250) { return mix(c3, c4, (t - 0.167) / 0.083); }
    if (t < 0.333) { return mix(c4, c5, (t - 0.250) / 0.083); }
    if (t < 0.417) { return mix(c5, c6, (t - 0.333) / 0.084); }
    if (t < 0.583) { return c6; }
    if (t < 0.667) { return mix(c6, c5, (t - 0.583) / 0.084); }
    if (t < 0.750) { return mix(c5, c4, (t - 0.667) / 0.083); }
    if (t < 0.833) { return mix(c4, c3, (t - 0.750) / 0.083); }
    if (t < 0.917) { return mix(c3, c2, (t - 0.833) / 0.084); }
    return mix(c2, c1, (t - 0.917) / 0.083);
}

fn shineRadial(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    if (t < 0.05) {
        return vec4f(0.78, 1.0, 1.0, 0.5);
    }
    if (t < 0.40) {
        return mix(
            vec4f(0.78, 1.0, 1.0, 0.5),
            vec4f(0.42, 0.49, 0.49, 0.3),
            (t - 0.05) / 0.35
        );
    }
    return mix(
        vec4f(0.42, 0.49, 0.49, 0.3),
        vec4f(0.0, 0.0, 0.0, 1.0),
        clamp((t - 0.40) / 0.90, 0.0, 1.0)
    );
}

fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(0.96, 0.995, 1.0), vec3f(0.12, 0.16, 0.26), clamp(t / 1.5, 0.0, 1.0));
    return vec4f(applyFilter(color, 0.75, 2.0, 2.0), 1.0);
}

fn glareAfterGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(0.99, 0.965, 1.0), vec3f(0.08, 0.08, 0.10), clamp(t / 0.60, 0.0, 1.0));
    return vec4f(applyFilter(color, 0.75, 2.5, 2.0), 1.0);
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
    let artworkClip = isInArtworkArea(cardUV) * cardMask;
    let artworkMask = artworkClip * foilMask;

    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);
    let pointerFromTop = uniforms.pointer.y;

    var cardRgb = textureColor.rgb;

    let cosmosSampleUv = cosmosUv(cardUV, cardSize);
    let bottomTex = textureSampleLevel(cosmosBottomTexture, linearSampler, cosmosSampleUv, 0.0).rgb;
    let middleSample = textureSampleLevel(cosmosMiddleTexture, linearSampler, cosmosSampleUv, 0.0);
    let topSample = textureSampleLevel(cosmosTopTexture, linearSampler, cosmosSampleUv, 0.0);
    let middleTex = middleSample;
    let topTex = topSample;

    let rainbow1 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.10 + uniforms.pointer.x * 0.80, 0.10 + uniforms.pointer.y * 0.80)));
    let rainbow2 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.15 + uniforms.pointer.x * 0.70, 0.15 + uniforms.pointer.y * 0.70)));
    let rainbow3 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.20 + uniforms.pointer.x * 0.60, 0.20 + uniforms.pointer.y * 0.60)));

    let radial = shineRadial(cardUV);
    var shineMain = mix(vec3f(0.0), radial.rgb, radial.a);
    shineMain = multiplyBlend(shineMain, rainbow1);
    shineMain = colorBurnBlend(shineMain, bottomTex);
    shineMain = sparkleBoost(applyFilter(shineMain, 1.26, 1.46, 0.86), 1.16);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, pearlTone(shineMain)), uniforms.opacity * artworkMask * 1.08);

    let beforeLayerAlpha = max(0.11, middleTex.a);
    var shineBefore = mix(rainbow2, lightenBlend(rainbow2, middleTex.rgb), middleTex.a);
    shineBefore = sparkleBoost(applyFilter(shineBefore, 1.38, 1.94, 0.86), 0.58);
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, shineBefore), uniforms.opacity * artworkMask * beforeLayerAlpha * 0.44);

    let afterLayerAlpha = max(0.06, topTex.a);
    var shineAfter = mix(rainbow3, multiplyBlend(rainbow3, topTex.rgb), topTex.a);
    shineAfter = applyFilter(shineAfter, 1.25, 1.75, 0.8);
    cardRgb = mix(cardRgb, multiplyBlend(cardRgb, shineAfter), uniforms.opacity * artworkMask * afterLayerAlpha * 0.16);

    let bottomSpark = smoothstep(0.28, 0.70, dot(bottomTex, vec3f(0.2126, 0.7152, 0.0722)));
    let middleSpark = smoothstep(0.06, 0.34, dot(middleTex.rgb, vec3f(0.2126, 0.7152, 0.0722)) * middleTex.a);
    let topSpark = smoothstep(0.06, 0.34, dot(topTex.rgb, vec3f(0.2126, 0.7152, 0.0722)) * topTex.a);
    let pointerDist = distance(cardUV, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let glareWashout = smoothstep(0.10, 0.22, pointerDist);
    let mouseRange = 1.0 - smoothstep(0.42, 0.68, pointerDist);
    let speckMask = clamp(max(bottomSpark, max(middleSpark, topSpark)) * glareWashout * mouseRange, 0.0, 1.0);
    let speckTexture = max(bottomTex, max(middleTex.rgb * middleTex.a, topTex.rgb * topTex.a));
    var speckShine = screenBlend(speckTexture, rainbow2);
    speckShine = sparkleBoost(applyFilter(speckShine, 1.48, 2.08, 1.45), 1.28);
    speckShine = specularBoost(speckShine, speckMask, 1.12);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, speckShine), uniforms.opacity * artworkMask * speckMask * 0.96);

    let glare = glareGradient(cardUV);
    let glareOpacity = uniforms.opacity * (0.25 + pointerFromCenter) * cardMask;
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glare.rgb), glare.a * glareOpacity);

    let glareAfter = glareAfterGradient(cardUV);
    let glareAfterOpacity = (1.0 - pointerFromTop * 0.75) * artworkClip * uniforms.opacity * 0.40;
    cardRgb = mix(cardRgb, softLightBlend(cardRgb, glareAfter.rgb), glareAfter.a * glareAfterOpacity);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
