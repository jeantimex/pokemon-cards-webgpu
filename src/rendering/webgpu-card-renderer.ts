import shaderCode from '../effects/galaxy-cosmos-holofoil/shader.wgsl?raw';
import { appUrl } from '../app/asset-url';
import { getLocalFoilImageUrl } from '../effects/asset-paths';
import type { EffectVariant } from '../effects/category-types';
import type { Card } from '../types';
import type { CardPointer } from '../ui/css-card-controller';

interface WebGpuCardRendererOptions {
  canvas: HTMLCanvasElement;
  webgpuPane: HTMLElement;
}

export interface WebGpuCardRenderer {
  updateTexture(url: string, card: Card, categoryName: string, variant: EffectVariant): Promise<void>;
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

  const shaderModule = device.createShaderModule({
    code: shaderCode,
  });

  const cardAspect = 0.718;
  const quadScale = 1.2;
  const vertices = new Float32Array([
    -1.0 * quadScale,
    (-1.0 / cardAspect) * quadScale,
    0,
    1,
    1.0 * quadScale,
    (-1.0 / cardAspect) * quadScale,
    1,
    1,
    1.0 * quadScale,
    (1.0 / cardAspect) * quadScale,
    1,
    0,
    -1.0 * quadScale,
    (1.0 / cardAspect) * quadScale,
    0,
    0,
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

  const uniformBuffer = device.createBuffer({
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const pipeline = device.createRenderPipeline({
    layout: 'auto',
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
            color: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
            alpha: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
          },
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  let cardTexture = createSolidTexture([255, 255, 255, 255]);
  let maskTexture = createSolidTexture([0, 0, 0, 0]);
  let cosmosBottomTexture = createSolidTexture([0, 0, 0, 0]);
  let cosmosMiddleTexture = createSolidTexture([0, 0, 0, 0]);
  let cosmosTopTexture = createSolidTexture([0, 0, 0, 0]);
  let bindGroup = createBindGroup();
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let targetOpacity = 0;
  let currentOpacity = 0;
  let effectMode = 0;
  let clipMode = 0;
  let cosmosOffsetX = 0;
  let cosmosOffsetY = 0;
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
    resetTimer = window.setTimeout(() => {
      resetPointer();
    }, delay);
  }

  function getCardBounds() {
    const rect = canvas.getBoundingClientRect();
    const cardWidth = Math.min(rect.height * 0.6, rect.width - 48);
    const cardHeight = cardWidth / cardAspect;
    const left = rect.left + (rect.width - cardWidth) / 2;
    const top = rect.top + (rect.height - cardHeight) / 2;

    return {
      left,
      top,
      right: left + cardWidth,
      bottom: top + cardHeight,
      width: cardWidth,
      height: cardHeight,
      cardLeft: left,
      cardTop: top,
    };
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
    const solidTexture = device.createTexture({
      size: [1, 1, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture(
      { texture: solidTexture },
      new Uint8Array(rgba),
      { bytesPerRow: 4 },
      { width: 1, height: 1 },
    );
    return solidTexture;
  }

  async function createTextureFromUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to load texture: ${url}`);
    }
    const blob = await response.blob();
    const source = await createImageBitmap(blob);

    const nextTexture = device.createTexture({
      size: [source.width, source.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture(
      { source },
      { texture: nextTexture },
      [source.width, source.height],
    );
    source.close();
    return nextTexture;
  }

  function createBindGroup() {
    return device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
          },
        },
        {
          binding: 1,
          resource: sampler,
        },
        {
          binding: 2,
          resource: cardTexture.createView(),
        },
        {
          binding: 3,
          resource: maskTexture.createView(),
        },
        {
          binding: 4,
          resource: cosmosBottomTexture.createView(),
        },
        {
          binding: 5,
          resource: cosmosMiddleTexture.createView(),
        },
        {
          binding: 6,
          resource: cosmosTopTexture.createView(),
        },
      ],
    });
  }

  function hashCardId(cardId: string) {
    let hash = 2166136261;
    for (let i = 0; i < cardId.length; i += 1) {
      hash ^= cardId.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function getClipMode(card: Card) {
    const subtypeText = (card.subtypes ?? []).join(' ').toLowerCase();
    if (card.supertype.toLowerCase() === 'trainer' || subtypeText.startsWith('supporter')) {
      return 2;
    }
    if (subtypeText.startsWith('stage')) {
      return 1;
    }
    return 0;
  }

  async function updateTexture(
    url: string,
    card: Card,
    categoryName: string,
    variant: EffectVariant,
  ) {
    const isGalaxyCosmos = categoryName === 'Galaxy/Cosmos Holofoil';
    const nextCardTexture = await createTextureFromUrl(url);
    let nextMaskTexture = maskTexture;
    let nextCosmosBottomTexture = cosmosBottomTexture;
    let nextCosmosMiddleTexture = cosmosMiddleTexture;
    let nextCosmosTopTexture = cosmosTopTexture;

    if (isGalaxyCosmos) {
      const maskUrl = getLocalFoilImageUrl(card, 'masks', categoryName, variant);
      const [
        loadedMaskTexture,
        loadedCosmosBottomTexture,
        loadedCosmosMiddleTexture,
        loadedCosmosTopTexture,
      ] = await Promise.all([
        createTextureFromUrl(maskUrl),
        createTextureFromUrl(appUrl('img/cosmos-bottom.png')),
        createTextureFromUrl(appUrl('img/cosmos-middle-trans.png')),
        createTextureFromUrl(appUrl('img/cosmos-top-trans.png')),
      ]);

      nextMaskTexture = loadedMaskTexture;
      nextCosmosBottomTexture = loadedCosmosBottomTexture;
      nextCosmosMiddleTexture = loadedCosmosMiddleTexture;
      nextCosmosTopTexture = loadedCosmosTopTexture;
    }

    const previousCardTexture = cardTexture;
    const previousMaskTexture = maskTexture;
    const previousCosmosBottomTexture = cosmosBottomTexture;
    const previousCosmosMiddleTexture = cosmosMiddleTexture;
    const previousCosmosTopTexture = cosmosTopTexture;

    cardTexture = nextCardTexture;
    maskTexture = isGalaxyCosmos ? nextMaskTexture : createSolidTexture([0, 0, 0, 0]);
    cosmosBottomTexture = isGalaxyCosmos ? nextCosmosBottomTexture : createSolidTexture([0, 0, 0, 0]);
    cosmosMiddleTexture = isGalaxyCosmos ? nextCosmosMiddleTexture : createSolidTexture([0, 0, 0, 0]);
    cosmosTopTexture = isGalaxyCosmos ? nextCosmosTopTexture : createSolidTexture([0, 0, 0, 0]);
    bindGroup = createBindGroup();

    previousCardTexture.destroy();
    previousMaskTexture.destroy();
    previousCosmosBottomTexture.destroy();
    previousCosmosMiddleTexture.destroy();
    previousCosmosTopTexture.destroy();

    effectMode = isGalaxyCosmos ? 1 : 0;
    clipMode = getClipMode(card);

    const seed = hashCardId(card.id);
    cosmosOffsetX = seed % 734;
    cosmosOffsetY = ((seed >>> 10) % 1280) - 128;
  }

  function render() {
    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;
    currentOpacity += (targetOpacity - currentOpacity) * 0.15;

    const time = (performance.now() - startTime) / 1000;
    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;
    const pointerFromCenter = Math.min(Math.sqrt(centerX * centerX + centerY * centerY) / 0.5, 1);
    const cssPerspective = 600 * ((2 * devicePixelRatio) / renderHeight);
    const uniformData = new Float32Array([
      renderWidth,
      renderHeight,
      mouseX,
      mouseY,
      currentRotationX,
      currentRotationY,
      time,
      devicePixelRatio,
      currentOpacity,
      effectMode,
      clipMode,
      pointerFromCenter,
      cosmosOffsetX,
      cosmosOffsetY,
      cssPerspective,
      0,
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.2235, g: 0.2314, b: 0.2706, a: 1.0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.setIndexBuffer(indexBuffer, 'uint16');
    passEncoder.drawIndexed(indices.length);
    passEncoder.end();

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
