import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthService }   from './auth.service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent} from "./register/register.component";
import { HttpModule} from "@angular/http";
import { authRouting } from './auth.routing'
import {ControlMessages} from "../app/validation/control-messages.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        authRouting
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ControlMessages
    ],
    providers: [AuthService],
})
export class AuthModule { }