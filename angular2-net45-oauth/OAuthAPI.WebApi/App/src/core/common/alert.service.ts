import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Alert} from "../../shared/alert/models/alert.model";
import {AlertType} from "../../shared/alert/models/alert-types";
/**
 * Created by Fabian on 1/10/2016.
 */
@Injectable()
export class AlertService{
    // Observable string sources

    private alertMessage = new Subject<Alert>();
    // Observable string streams

    alertAnnounced$ = this.alertMessage.asObservable();

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
        this.alertMessage.next(alert);
    }
}