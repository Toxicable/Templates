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

    isAuthenticated(): boolean{
        return this.validateToken()
    }

    isInRole(role: string){
        let model = this.getModel();

        if(model.hasOwnProperty("role")){
            //TODO: Implement roles server side
            //return role === model.role
        }
        return false
    }

    login(user: LoginModel) {

        this.getTokens(user, "password").then(res => {
            this.setToken(res)
        });
    }

    register(data: RegisterModel): Promise<void> {
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

    validateToken(): boolean {
        let authModel = this.getModel();

        if(authModel == null){
            return false;
        }

        let expires = new Date(authModel[".expires"]);

        if(new Date() > expires){
            //since the access token has expired you should be getting a new one with the refresh token
            var t =  this.tryRefreshTokens();
            //eg if this.tryRefreshTokens(); returns falsse
            return true;
        }

        return true;
    }

    public getRefreshToken(){
        return this.getModel().refresh_token;
    }

    private setToken(model: AuthModel){
        console.log(model);
        localStorage.setItem(this.modelName, JSON.stringify(model));
    }

    private getModel() {
        return JSON.parse(localStorage.getItem(this.modelName)) as AuthModel;
    }

    private removeToken() {
        localStorage.removeItem(this.modelName);
    }

    private tryRefreshTokens(): Promise<boolean>{
        return this.getTokens({ refresh_token: this.getRefreshToken() }, "refresh_token")
            .then(res =>{
                if (res.error == null){

                    this.setToken(res)
                    return true;
                }else{
                    //this means we got an error, most likely just invalid_grant
                    //either way we'll just remove what's in there so we can return earlier on the revalidate function
                    return false;
                }

            });

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