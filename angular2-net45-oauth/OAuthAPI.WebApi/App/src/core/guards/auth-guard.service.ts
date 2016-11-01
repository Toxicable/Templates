import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from "../services/alert.service";
import {ProfileService} from "../profile/profile.service";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private alertService: AlertService,
                private profile: ProfileService,
                private store: Store<AppState>
    ) {}

    isLoggedIn(): Observable<boolean>{
        return this.store.select(state => state.loggedIn)
            .subscribe(
                isLoggedIn => {
                    if(!isLoggedIn){
                        this.alertService.sendError("You are not logged in");
                        this.router.navigate(['auth/login']);
                        return false;
                    }
                    return true;
                }
            )


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