/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }      from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";
import {HttpModule, Http} from "@angular/http";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
    imports:      [
        BrowserModule ,
        AuthModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent
    ],
    providers:    [ AuthService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }