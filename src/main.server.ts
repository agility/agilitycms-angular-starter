import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.prod';
import { AppServerModule } from './app/app.server.module';
import { run } from '../server';

// console.log('AppServerModule:', AppServerModule);  // Check if AppServerModule is correctly defined
// console.log('main.server.ts');
// console.log('Environment:', environment);
if (environment.production) {
  // console.log('Enabling production mode');
  enableProdMode();
}




// run()
// const server = run(AppServerModule);  // Initialize server with the AppServerModule

export default AppServerModule; // Use default export