import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login-model'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

    loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(){
        this.authService.login(this.loginForm.value)
    }

}