import {AlertType} from "./AlertTypes";
/**
 * Created by Fabian on 7/10/2016.
 */
export interface Alert{
    message: string;
    type: AlertType;
    id: number;
}