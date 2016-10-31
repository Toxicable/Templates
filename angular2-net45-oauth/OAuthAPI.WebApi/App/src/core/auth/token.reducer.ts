import { ActionReducer, Action } from '@ngrx/store';
import {Tokens} from '../models/tokens'

const initialState: Tokens = {} as Tokens;

export const tokensReducer: ActionReducer<Tokens> = (state: Tokens = initialState, action: Action) => {
    switch (action.type){
        case "GET_TOKENS":
            return action.payload;

        case "DELETE_TOKENS":
            return initialState;

        default:
            return state;
    }
}