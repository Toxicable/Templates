/**
 * Created by Fabian on 5/10/2016.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {AlertService} from "../../app/alert/alert.service";
import {ProfileService} from "../profile/profile.service";
import {AuthService} from "../auth.service";

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {

    constructor(private router: Router,
                private alertService: AlertService,
                private profile: ProfileService,
                private auth: AuthService
    ) {}

    canActivate(): boolean {

        if(this.profile.isInRole("SuperAdmin") && this.auth.isLoggedIn){
            return true
        }else{
            this.alertService.sendError("Unauthorized");
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}