/**
 * Created by Fabian on 25/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../core/auth/profile.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidationService} from "../core/common/form-validation.service";

@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
    constructor(private profile: ProfileService,
                private formBuilder: FormBuilder,
    ) { }

    resetPasswordForm: FormGroup;
    errors: string[];

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required, FormValidationService.passwordValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, FormValidationService.passwordValidator]],
                confirmPassword: ['', [Validators.required, FormValidationService.passwordValidator]]
            }, {validator: FormValidationService.passwordComparisonValidator})
        });
    }



}