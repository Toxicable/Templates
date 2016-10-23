 /**
 * Created by Fabian on 12/10/2016.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {LoadingBarService} from "./common/loading-bar.service";
import {AlertService} from "./common/alert.service";
import {AuthService} from "./auth/auth.service";
import {ProfileService} from "./auth/profile.service";
import {provideAuth, AuthConfig, AuthHttp} from "angular2-jwt";
import {SuperAdminAuthGuard} from "./guards/super-admin-auth-guard.service";
 import {AuthenticatedAuthGuard} from "./guards/authenticated-auth-guard.service";
 import {TokenStorageService} from "./auth/token-storage.service";
 import {Title} from "@angular/platform-browser";
 import {Http, RequestOptions} from "@angular/http";
 import {HttpExceptions} from "./http-exceptions/http-exceptions";


 export function authFactory(http: Http, options: RequestOptions) {
     return new AuthHttp(new AuthConfig({
         headerName: "Authorization",
         headerPrefix: "Bearer",
         tokenName: "access_token",
         globalHeaders: [{'Content-Type':'application/json'}],
         noJwtError: true,
         noTokenScheme: true
     }), http, options);
 };

 // Include this in your ngModule providers
 export const authProvider = {
     provide: AuthHttp,
     deps: [Http, RequestOptions],
     useFactory: authFactory
 };


@NgModule({
    providers:[
        LoadingBarService,
        AlertService,
        AuthService,
        ProfileService,
        SuperAdminAuthGuard,
        AuthenticatedAuthGuard,
        TokenStorageService,
        Title,
        HttpExceptions,
        authProvider
        // provideAuth({
        //     headerName: "Authorization",
        //     headerPrefix: "Bearer",
        //     tokenName: "access_token",
        //     globalHeaders: [{'Content-Type':'application/json'}],
        //     noJwtError: true,
        //     noTokenScheme: true
        // })
    ]

})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}