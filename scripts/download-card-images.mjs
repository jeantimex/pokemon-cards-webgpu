import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const cardsPath = path.resolve('public/cards.json');
const outputRoot = path.resolve('public/cards');
const cards = JSON.parse(await readFile(cardsPath, 'utf8'));

function getLocalPath(imageUrl) {
  const url = new URL(imageUrl);
  return path.join(outputRoot, url.pathname);
}

for (const card of cards) {
  const imageUrl = card.images.large;
  const outputPath = getLocalPath(imageUrl);

  if (existsSync(outputPath)) {
    continue;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${imageUrl}: ${response.status} ${response.statusText}`);
  }

  const image = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, image);
  console.log(`Downloaded ${path.relative(process.cwd(), outputPath)}`);
}
