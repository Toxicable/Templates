import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {LoadingBarComponent} from "./loading-bar";
import {AlertComponent} from "./alert/alert.component";
import {ControlMessagesComponent} from "./form-validation";
import {AlertService} from "../core/common/alert.service";
import {LoadingBarService} from "./loading-bar";
import {ValidationSummaryComponent} from "./form-validation/validation-summary.component";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        ValidationSummaryComponent
    ],
    exports: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        CommonModule,
        ValidationSummaryComponent
    ]
})
export class SharedModule {}