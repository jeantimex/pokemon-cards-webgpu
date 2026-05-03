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

  // Initial card (Showcase Pikachu)
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

  // Group cards into Logical Sections matching the homepage
  const categories: Record<string, Card[]> = {
    'Secret Rare (Gold)': [cards[0], ...cards.slice(58, 64)],
    'Common & Uncommon': cards.slice(1, 4),
    'Reverse Holo non-rares': [...cards.slice(4, 7), ...cards.slice(70, 76)],
    'Holofoil Rare': cards.slice(7, 13),
    'Galaxy/Cosmos Holofoil': cards.slice(13, 16),
    'Holofoil Amazing Rare': cards.slice(76, 85),
    'Radiant Holofoil': cards.slice(16, 19),
    'Trainer Gallery Holofoil': cards.slice(19, 22),
    'Pokemon V': cards.slice(22, 25),
    'Pokemon V (Full Art)': cards.slice(25, 28),
    'Pokemon V (Alternate Art)': cards.slice(28, 34),
    'VMax': cards.slice(37, 40),
    'VMax (Alternate/Rainbow)': cards.slice(40, 43),
    'VStar': cards.slice(43, 46),
    'Trainer Holo': cards.slice(46, 52),
    'Rainbow Rare': cards.slice(52, 58),
    'Trainer Gallery (V / VMax)': cards.slice(64, 70),
    'Shiny Vault': cards.slice(85, 91),
  };

  const descriptions: Record<string, string> = {
    'Secret Rare (Gold)': 'GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.',
    'Common & Uncommon': 'All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.',
    'Reverse Holo non-rares': 'Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.',
    'Holofoil Rare': 'Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.',
    'Galaxy/Cosmos Holofoil': 'Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.',
    'Holofoil Amazing Rare': 'Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.',
    'Radiant Holofoil': 'The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.',
    'Trainer Gallery Holofoil': 'Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.',
    'Pokemon V': 'Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.',
    'Pokemon V (Full Art)': 'Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.',
    'Pokemon V (Alternate Art)': 'Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.',
    'VMax': 'The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.',
    'VMax (Alternate/Rainbow)': 'Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.',
    'VStar': 'Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.',
    'Trainer Holo': 'Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.',
    'Rainbow Rare': 'Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.',
    'Trainer Gallery (V / VMax)': 'Generally quite similar to the normal V and VMax cards, with a different background texture.',
    'Shiny Vault': 'Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.',
  };

  // GUI Setup
  const gui = new GUI({ title: 'Card Library' });
  const guiState = {
    category: 'Secret Rare (Gold)',
    activeId: activeCard.id,
  };

  // Create a plain text element for the description
  const descEl = document.createElement('div');
  descEl.className = 'gui-description';
  descEl.textContent = descriptions[guiState.category];

  // Helper to get card map for a category
  const getCardMap = (cat: string) => {
    return Object.fromEntries(categories[cat].map(c => [c.name, c.id]));
  };

  // Dropdown for Type (Category)
  const typeController = gui.add(guiState, 'category', Object.keys(categories))
    .name('Type')
    .onChange(async (cat: string) => {
        const group = categories[cat];
        if (group.length > 0) {
            const firstCard = group[0];
            guiState.activeId = firstCard.id;
            
            // Update Description and Card dropdown options
            descEl.textContent = descriptions[cat];
            cardDropdown.options(getCardMap(cat));
            cardDropdown.updateDisplay();
            
            await updateTexture(firstCard.images.large);
        }
    });

  // Inject the description element after the Type dropdown
  typeController.domElement.parentElement?.appendChild(descEl);

  // Dropdown for specific Card
  const cardDropdown = gui.add(guiState, 'activeId', getCardMap(guiState.category))
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
