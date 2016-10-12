/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }                             from '@angular/core';
import {BrowserModule}                          from "@angular/platform-browser";
import {AppComponent}                           from "./app.component";
import {routing}                                from "./app.routing";
import {AuthModule, AuthService}                from "../auth";
import {HomeComponent}                          from "./home";
import {NotFoundComponent}                      from "./not-found";
import {NavigationComponent}                    from "./navigation";
import {AdminModule}                            from "../admin";
import {ProfileService}                         from "../auth/profile";
import {provideAuth}                            from "angular2-jwt";
import {UnauthorizedComponent}                  from "./unauthorized";
import {ForgotPasswordComponent} from "../auth/forgot-password/forgot-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlMessages} from "../shared/form-validation/control-messages.component";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";




@NgModule({
    imports:      [
        BrowserModule ,
        AuthModule,
        AdminModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent,
        UnauthorizedComponent
    ],

    bootstrap:    [ AppComponent ]
})
export class AppModule { }