import { Injectable, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';
import { Storage } from '../storage'

@Injectable()
export class ProfileService{
    constructor(private storage: Storage,
                private store: Store<AppState>
    ){    }

    isEmailConfirmed(): Observable<boolean>{
        //TODO: fix this sill serilization bug
        return this.store.select( state => state.profile.email_confirmed)
            .map(emailConfirmed => emailConfirmed.toString() == "True");

    }

    isInRole(pageRole: string): Observable<boolean>{
        return this.store.select( state => state.profile.role)
            .map( role => {
                if(role){
                    return role.indexOf(pageRole, 0) > -1
                }else{
                    return false;
                }

            })
    }

    storeProfile(profile: ProfileModel){
        this.storage.setItem('profile', JSON.stringify(profile));
        this.store.dispatch({type: "GET_PROFILE", payload: profile});
    }

}
