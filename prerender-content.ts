import { getApi } from '@agility/content-fetch';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();


const client = getApi({
    guid: process.env['AGILITY_GUID'],
    apiKey: process.env['AGILITY_API_FETCH_KEY'],
    isPreview: Boolean(process.env['AGILITY_PREVIEW']),
});

const contentListsToPreRender = ['posts', 'categories'];

async function prerenderPages() {
    
    let allContentListsData: { [key: string]: any } = {};
    
    for(const contentList of contentListsToPreRender) {

        // Fetch the content list
        const list = await client.getContentList({
            referenceName: contentList,
            languageCode: process.env['AGILITY_LOCALE'],
            locale: process.env['AGILITY_LOCALE'],
        });

        // Add the list to the allContentListsData object
        allContentListsData[contentList] = list;

        console.log(`Fetched content list: ${contentList}`);
    }

    // Define the JSON output path for the aggregated data
    const aggregatedJsonOutputPath = path.join(__dirname, 'src', 'app', 'agility', 'data', 'content.json');

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(aggregatedJsonOutputPath), { recursive: true });

    // Write the aggregated data to the JSON file
    fs.writeFileSync(aggregatedJsonOutputPath, JSON.stringify(allContentListsData, null, 2), 'utf8');
    
    
}

prerenderPages();
