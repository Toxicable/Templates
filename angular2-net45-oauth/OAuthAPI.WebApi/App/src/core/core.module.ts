import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SuperAdminAuthGuard} from "./guards/super-admin-auth-guard.service";
import {AuthenticatedAuthGuard} from "./guards/authenticated-auth-guard.service";
import {Title} from "@angular/platform-browser";
import {LocalStorageBackend, Storage} from "./storage";
import {authProvider} from "./auth-factory";
import {LoadingBarService} from "./services/loading-bar.service";
import {AlertService} from "./services/alert.service";
import {AuthService} from "./auth/auth.service";
import {ProfileService} from "./profile/profile.service";
import {TokenStorageService} from "./auth/token-storage.service";
import {HttpExceptionService} from "./services/http-exceptions.service";
import {AuthApiService} from "./services/auth-api.service";
import {FormValidationService} from "./services/form-validation.service";
import {AuthGuard} from './guards/auth-guard.service';
import {TokenService} from './auth/token.service';


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
        AuthApiService,
        HttpExceptionService,
        FormValidationService,
        AuthGuard,
        TokenService,
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