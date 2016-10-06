/**
 * Created by Fabian on 2/10/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttpResult} from "../auth-http/models/auth-http-result";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthHttp {
    constructor(private http: Http, private authService: AuthService) {}

    get(endpoint: string): Promise<Response>{

        return this.authService.tryGetAccessToken()
            .then( (token: string) =>{
                    let options = this.getHeaders(token);
                    return this.http.get( endpoint, options).toPromise();

                },
                res => Promise.reject("refresh_token expired")
            )
    }

    post(endpoint: any, data: any): Promise<Response> {

        return this.authService.tryGetAccessToken()
            .then( (token: string) =>{
                    let options = this.getHeaders(token);
                    return this.http.post( endpoint, data, options).toPromise();
                },
                res => Promise.reject("refresh_token expired")
            )

    }

    private getHeaders(accessToken: string): RequestOptions{
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        });
        return new RequestOptions({headers: headers});
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