import {User} from '../+admin/models/user';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from '../+admin/users/user-reducer';
import {Tokens} from '../core/models/tokens';
import {tokensReducer} from '../core/auth/token.reducer';
import {ProfileModel} from '../core/models/profile-model';
import {profileReducers} from '../core/profile/profile.reducers';
import {loggedInReducer} from '../core/auth/loggedIn.reducers';
import {alertsReducer} from '../shared/alert/alert.reducer';
import {Alert} from '../core/models/alert.model';
import {loadingBarReducer} from '../shared/loading-bar/loading-bar.reducer';

export interface AppState{
    users: User[],
    tokens: Tokens,
    profile: ProfileModel,
    loggedIn: boolean,
    alerts: Alert[],
    loading: boolean
}

export const providedStore = StoreModule
    .provideStore({
        users: usersReducer,
        tokens: tokensReducer,
        profile: profileReducers,
        loggedIn: loggedInReducer,
        alerts: alertsReducer,
        loading: loadingBarReducer
    });