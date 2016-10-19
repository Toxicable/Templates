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
import {ProfileModel}           from "../../+auth/models/profile-model";
import { Observable }           from 'rxjs/Observable';
import {HttpExceptions} from "../../shared/http-exceptions/http-exceptions";

@Injectable()
export class AuthService {
    constructor(private http: Http,
                private authHttp: AuthHttp,
    ) {}

    refreshSubscription: any;
    jwtHelper: JwtHelper = new JwtHelper();

    get isLoggedIn(): boolean {
        let token = this.retrieveAccessToken();

        if(!token) return false;

        return !this.jwtHelper.isTokenExpired(token)
    }

    public logout(){
        this.removeTokens();
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
                this.storeTokens(res.json() as TokenResult);
                this.scheduleRefresh();
                return true;
            })
            .catch( HttpExceptions.handleTokenBadRequest)
    }

    public register(data: RegisterModel): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/account/create", data, options)
            .map(res => res)
            .catch( HttpExceptions.handleError );

    }

    public refreshTokens(): Observable<Response>{
        return this.getTokens({ refresh_token: this.retrieveRefreshToken() }, "refresh_token")
            .map( res => {
                this.storeTokens(res.json() as TokenResult)
            })
            .catch( error => {
                return Observable.throw("refresh token has expired");
            })
    }

    public startupTokenRefresh() {

        this.refreshTokens().subscribe(
            () => this.scheduleRefresh(),
            (error) => {
                console.warn(error);
            }
        );
    }

    public scheduleRefresh(): void {
        let source = this.authHttp.tokenStream.flatMap(
            streamToken => {
                let token = this.jwtHelper.decodeToken(streamToken) as ProfileModel;
                let iat = new Date(localStorage.getItem('.issued')).getTime()/1000;
                let refreshTokenThreshold = 10; //seconds
                let delay = ((token.exp - iat) - refreshTokenThreshold) * 1000;

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            //when the timer ires hit this one
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
    }

    private storeTokens(model: TokenResult): void{
        let profile = this.jwtHelper.decodeToken(model.access_token) as ProfileModel

        localStorage.setItem(".issued", model[".issued"])
        localStorage.setItem("access_token", model.access_token);
        localStorage.setItem("refresh_token", model.refresh_token);
        localStorage.setItem("profile", JSON.stringify(profile));
    }
    private removeTokens(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("profile");
    }

    private retrieveAccessToken(): string {
        return localStorage.getItem("access_token");
    }
    private retrieveRefreshToken(): string {
        return localStorage.getItem("refresh_token");
    }
    retrieveProfile(): ProfileModel{
        return JSON.parse(localStorage.getItem("profile"));
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}