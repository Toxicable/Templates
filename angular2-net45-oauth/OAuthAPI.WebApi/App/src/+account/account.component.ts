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
                private validatior: FormValidationService
    ) { }

    resetPasswordForm: FormGroup;
    errors: string[];

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required, this.validatior.passwordValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, this.validatior.passwordValidator]],
                confirmPassword: ['', [Validators.required, this.validatior.passwordValidator]]
            }, {validator: this.validatior.passwordComparisonValidator})
        });
    }



}