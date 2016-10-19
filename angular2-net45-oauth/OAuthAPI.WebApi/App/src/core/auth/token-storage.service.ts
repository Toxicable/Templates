/**
 * Created by Fabian on 19/10/2016.
 */
import { Injectable }           from '@angular/core';
import {JwtHelper}    from 'angular2-jwt'
import {TokenResult}            from "../../+auth/models/token-result";
import {ProfileModel}           from "../models/profile-model";

@Injectable()
export class TokenStorageService {
    jwtHelper: JwtHelper = new JwtHelper();

    storeTokens(model: TokenResult): void{
        let profile = this.jwtHelper.decodeToken(model.access_token) as ProfileModel

        localStorage.setItem(".issued", model[".issued"]);
        localStorage.setItem("access_token", model.access_token);
        localStorage.setItem("refresh_token", model.refresh_token);
        localStorage.setItem("profile", JSON.stringify(profile));
    }
    removeTokens(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("profile");
    }

    retrieveAccessToken(): string {
        return localStorage.getItem("access_token");
    }
    retrieveRefreshToken(): string {
        return localStorage.getItem("refresh_token");
    }
    retrieveProfile(): ProfileModel{
        return JSON.parse(localStorage.getItem("profile"));
    }
}