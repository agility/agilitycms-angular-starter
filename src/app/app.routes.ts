import { Routes } from '@angular/router';
import { ValidateAgilityRoutes } from './guards/agility-route.guard';
import { NotFoundComponent } from './components/not-found/404.component'
import { AgilityPageComponent } from './components/agility-page/agility-page.component';

export const routes: Routes = [
    { path: '404', component: NotFoundComponent }, // 404 route
    { path: ':slug', component: AgilityPageComponent }, // Dynamic route , canActivate: [ValidateAgilityRoutes] 
    { path: '', pathMatch: 'full', component: AgilityPageComponent}, // Homepage
    { path: '**', component: AgilityPageComponent } // Wildcard route
];

