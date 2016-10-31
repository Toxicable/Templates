import {adminRouting} from "./admin.routes";
import {RolesComponent} from "./roles/roles.component";
import { NgModule }          from '@angular/core';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../core/guards/super-admin-auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {RoleService} from "./roles.service";
import {UserService} from "./user.service";

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
    providers: [
        SuperAdminAuthGuard,
        UserService,
        RoleService
    ],
})
export class AdminModule { }