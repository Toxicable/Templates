/**
 * Created by Fabian on 5/10/2016.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import {AlertService} from "../../app/alert/alert.service";

@Injectable()
export class AuthenticatedAuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router,
                private alertService: AlertService
    ) {}

    canActivate() {
        if(this.auth.isLoggedIn) {
            return true;
        } else {
            this.alertService.sendError("Unauthorized");
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}