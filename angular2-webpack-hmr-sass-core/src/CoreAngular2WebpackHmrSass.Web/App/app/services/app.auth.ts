import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    lock = new Auth0Lock('JEXaDhlGnxvpvOOjdNTEHvspfK0RHj4u', 'fabianwiles.au.auth0.com', {});

    constructor() {
        //un comment to auth while routing enabled
        //debugger
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        this.lock.show();
    };

    public authenticated() {
        return tokenNotExpired();
    };

    public logout() {
        localStorage.removeItem('id_token');
    };
}
