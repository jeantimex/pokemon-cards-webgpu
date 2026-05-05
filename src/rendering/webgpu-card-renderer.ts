import shaderCode from '../shaders.wgsl?raw';
import type { CardPointer } from '../ui/css-card-controller';

interface WebGpuCardRendererOptions {
  canvas: HTMLCanvasElement;
  webgpuPane: HTMLElement;
}

export interface WebGpuCardRenderer {
  updateTexture(url: string): Promise<void>;
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

  // resolution(2) + pointer(2) + rotation(2) + time(1) + dpr(1) + perspective(1) + pad(3) = 12 floats = 48 bytes
  const uniformBuffer = device.createBuffer({
    size: 48,
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
  let bindGroup = createBindGroup();
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
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
        { binding: 0, resource: { buffer: uniformBuffer } },
        { binding: 1, resource: sampler },
        { binding: 2, resource: cardTexture.createView() },
      ],
    });
  }

  async function updateTexture(url: string) {
    const nextCardTexture = await createTextureFromUrl(url);
    const previousCardTexture = cardTexture;
    cardTexture = nextCardTexture;
    bindGroup = createBindGroup();
    previousCardTexture.destroy();
  }

  function render() {
    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;

    const time = (performance.now() - startTime) / 1000;
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
      cssPerspective,
      0, 0, 0,
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
