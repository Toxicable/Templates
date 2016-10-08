import {Component, ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
<loading-bar></loading-bar>
<alert></alert>
<navigation></navigation>
<router-outlet></router-outlet>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
}