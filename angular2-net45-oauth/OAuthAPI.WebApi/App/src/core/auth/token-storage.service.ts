/**
 * Created by Fabian on 19/10/2016.
 */
import { Injectable }           from '@angular/core';
import {JwtHelper}    from 'angular2-jwt'
import {TokenResult}            from "../../+auth/models/token-result";
import {ProfileModel}           from "../models/profile-model";
import {Storage} from "../storage";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TokenStorageService {
    constructor(private storage: Storage){}

    jwtHelper: JwtHelper = new JwtHelper();

    storeTokens(model: TokenResult): void{
        let profile = this.jwtHelper.decodeToken(model.access_token) as ProfileModel

        this.storage.setItem(".issued", model[".issued"]);
        this.storage.setItem("access_token", model["access_token"]);
        this.storage.setItem("refresh_token", model["refresh_token"]);
        this.storage.setItem("profile", JSON.stringify(profile));
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

                let t  = JSON.parse(profile) as ProfileModel
                return t;
            })

    }
}