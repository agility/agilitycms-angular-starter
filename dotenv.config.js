require('dotenv').config();
const fs = require('fs');

const development = `
export const environment = {
  production: false,
  AGILITY_GUID: '${process.env.AGILITY_GUID}',
  AGILITY_API_FETCH_KEY: '${process.env.AGILITY_API_FETCH_KEY}',
  AGILITY_API_PREVIEW_KEY: '${process.env.AGILITY_API_PREVIEW_KEY}',
  AGILITY_LOCALE: '${process.env.AGILITY_LOCALE}',
  AGILITY_SITEMAP: '${process.env.AGILITY_SITEMAP}'
};
`;
const production = `
export const environment = {
  production: false,
  AGILITY_GUID: '${process.env.AGILITY_GUID}',
  AGILITY_API_FETCH_KEY: '${process.env.AGILITY_API_FETCH_KEY}',
  AGILITY_API_PREVIEW_KEY: '${process.env.AGILITY_API_PREVIEW_KEY}',
  AGILITY_LOCALE: '${process.env.AGILITY_LOCALE}',
  AGILITY_SITEMAP: '${process.env.AGILITY_SITEMAP}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', development);
fs.writeFileSync('./src/environments/environment.prod.ts', production);

console.log('Environment variables written to environment.ts and environment.prod.ts');