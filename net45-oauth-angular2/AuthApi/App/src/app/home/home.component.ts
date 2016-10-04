/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {AuthHttpService} from "../../auth-http/auth-http.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private authHttpService: AuthHttpService,
                private router: Router,
                private alertService: AlertService

    ){}
    testResult: string = "";
    testAuth(){
        this.authHttpService.get("account/authtest")
            .then(x =>this.testResult = x,
            res => {
                this.alertService.sendAlert("Your are not logged in");
                this.router.navigateByUrl("/auth/login")
            })
    }
}