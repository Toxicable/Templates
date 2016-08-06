import { Component}          from '@angular/core';
import { Auth }              from './services'

import { AuthHttp }          from 'angular2-jwt';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [ROUTER_DIRECTIVES, ],
    providers: [Auth],
    styles: [require( './app.css').toString(), '']
})
export class AppComponent {
    API_URL: string = 'http://localhost:53708/';
    message: string;

    constructor(private auth: Auth, private authHttp: AuthHttp) { }

    public securedPing() {
        this.authHttp.get('/api/AuthTest/pingSecured')
            .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Request Complete')
        );
    }
}