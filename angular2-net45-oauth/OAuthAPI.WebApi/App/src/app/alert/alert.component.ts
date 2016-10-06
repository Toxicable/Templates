/**
 * Created by Fabian on 1/10/2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core'
import {AlertService} from "./alert.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy{
    constructor(private alertService: AlertService){}

    subscription: Subscription;
    alertText: string = "";

    ngOnInit(): void {
        this.subscription = this.alertService.alertAnnounced$.subscribe(msg =>
            this.alertText = msg
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
