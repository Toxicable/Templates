import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SuperAdminAuthGuard} from "./guards/super-admin-auth-guard.service";
import {AuthenticatedAuthGuard} from "./guards/authenticated-auth-guard.service";
import {Title} from "@angular/platform-browser";
import {StorageBackend, LocalStorageBackend, Storage} from "./storage";
import {authProvider} from "./auth-factory";
import {LoadingBarService} from "./services/loading-bar.service";
import {AlertService} from "./services/alert.service";
import {AuthService} from "./services/auth.service";
import {ProfileService} from "./services/profile.service";
import {TokenStorageService} from "./services/token-storage.service";
import {HttpExceptionService} from "./services/http-exceptions.service";
import {AuthApiService} from "./services/auth-api.service";
import {FormValidationService} from "./services/form-validation.service";


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