import { Component } from   '@angular/core'
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component'

@Component({
    selector: 'my-auth',
    template: '<router-outlet></router-outlet>'
})
export class AuthComponent {
    //constructor(private authService: AuthService) { }

   // private authService: AuthService = new AuthService();
}