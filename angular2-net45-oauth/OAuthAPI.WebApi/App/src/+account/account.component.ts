import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../core/services/profile.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidationService} from "../core/services/form-validation.service";

@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
    constructor(private profile: ProfileService,
                private formBuilder: FormBuilder,
                private formValidator: FormValidationService
    ) { }

    resetPasswordForm: FormGroup;
    errors: string[];

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required, this.formValidator.passwordValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, this.formValidator.passwordValidator]],
                confirmPassword: ['', [Validators.required, this.formValidator.passwordValidator]]
            }, {validator: this.formValidator.passwordComparisonValidator})
        });
    }



}