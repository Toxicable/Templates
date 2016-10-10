/**
 * Created by Fabian on 2/10/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {AuthHttpResult} from "../models/auth-http-result";

@Injectable()
export class AuthHttp {
    constructor(private http: Http, private authService: AuthService) {}

    private get(endpoint: string): Observable<Response>{
       return this.authService.tryGetAccessToken()
            .mergeMap( (token: string) =>{
                    debugger
                    let options = this.getHeaders(token);
                    return this.http.get( endpoint, options);
                });

    }

    private post(endpoint: any, data: any): Observable<Response> {

        return this.authService.tryGetAccessToken()
            .mergeMap( (token: string) =>{
                    let options = this.getHeaders(token);
                    return this.http.post( endpoint, data, options);
                }
                //error => Observable.throw("refresh_token expired")
            )

    }

    private getHeaders(accessToken: string): RequestOptions{
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        });
        return new RequestOptions({headers: headers});
    }


}