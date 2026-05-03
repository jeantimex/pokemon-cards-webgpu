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
  'rare ultra',
  'rare secret',
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

function getFoilParts(card) {
  const rarity = card.rarity.toLowerCase();
  if (!wanted.has(rarity) && !reverseIds.has(card.id)) {
    return null;
  }

  const number = card.number.toString().toLowerCase().replace('swsh', '').padStart(3, '0');
  const set = card.set
    .toString()
    .toLowerCase()
    .replace(/(tg|gg|sv)/, '');
  const isGallery = !!card.number.match(/^[tg]g/i);
  const isShiny = card.number.toLowerCase().startsWith('sv');
  const isReverse = reverseIds.has(card.id);
  const etch =
    rarity === 'amazing rare' ||
    rarity === 'rare ultra' ||
    rarity === 'rare secret' ||
    ((isGallery || isShiny) && rarity === 'rare holo v')
      ? 'etched'
      : 'holo';
  const style =
    rarity === 'amazing rare'
      ? 'swsecret'
      : rarity === 'rare holo'
        ? 'swholo'
        : rarity === 'rare holo v'
          ? 'sunpillar'
          : rarity === 'rare ultra'
            ? 'sunpillar'
            : rarity === 'rare secret'
              ? 'swsecret'
              : isReverse
                ? 'reverse'
                : 'cosmos';

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
