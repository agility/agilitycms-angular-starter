import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.prod';
import { AppServerModule } from './app/app.server.module';

if (environment.production) {
  enableProdMode();
}

export default AppServerModule; // Use default export