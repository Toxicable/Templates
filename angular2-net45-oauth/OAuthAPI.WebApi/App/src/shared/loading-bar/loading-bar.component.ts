import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core'
import {LoadingBarService} from "../../core/services/loading-bar.service";
import { Observable} from "rxjs/Observable";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';

@Component({
    selector: 'loading-bar',
    template: `
<div *ngIf="loading$ | async" class="load-bar">
  <div class="bar"></div>
    <div class="bar"></div>
  <div class="bar"></div>
  </div>`,
    styleUrls: ['loading-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
    constructor(private loadingBar: LoadingBarService,
                private store: Store<AppState>

    ) { }

    loading$ : Observable<boolean>;

    ngOnInit(): void {
        this.loading$ = this.store.select( state => state.loading);
    }
}


