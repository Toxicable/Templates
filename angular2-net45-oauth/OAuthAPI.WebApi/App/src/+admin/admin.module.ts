/**
 * Created by Fabian on 6/10/2016.
 */

import {adminRouting} from "./admin.routes";
import {RolesComponent} from "./roles/roles.component";
import { NgModule }          from '@angular/core';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../core/guards/super-admin-auth-guard.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        adminRouting,
        SharedModule
    ],
    declarations: [
        AdminComponent,
        RolesComponent,
        UsersComponent
    ],
    providers: [ SuperAdminAuthGuard ],
})
export class AdminModule { }