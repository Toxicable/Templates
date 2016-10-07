import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../app/alert/alert.service";
import {ValidationService} from "../../app/validation/validation.service";

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private alertService: AlertService
    ) { }

    loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]],
        });
    }

    onSubmit(){
        this.authService.login(this.loginForm.value).then(res => {
            this.alertService.sendSuccess("Successfully logged in")
        }, res => this.alertService.sendError(res))
    }

}