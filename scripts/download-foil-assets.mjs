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
  'rare shiny',
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
  const isShiny = card.number.toLowerCase().startsWith('sv');
  if (
    !wanted.has(rarity) &&
    !(isShiny && rarity === 'rare holo vmax') &&
    !reverseIds.has(card.id)
  ) {
    return null;
  }

  const number = card.number.toString().toLowerCase().replace('swsh', '').padStart(3, '0');
  const set = card.set
    .toString()
    .toLowerCase()
    .replace(/(tg|gg|sv)/, '');
  const isGallery = !!card.number.match(/^[tg]g/i);
  const isReverse = reverseIds.has(card.id);
  const displayRarity = isShiny
    ? rarity === 'rare holo vmax' || card.subtypes.includes('VMAX')
      ? 'rare shiny vmax'
      : rarity === 'rare holo v' || card.subtypes.includes('V')
        ? 'rare shiny v'
        : 'rare shiny'
    : rarity;
  const etch =
    displayRarity === 'amazing rare' ||
    displayRarity === 'rare ultra' ||
    displayRarity === 'rare secret' ||
    displayRarity === 'rare shiny' ||
    displayRarity === 'rare shiny v' ||
    displayRarity === 'rare shiny vmax' ||
    ((isGallery || isShiny) && displayRarity === 'rare holo v')
      ? 'etched'
      : 'holo';
  const style =
    displayRarity === 'amazing rare'
      ? 'swsecret'
      : displayRarity === 'rare holo'
        ? 'swholo'
        : displayRarity === 'rare holo v'
          ? 'sunpillar'
          : displayRarity === 'rare ultra'
            ? 'sunpillar'
            : displayRarity === 'rare secret'
              ? 'swsecret'
              : displayRarity === 'rare shiny'
                ? 'sunpillar'
                : displayRarity === 'rare shiny v'
                  ? 'sunpillar'
                  : displayRarity === 'rare shiny vmax'
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
