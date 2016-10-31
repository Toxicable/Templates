import {Component, OnInit, Input} from '@angular/core';
import {LoadingBarService} from "../../core/services/loading-bar.service";
import {UserService} from "./user.service";
import {RoleService} from "../roles.service";
import {Store} from '@ngrx/store';
import {AppState} from '../../app/store/app-store';
import {User} from '../models/user';

@Component({
    selector: 'user',
    templateUrl: './users.component.html',
    styleUrls:
        ["./users.component.scss"]
})
export class UsersComponent {
    @Input() user: User;
}