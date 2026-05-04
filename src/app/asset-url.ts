const BASE_URL = import.meta.env.BASE_URL;

export function appUrl(path: string) {
  const normalizedBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}

export function applyAssetUrlVariables() {
  const root = document.documentElement.style;

  root.setProperty('--asset-grain', `url(${appUrl('img/grain.webp')})`);
  root.setProperty('--asset-glitter', `url(${appUrl('img/glitter.png')})`);
  root.setProperty('--asset-cosmos-bottom', `url(${appUrl('img/cosmos-bottom.png')})`);
  root.setProperty('--asset-cosmos-middle-trans', `url(${appUrl('img/cosmos-middle-trans.png')})`);
  root.setProperty('--asset-cosmos-top-trans', `url(${appUrl('img/cosmos-top-trans.png')})`);
  root.setProperty('--asset-illusion', `url(${appUrl('img/illusion.png')})`);
  root.setProperty('--asset-illusion-mask', `url(${appUrl('img/illusion-mask.png')})`);
  root.setProperty('--asset-geometric', `url(${appUrl('img/geometric.png')})`);
  root.setProperty('--asset-trainerbg', `url(${appUrl('img/trainerbg.png')})`);
  root.setProperty('--asset-vmaxbg', `url(${appUrl('img/vmaxbg.jpg')})`);
  root.setProperty('--asset-ancient', `url(${appUrl('img/ancient.png')})`);
}
