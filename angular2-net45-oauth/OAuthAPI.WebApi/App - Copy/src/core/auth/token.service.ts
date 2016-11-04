import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { LoadingBarService } from '../services/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { LoginModel } from '../../+auth/models/login-model';
import { Storage } from "../storage";
import { Tokens } from '../models/tokens';
import { AlertService } from '../services/alert.service';
import { AuthActions } from './auth.store';
import { TokenActions } from './token.store';
import { ProfileActions } from '../profile/profile.reducers';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class TokenService {
    constructor(private storage: Storage,
                private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private store: Store<AppState>,
                private alert: AlertService,
                private authActions: AuthActions,
                private tokenActions: TokenActions,
                private profileActions: ProfileActions
    ) { }

    refreshSubscription$: Subscription;
    jwtHelper: JwtHelper = new JwtHelper();

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
                .map( res => res.json())
                .map( (tokens: Tokens) => {
                    this.tokenActions.setTokens(tokens);
                    this.authActions.isLoggedIn();

                    let profile = this.jwtHelper.decodeToken(tokens.access_token) as ProfileModel;
                    this.profileActions.storeProfile(profile);

                    this.storage.setItem("tokens", JSON.stringify(tokens));
                })
                .do( _ => this.authActions.authReady())
                .catch( error => this.httpExceptions.handleError(error))
        );
    }

    deleteTokens(){
        this.storage.removeItem("tokens");
        this.tokenActions.deleteTokens();
    }

    unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    refreshTokens(): Observable<Response>{
        return this.store.map( state => state.auth.tokens.refresh_token)
            .take(1)
            .flatMap( refreshToken => {
                return this.getTokens(
                    { refresh_token: refreshToken } as RefreshGrant, "refresh_token")
                    .catch( error => Observable.throw("Refresh token expired"));
                //pretty sure the only way this can fail is with a expired tokens
            })
    }

    startupTokenRefresh() {
        this.storage.getItem("tokens")
            .subscribe( (rawTokens: string) => {
                //check if the token is even if localStorage, if it isn't tell them it's not and return
                if(!rawTokens){
                    this.authActions.authReady();
                    return
                }
                //parse the token into a model and throw it into the store
                let tokens = JSON.parse(rawTokens) as Tokens;
                this.tokenActions.setTokens(tokens);

                if(!this.jwtHelper.isTokenExpired(tokens.access_token)){
                    //grab the profile out so we can store it
                    let profile = this.jwtHelper.decodeToken(tokens.access_token) as ProfileModel;
                    this.profileActions.storeProfile(profile);

                    //let the app know we're good to go on the auth side of things
                    this.authActions.isLoggedIn();
                    this.authActions.authReady();

                    this.refreshTokens()
                        .subscribe(
                            () => this.scheduleRefresh()
                        )

                }else{
                    //the token is expired so try use our refresh token to get a new one
                    this.refreshTokens()
                        .subscribe(
                            // we manage to refresh the tokens so we can carry with the scheduleRefresh
                            () => this.scheduleRefresh(),
                            error => {
                                //couldn't refresh it, this means our refresh token has expired
                                console.warn(error);
                                this.alert.sendWarning("Your session has expired");

                                this.authActions.isNotLoggedIn();
                                this.authActions.authReady();
                            }
                        );
                }
            })
    }

    scheduleRefresh(): void {
        let source = this.store.select( state => state.auth.tokens)
            .take(1)
            .flatMap(tokens => {
                // let issued = new Date(tokens[".issued"]).getTime() / 1000;
                // let expires = new Date(tokens[".expires"]).getTime() / 1000;
                //
                // let refreshTokenThreshold = 10; //seconds
                // let delay = ((expires - issued) - refreshTokenThreshold) * 1000;
                // delay = delay > 1800000 ? 1800000 : delay;

                //the token should be new here so that means take half of it's expiry time should be fine
                let delay = tokens["expires_in"] /2 * 1000;
                console.log(delay);
                return Observable.interval(delay);//ms
            });

        this.refreshSubscription$ = source.subscribe(() => {
            console.log("refresh fired");
            this.refreshTokens()
                .subscribe( )
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