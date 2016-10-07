/**
 * Created by Fabian on 7/10/2016.
 */
import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ProfileModel} from "../models/profile-model";
@Injectable()
export class ProfileService{
    constructor(private auth: AuthService){

         this.profile = this.auth.retrieveProfile()
    }

    private profile: ProfileModel

    getUsername(){
        if(this.profile) {
            return this.profile.unique_name;
        }
        return "";
    }

}
