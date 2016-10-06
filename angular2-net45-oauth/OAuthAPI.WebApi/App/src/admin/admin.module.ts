/**
 * Created by Fabian on 6/10/2016.
 */

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {adminRouting} from "./admin.routes";
import {RolesComponent} from "./roles/roles.component";
import {AuthHttp} from "../auth/auth-http.service";
import { NgModule }          from '@angular/core';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";

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
    providers: [AuthHttp],
})
export class AdminModule { }