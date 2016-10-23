/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {AuthService} from "../../core/auth/auth.service";
import {ProfileService} from "../../core/auth/profile.service";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styles: ['./src/app/navigation/navigation.component.scss']
})
export class NavigationComponent {
    constructor(private auth: AuthService,
                private profile: ProfileService
    ){}
}