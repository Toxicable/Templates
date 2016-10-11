import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService }         from './auth.service';
import { AuthComponent }       from './auth.component';
import { LoginComponent }      from './login'
import { RegisterComponent}    from "./register";
import { HttpModule}           from "@angular/http";
import { authRouting }         from './auth.routing'
import {ControlMessages}       from "../app/form-validation";
import {VerifyComponent}       from "./verify";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

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
        ControlMessages,
        VerifyComponent,
        ForgotPasswordComponent
    ],
    providers: [AuthService],
})
export class AuthModule { }