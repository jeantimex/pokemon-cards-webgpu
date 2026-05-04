import shaderCode from '../shaders.wgsl?raw';

interface WebGpuCardRendererOptions {
  canvas: HTMLCanvasElement;
  webgpuPane: HTMLElement;
}

export interface WebGpuCardRenderer {
  updateTexture(url: string): Promise<void>;
  setPointer(mouseX: number, mouseY: number): void;
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
    size: 32,
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

  let texture: GPUTexture | null = null;
  let bindGroup: GPUBindGroup | null = null;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  const startTime = performance.now();
  let renderWidth = 1;
  let renderHeight = 1;

  function resetPointer() {
    mouseX = 0.5;
    mouseY = 0.5;
    targetRotationX = 0;
    targetRotationY = 0;
  }

  function setPointer(nextMouseX: number, nextMouseY: number) {
    mouseX = Math.min(Math.max(nextMouseX, 0), 1);
    mouseY = Math.min(Math.max(nextMouseY, 0), 1);

    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;
    targetRotationX = -centerX * (Math.PI / 6);
    targetRotationY = -centerY * (Math.PI / 6);
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

  async function updateTexture(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const source = await createImageBitmap(blob);

    if (texture) {
      texture.destroy();
    }

    texture = device.createTexture({
      size: [source.width, source.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture({ source }, { texture }, [source.width, source.height]);

    bindGroup = device.createBindGroup({
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
          resource: texture.createView(),
        },
      ],
    });
  }

  function render() {
    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;

    const time = (performance.now() - startTime) / 1000;
    const uniformData = new Float32Array([
      renderWidth,
      renderHeight,
      mouseX,
      mouseY,
      currentRotationX,
      currentRotationY,
      time,
      devicePixelRatio,
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    if (!bindGroup) {
      return;
    }

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
    resetPointer,
    render,
  };
}
