import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component'
import {RegisterComponent} from "./register/register.component";
import {AuthComponent} from "./auth.component";
import {VerifyComponent} from "./verify/verify.component";

const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
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
            },
            {
                path: 'verify',
                component: VerifyComponent
            },
            {
                path: 'verify/:id/:code',
                component: VerifyComponent
            },
            {
                path: 'forgot-password',
                component: RegisterComponent
            }
        ]
    }
];



export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);

