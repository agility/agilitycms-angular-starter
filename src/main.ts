import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Function to get the current URL and check for the `?preview` parameter
const getOriginUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isPreview = urlParams.has('preview');

  // Set different URL paths based on the preview parameter
  return isPreview ? 'http://localhost:4200/preview' : 'http://localhost:4200';
};

const ORIGIN_URL = getOriginUrl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));