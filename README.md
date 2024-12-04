# AgilityCMS Angular 18 SSR Starter
This repository is a template you can use to render your AgilityCMS website on Angular 18. 

## Installation
Run `npm install` to install the required packages.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You will see client side requests. Routing is done via the <a [routerLink]> tags and takes place client side.

## Production server
Run `npm run build` this will prerender your sitemap pages and create a static build of your site. The build artifacts will be stored in the `dist/` directory.
Run `npm run start` this will start the built production server. 

No client side requests are made in production. Routing is done via the browser and <a [href]> tags

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
