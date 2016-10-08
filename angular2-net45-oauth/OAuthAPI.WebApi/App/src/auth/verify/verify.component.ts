/**
 * Created by Fabian on 7/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ProfileService} from "../profile/profile.service";
import {AuthHttp} from "../auth-http/auth-http.service";
import {AlertService} from "../../app/alert/alert.service";
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";

@Component({
    selector: 'verify',
    templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit{
    constructor(private profile: ProfileService,
                private authHttp: AuthHttp,
                private alert: AlertService,
                private route: ActivatedRoute,
                private http: Http
    ){}
    ngOnInit(): void {
        if(!this.profile.isEmailConfirmed()){
            let code = this.route.snapshot.queryParams['code'];
            let id = this.route.snapshot.queryParams['id'];
            if(code && id){
                this.confirmEmail(code, id)
            }else{
                this.sendConfirmationEmail();
            }
        }
    }

    confirmEmail(code: string, id: string): void{
        this.http.get("api/accounts/ConfirmEmail?userId=" + id + "&code=" + code)
            .toPromise().then(
                (res) => this.alert.sendSuccess("Your email is confirmed"),
            (res) => this.alert.sendError("an error occured soz")
        )
    }

    sendConfirmationEmail(): void{
        this.authHttp.get("api/accounts/SendConfirmEmail")
            .subscribe(
            () => this.alert.sendSuccess("A confirmation email has been send"),
            (error) => this.alert.sendError(error)
        )
    }

}