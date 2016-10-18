 /**
 * Created by Fabian on 12/10/2016.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {LoadingBarService} from "./common/loading-bar.service";
import {AlertService} from "./common/alert.service";
import {AuthService} from "./auth/auth.service";
import {ProfileService} from "./auth/profile.service";
import {provideAuth} from "angular2-jwt";
import {SuperAdminAuthGuard} from "./guards/super-admin-auth-guard.service";
 import {AuthenticatedAuthGuard} from "./guards/authenticated-auth-guard.service";
/**
 * Created by Fabian on 12/10/2016.
 */


@NgModule({
    providers:[
        LoadingBarService,
        AlertService,
        AuthService,
        ProfileService,
        SuperAdminAuthGuard,
        AuthenticatedAuthGuard,
        provideAuth({
            headerName: "Authorization",
            headerPrefix: "Bearer",
            tokenName: "access_token",
            tokenGetter: () => localStorage.getItem("access_token"),
            globalHeaders: [{'Content-Type':'application/json'}],
            noJwtError: true,
            noTokenScheme: true
        })
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