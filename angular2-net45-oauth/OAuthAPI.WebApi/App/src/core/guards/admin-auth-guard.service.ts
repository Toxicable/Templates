import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthGuard} from "./auth-guard.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private authGuard: AuthGuard ) { }

    private role: string = "SuperAdmin";

    canActivate(): boolean {
        return this.authGuard.isInRole(this.role);
    }
}