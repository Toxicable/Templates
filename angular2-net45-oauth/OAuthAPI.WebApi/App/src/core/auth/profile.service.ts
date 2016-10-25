/**
 * Created by Fabian on 7/10/2016.
 */
import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {ProfileModel} from "../models/profile-model";
import {TokenStorageService} from "./token-storage.service";
@Injectable()
export class ProfileService{
    constructor(private storage: TokenStorageService
    ){ }

    get firstName(): string {
        let profile = this.getProfile();
        if(profile)
            if(profile.first_name)
                return profile.first_name;

        return null;

    }


    getUsername(): string{
        let profile = this.getProfile();
        if(profile) {
            return profile.unique_name;
        }
        return "";
    }

    isEmailConfirmed(): boolean{
        let profile = this.getProfile();
        if(profile){
            let verifiedString= profile.email_confirmed
            return verifiedString.toString() == "True";
        }
        return false;
    }

    isInRole(role: string): boolean{
        let profile = this.getProfile();

        if(profile){
            let profile = this.storage.retrieveProfile();

            if(!profile.role) return false;
            return profile.role.indexOf(role, 0) > -1;
        }
        return false
    }

    getProfile(){
        return this.storage.retrieveProfile();
    }
}
