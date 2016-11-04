import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidationService} from "../../core/services/form-validation.service";
import {AccountService} from '../../core/auth/account.service';

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private account: AccountService,
                private formValidator: FormValidationService,
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
        this.account.login(this.loginForm.value)
            .subscribe();

    }

}