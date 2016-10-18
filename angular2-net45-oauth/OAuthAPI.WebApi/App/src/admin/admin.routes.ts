import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {RolesComponent} from "./roles/roles.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../core/guards/super-admin-auth-guard.service";
/**
 * Created by Fabian on 6/10/2016.
 */

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [SuperAdminAuthGuard],
        children: [
            {
                path: '',
                component: RolesComponent
            },
            {
                path: 'roles',
                component: RolesComponent
            },
            {
                path: 'users',
                component: UsersComponent
            }
        ]
    }
];



export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);