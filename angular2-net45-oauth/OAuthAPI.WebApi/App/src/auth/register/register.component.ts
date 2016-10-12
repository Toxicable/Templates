import {Component, OnInit, Inject} from '@angular/core'
import { RegisterModel } from '../models/register-model'
import { FormGroup,    FormControl,    Validators,    FormBuilder }    from '@angular/forms';
import {AuthService} from "../../core/auth/auth.service";
import {FormValidationService} from "../../core/common/form-validation.service";
import {AlertComponent} from "../../shared/alert/alert.component";
import {AlertService} from "../../core/common/alert.service";
import {Router} from "@angular/router";
import {BadRequestResult} from "../models/bad-request-result";

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent  implements OnInit {
   constructor(private formBuilder: FormBuilder,
               private authService: AuthService,
               private alertService: AlertService,
               private router: Router
   ) {   }
    registerForm: FormGroup;


    ngOnInit() {
           this.registerForm = this.formBuilder.group({
               userName: ['', [Validators.required, FormValidationService.emailValidator]],
               passwords: this.formBuilder.group({
                   password: ['', [Validators.required, FormValidationService.passwordValidator]],
                   confirmPassword: ['', [Validators.required, FormValidationService.passwordValidator]]
               }, {validator: FormValidationService.passwordComparisonValidator})
         });
    }


    onSubmit(){
        let data = Object.assign({}, this.registerForm.value, this.registerForm.value.passwords);
        //TODO: find better way to do this :/
        this.authService.register(data)
            .subscribe( x => {
                    this.alertService.sendSuccess("Successfully registered");
                    this.router.navigateByUrl("/auth/login");
                },
                error => this.alertService.sendError(error)
            )
    };


}