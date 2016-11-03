import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AlertService} from "../services/alert.service";
import {ProfileService} from "../profile/profile.service";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Auth} from '../auth/auth.store';


@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private alertService: AlertService,
                private profile: ProfileService,
                private store: Store<AppState>
    ) {}


    isLoggedIn(): Observable<boolean>{
        return this.store.select(state => state.auth)
            .skipWhile( auth => !auth.authReady)
        //.retryWhen( state => state.authReady)
           // .let( state => state.filter( (auth: Auth) => auth.authReady) )
            .map( (auth: Auth) => {
                    if (!auth.loggedIn) {
                        this.alertService.sendError("You are not logged in");
                        this.router.navigate(['auth/login']);
                        return false;
                    }
                    return true;
                }).first();
    }

    isInRole(role: string): Observable<boolean>{

        return this.store.select( state => state)
            .flatMap( (state: AppState) =>{
                if(!state.auth.loggedIn){
                    this.alertService.sendError("Unauthorized");
                    this.router.navigate(['unauthorized']);
                    return Observable.of(false);
                }

                return this.profile.isInRole(role)
                    .map( isInRole => {
                        if(!isInRole){
                            this.alertService.sendError("Unauthorized");
                            this.router.navigate(['unauthorized']);
                            return false;
                        }
                        return true;
                    })

            }).first();
    }
}