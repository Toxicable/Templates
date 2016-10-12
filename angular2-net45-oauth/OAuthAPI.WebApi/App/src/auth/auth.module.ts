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
        ForgotPasswordComponent
    ],
})
export class AuthModule { }