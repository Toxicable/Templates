import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {LoadingBarComponent} from "./loading-bar";
import {AlertComponent} from "./alert/alert.component";
import {ControlMessagesComponent} from "./form-validation";
import {AlertService} from "../core/common/alert.service";
import {LoadingBarService} from "./loading-bar";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent
    ],
    exports: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessagesComponent,
        CommonModule
    ]
})
export class SharedModule {}