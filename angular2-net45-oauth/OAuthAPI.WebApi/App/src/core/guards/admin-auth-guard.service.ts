/**
 * Created by Fabian on 5/10/2016.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {AlertService} from "../common/alert.service";
import {AuthGuard} from "./auth-guard.service";
import {ProfileService} from "../auth/profile.service";

@Injectable()
export class AdminAuthGuard extends AuthGuard implements CanActivate {

    constructor(router: Router,
                alert: AlertService,
                profile: ProfileService,
                auth: AuthService
    ) {
        super(router, alert, profile, auth)
    }

    canActivate(): boolean {
        return this.isInRole("Admin");
    }
}