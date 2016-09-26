import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AuthService }   from './auth.service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'

@NgModule({
    imports: [
        CommonModule
        
    ],
    declarations: [
        AuthComponent,
        LoginComponent
    ],
    providers: [AuthService],
    exports: [AuthComponent],
    bootstrap: [AuthComponent]
})
export class AuthModule { }