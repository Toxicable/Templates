/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {AuthHttp} from "../../auth/auth-http.service";


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private authHttp: AuthHttp

    ){}
    testResult: string = "";
    testAuth(){
        this.authHttp.get("api/accounts/isauthenticated")
            .then(x =>this.alertService.sendSuccess("all goods"),
            res => {
                this.alertService.sendWarning("Your are not logged in");
                //this.router.navigateByUrl("/auth/login")
            })
    }
}