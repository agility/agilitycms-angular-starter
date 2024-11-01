import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';

import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(), // Ensure HttpClient is also available server-side
    { provide: 'ORIGIN_URL', useValue: 'http://localhost:4200' }, // Update with your server URL
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);