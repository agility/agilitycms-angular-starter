require('dotenv').config();
const fs = require('fs');
const agilityFetch = require('@agility/content-fetch');
const path = require('path');
// const { environment } = require('./src/environments/environment.ts');

// Initialize the Agility API client
const agilityClient = agilityFetch.getApi({
    guid: process.env['AGILITY_GUID'],
    apiKey: process.env['AGILITY_API_FETCH_KEY'],
    isPreview: false, // Set to true if you want to fetch preview content
});

async function fetchRoutes() {
    try {
        // Fetch the flat sitemap
        const data = await agilityClient.getSitemapFlat({
            languageCode: process.env['AGILITY_LOCALE'],
            channelName: process.env['AGILITY_SITEMAP'],
        });

        console.log("Fetched routes:", data);

        // Extract paths from the sitemap keys
        const routes = Object.keys(data);


       
        // Define the path for the output .txt file
        const outputPath = 'src/app/agility/routing/agility-routes.txt';

        // Ensure the directory exists
        const directoryPath = path.dirname(outputPath);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }


        // Write the routes to the .txt file
        fs.writeFileSync(outputPath, routes.join('\n'), 'utf-8');

        console.log(`Prerender routes written successfully to ${outputPath}!`);
    } catch (error) {
        console.error("Error fetching routes:", error);
    }
}

fetchRoutes();
