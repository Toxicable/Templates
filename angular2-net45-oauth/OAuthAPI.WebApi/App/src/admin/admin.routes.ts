import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {RolesComponent} from "./roles/roles.component";
import {UsersComponent} from "./users/users.component";
/**
 * Created by Fabian on 6/10/2016.
 */

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
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