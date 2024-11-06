import { getApi } from '@agility/content-fetch';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env['AGILITY_API_FETCH_KEY'];
const guid = process.env['AGILITY_GUID'];
const locale = process.env['AGILITY_LOCALE'] || 'en-use';
const channel = process.env['AGILITY_WEBSITE'] || 'website';

const client = getApi({
    guid,
    apiKey,
    isPreview: false
});

async function prerenderPages() {
    // Fetch the sitemap
    const sitemap = await client.getSitemapFlat({ languageCode: locale, channelName: channel, locale });

    // Object to hold all page data
    let allPageData: { [key: string]: { page: any, dynamicPageItem: any } } = {};

    for (const pagePath in sitemap) {
        if (sitemap.hasOwnProperty(pagePath)) {
            const pageInSitemap = sitemap[pagePath];
 
            // Fetch the page content
            const pageContent = await client.getPageByPath({
                pagePath,
                channelName: channel,
                locale
            });

            // Fetch the dynamic page item
            let dynamicPageItem = null;
            if(pageInSitemap.contentID) {
            dynamicPageItem = await client.getContentItem({
                contentID: pageInSitemap.contentID,
                locale
            });
            }
            // Add the page content to the allPageData object
            allPageData[pagePath] = {
                page: pageContent.page,
                dynamicPageItem: dynamicPageItem
            };
        }
    }

    // Define the JSON output path for the aggregated data
    const jsonOutputPath = path.join(__dirname, 'src', 'app', 'agility', 'data', 'pages.json');

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });

    // Write the aggregated data to the JSON file
    fs.writeFileSync(jsonOutputPath, JSON.stringify(allPageData, null, 2), 'utf8');
}

prerenderPages();