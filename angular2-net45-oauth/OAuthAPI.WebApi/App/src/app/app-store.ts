import { StoreModule }       from '@ngrx/store';
import { Tokens }            from '../core/models/tokens';
//models
import { User }              from '../+admin/models/user';
import { Alert }             from '../core/models/alert.model';
import { ProfileModel }      from '../core/models/profile-model';
//reducers
import { tokensReducer }     from '../core/auth/token.reducer';
import { alertsReducer }     from '../shared/alert/alert.reducer';
import { loadingBarReducer } from '../shared/loading-bar/loading-bar.reducer';
import { usersReducer }      from '../+admin/users/user-reducer';
import { profileReducer }    from '../core/profile/profile.reducers';
import { loggedInReducer }   from '../core/auth/loggedIn.reducers';

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
        profile: profileReducer,
        loggedIn: loggedInReducer,
        alerts: alertsReducer,
        loading: loadingBarReducer
    });