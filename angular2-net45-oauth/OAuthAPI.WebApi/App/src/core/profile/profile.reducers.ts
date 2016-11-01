import { ActionReducer, Action } from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';


export const profileReducer: ActionReducer<ProfileModel> = (state: ProfileModel, action: Action) => {
    switch (action.type){
        case "STORE_PROFILE":
            return action.payload;
        case "DELETE_PROFILE":
            return {};
        default:
            return state;
    }
}