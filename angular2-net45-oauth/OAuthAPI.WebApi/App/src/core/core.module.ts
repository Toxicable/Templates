import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SuperAdminAuthGuard} from "./guards/super-admin-auth-guard.service";
import {AuthenticatedAuthGuard} from "./guards/authenticated-auth-guard.service";
import {Title} from "@angular/platform-browser";
import {LocalStorageBackend, Storage} from "./storage";
import {authProvider} from "./auth-factory";
import {LoadingBarService} from "./services/loading-bar.service";
import {AlertService} from "./services/alert.service";
import {ProfileService} from "./profile/profile.service";
import {HttpExceptionService} from "./services/http-exceptions.service";
import {AuthApiService} from "./services/auth-api.service";
import {FormValidationService} from "./services/form-validation.service";
import {AuthGuard} from './guards/auth-guard.service';
import {TokenService} from './auth/token.service';
import {AccountService} from './auth/account.service';
import {AuthActions} from './auth/auth.store';
import {TokenActions} from './auth/token.store';
import {ProfileActions} from './profile/profile.reducers';


@NgModule({
    providers:[
        LoadingBarService,
        AlertService,
        ProfileService,
        SuperAdminAuthGuard,
        AuthenticatedAuthGuard,
        Title,
        AuthApiService,
        HttpExceptionService,
        FormValidationService,
        AuthGuard,
        TokenService,
        AccountService,

        AuthActions,
        TokenActions,
        ProfileActions,

        { provide: Storage, useClass: LocalStorageBackend },
        authProvider
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