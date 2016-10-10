import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core'
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'my-app',
    template: `
<loading-bar></loading-bar>
<alert></alert>
<navigation></navigation>
<router-outlet></router-outlet>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

    constructor(private auth: AuthService ){}

    ngOnInit(): void {
        this.auth.startupTokenRefresh();
    }

    ngOnDestroy(): void {
        this.auth.unsubscribeRefresh();
    }
}