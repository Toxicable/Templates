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
import {AlertComponent, AlertService}           from "./alert";
import {AdminModule}                            from "../admin";
import {ProfileService}                         from "../auth/profile";
import {LoadingBarComponent, LoadingBarService} from "./loading-bar";
import {provideAuth}                            from "angular2-jwt";
import {UnauthorizedComponent}                  from "./unauthorized";
import {ForgotPasswordComponent} from "../auth/forgot-password/forgot-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlMessages} from "./form-validation/control-messages.component";




@NgModule({
    imports:      [
        BrowserModule ,
        AuthModule,
        AdminModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent,
        AlertComponent,
        LoadingBarComponent,
        UnauthorizedComponent
    ],
    providers:    [
        AuthService,
        AlertService,
        ProfileService,
        LoadingBarService,
        provideAuth({
            headerName: "Authorization",
            headerPrefix: "Bearer",
            tokenName: "access_token",
            tokenGetter: () => localStorage.getItem("access_token"),
            globalHeaders: [{'Content-Type':'application/json'}],
            noJwtError: true,
            noTokenScheme: true
        })
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }