import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from "../services/alert.service";
import {ProfileService} from "../profile/profile.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private alertService: AlertService,
                private profile: ProfileService,
                private auth: AuthService
    ) {}

    isLoggedIn(): boolean{
        if(!this.auth.isLoggedIn){
            this.alertService.sendError("You are not logged in");
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }

    isInRole(role: string): boolean{

        if(!this.isLoggedIn()){
            return false;
        }

        if(!this.profile.isInRole(role) ){
            this.alertService.sendError("Unauthorized");
            this.router.navigate(['unauthorized']);
            return false;
        }
        return true;
    }
}