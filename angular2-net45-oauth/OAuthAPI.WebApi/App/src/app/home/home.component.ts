import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/services/alert.service";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {TokenService} from '../../core/auth/token.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private authHttp: AuthHttp,
                private tokens: TokenService

    ){}

    testAuth() {
        this.authHttp.get("api/account/isauthenticated")
            .subscribe(
                x => this.alertService.sendSuccess("all goods"),
                error => this.alertService.sendWarning(error)
            )
    }


    refreshTokens() {
        this.tokens.refreshTokens()
            .subscribe()
    }

}