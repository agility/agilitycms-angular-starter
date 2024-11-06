require('dotenv').config();
const fs = require('fs');
const path = require('path');

const development = `
export const environment = {
  AGILITY_PREVIEW: '${process.env.AGILITY_PREVIEW}',
  AGILITY_GUID: '${process.env.AGILITY_GUID}',
  AGILITY_API_FETCH_KEY: '${process.env.AGILITY_API_FETCH_KEY}',
  AGILITY_API_PREVIEW_KEY: '${process.env.AGILITY_API_PREVIEW_KEY}',
  AGILITY_LOCALE: '${process.env.AGILITY_LOCALE}',
  AGILITY_SITEMAP: '${process.env.AGILITY_SITEMAP}'
};
`;
const production = `
export const environment = {
  AGILITY_PREVIEW: '${process.env.AGILITY_PREVIEW}',
  AGILITY_GUID: '${process.env.AGILITY_GUID}',
  AGILITY_API_FETCH_KEY: '${process.env.AGILITY_API_FETCH_KEY}',
  AGILITY_API_PREVIEW_KEY: '${process.env.AGILITY_API_PREVIEW_KEY}',
  AGILITY_LOCALE: '${process.env.AGILITY_LOCALE}',
  AGILITY_SITEMAP: '${process.env.AGILITY_SITEMAP}'
};
`;

const dir = './src/environments';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

fs.writeFileSync(path.join(dir, 'environment.ts'), development);
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), production);

console.log('Environment variables written to environment.ts and environment.prod.ts');