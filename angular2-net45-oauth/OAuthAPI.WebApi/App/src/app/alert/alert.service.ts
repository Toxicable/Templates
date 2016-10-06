import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
/**
 * Created by Fabian on 1/10/2016.
 */
@Injectable()
export class AlertService{
    // Observable string sources

    private alertMessage = new Subject<string>();
    // Observable string streams

    alertAnnounced$ = this.alertMessage.asObservable();
    // Service message commands

    sendAlert(alertMessage: string) {
        this.alertMessage.next(alertMessage);
    }
}