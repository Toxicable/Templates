/**
 * Created by Fabian on 2/10/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttpResult} from "./models/auth-http-result";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthHttpService {
    constructor(private http: Http, private authService: AuthService) {}

    private baseUrl = "http://localhost:51621/api/";

    get(endpoint: string): Promise<any>{

        return this.authService.validateToken()
            .then(
                ()=> {
                let options = this.getHeaders();

                //TODO: more work here
                return this.http.get(this.baseUrl + endpoint, options)
                    .toPromise()
                    .then(res => res.json())
                    .catch(this.handleError)
            },
            ()=>{
                //invalid token here
                //TODO: let the caller know that we're gonna needa do a redirection
            });


    }

    post(endpoint: any, data: any): Promise<any> {
        let options = this.getHeaders();

        return this.http.post(this.baseUrl + endpoint, data, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    private getHeaders(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken()
        });
        return new RequestOptions({headers: headers});
    }

    private tryGetToken(): boolean{

        let authModel = localStorage.getItem("auth-model");
        if(authModel == null){
            return false;
        }
    }

    private handleError (response: Response) {
        //TODO: Add logging here
        console.log("Server Error: ");
        console.log(response);

        let res = response.json();
        let result = new AuthHttpResult();
        result.errors = res.modelState[""].map(x => x);

        return Promise.reject("man, something went wrong here soz :/");
    }
}