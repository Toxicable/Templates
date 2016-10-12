/**
 * Created by Fabian on 7/10/2016.
 */
import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {ProfileModel} from "../../auth/models/profile-model";
@Injectable()
export class ProfileService{
    constructor(private auth: AuthService){
        // this.profile = this.auth.retrieveProfile()
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
            let profile = this.auth.retrieveProfile();

            if(!profile.role) return false;
            return profile.role.indexOf(role, 0) > -1;
        }
        return false
    }

    getProfile(){
        return this.auth.retrieveProfile();
    }


}
