import { Component } from '@angular/core'
import {AuthService} from "../../core/services/auth.service";
import {ProfileService} from "../../core/services/profile.service";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent {
    constructor(private auth: AuthService,
                private profile: ProfileService
    ){}
}