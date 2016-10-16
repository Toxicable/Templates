/**
 * Created by Fabian on 16/10/2016.
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'control-messages',
    template: `
<div>
    <div *ngFor="let error of errorMessages">
        - {{error}}
    </div>
</div>`
})
export class ValidationSummaryComponent {
    @Input() errorMessages: string[];
}