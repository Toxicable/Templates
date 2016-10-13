/**
 * Created by Fabian on 13/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import {LoadingBarService} from "../../core/common/loading-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../core/common/alert.service";
import {Http} from "@angular/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidationService} from "../../core/common/form-validation.service";

@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    constructor(private alert: AlertService,
                private route: ActivatedRoute,
                private router: Router,
                private http: Http,
                private loadingBar: LoadingBarService,
                private formBuilder: FormBuilder
    ){}

    private id: string;
    private code: string;
    resetPasswordForm: FormGroup;
    ngOnInit() {

        let code = this.route.snapshot.queryParams['code'];
        let id = this.route.snapshot.queryParams['userId'];
        if(code && id){
            this.id = id;
            this.code = code;
        }else{
            this.alert.sendError("Missing UserID and reset code")
        }

            this.resetPasswordForm = this.formBuilder.group({
                oldPassword: ['', [Validators.required, FormValidationService.passwordValidator]],
                passwords: this.formBuilder.group({
                    password: ['', [Validators.required, FormValidationService.passwordValidator]],
                    confirmPassword: ['', [Validators.required, FormValidationService.passwordValidator]]
                }, {validator: FormValidationService.passwordComparisonValidator})
            });
        }


    submit(){
        this.http.post("api/account/resetpassword", this.resetPasswordForm.value)
            .subscribe(
                () => {
                    this.alert.sendSuccess("Successfully reset password");
                    this.router.navigate(['auth/login']);
                }
            )
    }


}