/**
 * Created by Fabian on 26/09/2016.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent }      from '../auth/login/login.component';
import {RegisterComponent} from "../auth/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);