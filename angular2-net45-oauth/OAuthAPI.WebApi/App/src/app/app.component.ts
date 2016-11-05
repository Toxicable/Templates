import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core'
import {Store} from '@ngrx/store';
import {AppState} from './app-store';
import {TokenService} from '../core/auth/token.service';

@Component({
    selector: 'my-app',
    template: `
<loading-bar></loading-bar>
<alert></alert>
<navigation></navigation>
<router-outlet></router-outlet>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', './deeppurple-amber.css']
})
export class AppComponent implements OnInit, OnDestroy{

    constructor(private tokens: TokenService,
                private store: Store<AppState>
    ){    }

    ngOnInit(): void {
        this.tokens.startupTokenRefresh();
    }

    ngOnDestroy(): void {
        this.tokens.unsubscribeRefresh();
    }
}