/**
 * Created by Fabian on 10/10/2016.
 */
import { Injectable } from '@angular/core';
import {JwtHelper, AuthHttp, tokenNotExpired} from "angular2-jwt";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable, Scheduler} from "rxjs";
import {TokenResult} from "./models/token-result";
import {ProfileModel} from "./models/profile-model";

@Injectable()
export class TokenManagementService {

    jwtHelper: JwtHelper = new JwtHelper();
    refreshSubscription: any;

    constructor(private authHttp: AuthHttp, private http: Http) { }


    private refreshTokens() {
        let refreshTokenId = localStorage.getItem('refresh_token');

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        let data = {
            grant_type: "refresh_token",
            client_id: "AngularApp",
            refresh_token: refreshTokenId
        };

        console.log("refreshing tokens")

        return this.http.post('api/token', this.encodeObjectToParams(data), options)
            .map((res) => this.storeTokens(res.json()))
            .catch(error => Observable.throw("the refresh token has expired probs"));
    }

    get isAuthenticated(): boolean {
        return tokenNotExpired(undefined, localStorage.getItem('access_token'));
    }

    public scheduleRefresh() {
        let source = this.authHttp.tokenStream.flatMap(
            streamToken => {
                let token = this.jwtHelper.decodeToken(streamToken) as ProfileModel;
                let iat = new Date(localStorage.getItem('.issued')).getTime()/1000;
                let refreshTokenThreshold = 10; //seconds
                let delay = ((token.exp - iat) - refreshTokenThreshold) * 1000;

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.refreshTokens()
                .subscribe()
        });
    }

    public startupTokenRefresh() {
        if (!this.isAuthenticated) {
            console.log("user not auth on startup")
        }

        this.refreshTokens().subscribe(
            () => this.scheduleRefresh(),
            (error) => {
                console.log(error);
                console.log("we can probs redirect here");
            }
        );
        return ;

        //code below here is uneeded becasue of the above?

        let source = this.authHttp.tokenStream.flatMap(
            token => {
                let now = new Date().valueOf()/1000;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(localStorage.getItem('.issued')).getTime()/1000;

                let refreshTokenThreshold = 10; //seconds

                let delay: number = jwtExp - now ;
                let totalLife: number = (jwtExp - iat);
                (delay < refreshTokenThreshold ) ? delay = 1 : delay = delay - refreshTokenThreshold;

                return Observable.timer(delay*1000); //ms
            });


        source.subscribe(() => {
            this.refreshTokens().subscribe(
                (res) => {
                    this.scheduleRefresh();
                },
                (error) => console.log('-> Refresh error:'+ JSON.stringify(error)))
        });

    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

    public unscheduleRefresh() {
        debugger
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    private storeTokens(model: TokenResult): void{
        let jwtHelper: JwtHelper = new JwtHelper();
        let profile = jwtHelper.decodeToken(model.access_token) as ProfileModel

        localStorage.setItem(".issued", model[".issued"]);
        localStorage.setItem("access_token", model.access_token);
        localStorage.setItem("refresh_token", model.refresh_token);
        localStorage.setItem("profile", JSON.stringify(profile));
    }
}