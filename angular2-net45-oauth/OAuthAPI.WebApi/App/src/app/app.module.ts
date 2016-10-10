/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }              from '@angular/core';
import {BrowserModule}           from "@angular/platform-browser";
import {AppComponent}            from "./app.component";
import {routing}                 from "./app.routing";
import {AuthModule, AuthService} from "../auth";
import {HomeComponent}           from "./home/home.component";
import {NotFoundComponent}       from "./not-found/not-found.component";
import {NavigationComponent}     from "./navigation/navigation.component";
import {AlertComponent}          from "./alert/alert.component";
import {AlertService}            from "./alert/alert.service";
import {AdminModule}             from "../admin/admin.module";
import {ProfileService}          from "../auth/profile/profile.service";
import {LoadingBarComponent} from "./loading-bar/loading-bar.component";
import {LoadingBarService} from "./loading-bar/loading-bar.service";
import {AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {Http} from "@angular/http";
import {TokenManagementService} from "../auth/TokenManagementService";




@NgModule({
    imports:      [
        BrowserModule ,
        AuthModule,
        AdminModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent,
        AlertComponent,
        LoadingBarComponent
    ],
    providers:    [
        AuthService,
        AlertService,
        ProfileService,
        LoadingBarService,
        TokenManagementService,
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