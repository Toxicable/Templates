/**
 * Created by Fabian on 7/10/2016.
 */
import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {ProfileModel} from "../models/profile-model";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
@Injectable()
export class ProfileService{
    constructor(storage: TokenStorageService
    ){
        this.profile$ = storage.retrieveProfile();
    }

    profile$: Observable<ProfileModel>;

    get firstName(): Observable<string> {
        return this.profile$.map(profile => {debugger;
            //console.log(profile);
            return profile.first_name});
    }

    get lastName(): Observable<string> {
        return this.profile$.map(profile => profile.last_name);
    }

    get getUsername(): Observable<string>{
        return this.profile$.map(profile => profile.unique_name);
        // let profile = this.getProfile();
        // if(profile) {
        //     return profile.unique_name;
        // }
        // return "";
    }

    isEmailConfirmed(): Observable<boolean>{
        //TODO: fix this sill serilization bug
        return this.profile$.map(profile => profile.email_confirmed.toString() == "True");

        // let profile = this.getProfile();
        // if(profile){
        //     let verifiedString= profile.email_confirmed
        //     return verifiedString.toString() == "True";
        // }
        // return false;
    }

    isInRole(role: string): Observable<boolean>{
        return this.profile$.map(profile => {

            if(!profile.role) return false;
            return profile.role.indexOf(role, 0) > -1;

        });
    }

}
