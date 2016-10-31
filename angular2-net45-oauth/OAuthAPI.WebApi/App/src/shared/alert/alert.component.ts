import {Component, OnInit, OnDestroy} from '@angular/core'
import {AlertService} from "../../core/services/alert.service";
import {Subscription} from "rxjs";
import {Alert} from "../../core/models/alert.model";
import {AlertType} from "../../core/models/alert-types";

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy{
    constructor(private alertService: AlertService){}

    subscription: Subscription;
    alerts: Alert[]= [];
    id: number = 1;

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.alertService.alertAnnounced$.subscribe((alert) => {
                alert.id = this.id;
                this.id ++;

                this.alerts.push(alert);
                setTimeout(() =>{
                    let index = this.alerts.findIndex( a => a.id == this.id - 1);
                    this.alerts.splice(index, 1);
                    this.id --;

                }, 5000);
            });
    }


}
