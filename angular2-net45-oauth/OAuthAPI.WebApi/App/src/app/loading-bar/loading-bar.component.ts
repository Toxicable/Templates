/**
 * Created by Fabian on 8/10/2016.
 */
import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core'
import {LoadingBarService} from "./loading-bar.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'loading-bar',
    template: `
<div *ngIf="isLoading" class="load-bar">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
</div>`,
    styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
    constructor(private loadingBarService: LoadingBarService) { }

    subscription: Subscription;
    isLoading: boolean = false;

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.loadingBarService.loadingStatus$.subscribe((newStatus) => {
            this.isLoading = newStatus;

        });
    }
}


