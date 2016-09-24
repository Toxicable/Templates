import {Component} from '@angular/core';

const HEROS: Hero[] = [
    {id: 23, name: "Fabian"}
];

@Component({
    selector: 'home',
    template: require('./home.html'),
    directives: []
})
export class HomeComponent {
    heros = HEROS;
}

interface Hero {
    id: number;
    name: string;
}