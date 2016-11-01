import {Component, OnInit} from '@angular/core'
import {ProfileService} from "../../core/profile/profile.service";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit{

    constructor(private profile: ProfileService,
                private store: Store<AppState>
    ){ }
    username$: Observable<string>;
    loggedIn$: Observable<boolean>

    ngOnInit(): void {
        this.username$ = this.store.select( state => state.profile.unique_name);
        this.loggedIn$ = this.store.select( state => state.loggedIn);
    }
}