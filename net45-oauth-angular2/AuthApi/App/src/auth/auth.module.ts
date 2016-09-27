import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthService }   from './auth.service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent} from "./register/register.component";
import {Http} from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [AuthService, Http],
    exports: [AuthComponent],
    bootstrap: [AuthComponent]
})
export class AuthModule { }