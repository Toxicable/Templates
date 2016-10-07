/**
 * Created by Fabian on 7/10/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthHttp} from "./auth-http.service";

@Injectable()
export class AuthGuardService {
    constructor(private authHttp: AuthHttp){}

    isInRole(role: string): Promise<Response>{
        return this.authHttp.get('api/roles/isinrole?role=' + role);
    }
}