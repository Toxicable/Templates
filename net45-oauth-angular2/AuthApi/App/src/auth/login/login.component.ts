import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login-model'

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent {
    //constructor( private authService: AuthService) {}

    //getToken(){
    //    this.authService.getToken();
    //}

}