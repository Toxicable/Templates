/**
 * Created by Fabian on 24/09/2016.
 */
import {NgModule, ApplicationRef}                             from '@angular/core';
import {BrowserModule}                          from "@angular/platform-browser";
import {AppComponent}                           from "./app.component";
import {routing}                                from "./app.routing";
import {HomeComponent}                          from "./home";
import {NotFoundComponent}                      from "./not-found";
import {NavigationComponent}                    from "./navigation";
import {UnauthorizedComponent}                  from "./unauthorized";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {createNewHosts, createInputTransfer, removeNgStyles} from "@angularclass/hmr";
import {AuthService} from "../core/auth/auth.service";


@NgModule({
    imports:      [
        BrowserModule ,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent,
        UnauthorizedComponent
    ],

    bootstrap:    [ AppComponent ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef,
                private auth: AuthService
    ) {}

    hmrOnInit(store) {
        //refresh tokens
        this.auth.startupTokenRefresh();

        //HMR
        if (!store || !store.state) return;
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }
    hmrOnDestroy(store) {
        //refresh tokens
        this.auth.unsubscribeRefresh();

        //HMR
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation)
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        store.state = {data: 'yolo'};
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts()
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}
