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

    encodeObjectToParams(obj: any) {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

    login(user: LoginModel) {

        let data = this.encodeObjectToParams(user);

        this.getTokens(data, "password").then(res => {
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
        });

        
    }

    register(model: RegisterModel) {

        let data = this.encodeObjectToParams(model);

        this.postRegistration(data).then();
        //TODO: check to make sure reg was success
        
    }

    private postRegistration(data: string) {
        //data should have username, password and confirmpassword
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "account/register", data, options)
            .toPromise()
            .then((res) => res.json())
            .catch(this.handleError);
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


    private handleError (error: any) {
        console.log(error);
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.resolve()// .reject(errMsg);
    }
}