import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Response, Headers, RequestOptions, Http} from '@angular/http';
import {LoadingBarService} from '../services/loading-bar.service';
import {HttpExceptionService} from '../services/http-exceptions.service';
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';
import {JwtHelper, tokenNotExpired, AuthHttp} from 'angular2-jwt';
import {LoginModel} from '../../+auth/models/login-model';
import {Storage} from "../storage";
import {Tokens} from '../models/tokens';
import {ProfileService} from '../profile/profile.service';

@Injectable()
export class TokenService {
    constructor(private storage: Storage,
                private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private profile: ProfileService,
                private authHttp: AuthHttp,
                private store: Store<AppState>
    ) { }

    refreshSubscription$: Subscription;

    jwtHelper: JwtHelper = new JwtHelper();

    checkLoginStatus(){
        this.store.select( state => state.tokens)
            .subscribe( tokens => {
                let isLoggedIn = tokenNotExpired(tokens.access_token);
                this.store.dispatch({type: "UPDATE_LOGIN_STATUS", payload: isLoggedIn})
            })

    }

    getTokens(data: LoginModel | RefreshGrant, grantType: string): Observable<void> {
        //data can be any since it can either be a refresh tokens or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.loadingBar.doWithLoader(
            this.http.post("api/token", this.encodeObjectToParams(data) , options)
                .catch( error => this.httpExceptions.handleError(error))
                .map( res => res.json())
                .do( tokens => this.store.dispatch({type: "GET_TOKENS", payload: tokens}))
                .do( () => this.store.dispatch({type: "UPDATE_LOGIN_STATUS", payload: true}))
                .map( (tokens: Tokens) => {
                    let profile = this.jwtHelper.decodeToken(tokens.access_token) as ProfileModel
                    this.profile.storeProfile(profile);

                    this.storage.setItem(".issued", tokens[".issued"]);
                    this.storage.setItem("access_token", tokens["access_token"]);
                    this.storage.setItem("refresh_token", tokens["refresh_token"]);
                    this.storage.setItem("profile", JSON.stringify(profile));
                })
        );
    }

    deleteTokens(){
        this.storage.removeItem("access_token");
        this.storage.removeItem("refresh_token");
        this.storage.removeItem("profile");
        this.storage.removeItem(".issued");

        this.store.dispatch({type: "DELETE_TOKENS"})
    }

    unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    refreshTokens(): Observable<Response>{
        return this.storage.getItem("refresh_token")
            .flatMap( refreshToken => {
                return this.getTokens(
                    { refresh_token: refreshToken } as RefreshGrant, "refresh_token")
                    .catch( error => Observable.throw("refresh tokens has expired"));
                //pretty sure the only way this can fail is with a expired tokens
            })
    }

    startupTokenRefresh() {
        this.storage.getItem("access_token")
            .subscribe(
                token => {

                    if(tokenNotExpired(token)) {
                        this.scheduleRefresh()
                    }else{
                        this.refreshTokens()
                            .subscribe( () => this.scheduleRefresh())
                    }

                }
            )
    }

    scheduleRefresh(): void {
        let source = this.authHttp.tokenStream.flatMap(
            streamToken => {
                let token = this.jwtHelper.decodeToken(streamToken) as ProfileModel;
                let iat = new Date(localStorage.getItem('.issued')).getTime()/1000;
                let refreshTokenThreshold = 10; //seconds
                let delay = ((token.exp - iat) - refreshTokenThreshold) * 1000;
                return Observable.interval(delay);//ms I think
            });

        this.refreshSubscription$ = source.subscribe(() => {
            this.refreshTokens()
                .subscribe()
        });
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

}
export interface RefreshGrant{
    refresh_token: string;
}