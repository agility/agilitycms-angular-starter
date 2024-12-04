import { Routes } from '@angular/router';
import { PageComponent } from './agility/pages/pages.component';

export const routes: Routes = [
    {'path':'**','component':PageComponent},
];