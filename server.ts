import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const server = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(browserDistFolder, 'index.html'); // Use index.html directly

// Serve static files
server.use(express.static(browserDistFolder, { maxAge: '1y' }));

// Handle all GET requests
server.get('*', (req, res) => {
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    console.log('Request for route:', req.originalUrl);

    // Serve the index.html file for all routes
    res.sendFile(indexHtml);
});

// Start the server
const port = process.env['PORT'] || 4000;
server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});


// // server.ts
// import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr';
// import express from 'express';
// import { fileURLToPath } from 'node:url';
// import { dirname, join, resolve } from 'node:path';
// import { InjectionToken, Injector, PLATFORM_ID } from '@angular/core';
// import { AgilityService } from './src/app/services/agility.service';
// import AppServerModule from './src/main.server';
// import { CookieService } from 'ngx-cookie-service';

// // Define a token to inject route content
// export const ROUTE_CONTENT = new InjectionToken<any>('ROUTE_CONTENT');

// export function createServer(): express.Express {
//   console.log('Creating server...');
//   const server = express();
//   const serverDistFolder = dirname(fileURLToPath(import.meta.url));
//   const browserDistFolder = resolve(serverDistFolder, '../browser');
//   const indexHtml = join(serverDistFolder, 'index.server.html');
//   const commonEngine = new CommonEngine();

//   // Set view engine and static assets
//   server.set('view engine', 'html');
//   server.set('views', browserDistFolder);
//   server.use(express.static(browserDistFolder, { maxAge: '1y' }));

//   // Initialize AgilityService with PLATFORM_ID set to 'server'
//   const agilityService = new AgilityService(new CookieService(null as unknown as Document, PLATFORM_ID), 'server');

//   // Dynamic SSR route handling
//   server.get('*', async (req, res, next) => {
//     const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
//     try {
//       console.log('Request for route:', req.originalUrl);
//       const content = await fetchContentForRoute(req.originalUrl, agilityService);
//       const html = await commonEngine.render({
//         bootstrap: AppServerModule,
//         documentFilePath: indexHtml,
//         url,
//         publicPath: browserDistFolder,
//         providers: [
//           { provide: APP_BASE_HREF, useValue: req.baseUrl },
//           { provide: ROUTE_CONTENT, useValue: content },
//         ],
//       });
//       res.send(html);
//     } catch (error) {
//       console.error('Error processing request:', error);
//       next(error);
//     }
//   });

//   return server;
// }

// async function fetchContentForRoute(url: string, agilityService: AgilityService) {
//   try {
//     const sitemap = await agilityService.getSitemapFlat();
//     const pageUrl = url === '/' ? '/home' : url;
//     const pageKey = Object.keys(sitemap).find(key => sitemap[key].path === pageUrl);
    
//     if (!pageKey) {
//       console.error(`Page not found for URL: ${url}`);
//       throw new Error(`Page not found for URL: ${url}`);
//     }

//     const pageContent = await agilityService.getPage(sitemap[pageKey].pageID);
//     return pageContent;
//   } catch (error) {
//     console.error(`Error fetching content for route ${url}:`, error);
//     throw error;
//   }
// }

// export function run(AppServerModule: any): express.Express {
//   const server = createServer();
//   const port = process.env['PORT'] || 4000;
  
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });

//   return server;
// }

// run(AppServerModule);