import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {AlertComponent} from "./alert/alert.component";
import {ValidationSummaryComponent} from "./form-validation/validation-summary.component";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlMessagesComponent} from "./form-validation/control-messages.component";
import {LoadingBarComponent} from "./loading-bar/loading-bar.component";


@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpModule
    ],
    declarations: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        ValidationSummaryComponent
    ],
    exports: [
        ReactiveFormsModule,
        HttpModule,
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        CommonModule,
        ValidationSummaryComponent
    ]
})
export class SharedModule {}