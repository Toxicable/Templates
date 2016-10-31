import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthGuard} from "./auth-guard.service";

@Injectable()
export class AuthenticatedAuthGuard implements CanActivate {

    constructor(private authGuard: AuthGuard ) { }


    canActivate(): boolean {
        return this.authGuard.isLoggedIn();
    }
}