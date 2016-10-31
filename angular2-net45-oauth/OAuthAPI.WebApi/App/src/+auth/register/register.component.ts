import {Component, OnInit} from '@angular/core'
import { FormGroup, Validators,    FormBuilder }    from '@angular/forms';
import {AuthService} from "../../core/auth/auth.service";
import {FormValidationService} from "../../core/services/form-validation.service";
import {AlertService} from "../../core/services/alert.service";
import {Router} from "@angular/router";

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent  implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private alertService: AlertService,
                private router: Router,
                private validator: FormValidationService
    ) {   }
    registerForm: FormGroup;
    errors: string[];

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', [Validators.required, this.validator.emailValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, this.validator.passwordValidator]],
                confirmPassword: ['', [Validators.required, this.validator.passwordValidator]]
            }, {validator: this.validator.passwordComparisonValidator})
        });
    }


    onSubmit(){
        let data = Object.assign({}, this.registerForm.value, this.registerForm.value.passwords);
        //TODO: find better way to do this :/
        this.authService.register(data)
            .subscribe( x => {
                    this.alertService.sendSuccess("Successfully registered");
                    this.router.navigateByUrl("/+auth/login");
                },
                errors => this.errors = errors
            )
    };


}