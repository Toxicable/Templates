import {Component, OnInit, Inject} from '@angular/core'
import { RegisterModel } from '../models/register-model'
import { FormGroup,    FormControl,    Validators,    FormBuilder }    from '@angular/forms';
import {AuthService} from "../auth.service";

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent  implements OnInit {
   constructor(private formBuilder: FormBuilder){}//, private authService: AuthService) {   }
    registerForm: FormGroup;

    ngOnInit() {
           this.registerForm = this.formBuilder.group({
                userName: ['', Validators.required],
               password: ['', Validators.required],
               confirmPassword: ['', Validators.required]
         });
    }

    onSubmit(){
        console.log(this.registerForm)
    }


}