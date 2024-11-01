import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

import { AgilityService } from './src/app/services/agility.service';
import { InjectionToken } from '@angular/core';

const agilityService = new AgilityService();
export const ROUTE_CONTENT = new InjectionToken<any>('ROUTE_CONTENT'); // For safer content injection

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.use(express.static(browserDistFolder, { maxAge: '1y' }));

  // Dynamic SSR route handling
  server.get('*', async (req, res, next) => {
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;

    try {
      // Fetch content dynamically based on the route
      const content = await fetchContentForRoute(req.originalUrl);

      const html = await commonEngine.render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          { provide: ROUTE_CONTENT, useValue: content }, // Safely inject dynamic content
        ],
      });

      res.send(html);
    } catch (error) {
      next(error);
    }
  });

  return server;
}

// Utility function to fetch content based on URL
async function fetchContentForRoute(url: string) {
  try {
    const sitemap = await agilityService.getSitemapFlat();

    const page: any = Object.keys(sitemap).find((key) => sitemap[key].path === url);
    if (!page) throw new Error(`Page not found for URL: ${url}`);

    const pageContent = await agilityService.getPage(page.pageID);
    return pageContent;
  } catch (error) {
    console.error(`Error fetching content for route ${url}:`, error);
    throw error;
  }
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();