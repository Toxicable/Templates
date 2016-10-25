/**
 * Created by Fabian on 25/10/2016.
 */
import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../core/auth/profile.service";

@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
    constructor(private profile: ProfileService) { }

    ngOnInit() { }



}