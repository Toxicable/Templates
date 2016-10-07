/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }      from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AuthModule, AuthService} from "../auth";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {AlertComponent} from "./alert/alert.component";
import {AlertService} from "./alert/alert.service";
import {AuthHttp} from "../auth/auth-http/auth-http.service";
import {AdminModule} from "../admin/admin.module";
import {SuperAdminAuthGuard} from "../auth/guards/super-admin-auth-guard.service";


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
        AlertComponent

    ],
    providers:    [ AuthService, AuthHttp, AlertService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }