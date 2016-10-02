/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {AuthHttpService} from "../../auth-http/auth-http.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private authHttpService: AuthHttpService){}
    testResult: string = "";
    testAuth(){
        this.authHttpService.get("account/authtest").then(x => this.testResult = x)
    }
}