import {Injectable} from "@angular/core";
import {AuthApiService} from "../../core/services/auth-api.service";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';

@Injectable()
export class UserService{
    constructor(private api: AuthApiService,
                private store: Store<AppState>
    ){}

    path: string = '/users';

    getUsers(){
        return this.api.get(this.path + '/getUsers')
            .do( users => this.store.dispatch({ type: "GET_USERS", payload: users})
            );
    }

}