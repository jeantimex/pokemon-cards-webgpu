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
@group(0) @binding(6) var illusionTexture: texture_2d<f32>;
@group(0) @binding(7) var grainTexture: texture_2d<f32>;

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

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
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

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - min((1.0 - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
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

fn angledSunpillar(layerUv: vec2f, angleDeg: f32, afterLayer: bool) -> vec3f {
    let angle = radians(angleDeg);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = fract(dot(layerUv, dir) / 0.35) * 7.0;
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

fn diagonalStripePhaseWithRepeat(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / repeatSize);
}

fn pokemonVDiagonalBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.12);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.12, distToPeak);
    let halo = 1.0 - smoothstep(0.06, 0.34, distToPeak);
    return clamp(core * 0.65 + halo * 0.5, 0.0, 1.0);
}

fn pokemonVDiagonalBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.12);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.08, 0.43, distToPeak);
    let edge = smoothstep(0.035, 0.18, distToPeak);
    return broad * edge;
}

fn pokemonVBackBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.033, distToPeak);
    let halo = 1.0 - smoothstep(0.02, 0.075, distToPeak);
    return clamp(core * 1.2 + halo * 0.16, 0.0, 1.0);
}

fn pokemonVBackBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.03, 0.18, distToPeak);
    let edge = smoothstep(0.015, 0.075, distToPeak);
    return broad * edge;
}

fn pokemonVCompositeBackgroundLayer(bottom: vec4f, top: vec4f, blendMode: i32) -> vec4f {
    var blended: vec3f;
    if (blendMode == 0) {
        blended = screenBlend(bottom.rgb, top.rgb);
    } else if (blendMode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    }
    let rgb = mix(bottom.rgb, blended, top.a);
    let alpha = top.a + bottom.a * (1.0 - top.a);
    return vec4f(rgb, alpha);
}

fn pokemonVBaseRadialGradient(uv: vec2f) -> vec4f {
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

fn samplePokemonVGrain(uv: vec2f) -> vec4f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    return textureSampleLevel(grainTexture, linearSampler, fract(grainUv), 0.0);
}

fn samplePokemonVFineGrain(uv: vec2f) -> vec4f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    return textureSampleLevel(
        grainTexture,
        linearSampler,
        fract(grainUv * vec2f(1.85, 1.35) + vec2f(0.17, 0.39)),
        0.0
    );
}

fn pokemonVBeamOverlap(uv: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let frontUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), bg);
    let backUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), -bg);
    let frontBeam = pokemonVDiagonalBeamMask(frontUv);
    let backBeam = pokemonVBackBeamMask(backUv);
    let overlap = pow(clamp(frontBeam * backBeam, 0.0, 1.0), 0.72);

    let grain = samplePokemonVGrain(uv);
    let fineGrain = samplePokemonVFineGrain(uv);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particle = 0.34 + smoothstep(0.08, 0.3, grainLuma) * 0.9 +
        smoothstep(0.12, 0.34, fineGrainLuma) * 1.55;

    let sunColor = verticalSunpillar(backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y)), false);
    let mergeTint = mix(sunColor * 1.35, vec3f(1.0, 0.94, 0.7), overlap * 0.45);
    return mergeTint * overlap * particle * 1.25;
}

fn pokemonVShineLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let diagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    let grain = samplePokemonVGrain(uv);
    let fineGrain = samplePokemonVFineGrain(uv);
    let sunUv = backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y));
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, diagonalPos);
    let frontRotationDiagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), diagonalPos);
    let boostedBeamUv = select(diagonalUv, frontRotationDiagonalUv, afterLayer);
    let sunColor = verticalSunpillar(sunUv, false);
    let sun = vec4f(sunColor, 1.0);
    let diagonal = vec4f(diagonalStripeColor(diagonalUv), 1.0);
    let radial = pokemonVBaseRadialGradient(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));

    var layer = radial;
    layer = pokemonVCompositeBackgroundLayer(layer, diagonal, 2);
    layer = pokemonVCompositeBackgroundLayer(layer, sun, 1);
    layer = pokemonVCompositeBackgroundLayer(layer, grain, 0);

    var filtered = select(
        applyFilter(layer.rgb, 0.8, 2.95, 0.65),
        applyFilter(layer.rgb, 1.0, 2.5, 1.75),
        afterLayer
    );
    let beam = select(pokemonVDiagonalBeamMask(boostedBeamUv), pokemonVBackBeamMask(boostedBeamUv), afterLayer);
    let beamHalo = select(pokemonVDiagonalBeamHalo(boostedBeamUv), pokemonVBackBeamHalo(boostedBeamUv), afterLayer);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particleGrain = smoothstep(0.06, 0.26, grainLuma);
    let particleGrainFine = smoothstep(0.05, 0.21, fineGrainLuma);
    let particleFlecks = smoothstep(0.12, 0.36, max(grainLuma, fineGrainLuma));
    let edgeFlecks = pow(smoothstep(0.1, 0.34, fineGrainLuma), 1.65);
    let frontParticleMask = 0.32 + particleGrain * 1.12 + particleFlecks * 2.85;
    let backParticleMask = 0.07 + particleGrain * 0.92 + particleGrainFine * 1.18 + particleFlecks * 3.55;
    let particleMask = select(frontParticleMask, backParticleMask, afterLayer);
    let beamStrength = select(1.38, 1.45, afterLayer);
    let frontTint = mix(sunColor * 1.35, vec3f(1.0, 0.95, 0.76), particleFlecks * 0.38);
    let backTint = mix(sunColor * 1.15, vec3f(0.65, 0.86, 1.0), 0.32 + particleFlecks * 0.22);
    let beamTint = select(frontTint, backTint, afterLayer);
    filtered = screenBlend(filtered, beamTint * beam * particleMask * beamStrength);
    let fleckStrength = select(1.52, 1.175, afterLayer);
    let frontFleckTint = mix(sunColor * 1.45, vec3f(1.0, 0.86, 0.45), edgeFlecks * 0.55);
    let backFleckTint = mix(sunColor * 1.2, vec3f(0.7, 0.9, 1.0), 0.4);
    let fleckTint = select(frontFleckTint, backFleckTint, afterLayer);
    let backFleckDensity = particleGrainFine * 1.12 + edgeFlecks * 1.25;
    let fleckBeam = select(beamHalo + beam * 0.35, beam * (0.28 + edgeFlecks * 0.78 + backFleckDensity), afterLayer);
    filtered = screenBlend(filtered, fleckTint * fleckBeam * edgeFlecks * fleckStrength);
    return vec4f(filtered, layer.a);
}

fn pokemonVGlareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let grayish = vec4f(0.533, 0.541, 0.549, 0.33);
    let dark = vec4f(0.2, 0.2, 0.2, 0.9);
    if (t < 0.45) {
        return mix(white, grayish, linearStep(0.0, 0.45, t));
    }
    return mix(grayish, dark, linearStep(0.45, 1.30, t));
}

fn shinyRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let a1 = 0.1;
    let a2 = 0.15;
    let a3 = 0.25;
    var alpha: f32;
    if (t < 0.12) {
        alpha = a1;
    } else if (t < 0.20) {
        alpha = mix(a1, a2, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(a2, a3, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

fn whiteOverlayRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    return vec4f(1.0, 1.0, 1.0, 1.0 - linearStep(0.0, 0.40, t));
}

fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 3) {
        blended = overlayBlend(bottom.rgb, top.rgb);
    } else {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    }
    let rgb = mix(bottom.rgb, blended, top.a);
    let alpha = top.a + bottom.a * (1.0 - top.a);
    return vec4f(rgb, alpha);
}

fn sampleFoilOrIllusion(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(illusionTexture, linearSampler, fract(uv / 0.33), 0.0);
}

fn shinyRareLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let diagonalPos = vec2f(bg.x + bg.y * 0.2, bg.y);
    let afterDiagonalPos = -diagonalPos;
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);
    let layerDiagonalPos = select(diagonalPos, afterDiagonalPos, afterLayer);

    var layer = shinyRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrIllusion(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 4, noMask));

    var filtered: vec3f;
    if (noMask) {
        if (uniforms.shinyKind > 0.5 && afterLayer) {
            filtered = applyFilter(layer.rgb, pointerFromCenter() * 0.5 + 0.8, 1.6, 1.4);
        } else {
            filtered = select(
                applyFilter(layer.rgb, pointerFromCenter() * 0.3 + 0.35, 2.0, 1.5),
                applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.5, 1.4, 1.2),
                afterLayer
            );
        }
    } else if (uniforms.shinyKind < 0.5) {
        filtered = select(
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.4, 1.4, 2.25),
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.8, 1.5, 1.25),
            afterLayer
        );
    } else {
        filtered = select(
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.4, 1.4, 2.25),
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.8, 1.5, 1.25),
            afterLayer
        );
    }

    return vec4f(filtered, layer.a);
}

fn rainbowVmaxColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.581, 0.159, 0.159); }
        case 1: { return vec3f(0.597, 0.424, 0.183); }
        case 2: { return vec3f(0.35, 0.56, 0.14); }
        case 3: { return vec3f(0.14, 0.56, 0.56); }
        case 4: { return vec3f(0.14, 0.56, 0.56); }
        case 5: { return vec3f(0.218, 0.35, 0.612); }
        default: { return vec3f(0.345, 0.14, 0.48); }
    }
}

fn vmaxRainbowGradient(layerUv: vec2f) -> vec3f {
    let angle = radians(-30.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir)) * 21.0;
    let idx = i32(floor(t));
    return mix(rainbowVmaxColor(idx), rainbowVmaxColor(idx + 1), fract(t));
}

fn vmaxMainRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.098, 0.096, 0.105, 1.0);
    let pale = vec4f(0.795, 0.8, 0.805, 0.1);
    let white = vec4f(0.95, 0.95, 0.95, 0.98);
    if (t < 0.10) { return dark; }
    if (t < 0.50) { return mix(dark, pale, linearStep(0.10, 0.50, t)); }
    return mix(pale, white, linearStep(0.50, 0.90, t));
}

fn vmaxBeforeRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.91, 0.909, 0.915, 0.95);
    let gray = vec4f(0.676, 0.681, 0.684, 0.5);
    let black = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.10) { return light; }
    if (t < 0.50) { return mix(light, gray, linearStep(0.10, 0.50, t)); }
    return mix(gray, black, linearStep(0.50, 1.20, t));
}

fn vmaxMainLayer(uv: vec2f) -> vec4f {
    let bg = cssBackgroundPosition() * 1.5;
    let glitterA = textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.4, 0.45)) / 0.28), 0.0);
    let glitterB = textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.55, 0.55)) / 0.28), 0.0);
    let rawRainbow = vmaxRainbowGradient(backgroundSampleUv(uv, vec2f(4.0, 4.0), bg));
    let rainbowLuma = dot(rawRainbow, vec3f(0.2126, 0.7152, 0.0722));
    let rainbow = vec4f(mix(vec3f(rainbowLuma), rawRainbow, 0.42), 1.0);
    var layer = vmaxMainRadial(uv);
    layer = compositeBackgroundLayer(layer, rainbow, 4);
    layer = compositeBackgroundLayer(layer, glitterB, 3);
    layer = compositeBackgroundLayer(layer, glitterA, 0);
    return vec4f(applyFilter(layer.rgb, 0.86, 1.0, 0.55), layer.a * 0.68);
}

fn vmaxBeforeLayer(uv: vec2f) -> vec4f {
    let foil = textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    var layer = vmaxBeforeRadial(uv);
    layer = compositeBackgroundLayer(layer, foil, 4);
    return vec4f(applyFilter(layer.rgb, 1.0, 1.0, 0.4), layer.a * 0.35);
}

fn vmaxAfterLayer(uv: vec2f) -> vec4f {
    let bg = cssBackgroundPosition();
    let pos = vec2f(0.5 + (0.5 - bg.x) * 3.0, 0.5 + (0.5 - bg.y) * 3.0);
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 8.0), pos);
    let color = angledSunpillar(layerUv, -30.0, true);
    let filtered = applyFilter(color, 0.75 - pointerFromCenter() * 0.5, 1.0, 0.65);
    return vec4f(filtered, 0.26);
}

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
    return select(0.0, 1.0, uv.x >= 0.085 && uv.x <= 0.915 && uv.y >= 0.145 && uv.y <= 0.482);
}

fn shinyRareGlare(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let dark = vec4f(0.157, 0.143, 0.153, 1.0);
    return mix(white, dark, linearStep(0.0, 1.50, t));
}

fn shinyVGlare(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.9, 0.9, 0.9, 1.0);
    let mid = vec4f(0.428, 0.451, 0.458, 1.0);
    let dark = vec4f(0.14, 0.06, 0.113, 1.0);
    if (t < 0.05) { return light; }
    if (t < 0.80) { return mix(light, mid, linearStep(0.05, 0.80, t)); }
    return mix(mid, dark, linearStep(0.80, 1.50, t));
}

fn vmaxGlare(uv: vec2f, strong: bool) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = select(vec4f(0.898, 0.897, 0.903, 0.45), vec4f(0.898, 0.897, 0.903, 0.75), strong);
    let mid = select(vec4f(0.285, 0.302, 0.315, 0.45), vec4f(0.285, 0.302, 0.315, 0.65), strong);
    let dark = select(vec4f(0.0, 0.0, 0.0, 0.33), vec4f(0.0, 0.0, 0.0, 0.75), strong);
    if (t < 0.45) { return mix(light, mid, linearStep(0.0, 0.45, t)); }
    return mix(mid, dark, linearStep(0.45, select(1.20, 1.00, strong), t));
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

    var cardRgb = textureColor.rgb;
    let isVmax = uniforms.shinyKind > 1.5;

    if (isVmax) {
        let shine = vmaxMainLayer(cardUV);
        cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine.rgb), shine.a * foilMask * uniforms.opacity * cardMask);

        let before = vmaxBeforeLayer(cardUV);
        cardRgb = mix(cardRgb, lightenBlend(cardRgb, before.rgb), before.a * uniforms.opacity * cardMask);

        let after = vmaxAfterLayer(cardUV);
        cardRgb = mix(cardRgb, hueBlend(cardRgb, after.rgb), after.a * foilMask * uniforms.opacity * cardMask);

        let glare = vmaxGlare(cardUV, false);
        let glareFiltered = applyFilter(glare.rgb, 1.09, 1.3, 1.0);
        cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareFiltered), glare.a * uniforms.opacity * cardMask);

        let glareAfter = vmaxGlare(cardUV, true);
        let glareAfterFiltered = applyFilter(glareAfter.rgb, 1.1, 1.3, 1.0);
        cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareAfterFiltered), glareAfter.a * 1.08 * foilMask * uniforms.opacity * cardMask);
    } else {
        let shineMask = foilMask * clipMask * cardMask;

        let shine = pokemonVShineLayer(cardUV, false);
        cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine.rgb), shine.a * shineMask * uniforms.opacity);

        let afterShine = pokemonVShineLayer(cardUV, true);
        cardRgb = mix(
            cardRgb,
            softLightBlend(cardRgb, afterShine.rgb),
            afterShine.a * shineMask * uniforms.opacity
        );

        cardRgb = screenBlend(cardRgb, pokemonVBeamOverlap(cardUV) * shineMask * uniforms.opacity);

        let glare = pokemonVGlareGradient(cardUV);
        let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
        cardRgb = mix(
            cardRgb,
            hardLightBlend(cardRgb, glareFiltered),
            glare.a * uniforms.opacity * 0.5 * shineMask
        );
    }

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
