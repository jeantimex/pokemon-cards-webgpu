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

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
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

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn inClipBorders(uv: vec2f) -> f32 {
    let inX = step(0.04, uv.x) * step(uv.x, 0.96);
    let inY = step(0.028, uv.y) * step(uv.y, 0.972);
    return inX * inY;
}

fn backgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn trainerGalleryRainbow(uv: vec2f) -> vec3f {
    let bg = backgroundPosition();
    let layerUv = vec2f(
        uv.x / 3.0,
        (uv.y - 0.5) / 4.0 + bg.y
    );
    let angle = radians(68.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir) / 0.35);

    let c1 = vec3f(1.000, 0.560, 0.165);
    let c2 = vec3f(0.635, 0.310, 0.900);
    let c3 = vec3f(0.360, 0.880, 0.300);
    let c4 = vec3f(0.980, 0.900, 0.240);
    let c5 = vec3f(1.000, 0.560, 0.165);

    if (t < 0.25) { return mix(c1, c2, t / 0.25); }
    if (t < 0.50) { return mix(c2, c3, (t - 0.25) / 0.25); }
    if (t < 0.75) { return mix(c3, c4, (t - 0.50) / 0.25); }
    return mix(c4, c5, (t - 0.75) / 0.25);
}

fn radialAfterLayer(uv: vec2f) -> vec3f {
    let center = uniforms.pointer * 0.5 + vec2f(0.25);
    let toFarX = max(center.x, 1.0 - center.x);
    let toFarY = max(center.y, 1.0 - center.y);
    let dist = length((uv - center) / vec2f(toFarX, toFarY));

    let white = vec3f(1.0);
    let purple = vec3f(0.18, 0.04, 0.18);
    let gray = vec3f(0.28);

    if (dist < 0.05) {
        return white;
    }
    if (dist < 0.40) {
        return mix(white, purple, (dist - 0.05) / 0.35);
    }
    return mix(purple, gray, clamp((dist - 0.40) / 0.80, 0.0, 1.0));
}

fn glareLayer(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);

    var color: vec3f;
    var alpha: f32;
    if (t < 0.10) {
        color = vec3f(1.0);
        alpha = 1.0;
    } else if (t < 0.35) {
        color = vec3f(1.0);
        alpha = mix(1.0, 0.6, (t - 0.10) / 0.25);
    } else {
        color = mix(vec3f(1.0), vec3f(0.312, 0.388, 0.388), clamp((t - 0.35) / 0.25, 0.0, 1.0));
        alpha = mix(0.55, 0.2, clamp((t - 0.35) / 0.65, 0.0, 1.0));
    }

    return vec4f(color, alpha);
}

fn pointerFalloff(uv: vec2f) -> f32 {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = max(farthestCornerDist(uniforms.pointer), 0.001);
    let t = clamp(dist / maxDist, 0.0, 1.0);
    return 1.0 - smoothstep(0.20, 0.82, t);
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
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let shineMask = maskColor.a * inClipBorders(cardUV) * cardMask;
    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);

    var cardRgb = textureColor.rgb;

    var shine = trainerGalleryRainbow(cardUV);
    shine = applyFilter(shine, pointerFromCenter * 0.35 + 0.58, 2.15, 1.05);
    let shineBlended = colorDodgeBlend(cardRgb, shine);
    let shineFalloff = pointerFalloff(cardUV);
    cardRgb = mix(cardRgb, shineBlended, uniforms.opacity * 0.95 * shineMask * shineFalloff);

    var afterLayer = radialAfterLayer(cardUV);
    afterLayer = mix(afterLayer, foilColor, 0.08);
    afterLayer = applyFilter(afterLayer, pointerFromCenter * 0.2 + 0.48, 0.75, 1.05);
    let afterBlended = hardLightBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterBlended, uniforms.opacity * 0.24 * shineMask);

    let glare = glareLayer(cardUV);
    let glareBlended = softLightBlend(cardRgb, glare.rgb);
    cardRgb = mix(cardRgb, glareBlended, uniforms.opacity * glare.a * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
