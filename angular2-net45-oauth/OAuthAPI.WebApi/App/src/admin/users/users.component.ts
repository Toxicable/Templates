/**
 * Created by Fabian on 6/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {AuthHttp} from "../../auth/auth-http.service";

@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit{
    constructor(private authHttp: AuthHttp) { }
    ngOnInit(): void {
        this.authHttp.get('api/accounts/users')
            .then( res => this.users = res.json() )
    }
    users : any[];
}