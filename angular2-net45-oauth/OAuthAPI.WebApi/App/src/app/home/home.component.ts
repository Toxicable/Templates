/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/services/alert.service";
import {AuthService} from "../../core/auth/auth.service";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";


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

    test$ = Observable.of([1, 2 ]).delay(3000);

    testAuth() {
        this.authHttp.get("api/account/isauthenticated")
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