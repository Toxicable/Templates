/**
 * Created by Fabian on 6/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {LoadingBarService} from "../../core/common/loading-bar.service";
import {AuthHttp} from "angular2-jwt";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styles: [require('./users.component.scss')]
})
export class UsersComponent implements OnInit{
    constructor(private authHttp: AuthHttp,
                private loadingBar: LoadingBarService
    ) { }
    ngOnInit(): void {


        this.loadingBar.isLoading();
        this.authHttp.get('api/users/getusers')
            .subscribe(
                res => this.users = res.json(),
                error => console.log(error),
                () => this.loadingBar.doneLoading()
             )
    }
    users : any[];
}