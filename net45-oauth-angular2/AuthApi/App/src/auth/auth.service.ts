/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { LoginModel } from './models/login-model';
import { RegisterModel } from './models/register-model';
import {AuthModel} from "./models/auth-model";

@Injectable()
export class AuthService {
    constructor(private http: Http) {}
    private modelName = "auth-model";
    private baseUrl = "http://localhost:51621/api/";

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
            Promise.resolve();
        });
    }

    register(data: RegisterModel): Promise<void> {
        //TODO: return a better object than void

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "account/register", data, options)
            .toPromise()
            .then((res: Response) => Promise.resolve()) // res.json())
            .catch(this.handleError);
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
            Promise.reject("model dosen't exist")
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
                if (res.error == null){
                    //we good to reset the token here
                    this.setToken(res)
                    return Promise.resolve()
                }else{
                    //this means we got an error, most likely just invalid_grant
                    //which means the refresh token was invalid
                    //so we'll just remove what's in there so we can return earlier on the revalidate function
                    return Promise.reject("refresh token has expired")
                }

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
            .catch(this.handleError);
    }

    private handleError (response: any) {
        //TODO: Add logging here
        console.error("Server Error: ");
        console.error(response);

        //TODO: find other errors that can occur here
        return Promise.reject("Idk something went wrong look above");
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}