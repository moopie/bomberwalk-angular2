import { Component } from '@angular/core';
import { GameComponent } from './game.component';

@Component({
    selector: 'my-app',
    directives: [GameComponent],
    template: `
    <h1>Bomberwalk</h1>
    <game-board>
    `
})
export class AppComponent { }
