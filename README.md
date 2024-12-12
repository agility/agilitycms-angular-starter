# AgilityCMS Angular 18 SSR Starter
This repository is a template you can use to render your AgilityCMS website on Angular 18. 

**Prerequesites**
Node v20+ 

**Installation**
Clone this Repository
`npm install` to install the the required packages.

**Environmental Variables**
You will need to get the following from the Agility Manager;
`GUID` `API_PREVIEW_KEY` `API_FETCH_KEY` `LOCALE` `SITEMAP`

https://manager.agilitycms.com/settings/apikeys

You will need to populate an `.env` file in the root of your project as follows.

This will use `dotenv.config.json` to write your `environment.ts` and `environment.prod.ts` files required by Angular. This approach avoids exposing your API keys to your Git repository.

```

AGILITY_GUID=e13c7b01-u
AGILITY_PREVIEW=true
AGILITY_API_PREVIEW_KEY=AngularPreview.6617c54b87588d941d32416a9dfb1e8fd9e556439984e8236ac75896e47ae02a
AGILITY_API_FETCH_KEY=AngularFetch.a20b40fd8cd25e02ba62ca5c3acbaae5512c1d633b51ea104ac28f9bc3b9d44d
AGILITY_LOCALE=en-us
AGILITY_SITEMAP=website


```

**Build Commands**
`npm run dev`  start the development server
`npm run build` pre-renders the routes via agility-routes.txt then builds the production server
`npm run start` starts the production server
`npm run prerender:routes` just pre-renders the agility-routes.txt

**Key Features**

`Dynamic SSR` Supports server-side rendering for dynamic pages generated from an Agility CMS.

`Pre-rendering and TransferState` Improves initial page load performance and reduces redundant requests.

`Hybrid SSR` Uses a blend of SSR and client-side routing for optimal load times and user experience.

`Seamless Agility CMS Integration` Designed to fit naturally with Agility’s headless CMS ecosystem, making it easier to manage content dynamically.

`DotEnv Support` Improves environmental variable loading and allows keys to be stored at server level
