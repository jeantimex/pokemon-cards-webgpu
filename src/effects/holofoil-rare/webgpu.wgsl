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
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
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

fn luma(color: vec3f) -> f32 {
    return dot(color, vec3f(0.299, 0.587, 0.114));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - (vec3f(1.0) - base) * (vec3f(1.0) - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return overlayBlend(blend, base);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let delta = luma(blend) - luma(base);
    return clamp(base + vec3f(delta), vec3f(0.0), vec3f(1.0));
}

fn isInRect(uv: vec2f, left: f32, top: f32, right: f32, bottom: f32) -> f32 {
    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);
    return inX * inY;
}

fn isInStageArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let bottom = 0.4715;
    let inY = step(top, uv.y) * step(uv.y, bottom);

    let right = mix(0.915, 0.92, clamp((uv.y - top) / (bottom - top), 0.0, 1.0));
    var left = 0.08;
    if (uv.y < 0.12) {
        left = mix(0.57, 0.54, clamp((uv.y - 0.0985) / (0.12 - 0.0985), 0.0, 1.0));
    } else if (uv.y < 0.14) {
        left = mix(0.17, 0.16, clamp((uv.y - 0.12) / (0.14 - 0.12), 0.0, 1.0));
    } else if (uv.y < 0.16) {
        left = mix(0.16, 0.12, clamp((uv.y - 0.14) / (0.16 - 0.14), 0.0, 1.0));
    }

    return inY * step(left, uv.x) * step(uv.x, right);
}

fn isInArtworkArea(uv: vec2f) -> f32 {
    if (uniforms.clipMode > 1.5) {
        return isInRect(uv, 0.085, 0.145, 0.085, 0.482);
    }
    if (uniforms.clipMode > 0.5) {
        return isInStageArtworkArea(uv);
    }
    return isInRect(uv, 0.08, 0.0985, 0.08, 0.5285);
}

fn backgroundUv(uv: vec2f, scale: vec2f, position: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - scale) * position;
    return (uv - origin) / scale;
}

fn cssBackground() -> vec2f {
    return vec2f(
        0.37 + uniforms.pointer.x * 0.26,
        0.33 + uniforms.pointer.y * 0.34
    );
}

fn rainbowStops(t: f32) -> vec3f {
    let red = vec3f(0.973, 0.055, 0.208);
    let yellow = vec3f(0.933, 0.875, 0.063);
    let green = vec3f(0.129, 0.914, 0.522);
    let blue = vec3f(0.051, 0.741, 0.914);
    let violet = vec3f(0.788, 0.161, 0.945);
    let p = fract(t) * 5.0;
    if (p < 1.0) { return mix(violet, blue, p); }
    if (p < 2.0) { return mix(blue, green, p - 1.0); }
    if (p < 3.0) { return mix(green, yellow, p - 2.0); }
    if (p < 4.0) { return mix(yellow, red, p - 3.0); }
    return mix(red, violet, p - 4.0);
}

fn rainbowLayer(uv: vec2f) -> vec3f {
    let bg = cssBackground();
    let pos = vec2f(((0.5 - bg.x) * 2.6) + 0.5, ((0.5 - bg.y) * 3.5) + 0.5);
    let layerUv = backgroundUv(uv, vec2f(4.0, 4.0), pos);
    let angle = radians(110.0);
    let dir = vec2f(cos(angle), sin(angle));
    return rainbowStops(dot(layerUv, dir) * 1.9);
}

fn scanlineLayer(uv: vec2f, cardSize: vec2f) -> vec3f {
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let stripe = fract(uv.x * cardWidthPx / 4.0);
    let value = select(0.0, 0.4, stripe >= 0.5);
    return vec3f(value);
}

fn cssLinearGradientStop(t: f32, aPos: f32, aValue: f32, bPos: f32, bValue: f32) -> f32 {
    return mix(aValue, bValue, clamp((t - aPos) / (bPos - aPos), 0.0, 1.0));
}

fn barPattern(uv: vec2f, position: vec2f, repeatEnd: f32) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(2.0, 2.0), position);
    let bars = 0.03;
    let x = fract(layerUv.x / repeatEnd) * repeatEnd;
    let p0 = bars * 2.0;
    let p1 = bars * 3.0;
    let p2 = bars * 3.5;
    let p3 = bars * 4.0;
    let p4 = bars * 5.0;
    var value = 0.0;
    if (x < p0) {
        value = 0.0;
    } else if (x < p1) {
        value = cssLinearGradientStop(x, p0, 0.0, p1, 0.70);
    } else if (x < p2) {
        value = cssLinearGradientStop(x, p1, 0.70, p2, 0.0);
    } else if (x < p3) {
        value = cssLinearGradientStop(x, p2, 0.0, p3, 0.70);
    } else if (x < p4) {
        value = cssLinearGradientStop(x, p3, 0.70, p4, 0.0);
    }
    return vec3f(value);
}

fn movingBeamLineDetail(uv: vec2f, position: vec2f, repeatEnd: f32) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(2.0, 2.0), position);
    let beamPhase = fract(layerUv.x / repeatEnd);
    let fine = 1.0 - smoothstep(0.020, 0.045, fract(beamPhase * 18.0));
    let withinBeam = smoothstep(0.14, 0.22, beamPhase) * (1.0 - smoothstep(0.38, 0.52, beamPhase));
    return vec3f(fine * withinBeam * 0.22);
}

fn shineAfterLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    var gray: f32;
    if (t < 0.32) {
        gray = mix(0.94, 0.78, t / 0.32);
    } else {
        gray = mix(0.78, 0.0, clamp((t - 0.32) / 0.72, 0.0, 1.0));
    }
    return applyFilter(vec3f(gray), 0.78, 4.3, 1.0);
}

fn shineAfterAlpha(uv: vec2f) -> f32 {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    if (t < 0.32) {
        return mix(0.88, 0.16, t / 0.32);
    }
    return mix(0.16, 1.0, clamp((t - 0.32) / 0.72, 0.0, 1.0));
}

fn glareAfterLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let c1 = vec3f(0.90, 1.0, 1.0);
    let c2 = vec3f(0.39);
    let c3 = vec3f(0.0);
    var color: vec3f;
    if (t < 0.05) {
        color = c1;
    } else if (t < 0.55) {
        color = mix(c1, c2, (t - 0.05) / 0.50);
    } else {
        color = mix(c2, c3, clamp((t - 0.55) / 0.55, 0.0, 1.0));
    }
    return applyFilter(color, 0.48, 2.4, 1.0);
}

fn baseGlareLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(1.0), vec3f(0.0), smoothstep(0.20, 0.90, t));
    return applyFilter(color, 0.72, 1.38, 1.0);
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
    let holoMask = isInArtworkArea(cardUV) * foilMask * cardMask;

    var cardRgb = textureColor.rgb;
    let bg = cssBackground();

    let rainbow = rainbowLayer(cardUV);
    var shine = overlayBlend(rainbow, scanlineLayer(cardUV, cardSize));
    shine = applyFilter(shine, 1.1, 1.1, 0.35);

    let barPos1 = vec2f((((0.5 - bg.x) * 1.65) + 0.5) + (bg.y * 0.5), bg.x);
    let barPos2 = vec2f((((0.5 - bg.x) * -0.9) + 0.5) - (bg.y * 0.75), bg.y);
    let bars1 = barPattern(cardUV, barPos1, 0.42);
    let bars2 = barPattern(cardUV, barPos2, 0.30);
    var bars = screenBlend(bars1, bars2);
    bars = applyFilter(bars, 1.08, 1.18, 1.0);
    let movingLines = screenBlend(
        movingBeamLineDetail(cardUV, barPos1, 0.42),
        movingBeamLineDetail(cardUV, barPos2, 0.30)
    );

    var shineGroup = hardLightBlend(shine, bars);
    shineGroup = screenBlend(shineGroup, movingLines);

    let luminosity = shineAfterLayer(cardUV);
    let luminosityCoverage = shineAfterAlpha(cardUV);
    shineGroup = mix(shineGroup, luminosityBlend(shineGroup, luminosity), luminosityCoverage);
    let shineCoverage = smoothstep(0.05, 0.66, luma(shineGroup));
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineGroup), uniforms.opacity * holoMask * shineCoverage * 0.74);

    let glare = baseGlareLayer(cardUV);
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glare), uniforms.opacity * cardMask * 0.68);

    let glareAfter = glareAfterLayer(cardUV);
    let glareAfterCoverage = smoothstep(0.10, 0.78, luma(glareAfter));
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareAfter), uniforms.opacity * holoMask * glareAfterCoverage * 0.42);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
