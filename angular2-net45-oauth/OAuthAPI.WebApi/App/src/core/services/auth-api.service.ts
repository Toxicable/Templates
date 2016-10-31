import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BadTokenRequest} from "../models/bad-token-request";
import {BadRequest} from '../models/bad-request';
import {AuthHttp} from "angular2-jwt";
import {HttpExceptionService} from "./http-exceptions.service";

@Injectable()
export class AuthApiService{

    constructor(private authHttp: AuthHttp,
                private httpExceptrions: HttpExceptionService
){}

    baseUrl: string = '/api/';

    get(path:string): Observable<any>{
        return this.authHttp.get(this.baseUrl + path)
            .map( this.checkForError)
            .catch( error => Observable.throw(error))
            .map(this.getJson)
    }

    post(path: string, body: any): Observable<any>{
        return this.authHttp.post(this.baseUrl + path, body)
            .map( this.checkForError)
            .catch( error => Observable.throw(error))
            .map(this.getJson)
    }

    delete(path:string): Observable<any>{
        return this.authHttp.delete(this.baseUrl + path)
            .map( this.checkForError)
            .catch( error => Observable.throw(error))
            .map(this.getJson)
    }

    private getJson(res: Response){
        return res.json();
    }

    protected checkForError(res: Response){
        if(res.status >= 200 && res.status < 300){
            return res;
        }

        this.httpExceptrions.handleError(res);
    }




}