import { Component } from '@angular/core';

const BOARD_X = 10;
const BOARD_Y = 10;

class Cell {
  constructor(public visited: boolean = false) {}
}

class Point {
  constructor(public x: number, public y: number) {}
}

enum DirType {
  Left,
  Up,
  Right,
  Down
}

@Component({
  selector: 'game-board',
  template: `
  <div class="controls">
    <button class="left"  (click)="left()">&lt;</button>
    <button class="up"    (click)="up()">^</button>
    <button class="right" (click)="right()">&gt;</button>
    <button class="down"  (click)="down()">v</button>
  </div>
  <div class="map">
    <div *ngFor="let row of map; let x = index">
      <div class="row" *ngFor="let cell of row; let y = index">
        <div  class="cell"
              [class.visited]="cell.visited"
              [class.player]="player.x == x && player.y == y">
          [ {{displayPoint(x, y)}} ]
        </div>
      </div>
    </div>
  </div>
  `
})
export class GameComponent {
  map: Cell[][];
  player: Point;

  constructor() {
    this.map = new Array<Cell[]>();
    for (let i = 0; i < BOARD_X; i++) {
      this.map[i] = new Array<Cell>();
      for (let j = 0; j < BOARD_Y; j++) {
        this.map[i][j] = new Cell();
      }
    }
    let playerX = Math.floor(Math.random() * BOARD_X);
    let playerY = Math.floor(Math.random() * BOARD_Y);
    this.player = new Point(playerX, playerY);
  }
  private validate(x: number, y: number, dir: DirType) {
    let nextStep: Cell;
    switch(dir) {
      case DirType.Left:
        nextStep = this.map[x][y - 1];
        break;
      case DirType.Up:
        nextStep = this.map[x - 1][y];
        break;
      case DirType.Right:
        nextStep = this.map[x][y + 1];
        break;
      case DirType.Down:
        nextStep = this.map[x + 1][y];
        break;
    }
    return nextStep != null && !nextStep.visited;
  }
  private move(dir: DirType) {
    if (!this.validate(this.player.x, this.player.y, dir)) return;
    this.map[this.player.x][this.player.y] = new Cell(true);
    switch (dir) {
      case DirType.Left:
        this.player = new Point(this.player.x, this.player.y - 1);
        break;
      case DirType.Up:
        this.player = new Point(this.player.x - 1, this.player.y);
        break;
      case DirType.Right:
        this.player = new Point(this.player.x, this.player.y + 1);
        break;
      case DirType.Down:
        this.player = new Point(this.player.x + 1, this.player.y);
        break;
    }
  }
  left() {
    this.move(DirType.Left);
  }
  up() {
    this.move(DirType.Up);
  }
  right() {
    this.move(DirType.Right);
  }
  down() {
    this.move(DirType.Down);
  }
  displayPoint(x: number, y: number) {
    let point = this.map[x][y];
    let resp = '';
    if (this.player.x == x && this.player.y == y) {
      resp = '@';
    } else if (point.visited) {
      resp = 'x';
    } else {
      resp = '.';
    }
    return resp;
  }
}
