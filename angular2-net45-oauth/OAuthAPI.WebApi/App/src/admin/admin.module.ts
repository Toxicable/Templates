/**
 * Created by Fabian on 6/10/2016.
 */

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {adminRouting} from "./admin.routes";
import {RolesComponent} from "./roles/roles.component";
import { NgModule }          from '@angular/core';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../auth/guards/super-admin-auth-guard.service";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        adminRouting
    ],
    declarations: [
        AdminComponent,
        RolesComponent,
        UsersComponent
    ],
    providers: [ SuperAdminAuthGuard ],
})
export class AdminModule { }