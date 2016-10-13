import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule}           from "@angular/http";
import { AuthService }         from '../core/auth/auth.service';
import { AuthComponent }       from './auth.component';
import { LoginComponent }      from './login'
import { RegisterComponent}    from "./register";
import { authRouting }         from './auth.routing'
import {VerifyComponent}       from "./verify";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {SharedModule} from "../shared/shared.module";
import {ResetPasswordComponent} from "./forgot-password/reset-password.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpModule,
        authRouting,
        SharedModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        VerifyComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
})
export class AuthModule { }