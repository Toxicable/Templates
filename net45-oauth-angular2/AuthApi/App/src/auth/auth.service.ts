/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { LoginModel } from './models/login-model';
import { RegisterModel } from './models/register-model';
import {LoginResponse} from "./models/login-response";

@Injectable()
export class AuthService {
    constructor(private http: Http) {}

    private baseUrl = "http://localhost:51621/api/";

    logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    login(user: LoginModel) {

        let data = this.encodeObjectToParams(user);
        this.getTokens(data, "password").then(res => {
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
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

    private encodeObjectToParams(obj: any) {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }



    private getTokens(data: string, grantType: string): Promise<LoginResponse> {
        //if you're doing my password then you need to give the username and password
        //if you're doing by refresh_token then to give the refresh_token

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});  
        let options = new RequestOptions({ headers: headers });

        data = data + "&grant_type=" + grantType + "&client_id=AngularApp";

        return this.http.post(this.baseUrl + "token",  data, options)
            .toPromise()
            .then((res) => res.json() as LoginResponse)
            .catch(this.handleError);
    }


    private handleError (response: any) {
        //TODO: Add logging here
        console.log("Server Error: ")
        console.log(response)

        return response.json();
    }
}