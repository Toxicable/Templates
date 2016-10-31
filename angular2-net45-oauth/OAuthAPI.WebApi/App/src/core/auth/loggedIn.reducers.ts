import { ActionReducer, Action } from '@ngrx/store';

export const loggedInReducer: ActionReducer<boolean> = (state: boolean = false, action: Action) => {
    switch (action.type){
        case "UPDATE_LOGIN_STATUS":
            return action.payload;

        default:
            return state;
    }
}