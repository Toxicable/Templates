/**
 * Created by Fabian on 11/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";
import {FormValidationService} from "../../core/common/form-validation.service";
import {LoadingBarService} from "../../core/common/loading-bar.service";
import {AlertService} from "../../core/common/alert.service";

@Component({
    selector: 'forgot-password',
    templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private auth: AuthService,
                private alertService: AlertService,
                private loadingBar: LoadingBarService
    ) { }

    forgotPasswordForm: FormGroup;

    ngOnInit(): void {
        this.forgotPasswordForm = this.formBuilder.group({
            userName: ['', [Validators.required, FormValidationService.emailValidator]],
        });
    }

    onSubmit(){

    }

}