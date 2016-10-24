/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable }           from '@angular/core';
import { Http, Headers,
    RequestOptions, Response}   from '@angular/http';
import { RegisterModel }        from '../../+auth/models/register-model';
import {JwtHelper, AuthHttp}    from 'angular2-jwt'
import {TokenResult}            from "../../+auth/models/token-result";
import {LoginModel}             from "../../+auth/models/login-model";
import {ProfileModel}           from "../models/profile-model";
import { Observable }           from 'rxjs/Observable';
import {HttpExceptions} from "../http-exceptions/http-exceptions";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class AuthService {
    constructor(private http: Http,
                private authHttp: AuthHttp,
                private storage: TokenStorageService,
                private httpExceptions: HttpExceptions
    ) {}

    refreshSubscription: any;
    jwtHelper: JwtHelper = new JwtHelper();

    get isLoggedIn(): boolean {
        let token = this.storage.retrieveAccessToken();

        if(!token) return false;

        return !this.jwtHelper.isTokenExpired(token)
    }

    public logout(){
        this.storage.removeTokens();
        this.unsubscribeRefresh();
    }

    public unsubscribeRefresh(){
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    public login(user: LoginModel): Observable<boolean>  {
        return this.getTokens(user, "password")
            .map(res => {
                this.storage.storeTokens(res.json() as TokenResult);
                this.scheduleRefresh();
                return true;
            })
            .catch( this.httpExceptions.handleTokenBadRequest)
    }

    public register(data: RegisterModel): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/account/create", data, options)
            .map(res => res)
            .catch( this.httpExceptions.handleError );

    }

    public refreshTokens(): Observable<Response>{
        return this.getTokens({ refresh_token: this.storage.retrieveRefreshToken() }, "refresh_token")
            .map( res => this.storage.storeTokens(res.json() as TokenResult))
            .catch( error => Observable.throw("refresh token has expired"))
        //pretty sure the only way this can fail is with a expired token
    }

    public startupTokenRefresh() {

        this.refreshTokens().subscribe(
            () => this.scheduleRefresh(),
            (error) => console.warn(error)
        );
    }

    public scheduleRefresh(): void {
        let source = this.authHttp.tokenStream.flatMap(
            streamToken => {
                    let token = this.jwtHelper.decodeToken(streamToken) as ProfileModel;
                    let iat = new Date(localStorage.getItem('.issued')).getTime()/1000;
                    let refreshTokenThreshold = 10; //seconds
                    let delay = ((token.exp - iat) - refreshTokenThreshold) * 1000;
                    return Observable.interval(delay);//ms I think
            });

        this.refreshSubscription = source.subscribe(() => {
            this.refreshTokens()
                .subscribe()
        });
    }

    private getTokens(data: any, grantType: string): Observable<Response> {
        //data can be any since it can either be a refresh token or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.http.post("api/token",  this.encodeObjectToParams(data), options)
            .catch( error => this.httpExceptions.handleError(error))
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}