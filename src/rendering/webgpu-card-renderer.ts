import type { CardPointer } from '../ui/css-card-controller';
import { getLocalFoilImageUrl } from '../effects/asset-paths';
import type { EffectVariant } from '../effects/category-types';
import type { Card } from '../types';
import type { CardEffect } from './card-effect';
import { getEffect } from './effect-registry';

interface WebGpuCardRendererOptions {
  canvas: HTMLCanvasElement;
  webgpuPane: HTMLElement;
}

export interface WebGpuCardRenderer {
  updateTexture(
    url: string,
    categoryName: string,
    card: Card,
    variant: EffectVariant,
  ): Promise<void>;
  setPointer(pointer: CardPointer): void;
  handlePointerMove(event: PointerEvent): CardPointer;
  handlePointerLeave(): void;
  resetPointer(): void;
  render(): void;
}

export async function createWebGpuCardRenderer({
  canvas,
  webgpuPane,
}: WebGpuCardRendererOptions): Promise<WebGpuCardRenderer> {
  if (!navigator.gpu) {
    alert('WebGPU not supported on this browser.');
    throw new Error('WebGPU not supported');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    alert('No appropriate GPUAdapter found.');
    throw new Error('No appropriate GPUAdapter found');
  }

  const device = await adapter.requestDevice();
  const context = canvas.getContext('webgpu');

  if (!context) {
    throw new Error('Unable to acquire WebGPU context');
  }

  let devicePixelRatio = window.devicePixelRatio || 1;
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  const canvasConfiguration: GPUCanvasConfiguration = {
    device,
    format: presentationFormat,
    alphaMode: 'premultiplied',
  };

  context.configure(canvasConfiguration);

  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });

  const cardAspect = 0.718;
  const quadScale = 1.2;
  const vertices = new Float32Array([
    -1.0 * quadScale, (-1.0 / cardAspect) * quadScale, 0, 1,
     1.0 * quadScale, (-1.0 / cardAspect) * quadScale, 1, 1,
     1.0 * quadScale,  (1.0 / cardAspect) * quadScale, 1, 0,
    -1.0 * quadScale,  (1.0 / cardAspect) * quadScale, 0, 0,
  ]);
  const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices);

  const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, indices);

  // Uniform layout (48 bytes / 12 floats):
  // resolution(2) + pointer(2) + rotation(2) + time(1) + dpr(1) + perspective(1) + opacity(1) + pad(2)
  const uniformBuffer = device.createBuffer({
    size: 48,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: {} },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: {} },
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, texture: {} },
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, texture: {} },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  // Pipeline cache — keyed by effect id, built on first use
  const pipelineCache = new Map<string, GPURenderPipeline>();

  function buildPipeline(effect: CardEffect): GPURenderPipeline {
    const shaderModule = device.createShaderModule({ code: effect.shaderCode });
    return device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: shaderModule,
        entryPoint: 'vertexMain',
        buffers: [
          {
            arrayStride: 16,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x2' },
              { shaderLocation: 1, offset: 8, format: 'float32x2' },
            ],
          },
        ],
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'fragmentMain',
        targets: [
          {
            format: presentationFormat,
            blend: {
              color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
              alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
            },
          },
        ],
      },
      primitive: { topology: 'triangle-list' },
    });
  }

  function getPipeline(effect: CardEffect): GPURenderPipeline {
    let pipeline = pipelineCache.get(effect.id);
    if (!pipeline) {
      pipeline = buildPipeline(effect);
      pipelineCache.set(effect.id, pipeline);
    }
    return pipeline;
  }

  function createBindGroup(
    cardTex: GPUTexture,
    foilTex: GPUTexture,
    maskTex: GPUTexture,
  ): GPUBindGroup {
    return device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: uniformBuffer } },
        { binding: 1, resource: sampler },
        { binding: 2, resource: cardTex.createView() },
        { binding: 3, resource: foilTex.createView() },
        { binding: 4, resource: maskTex.createView() },
      ],
    });
  }

  let cardTexture = createSolidTexture([255, 255, 255, 255]);
  let foilTexture = createSolidTexture([0, 0, 0, 255]);
  let maskTexture = createSolidTexture([0, 0, 0, 255]);
  let activePipeline = getPipeline(getEffect(''));
  let bindGroup = createBindGroup(cardTexture, foilTexture, maskTexture);

  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let targetOpacity = 0;
  let currentOpacity = 0;
  const startTime = performance.now();
  let renderWidth = 1;
  let renderHeight = 1;
  let resetTimer: number | undefined;

  function resetPointer() {
    window.clearTimeout(resetTimer);
    mouseX = 0.5;
    mouseY = 0.5;
    targetRotationX = 0;
    targetRotationY = 0;
    targetOpacity = 0;
  }

  function scheduleReset(delay = 500) {
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(resetPointer, delay);
  }

  function getCardBounds() {
    const rect = canvas.getBoundingClientRect();
    const cardWidth = Math.min(rect.height * 0.6, rect.width - 48);
    const cardHeight = cardWidth / cardAspect;
    const left = rect.left + (rect.width - cardWidth) / 2;
    const top = rect.top + (rect.height - cardHeight) / 2;
    return { width: cardWidth, height: cardHeight, cardLeft: left, cardTop: top };
  }

  function setPointer(pointer: CardPointer) {
    window.clearTimeout(resetTimer);
    mouseX = Math.min(Math.max(pointer.x, 0), 1);
    mouseY = Math.min(Math.max(pointer.y, 0), 1);
    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;
    targetRotationX = (-(centerX * 100) / 3.5) * (Math.PI / 180);
    targetRotationY = (-(centerY * 100) / 3.5) * (Math.PI / 180);
    targetOpacity = 1;
  }

  function handlePointerMove(event: PointerEvent) {
    const bounds = getCardBounds();
    const pointer = {
      x: (event.clientX - bounds.cardLeft) / bounds.width,
      y: (event.clientY - bounds.cardTop) / bounds.height,
    };
    setPointer(pointer);
    return pointer;
  }

  function handlePointerLeave() {
    scheduleReset();
  }

  function resizeCanvas() {
    devicePixelRatio = window.devicePixelRatio || 1;
    const rect = webgpuPane.getBoundingClientRect();
    renderWidth = Math.max(1, Math.round(rect.width * devicePixelRatio));
    renderHeight = Math.max(1, Math.round(rect.height * devicePixelRatio));
    if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
      canvas.width = renderWidth;
      canvas.height = renderHeight;
      context.configure(canvasConfiguration);
    }
  }

  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeObserver.observe(webgpuPane);
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createSolidTexture(rgba: [number, number, number, number]) {
    const tex = device.createTexture({
      size: [1, 1, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: tex }, new Uint8Array(rgba), { bytesPerRow: 4 }, [1, 1]);
    return tex;
  }

  async function createTextureFromUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load texture: ${url}`);
    const blob = await response.blob();
    const source = await createImageBitmap(blob);
    const tex = device.createTexture({
      size: [source.width, source.height, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });
    device.queue.copyExternalImageToTexture({ source }, { texture: tex }, [source.width, source.height]);
    source.close();
    return tex;
  }

  async function updateTexture(
    url: string,
    categoryName: string,
    card: Card,
    variant: EffectVariant,
  ) {
    const effect = getEffect(categoryName);
    const nextPipeline = getPipeline(effect);
    const foilUrl = getLocalFoilImageUrl(card, 'foils', categoryName, variant);
    const maskUrl = getLocalFoilImageUrl(card, 'masks', categoryName, variant);
    const [nextCardTexture, nextFoilTexture, nextMaskTexture] = await Promise.all([
      createTextureFromUrl(url),
      foilUrl ? createTextureFromUrl(foilUrl) : Promise.resolve(createSolidTexture([0, 0, 0, 255])),
      maskUrl
        ? createTextureFromUrl(maskUrl)
        : Promise.resolve(createSolidTexture([0, 0, 0, 255])),
    ]);

    const previousCardTexture = cardTexture;
    const previousFoilTexture = foilTexture;
    const previousMaskTexture = maskTexture;
    cardTexture = nextCardTexture;
    foilTexture = nextFoilTexture;
    maskTexture = nextMaskTexture;
    activePipeline = nextPipeline;
    bindGroup = createBindGroup(cardTexture, foilTexture, maskTexture);
    previousCardTexture.destroy();
    previousFoilTexture.destroy();
    previousMaskTexture.destroy();
  }

  function render() {
    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;
    currentOpacity += (targetOpacity - currentOpacity) * 0.15;

    const time = (performance.now() - startTime) / 1000;
    const cssPerspective = 600 * ((2 * devicePixelRatio) / renderHeight);
    const uniformData = new Float32Array([
      renderWidth, renderHeight,
      mouseX, mouseY,
      currentRotationX, currentRotationY,
      time, devicePixelRatio,
      cssPerspective, currentOpacity,
      0, 0,
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: 0.2235, g: 0.2314, b: 0.2706, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
    });
    renderPass.setPipeline(activePipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setIndexBuffer(indexBuffer, 'uint16');
    renderPass.drawIndexed(indices.length);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
  }

  return {
    updateTexture,
    setPointer,
    handlePointerMove,
    handlePointerLeave,
    resetPointer,
    render,
  };
}
