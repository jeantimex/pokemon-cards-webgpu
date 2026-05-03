import './style.css'
import shaderCode from './shaders.wgsl?raw'
import { GUI } from 'lil-gui'

interface Card {
  id: string;
  name: string;
  rarity: string;
  images: {
    large: string;
  };
}

async function init() {
  if (!navigator.gpu) {
    alert("WebGPU not supported on this browser.");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    alert("No appropriate GPUAdapter found.");
    return;
  }

  const device = await adapter.requestDevice();

  const canvas = document.querySelector<HTMLCanvasElement>('#webgpu-canvas')!;
  const context = canvas.getContext('webgpu')!;

  const devicePixelRatio = window.devicePixelRatio || 1;
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: 'premultiplied',
  });

  // Fetch card data
  const cardsResponse = await fetch('/cards.json');
  const cards: Card[] = await cardsResponse.json();

  // Initial card
  let activeCard = cards[0];

  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });

  const shaderModule = device.createShaderModule({
    code: shaderCode,
  });

  // Quad geometry (Larger than the card to accommodate the shadow)
  const cardAspect = 0.718;
  const quadScale = 1.2; 
  const vertices = new Float32Array([
    -1.0 * quadScale, -1.0 / cardAspect * quadScale, 0, 1,
     1.0 * quadScale, -1.0 / cardAspect * quadScale, 1, 1,
     1.0 * quadScale,  1.0 / cardAspect * quadScale, 1, 0,
    -1.0 * quadScale,  1.0 / cardAspect * quadScale, 0, 0,
  ]);

  const indices = new Uint16Array([
    0, 1, 2,
    0, 2, 3,
  ]);

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
            { shaderLocation: 0, offset: 0, format: 'float32x2' }, // pos
            { shaderLocation: 1, offset: 8, format: 'float32x2' }, // uv
          ],
        },
      ],
    },
    fragment: {
      module: shaderModule,
      entryPoint: 'fragmentMain',
      targets: [{ 
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
        }
      }],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  let texture: GPUTexture | null = null;
  let bindGroup: GPUBindGroup | null = null;

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
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    device.queue.copyExternalImageToTexture(
      { source },
      { texture },
      [source.width, source.height]
    );

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

  // Initial texture load
  await updateTexture(activeCard.images.large);

  // Group cards into logical categories
  const categories: Record<string, Card[]> = {
    'Basics': cards.filter(c => ['Common', 'Uncommon'].includes(c.rarity)),
    'Holo Rares': cards.filter(c => ['Rare Holo', 'trainer gallery rare holo', 'Trainer Gallery Rare Holo'].includes(c.rarity)),
    'Galaxy Holo': cards.filter(c => c.rarity === 'Rare Holo Cosmos'),
    'Radiant': cards.filter(c => c.rarity === 'Radiant Rare'),
    'V / VMAX / VSTAR': cards.filter(c => ['Rare Holo V', 'Rare Holo VMAX', 'Rare Holo VSTAR', 'Rare Ultra', 'Rare Rainbow', 'Rare Rainbow Alt'].includes(c.rarity)),
    'Amazing Rare': cards.filter(c => c.rarity === 'Amazing Rare'),
    'Secret Rare': cards.filter(c => c.rarity === 'Rare Secret'),
    'Shiny Vault': cards.filter(c => c.rarity === 'Rare Shiny'),
  };

  // Flatten cards into a single map with category prefixes
  const cardMap: Record<string, string> = {};
  for (const [category, groupCards] of Object.entries(categories)) {
    groupCards.forEach(c => {
      cardMap[`[${category}] ${c.name}`] = c.id;
    });
  }

  // GUI Setup
  const gui = new GUI({ title: 'Card Library' });
  const guiState = {
    activeId: activeCard.id
  };

  gui.add(guiState, 'activeId', cardMap)
    .name('Select Card')
    .onChange(async (id: string) => {
      const card = cards.find(c => c.id === id);
      if (card) {
        await updateTexture(card.images.large);
      }
    });

  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;
    targetRotationX = -centerX * (Math.PI / 6); 
    targetRotationY = -centerY * (Math.PI / 6);
  });

  const startTime = performance.now();

  function frame() {
    const width = canvas.clientWidth * devicePixelRatio;
    const height = canvas.clientHeight * devicePixelRatio;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    currentRotationX += (targetRotationX - currentRotationX) * 0.15;
    currentRotationY += (targetRotationY - currentRotationY) * 0.15;

    const time = (performance.now() - startTime) / 1000;

    const uniformData = new Float32Array([
        width, height, 
        mouseX, mouseY, 
        currentRotationX, currentRotationY,
        time, 0 
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    if (bindGroup) {
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
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

init();
