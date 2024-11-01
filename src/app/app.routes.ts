import { Routes } from '@angular/router';
import { AgilityPageComponent } from './components/agility/page/agility-page.component';

export const routes: Routes = [
    { path: '**', component: AgilityPageComponent } // Wildcard route
];