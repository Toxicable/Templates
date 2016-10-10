/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {AuthService} from "../../auth/auth.service";
import {AuthHttp} from "angular2-jwt";


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private authHttp: AuthHttp,
                private auth: AuthService

    ){}

    testAuth() {
        this.authHttp.get("api/accounts/isauthenticated")
            .subscribe(
                x => this.alertService.sendSuccess("all goods"),
                error => this.alertService.sendWarning(error)
            )
    }


    refreshTokens() {
        this.auth.refreshTokens()
            .subscribe()
    }

}