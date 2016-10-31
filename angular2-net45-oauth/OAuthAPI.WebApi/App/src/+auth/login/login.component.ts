import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LoginModel } from '../models/login-model'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../core/services/alert.service";
import {FormValidationService} from "../../core/services/form-validation.service";
import {LoadingBarService} from "../../core/services/loading-bar.service";

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private auth: AuthService,
                private alertService: AlertService,
                private loadingBar: LoadingBarService,
                private formValidator: FormValidationService
    ) { }

    loginForm: FormGroup;
    errors: string[];

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, this.formValidator.emailValidator]],
            password: ['', [Validators.required, this.formValidator.passwordValidator]],
        });
    }

    onSubmit(){
        //this.loadingBar.load();
        this.errors = null;

        console.log(this.loginForm)
        this.loadingBar.doWithLoader(
            this.auth.login(this.loginForm.value)
        ).subscribe(
            res => this.alertService.sendSuccess("Successfully logged in"),
            error => console.log(error)
        )
    }

}