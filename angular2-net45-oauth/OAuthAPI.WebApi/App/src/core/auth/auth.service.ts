import { Injectable }           from '@angular/core';
import { Http, Headers,
    RequestOptions, Response }   from '@angular/http';
import { RegisterModel }        from '../../+auth/models/register-model';
import {JwtHelper, AuthHttp, tokenNotExpired}    from 'angular2-jwt'
import { LoginModel }             from "../../+auth/models/login-model";
import { ProfileModel }           from "../models/profile-model";
import { Observable }           from 'rxjs/Observable';
import { TokenStorageService }    from "./token-storage.service";
import { HttpExceptionService }   from "../services/http-exceptions.service";
import { LoadingBarService } from '../services/loading-bar.service';
import {TokenService, RefreshGrant} from './token.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthService {
    constructor(private http: Http,
                private authHttp: AuthHttp,
                private storage: TokenStorageService,
                private httpExceptions: HttpExceptionService,
                private loadingBar: LoadingBarService,
                private tokens: TokenService
    ) {}

    refreshSubscription$: Subscription;

    get isLoggedIn(): Observable<boolean> {

        return this.storage.retrieveAccessToken()
            .map(token => tokenNotExpired(token));
    }

    public logout(){
        this.tokens.deleteTokens();
        this.unsubscribeRefresh();

    }
    unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    public login(user: LoginModel)  {
        return this.tokens.getTokens(user, "password")
            .do(res => this.scheduleRefresh() )
    }

    public register(data: RegisterModel): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.loadingBar.doWithLoader(
            this.http.post("api/account/create", data, options)
                .map(res => res)
                .catch( this.httpExceptions.handleError )
        );

    }

    public refreshTokens(): Observable<Response>{
        return this.storage.retrieveRefreshToken()
            .flatMap( refreshToken => {
                return this.tokens.getTokens(
                    { refresh_token: refreshToken } as RefreshGrant, "refresh_token")
                    .catch( error => Observable.throw("refresh tokens has expired"));
                //pretty sure the only way this can fail is with a expired tokens
            })
    }

    public startupTokenRefresh() {

        this.refreshTokens()
            .subscribe(
                () => this.scheduleRefresh()
        );
    }

    public scheduleRefresh(): void {
        let source = this.authHttp.tokenStream.flatMap(
            streamToken => {

                    let jwtHelper: JwtHelper = new JwtHelper();

                    let token = jwtHelper.decodeToken(streamToken) as ProfileModel;
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
}