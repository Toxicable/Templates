import 'zone.js/dist/zone';
import 'reflect-metadata';
import './rxjs-operators';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { enableProdMode} from '@angular/core';
import { APP_ROUTER_PROVIDER } from './app/app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AUTH_PROVIDERS }  from 'angular2-jwt';


bootstrap(AppComponent,[
   APP_ROUTER_PROVIDER,
   AUTH_PROVIDERS,
   HTTP_PROVIDERS,
]);

//Hot swapping
declare var module: any;
if (module.hot) {
    module.hot.accept();
}
