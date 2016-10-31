import { Injectable }           from '@angular/core';
import {JwtHelper}    from 'angular2-jwt'
import {Tokens}            from "../models/tokens";
import {ProfileModel}           from "../models/profile-model";
import {Storage} from "../storage";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TokenStorageService {
    constructor(private storage: Storage){}


    storeTokens(model: Tokens): void{

    }
    removeTokens(): void {
        this.storage.removeItem("access_token");
        this.storage.removeItem("refresh_token");
        this.storage.removeItem("profile");
    }

    retrieveAccessToken(): Observable<string> {
        return this.storage.getItem("access_token");
    }
    retrieveRefreshToken(): Observable<string> {
        return this.storage.getItem("refresh_token");
    }
    retrieveProfile(): Observable<ProfileModel>{
        return this.storage.getItem("profile")
            .map(profile => {

                return JSON.parse(profile) as ProfileModel;
            })

    }
}