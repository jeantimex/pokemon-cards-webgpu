struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    cardOpacity: f32,
    _pad: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var textureSampler: sampler;
@group(0) @binding(2) var textureData: texture_2d<f32>;

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

// --- Blend Modes ---

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

// --- Glare Effect ---

fn farthestCornerDistance(pointer: vec2f) -> f32 {
    // Calculate distance to farthest corner from pointer position
    // Corners are at (0,0), (1,0), (0,1), (1,1) in UV space
    let d0 = distance(pointer, vec2f(0.0, 0.0));
    let d1 = distance(pointer, vec2f(1.0, 0.0));
    let d2 = distance(pointer, vec2f(0.0, 1.0));
    let d3 = distance(pointer, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn glareEffect(uv: vec2f, pointer: vec2f, opacity: f32) -> vec4f {
    // Radial gradient from pointer position
    // CSS: farthest-corner circle at pointer
    let dist = distance(uv, pointer);
    let maxDist = farthestCornerDistance(pointer);
    let normalizedDist = dist / maxDist;

    // CSS gradient stops:
    // hsla(0, 0%, 100%, 0.8) 10%  -> white at 0.8 alpha at 10%
    // hsla(0, 0%, 100%, 0.65) 20% -> white at 0.65 alpha at 20%
    // hsla(0, 0%, 0%, 0.5) 90%    -> black at 0.5 alpha at 90%

    var color: vec3f;
    var alpha: f32;

    if (normalizedDist < 0.1) {
        // 0-10%: white at 0.8 alpha
        color = vec3f(1.0);
        alpha = 0.8;
    } else if (normalizedDist < 0.2) {
        // 10-20%: interpolate from white 0.8 to white 0.65
        let t = (normalizedDist - 0.1) / 0.1;
        color = vec3f(1.0);
        alpha = mix(0.8, 0.65, t);
    } else if (normalizedDist < 0.9) {
        // 20-90%: interpolate from white 0.65 to black 0.5
        let t = (normalizedDist - 0.2) / 0.7;
        color = mix(vec3f(1.0), vec3f(0.0), t);
        alpha = mix(0.65, 0.5, t);
    } else {
        // 90-100%: black at 0.5 alpha
        color = vec3f(0.0);
        alpha = 0.5;
    }

    return vec4f(color, alpha * opacity);
}

// --- SDF Utilities ---

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

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    // Distance to card edge
    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    // Sample card texture
    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );
    let textureColor = textureSample(textureData, textureSampler, cardUV);

    // Apply glare effect with cardOpacity from uniforms
    let glare = glareEffect(cardUV, uniforms.pointer, uniforms.cardOpacity);

    // Blend glare with texture using overlay blend mode
    var cardWithGlare = textureColor.rgb;
    if (glare.a > 0.0) {
        let blended = overlayBlend(textureColor.rgb, glare.rgb);
        cardWithGlare = mix(textureColor.rgb, blended, glare.a);
    }

    // Antialiased clipping for card edges
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let finalCard = vec4f(cardWithGlare, textureColor.a * cardMask);

    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }

    return finalColor;
}
