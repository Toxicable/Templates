/**
 * Created by Fabian on 6/10/2016.
 */
import {Component, OnInit} from '@angular/core';
import {LoadingBarService} from "../../core/common/loading-bar.service";
import {AuthHttp} from "angular2-jwt";
import {UserService} from "../user.service";
import {RoleService} from "../roles.service";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styles: ["./src/app/+admin/users/users.component.scss"]
})
export class UsersComponent implements OnInit{
    constructor(private userService: UserService,
                private roleService: RoleService,
                private loadingBar: LoadingBarService
    ) { }
    ngOnInit(): void {
        this.getUsers();
    }
    users : any[];

    getUsers(){
        this.users = [];
        this.loadingBar.load();
        this.userService.getUsers()
            .subscribe(
                res => this.users = res.json(),
                error => console.log(error),
                () => this.loadingBar.done()
            )
    }

    removeFromRole(userId: string, roleId: string){
        this.roleService.removeFromRole(userId, roleId)
            .subscribe(
                //() => ,

            )
    }
}