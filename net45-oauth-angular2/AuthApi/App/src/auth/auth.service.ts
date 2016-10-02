/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { LoginModel } from './models/login-model';
import { RegisterModel } from './models/register-model';
import {AuthModel} from "../auth-http/models/auth-model";

@Injectable()
export class AuthService {
    constructor(private http: Http) {}
    private modelName = "auth-model";
    private baseUrl = "http://localhost:51621/api/";

    logout(){
        this.removeToken();
    }

    isAuthenticated(): boolean{
        return this.validateToken()
    }

    login(user: LoginModel) {

        this.getTokens(user, "password").then(res => {
            this.setToken(res)
        });
    }

    register(data: RegisterModel): any {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "account/register", data, options)
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
    }

    getToken(){
        return this.getModel().access_token;
    }

    public getRefreshToken(){
        return this.getModel().refresh_token;
    }

    private setToken(model: AuthModel){
        console.log(model)
        localStorage.setItem(this.modelName, JSON.stringify(model));
    }

    private getModel() {
        return JSON.parse(localStorage.getItem(this.modelName)) as AuthModel;
    }

    private removeToken() {
        localStorage.removeItem("auth-model");
    }

    validateToken() {
        let authModel = this.getModel()

        if(authModel == null){
            return false;
        }

        let expires = new Date(authModel[".expires"]);

        debugger
        if(new Date() > expires){
            //since the access token has expired you should be getting a new one with the refresh token
            this.tryRefreshTokens();
            //TODO: handle when refresh token has expired
            return true
        }

        return true
    }

   private tryRefreshTokens(){
        //TODO: Add case for when refresh token has expired
        this.getTokens({
            refresh_token: this.getRefreshToken()
        }, "refresh_token")
            .then(res => this.setToken(res))


   }

    private getTokens(data: any, grantType: string): Promise<AuthModel> {
        //data can be any since it can either be empty or a login form for the different requests
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
            .catch(this.handleError);
    }

    private handleError (response: any) {
        //TODO: Add logging here
        console.error("Server Error: ");
        console.error(response);

        //TODO: find other errors that can occur here
        return response.json();
    }

    private encodeObjectToParams(obj: any) {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}