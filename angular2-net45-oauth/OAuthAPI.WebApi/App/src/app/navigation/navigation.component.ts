/**
 * Created by Fabian on 30/09/2016.
 */
import { Component } from '@angular/core'
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent {
    constructor(private auth: AuthService){}
}