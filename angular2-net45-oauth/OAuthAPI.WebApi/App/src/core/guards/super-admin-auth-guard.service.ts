import { Injectable } from '@angular/core';
import {Router, CanLoad, Route} from '@angular/router';
import { CanActivate } from '@angular/router';
import {AlertService} from "../services/alert.service";
import {ProfileService} from "../services/profile.service";
import {AuthService} from "../services/auth.service";
import {AuthGuard} from "./auth-guard.service";

@Injectable()
export class SuperAdminAuthGuard extends AuthGuard implements CanActivate, CanLoad {

    constructor(router: Router,
                alert: AlertService,
                profile: ProfileService,
                auth: AuthService
    ) {
        super(router, alert, profile, auth)
        this.role = "SuperAdmin"
    }

    canActivate(): boolean {
        return this.isInRole();
    }
    canLoad(route: Route): boolean {
        return this.isInRole();
    }
}