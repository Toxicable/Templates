/**
 * Created by Fabian on 5/10/2016.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {AlertService} from "../common/alert.service";
import {ProfileService} from "./profile.service";
import {AuthService} from "./auth.service";

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {

    constructor(private router: Router,
                private alertService: AlertService,
                private profile: ProfileService,
                private auth: AuthService
    ) {}



    canActivate(): boolean {

        if(!this.auth.isLoggedIn){
            this.alertService.sendError("You are not logged in");
            this.router.navigate(['auth/login']);
            return false;
        }

        if(this.profile.isInRole("SuperAdmin") ){
            return true
        }else{
            this.alertService.sendError("Unauthorized");
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}