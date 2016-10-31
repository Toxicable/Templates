import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Alert} from "../models/alert.model";
import {AlertType} from "../models/alert-types";
import {Store} from '@ngrx/store';
import {AppState} from '../../app/app-store';

@Injectable()
export class AlertService{
    constructor(private store: Store<AppState>){}

    sendSuccess(message: string) {
        this.sendAlert({message:message, type: AlertType.success} as Alert)
    }

    sendInfo(message: string) {
        this.sendAlert({message:message, type: AlertType.info} as Alert)
    }

    sendWarning(message: string) {
        this.sendAlert({message:message, type: AlertType.warning} as Alert)
    }

    sendError(message: string) {
        this.sendAlert({message:message, type: AlertType.error} as Alert)
    }

    private sendAlert(alert: Alert){
        this.store.dispatch({type: "ADD_ALERT", payload: alert});
        Observable.of(true)
            .delay(3000)
            .subscribe(
                () => this.store.dispatch({type: "REMOVE_ALERT", payload: alert.message})
            );
    }
}