/**
 * Created by Fabian on 5/10/2016.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {AlertService} from "../../app/alert/alert.service";
import {AuthGuardService} from "./auth-guard.service";

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {
    constructor(private authGuard: AuthGuardService,
                private router: Router,
                private alertService: AlertService
    ) {}

    canActivate() {
        return this.authGuard.isInRole('SuperAdmin').then(
            () => true,
            () => {
                this.alertService.sendError("Unauthorized");
                this.router.navigate(['unauthorized']);
                return false;
            }
        );
    }
}