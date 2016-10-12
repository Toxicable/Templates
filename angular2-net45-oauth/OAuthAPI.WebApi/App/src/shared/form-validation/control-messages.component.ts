/**
 * Created by Fabian on 1/10/2016.
 */
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidationService } from '../../core/common/form-validation.service';

@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessages {
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return FormValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}