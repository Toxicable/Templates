import {Component, ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'my-app',
    template: '<navigation></navigation><router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
}