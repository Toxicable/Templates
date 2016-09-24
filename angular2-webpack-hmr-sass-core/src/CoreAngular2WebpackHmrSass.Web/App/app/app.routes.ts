import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home';

export const appRoutes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);