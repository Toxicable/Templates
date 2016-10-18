import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {LoadingBarComponent} from "./loading-bar";
import {AlertComponent} from "./alert/alert.component";
import {ControlMessagesComponent} from "./form-validation";
import {ValidationSummaryComponent} from "./form-validation/validation-summary.component";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";


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