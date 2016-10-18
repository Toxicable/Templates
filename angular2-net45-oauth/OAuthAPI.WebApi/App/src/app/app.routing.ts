/**
 * Created by Fabian on 26/09/2016.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path:'admin',
        loadChildren: '../+admin/admin.module#AdminModule'
        //TODO: add can load guard and other features
    },
    {
        path:'auth',
        loadChildren: '../+auth/auth.module#AuthModule'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);