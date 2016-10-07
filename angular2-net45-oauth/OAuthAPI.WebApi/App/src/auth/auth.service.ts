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

@Injectable()
export class AuthService {
    constructor(private http: Http
    ) {}

    logout(){
        this.removeTokens();
    }

    login(user: LoginModel): Promise<void>  {

        return this.getTokens(user, "password").then(res => {
                this.storeTokens(res as TokenResult);
                return Promise.resolve();
            },
            res =>{
                return Promise.reject(res);
            });
    }

    register(data: RegisterModel): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/accounts/create", data, options)
            .toPromise()
            .then((res: Response) => Promise.resolve())
            .catch((res: Response) =>{
                let model = res.json() as BadRequestResult;
                return Promise.reject(model.modelState[""][0]);
            });
    }


    tryGetAccessToken():Promise<string>{
        if(this.isLoggedIn()){
            return Promise.resolve(this.retrieveAccessToken());
        }

        return this.getTokens({ refresh_token: this.retrieveRefreshToken() }, "refresh_token")
            .then(res =>{
                //we good to reset the token here
                this.storeTokens(res);
                return Promise.resolve(this.retrieveAccessToken());

            }, () =>{
                //This should only occur when the refresh token has expired so we're good to redirect here
                //we should remove it though so we don't have to check again later
                this.removeTokens();
                return Promise.reject("refresh token has expired")
            });
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
    retrieveProfile(){
        return JSON.parse(localStorage.getItem("profile"));
    }


    private getTokens(data: any, grantType: string): Promise<TokenResult> {
        //data can be any since it can either be a refresh token or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.http.post("api/token",  this.encodeObjectToParams(data), options)
            .toPromise()
            .then((res) => res.json() as TokenResult)
            .catch(res => {
                let model = res.json() as BadTokenRequestResult
                return Promise.reject(model.error_description)
            });
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}