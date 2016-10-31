import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AlertService} from "../services/alert.service";
import {AuthGuard} from "./auth-guard.service";
import {ProfileService} from "../services/profile.service";

@Injectable()
export class AuthenticatedAuthGuard extends AuthGuard implements CanActivate {

    constructor(router: Router,
                alertService: AlertService,
                profile: ProfileService,
                auth: AuthService
    ) {
        super(router, alertService, profile, auth)
    }

    canActivate(): boolean {
        return this.isLoggedIn();
    }
}