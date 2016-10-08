/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { RegisterModel } from './models/register-model';
import { BadRequestResult} from "./models/bad-request-result";
import { BadTokenRequestResult} from "./models/bad-token-request-result";
import {JwtHelper} from 'angular2-jwt'
import {AuthHttp } from "./auth-http/auth-http.service";
import {TokenResult} from "./models/token-result";
import {LoginModel} from "./models/login-model";
import {ProfileModel} from "./models/profile-model";
import { Observable }     from 'rxjs/Observable';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http: Http
    ) {}

    logout(){
        this.removeTokens();
    }

    login(user: LoginModel): Observable<boolean>  {

        return this.getTokens(user, "password")
            .map(res => {
                this.storeTokens(res.json() as TokenResult);
                return true;
            })
            .catch( errorResult => {
                let errorModel = errorResult.json() as BadTokenRequestResult;
                console.log(errorModel.error_description)
                return Observable.throw(errorModel.error_description)
            });
    }

    register(data: RegisterModel): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/accounts/create", data, options)
            .map(res => res)
            .catch( errorResult => {
                console.log(errorResult)
                let errorModel = errorResult.json() as BadRequestResult;
                return Observable.throw(errorModel.modelState[""][0])
            });

    }


    tryGetAccessToken():Observable<string>{
        if(this.isLoggedIn()){
            return Observable.of(this.retrieveAccessToken());
        }

        return  this.getTokens({ refresh_token: this.retrieveRefreshToken() }, "refresh_token")
            .mergeMap(
                res => {
                    //we good to reset the token here
                    this.storeTokens(res.json() as TokenResult);
                    return this.retrieveAccessToken();
                }
              //  ,
                //This should only occur when the refresh token has expired so we're good to redirect here
                //we should remove it though so we don't have to check again later
           //     error => Observable.throw("refresh token has expired")
            )
    }

    isLoggedIn(): boolean {
        let jwtHelper: JwtHelper = new JwtHelper();
        let token = this.retrieveAccessToken();

        if(!token){
            return false;
        }

        return !jwtHelper.isTokenExpired(token)
    }

    private storeTokens(model: TokenResult): void{
        let jwtHelper: JwtHelper = new JwtHelper();
        let profile = jwtHelper.decodeToken(model.access_token) as ProfileModel
console.log(profile);
        localStorage.setItem("access_token", model.access_token);
        localStorage.setItem("refresh_token", model.refresh_token);
        localStorage.setItem("profile", JSON.stringify(profile));
    }
    private removeTokens(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("profile");
    }

    private retrieveAccessToken(): string {
        return localStorage.getItem("access_token");
    }
    private retrieveRefreshToken(): string {
        return localStorage.getItem("refresh_token");
    }
    retrieveProfile(): ProfileModel{
        return JSON.parse(localStorage.getItem("profile"));
    }


    private getTokens(data: any, grantType: string): Observable<Response> {
        //data can be any since it can either be a refresh token or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.http.post("api/token",  this.encodeObjectToParams(data), options)
            .catch( error => Observable.throw("refresh token has expired"))
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}