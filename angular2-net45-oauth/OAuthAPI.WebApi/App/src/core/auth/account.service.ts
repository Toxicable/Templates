import { Injectable } from '@angular/core';
import {RegisterModel} from '../../+auth/models/register-model';
import {Observable} from 'rxjs';
import {Response, Http} from '@angular/http';
import {LoadingBarService} from '../services/loading-bar.service';
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {HttpExceptionService} from '../services/http-exceptions.service';
import {LoginModel} from '../../+auth/models/login-model';
import {TokenService} from './token.service';
import {AuthApiService} from '../services/auth-api.service';

@Injectable()
export class AccountService {

    constructor(private loadingBar: LoadingBarService,
                private store: Store<AppState>,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private tokens: TokenService,
                private authApi: AuthApiService
    ) { }

    register(data: RegisterModel): Observable<Response> {
        return this.loadingBar.doWithLoader(
            this.http.post("api/account/create", data)
                .map(res => res)
                .catch( this.httpExceptions.handleError )
        );
    }

    login(user: LoginModel)  {
        return this.loadingBar.doWithLoader(
            this.tokens.getTokens(user, "password")
                .do(res => this.tokens.scheduleRefresh() )
        )
    }

    sendForgotPassword( data ){
        return this.authApi.post("api/account/SendForgotPassword", data)
    }

    logout(){
        this.tokens.deleteTokens();
        this.tokens.unsubscribeRefresh();
        this.store.dispatch({type: "DELETE_TOKENS"});
        this.store.dispatch({type: "DELETE_PROFILE"});
        this.store.dispatch({type: "UPDATE_LOGIN_STATUS", payload: false});

    }

}