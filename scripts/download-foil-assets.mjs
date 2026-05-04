import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const cdn = 'https://poke-holo.b-cdn.net';
const cards = JSON.parse(await readFile(path.resolve('public/cards.json'), 'utf8'));
const wanted = new Set([
  'amazing rare',
  'rare holo',
  'rare holo cosmos',
  'rare holo v',
  'rare holo vmax',
  'rare holo vstar',
  'rare ultra',
  'rare secret',
  'rare rainbow',
  'rare rainbow alt',
  'rare shiny',
  'trainer gallery rare holo',
]);

const reverseIds = new Set([
  'swsh12-127',
  'swsh12-85',
  'swsh12-116',
  'swsh9-120',
  'swsh12-49',
  'swsh8-138',
  'pgo-69',
  'swsh1-173',
  'swsh9-150',
]);

const BASE_FOIL_RESOLUTIONS = {
  'amazing rare': { etch: 'etched', style: 'swsecret' },
  'rare holo cosmos': { etch: 'holo', style: 'cosmos' },
  'rare holo': { etch: 'holo', style: 'swholo' },
  'rare holo v': { etch: 'holo', style: 'sunpillar' },
  'rare holo vmax': { etch: 'etched', style: 'sunpillar' },
  'rare holo vstar': { etch: 'etched', style: 'sunpillar' },
  'rare ultra': { etch: 'etched', style: 'sunpillar' },
  'rare secret': { etch: 'etched', style: 'swsecret' },
  'rare rainbow': { etch: 'etched', style: 'swsecret' },
  'rare shiny': { etch: 'etched', style: 'sunpillar' },
  'rare shiny v': { etch: 'etched', style: 'sunpillar' },
  'rare shiny vmax': { etch: 'etched', style: 'swsecret' },
};

function resolveFoil(card, rarity) {
  if (rarity.endsWith('reverse holo')) {
    return { etch: 'holo', style: 'reverse' };
  }

  if (rarity === 'trainer gallery rare holo') {
    return { etch: 'holo', style: 'rainbow' };
  }

  if (rarity === 'rare holo v') {
    return {
      etch: card.number.match(/^[tg]g/i) ? 'etched' : 'holo',
      style: 'sunpillar',
    };
  }

  if (rarity === 'rare rainbow alt') {
    return {
      etch: 'etched',
      style: card.subtypes?.includes('VMAX') ? 'swsecret' : 'sunpillar',
    };
  }

  return BASE_FOIL_RESOLUTIONS[rarity] ?? null;
}

function getFoilParts(card) {
  const rarity = card.rarity.toLowerCase();
  const isShiny = card.number.toLowerCase().startsWith('sv');
  if (!wanted.has(rarity) && !reverseIds.has(card.id)) {
    return null;
  }

  const number = card.number.toString().toLowerCase().replace('swsh', '').padStart(3, '0');
  const set = card.set
    .toString()
    .toLowerCase()
    .replace(/(tg|gg|sv)/, '');
  const isGallery = !!card.number.match(/^[tg]g/i);
  const isReverse = reverseIds.has(card.id);
  const assetRarity = rarity === 'trainer gallery rare holo' ? 'rare holo' : rarity;
  const displayRarity = isShiny
    ? assetRarity === 'rare holo vmax' || card.subtypes?.includes('VMAX')
      ? 'rare shiny vmax'
      : assetRarity === 'rare holo v' || card.subtypes?.includes('V')
        ? 'rare shiny v'
        : 'rare shiny'
    : assetRarity === 'rare rainbow'
      ? card.subtypes?.includes('VMAX')
        ? 'rare rainbow alt'
        : 'rare rainbow'
      : assetRarity;
  const resolution =
    rarity === 'trainer gallery rare holo'
      ? { etch: 'holo', style: 'rainbow' }
      : resolveFoil(card, displayRarity);
  if (!resolution) {
    return null;
  }
  const etch = resolution?.etch ?? 'holo';
  const style = resolution?.style ?? 'reverse';

  return { number, set, etch, style };
}

async function download(url, outputPath) {
  if (existsSync(outputPath)) {
    return;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${path.relative(process.cwd(), outputPath)}`);
}

for (const card of cards) {
  const parts = getFoilParts(card);
  if (!parts) {
    continue;
  }

  for (const type of ['foils', 'masks']) {
    const relativePath = `foils/${parts.set}/${type}/upscaled/${parts.number}_foil_${parts.etch}_${parts.style}_2x.webp`;
    await download(`${cdn}/${relativePath}`, path.resolve('public', relativePath));
  }
}
