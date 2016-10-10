/**
 * Created by Fabian on 7/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ProfileService} from "../profile/profile.service";
import {AlertService} from "../../app/alert/alert.service";
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {LoadingBarService} from "../../app/loading-bar/loading-bar.service";
import {AuthService} from "../auth.service";
import {AuthHttp} from "angular2-jwt";

@Component({
    selector: 'verify',
    templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit{
    constructor(private profile: ProfileService,
                private authHttp: AuthHttp,
                private alert: AlertService,
                private route: ActivatedRoute,
                private http: Http,
                private loadingBar: LoadingBarService,
                private auth: AuthService
    ){}
    ngOnInit(): void {
        if(!this.profile.isEmailConfirmed()){
            let code = this.route.snapshot.queryParams['code'];
            let id = this.route.snapshot.queryParams['userId'];
            if(code && id){
                this.confirmEmail(code, id)
            }else{
                this.sendConfirmationEmail();
            }
        }
    }

    confirmEmail(code: string, id: string): void{
        code = encodeURIComponent(code);

        this.http.get("api/accounts/ConfirmEmail?userId=" + id + "&code=" + code)
            .subscribe(
                (res) => {
                    this.auth.refreshTokens().subscribe(
                        () => this.alert.sendSuccess("Your email has been confirmed"),
                        (res) => this.alert.sendError("an error occured soz")
                    );
                },
                (res) => this.alert.sendError("an error occured soz")
        )
    }

    sendConfirmationEmail(): void{
        this.loadingBar.isLoading()

        this.authHttp.get("api/accounts/SendConfirmEmail")
            .subscribe(
                () => this.alert.sendSuccess("A confirmation email has been send"),
                (error) => this.alert.sendError(error),
                () => this.loadingBar.doneLoading()
        )
    }

}