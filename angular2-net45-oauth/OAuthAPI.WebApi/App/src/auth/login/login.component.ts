import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { LoginModel } from '../models/login-model'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../core/common/alert.service";
import {FormValidationService} from "../../core/common/form-validation.service";
import {LoadingBarService} from "../../core/common/loading-bar.service";

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private auth: AuthService,
                private alertService: AlertService,
                private loadingBar: LoadingBarService
    ) { }

    loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, FormValidationService.emailValidator]],
            password: ['', [Validators.required, FormValidationService.passwordValidator]],
        });
    }

    onSubmit(){
        this.loadingBar.isLoading();
        this.auth.login(this.loginForm.value)
            .subscribe(
                res => this.alertService.sendSuccess("Successfully logged in"),
                res => this.alertService.sendError(res),
                () => this.loadingBar.doneLoading()
            )
    }

}