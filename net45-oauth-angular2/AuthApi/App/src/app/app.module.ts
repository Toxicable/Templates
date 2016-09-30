/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }      from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AuthModule, AuthService} from "../auth";
import {HttpModule} from "@angular/http";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NavigationComponent} from "./navigation/navigation.component";

@NgModule({
    imports:      [
        BrowserModule ,
        AuthModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent
    ],
    providers:    [ AuthService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }