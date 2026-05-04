struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    opacity: f32,
    effectMode: f32,
    clipMode: f32,
    pointerFromCenter: f32,
    cosmosOffset: vec2f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var maskTexture: texture_2d<f32>;
@group(0) @binding(4) var cosmosBottomTexture: texture_2d<f32>;
@group(0) @binding(5) var cosmosMiddleTexture: texture_2d<f32>;
@group(0) @binding(6) var cosmosTopTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(
        p.x,
        p.y * c - p.z * s,
        p.y * s + p.z * c
    );
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(
        p.x * c + p.z * s,
        p.y,
        -p.x * s + p.z * c
    );
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;

    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);

    let perspective = 2.0;
    let w = perspective - p.z;
    let x = (p.x / canvasAspect) * perspective;
    let y = p.y * perspective;

    output.position = vec4f(x, y, 0.0, w);
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

fn srgbToLinear(c: vec3f) -> vec3f {
    return pow(max(c, vec3f(0.0)), vec3f(2.2));
}

fn linearToSrgb(c: vec3f) -> vec3f {
    return pow(max(c, vec3f(0.0)), vec3f(1.0 / 2.2));
}

fn rgbToHsv(c: vec3f) -> vec3f {
    let k = vec4f(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    let p = mix(vec4f(c.bg, k.wz), vec4f(c.gb, k.xy), step(c.b, c.g));
    let q = mix(vec4f(p.xyw, c.r), vec4f(c.r, p.yzx), step(p.x, c.r));
    let d = q.x - min(q.w, q.y);
    let e = 1.0e-10;
    return vec3f(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

fn hsvToRgb(c: vec3f) -> vec3f {
    let k = vec4f(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    let p = abs(fract(c.xxx + k.xyz) * 6.0 - k.www);
    return c.z * mix(k.xxx, clamp(p - k.xxx, vec3f(0.0), vec3f(1.0)), c.y);
}

fn adjustColor(color: vec3f, brightness: f32, contrast: f32, saturation: f32) -> vec3f {
    var c = color * brightness;
    c = (c - vec3f(0.5)) * contrast + vec3f(0.5);
    let luma = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(luma), c, saturation);
    return max(c, vec3f(0.0));
}

fn coolCosmosColor(color: vec3f, colorMix: f32) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let coolBase = vec3f(luma) * vec3f(0.72, 0.92, 1.08);
    return clamp(mix(coolBase, color, colorMix), vec3f(0.0), vec3f(1.0));
}

fn blendMultiply(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn blendLighten(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn blendOverlay(base: vec3f, blend: vec3f) -> vec3f {
    let low = 2.0 * base * blend;
    let high = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
    return mix(low, high, step(vec3f(0.5), base));
}

fn blendSoftLight(base: vec3f, blend: vec3f) -> vec3f {
    return (1.0 - 2.0 * blend) * base * base + 2.0 * blend * base;
}

fn blendScreen(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - (vec3f(1.0) - base) * (vec3f(1.0) - blend);
}

fn blendLinearDodge(base: vec3f, blend: vec3f) -> vec3f {
    return min(base + blend, vec3f(1.0));
}

fn blendColorDodge(base: vec3f, blend: vec3f) -> vec3f {
    return select(
        min(base / max(vec3f(1.0) - blend, vec3f(0.001)), vec3f(1.0)),
        vec3f(1.0),
        blend >= vec3f(0.999)
    );
}

fn blendColorBurn(base: vec3f, blend: vec3f) -> vec3f {
    return select(
        vec3f(1.0) - min((vec3f(1.0) - base) / max(blend, vec3f(0.001)), vec3f(1.0)),
        vec3f(0.0),
        blend <= vec3f(0.001)
    );
}

fn compositeBlend(backdrop: vec3f, source: vec4f, mode: u32) -> vec3f {
    var blended = source.rgb;
    if (mode == 1u) {
        blended = blendColorDodge(backdrop, source.rgb);
    } else if (mode == 2u) {
        blended = blendOverlay(backdrop, source.rgb);
    } else if (mode == 3u) {
        blended = blendMultiply(backdrop, source.rgb);
    } else if (mode == 4u) {
        blended = blendSoftLight(backdrop, source.rgb);
    } else if (mode == 5u) {
        blended = blendScreen(backdrop, source.rgb);
    } else if (mode == 6u) {
        blended = blendLinearDodge(backdrop, source.rgb);
    }
    return mix(backdrop, blended, clamp(source.a, 0.0, 1.0));
}

fn hslToRgb(h: f32, s: f32, l: f32) -> vec3f {
    let c = (1.0 - abs(2.0 * l - 1.0)) * s;
    let hp = h * 6.0;
    let x = c * (1.0 - abs(fract(hp / 2.0) * 2.0 - 1.0));
    var rgb = vec3f(0.0);
    if (hp < 1.0) {
        rgb = vec3f(c, x, 0.0);
    } else if (hp < 2.0) {
        rgb = vec3f(x, c, 0.0);
    } else if (hp < 3.0) {
        rgb = vec3f(0.0, c, x);
    } else if (hp < 4.0) {
        rgb = vec3f(0.0, x, c);
    } else if (hp < 5.0) {
        rgb = vec3f(x, 0.0, c);
    } else {
        rgb = vec3f(c, 0.0, x);
    }
    let m = l - c * 0.5;
    return rgb + vec3f(m);
}

fn cosmosStripe(position: vec2f, basePercent: vec2f) -> vec3f {
    let angle = radians(82.0);
    let p = (position * vec2f(4.0, 9.0)) + basePercent;
    let t = fract((p.x * cos(angle) + p.y * sin(angle)) / 0.48);
    let stops = array<vec3f, 12>(
        hslToRgb(53.0 / 360.0, 0.65, 0.60),
        hslToRgb(93.0 / 360.0, 0.56, 0.50),
        hslToRgb(176.0 / 360.0, 0.54, 0.49),
        hslToRgb(228.0 / 360.0, 0.59, 0.55),
        hslToRgb(283.0 / 360.0, 0.60, 0.55),
        hslToRgb(326.0 / 360.0, 0.59, 0.51),
        hslToRgb(326.0 / 360.0, 0.59, 0.51),
        hslToRgb(283.0 / 360.0, 0.60, 0.55),
        hslToRgb(228.0 / 360.0, 0.59, 0.55),
        hslToRgb(176.0 / 360.0, 0.54, 0.49),
        hslToRgb(93.0 / 360.0, 0.56, 0.50),
        hslToRgb(53.0 / 360.0, 0.65, 0.60)
    );
    let scaled = t * 12.0;
    let index = u32(clamp(floor(scaled), 0.0, 11.0));
    let nextIndex = min(index + 1u, 11u);
    let stripe = mix(stops[index], stops[nextIndex], smoothstep(0.0, 1.0, fract(scaled)));
    return mix(vec3f(0.74, 0.82, 0.90), stripe, 0.32);
}

fn radialColor(uv: vec2f, pointer: vec2f, inner: vec3f, mid: vec3f, outer: vec3f, midStop: f32, outerStop: f32) -> vec3f {
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - pointer) * vec2f(1.0, cardRatio));
    return mix(mix(inner, mid, smoothstep(0.05, midStop, d)), outer, smoothstep(midStop, outerStop, d));
}

fn rectMask(uv: vec2f, left: f32, top: f32, right: f32, bottom: f32) -> f32 {
    let feather = 0.0025;
    let inside =
        smoothstep(left - feather, left + feather, uv.x) *
        (1.0 - smoothstep(right - feather, right + feather, uv.x)) *
        smoothstep(top - feather, top + feather, uv.y) *
        (1.0 - smoothstep(bottom - feather, bottom + feather, uv.y));
    return inside;
}

fn pointInPolygon(p: vec2f, p0: vec2f, p1: vec2f, p2: vec2f, p3: vec2f, p4: vec2f, p5: vec2f, p6: vec2f, p7: vec2f, p8: vec2f) -> f32 {
    var inside = false;
    var previous = p8;
    let points = array<vec2f, 9>(p0, p1, p2, p3, p4, p5, p6, p7, p8);
    for (var i = 0u; i < 9u; i = i + 1u) {
        let current = points[i];
        let crosses = ((current.y > p.y) != (previous.y > p.y)) &&
            (p.x < (previous.x - current.x) * (p.y - current.y) / max(previous.y - current.y, 0.00001) + current.x);
        if (crosses) {
            inside = !inside;
        }
        previous = current;
    }
    return select(0.0, 1.0, inside);
}

fn artClipMask(uv: vec2f) -> f32 {
    if (uniforms.clipMode > 1.5) {
        return rectMask(uv, 0.085, 0.145, 0.915, 0.518);
    }

    if (uniforms.clipMode > 0.5) {
        return pointInPolygon(
            uv,
            vec2f(0.915, 0.0985),
            vec2f(0.570, 0.0985),
            vec2f(0.540, 0.1200),
            vec2f(0.170, 0.1200),
            vec2f(0.160, 0.1400),
            vec2f(0.120, 0.1600),
            vec2f(0.080, 0.1600),
            vec2f(0.080, 0.4715),
            vec2f(0.920, 0.4715)
        );
    }

    return rectMask(uv, 0.080, 0.0985, 0.920, 0.4715);
}

fn cosmosUv(uv: vec2f) -> vec2f {
    let textureSize = vec2f(734.0, 1024.0);
    let offset = uniforms.cosmosOffset / textureSize;
    return fract(uv + offset);
}

fn maskAlpha(uv: vec2f) -> f32 {
    let maskSample = textureSampleLevel(maskTexture, linearSampler, uv, 0.0);
    return clamp(max(max(maskSample.r, maskSample.g), max(maskSample.b, maskSample.a)), 0.0, 1.0);
}

fn shineLayer0(uv: vec2f, foilAlpha: f32) -> vec4f {
    let tex = textureSampleLevel(cosmosBottomTexture, linearSampler, cosmosUv(uv), 0.0);
    let stripe = cosmosStripe(uv, vec2f(0.10 + uniforms.pointer.x * 0.80, 0.10 + uniforms.pointer.y * 0.80));
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let radialMask = 1.0 - smoothstep(0.05, 1.30, d);
    var color = blendColorBurn(tex.rgb, stripe);
    color = color * radialMask;
    color = adjustColor(color, 1.0, 1.0, 0.80);
    return vec4f(color, uniforms.opacity * foilAlpha * tex.a * radialMask * 0.38);
}

fn shineLayer1(uv: vec2f, foilAlpha: f32) -> vec4f {
    let tex = textureSampleLevel(cosmosMiddleTexture, linearSampler, cosmosUv(uv), 0.0);
    let stripe = cosmosStripe(uv, vec2f(0.15 + uniforms.pointer.x * 0.70, 0.15 + uniforms.pointer.y * 0.70));
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let pointerFlash = 0.18 + (1.0 - smoothstep(0.08, 0.58, d)) * 0.82;
    var color = blendLighten(tex.rgb, mix(vec3f(0.88, 0.96, 1.0), stripe, 0.35));
    color = adjustColor(color, 1.25, 1.75, 0.80);
    return vec4f(color, uniforms.opacity * foilAlpha * tex.a * pointerFlash * 0.24);
}

fn shineLayer2(uv: vec2f, foilAlpha: f32) -> vec4f {
    let tex = textureSampleLevel(cosmosTopTexture, linearSampler, cosmosUv(uv), 0.0);
    let stripe = cosmosStripe(uv, vec2f(0.20 + uniforms.pointer.x * 0.60, 0.20 + uniforms.pointer.y * 0.60));
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let pointerFlash = 0.12 + (1.0 - smoothstep(0.06, 0.50, d)) * 0.88;
    var color = blendMultiply(tex.rgb, mix(vec3f(0.86, 0.94, 1.0), stripe, 0.30));
    color = adjustColor(color, 1.25, 1.75, 0.80);
    return vec4f(color, uniforms.opacity * foilAlpha * tex.a * pointerFlash * 0.18);
}

fn glareLayer(uv: vec2f) -> vec4f {
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let glow = 1.0 - smoothstep(0.0, 0.80, d);
    let color = vec3f(0.80, 0.95, 1.0) * glow;
    let alpha = glow * uniforms.opacity * (0.20 + uniforms.pointerFromCenter * 0.65);
    return vec4f(color, alpha);
}

fn clippedGlareLayer(uv: vec2f, clipAlpha: f32) -> vec4f {
    let cardRatio = 1024.0 / 734.0;
    let d = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let glow = 1.0 - smoothstep(0.0, 0.55, d);
    let color = vec3f(1.0, 0.95, 1.0) * glow;
    let alpha = clipAlpha * glow * (1.0 - uniforms.pointer.y * 0.5) * 0.35;
    return vec4f(color, alpha);
}

fn reflectedFoilLayer(uv: vec2f, foilAlpha: f32) -> vec4f {
    let layerUv = cosmosUv(uv);
    let bottom = textureSampleLevel(cosmosBottomTexture, linearSampler, layerUv, 0.0);
    let middle = textureSampleLevel(cosmosMiddleTexture, linearSampler, layerUv, 0.0);
    let top = textureSampleLevel(cosmosTopTexture, linearSampler, layerUv, 0.0);

    let bottomLuma = dot(bottom.rgb, vec3f(0.2126, 0.7152, 0.0722));
    let middleLuma = dot(middle.rgb, vec3f(0.2126, 0.7152, 0.0722));
    let topLuma = dot(top.rgb, vec3f(0.2126, 0.7152, 0.0722));
    let fleck = max(
        smoothstep(0.55, 0.92, bottomLuma) * bottom.a,
        max(
            smoothstep(0.50, 0.88, middleLuma) * middle.a,
            smoothstep(0.45, 0.85, topLuma) * top.a
        )
    );

    let cardRatio = 1024.0 / 734.0;
    let pointerDistance = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let pointerFlash = 0.3 + (1.0 - smoothstep(0.05, 0.50, pointerDistance)) * 0.7;
    let glintColor = vec3f(0.95, 0.98, 1.0);
    let alpha = foilAlpha * clamp(fleck * pointerFlash * uniforms.opacity * 0.6, 0.0, 0.5);
    return vec4f(glintColor, alpha);
}

fn holoSheetLayer(uv: vec2f, foilAlpha: f32) -> vec4f {
    let cardRatio = 1024.0 / 734.0;
    let pointerDistance = length((uv - uniforms.pointer) * vec2f(1.0, cardRatio));
    let pointerGlow = 1.0 - smoothstep(0.05, 0.60, pointerDistance);
    let diagonal = 0.5 + 0.5 * sin((uv.x * 2.4 + uv.y * 3.6 + uniforms.pointer.x * 1.2 - uniforms.pointer.y * 0.8) * 3.14159);
    let sheet = 0.15 + pointerGlow * 0.35 + diagonal * 0.10;
    let tint = vec3f(0.85, 0.92, 1.0);
    return vec4f(tint * sheet, foilAlpha * uniforms.opacity * 0.25);
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
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    var cardRgb = textureColor.rgb;

    if (uniforms.effectMode > 0.5 && cardMask > 0.0) {
        let clipAlpha = artClipMask(cardUV);
        let foilAlpha = clipAlpha * maskAlpha(cardUV);
        cardRgb = compositeBlend(cardRgb, shineLayer0(cardUV, foilAlpha), 1u);
        cardRgb = compositeBlend(cardRgb, holoSheetLayer(cardUV, foilAlpha), 1u);
        cardRgb = compositeBlend(cardRgb, shineLayer1(cardUV, foilAlpha), 2u);
        cardRgb = compositeBlend(cardRgb, shineLayer2(cardUV, foilAlpha), 3u);
        cardRgb = compositeBlend(cardRgb, reflectedFoilLayer(cardUV, foilAlpha), 6u);
        cardRgb = compositeBlend(cardRgb, glareLayer(cardUV), 2u);
        cardRgb = compositeBlend(cardRgb, clippedGlareLayer(cardUV, clipAlpha * 0.75), 4u);
        cardRgb = clamp(cardRgb, vec3f(0.0), vec3f(1.0));
    }

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) {
        discard;
    }

    return finalColor;
}
