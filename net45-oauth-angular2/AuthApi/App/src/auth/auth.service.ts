/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { LoginModel } from './models/login-model';
import { RegisterModel } from './models/register-model';
import {AuthModel} from "./models/auth-model";
import {BadRequestResponse} from "./models/bad-request-response";
import {BadTokenRequestResponse} from "./models/bad-token-request-response";

@Injectable()
export class AuthService {
    constructor(private http: Http) {}
    private modelName = "auth-model";
    private baseUrl = "api/";

    logout(){
        this.removeToken();
    }

    isAuthenticated(): Promise<boolean>{
        return this.validateToken().then(x => true);
    }

    getToken(){
        return this.getModel().access_token;
    }

    getRefreshToken(): string {
        return this.getModel().refresh_token;
    }

    login(user: LoginModel): Promise<void>  {

        return this.getTokens(user, "password").then(res => {
            this.setToken(res);
            return Promise.resolve();
        },
        res =>{
            return Promise.reject(res);
        });
    }

    register(data: RegisterModel): Promise<void> {
        //TODO: return a better object than void

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "account/register", data, options)
            .toPromise()
            .then((res: Response) => Promise.resolve())
            .catch((res: Response) =>{
                let model = res.json() as BadRequestResponse
                return Promise.reject(model.modelState[""][0]);
            });
    }

    isInRole(role: string){
        let model = this.getModel();

        if(model.hasOwnProperty("role")){
            //TODO: Implement roles server side
            //return role === model.role
        }
        return false
    }

    validateToken(): Promise<void> {
        let authModel = this.getModel();

        if(authModel == null){
            return Promise.reject("invalid token")
        }

        let expires = new Date(authModel[".expires"]);

        if(new Date() > expires){
            //since the access token has expired you should be getting a new one with the refresh token
            return this.tryRefreshTokens();
        }

        return Promise.resolve();
    }

    private setToken(model: AuthModel): void {
        localStorage.setItem(this.modelName, JSON.stringify(model));
    }

    private getModel(): AuthModel {
        return JSON.parse(localStorage.getItem(this.modelName)) as AuthModel;
    }

    private removeToken(): void {
        localStorage.removeItem(this.modelName);
    }

    private tryRefreshTokens(): Promise<void>{
        return this.getTokens({ refresh_token: this.getRefreshToken() }, "refresh_token")
            .then(res =>{
                //we good to reset the token here
                this.setToken(res)
                return Promise.resolve()

            }, () =>{
                //This should only occur when the refresh token has expired so we're good to redirect here
                //we should remove it though so we don't have to check again later
                this.removeToken();
                return Promise.reject("refresh token has expired")
            });
    }

    private getTokens(data: any, grantType: string): Promise<AuthModel> {
        //data can be any since it can either be a refresh token or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.http.post(this.baseUrl + "token",  this.encodeObjectToParams(data), options)
            .toPromise()
            .then((res) => res.json() as AuthModel)
            .catch(res => {
                let model = res.json() as BadTokenRequestResponse
                return Promise.reject(model.error_description)
            });
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}