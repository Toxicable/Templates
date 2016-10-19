import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {AlertComponent} from "./alert/alert.component";
import {ValidationSummaryComponent} from "./form-validation/validation-summary.component";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlMessagesComponent} from "./form-validation/control-messages.component";
import {LoadingBarComponent} from "./loading-bar/loading-bar.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";


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
        ValidationSummaryComponent,
        FileUploadComponent
    ],
    exports: [
        ReactiveFormsModule,
        HttpModule,
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        CommonModule,
        ValidationSummaryComponent,
        FileUploadComponent
    ]
})
export class SharedModule {}