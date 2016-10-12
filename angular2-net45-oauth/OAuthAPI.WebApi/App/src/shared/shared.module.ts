import {NgModule} from "@angular/core";
import { CommonModule }        from '@angular/common';
import {LoadingBarComponent} from "./loading-bar";
import {AlertComponent} from "./alert/alert.component";
import {ControlMessages} from "./form-validation";
import {AlertService} from "../core/common/alert.service";
import {LoadingBarService} from "./loading-bar";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessages
    ],
    exports: [
        LoadingBarComponent,
        AlertComponent,
        ControlMessages,
        CommonModule
    ]
})
export class SharedModule {}