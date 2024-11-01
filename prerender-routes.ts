// prerender-routes.ts
import fs from 'fs';
import agilityFetch from '@agility/content-fetch';
import { environment } from './src/environments/environment.prod';

// Initialize the Agility API client
const agilityClient = agilityFetch.getApi({
    guid: environment.AGILITY_GUID,
    apiKey: environment.AGILITY_API_KEY,
    isPreview: false, // Set to true if you want to fetch preview content
});

console.log('AgilityClient ->', agilityClient);
async function fetchRoutes() {
    try {
        // Fetch the flat sitemap
        const data = await agilityClient.getSitemapFlat({
            languageCode: environment.AGILITY_LOCALE,
            channelName: environment.AGILITY_SITEMAP,
        });

        console.log("Fetched routes:", data);
        // Extract paths from the keys
        const routes = Object.keys(data);

        // Read and update angular.json
        const angularJson = JSON.parse(fs.readFileSync('angular.json').toString());
        angularJson.projects['agilitycms-angular-starter-ssr'].architect.prerender.options.routes = routes;

        // Write the updated angular.json back to the file system
        fs.writeFileSync('angular.json', JSON.stringify(angularJson, null, 2));

        console.log("Prerender routes updated successfully!");
    } catch (error) {
        console.error("Error fetching routes:", error);
    }
}

fetchRoutes();