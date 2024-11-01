// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Get these values from your API Keys page in Agility Settings => https://manager.agilitycms.com/settings/apikeys
export const environment = {
  production: false,
  AGILITY_GUID: 'e13c7b01-u',
  AGILITY_API_PREVIEW_KEY:
    'AngularPreview.6617c54b87588d941d32416a9dfb1e8fd9e556439984e8236ac75896e47ae02a',
  AGILITY_API_FETCH_KEY: 'AngularFetch.a20b40fd8cd25e02ba62ca5c3acbaae5512c1d633b51ea104ac28f9bc3b9d44d',
  AGILITY_LOCALE: 'en-us',
  AGILITY_SITEMAP: 'website',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
