import { Component } from '@angular/core';

const BOARD_X = 10;
const BOARD_Y = 10;

class CellInfo {
  constructor(public cell: Cell, public x: number, public y: number) {}
}

class Cell {
  constructor(public visited: boolean = false) {}
}

class GameObject {
  dead: boolean = false;
  bomb: boolean = false;
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
    <button class="control left"  (click)="left()">&lt;</button>
    <button class="control up"    (click)="up()">^</button>
    <button class="control right" (click)="right()">&gt;</button>
    <button class="control down"  (click)="down()">v</button>
  </div>
  <div class="map">
    <div *ngFor="let row of map; let x = index">
      <div class="row" *ngFor="let cell of row; let y = index">
        <div  class="cell">
          [<div class="inner"
                [class.visited]="cell.visited"
                [class.player]="player.x == x && player.y == y"
                [class.dead]="player.x == x && player.y == y && player.dead">
            {{displayPoint(x, y)}}
          </div>]
        </div>
      </div>
    </div>
  </div>
  `
})
export class GameComponent {
  map: Cell[][];
  player: GameObject;
  bombs: GameObject[];

  constructor() {
    this.map = new Array<Cell[]>();
    for (let i = 0; i < BOARD_X; i++) {
      this.map[i] = new Array<Cell>();
      for (let j = 0; j < BOARD_Y; j++) {
        this.map[i][j] = new Cell();
      }
    }
    this.bombs = new Array<GameObject>();
    let bombCount = Math.floor(Math.random() * 20);
    for(let i = 0; i < bombCount; i++) {
      let bombX = Math.floor(Math.random() * BOARD_X);
      let bombY = Math.floor(Math.random() * BOARD_Y);
      let contains = this.bombs.filter((b) => {
        return b.x == bombX && b.y == bombY;
      });
      if (contains.length > 0) continue;
      let bomb = new GameObject(bombX, bombY);
      bomb.bomb = true;
      this.bombs.push(bomb);
    }
    console.dir(this.bombs);
    let playerX = Math.floor(Math.random() * BOARD_X);
    let playerY = Math.floor(Math.random() * BOARD_Y);
    this.player = new GameObject(playerX, playerY);
  }
  private nextStep(player: GameObject, dir: DirType): CellInfo {
    let x = player.x;
    let y = player.y;
    switch(dir) {
      case DirType.Left:
        return new CellInfo(this.map[x][y - 1], x, y - 1);
      case DirType.Up:
        return new CellInfo(this.map[x - 1][y], x - 1, y);
      case DirType.Right:
        return new CellInfo(this.map[x][y + 1], x, y + 1);
      case DirType.Down:
        return new CellInfo(this.map[x + 1][y], x + 1, y);
    }
  }
  private validate(player: GameObject, dir: DirType) {
    let nextStep = this.nextStep(player, dir);
    let playerDead = player.dead;
    return !playerDead && nextStep.cell != null && !nextStep.cell.visited;
  }
  private move(dir: DirType) {
    if (!this.validate(this.player, dir)) return;
    this.map[this.player.x][this.player.y] = new Cell(true);
    let nextStep = this.nextStep(this.player, dir);
    let playerDead = false;
    for (var bomb of this.bombs) {
      if (bomb.x == nextStep.x && bomb.y == nextStep.y) {
        playerDead = true;
      }
    }
    let newPlayer = new GameObject(nextStep.x, nextStep.y);
    newPlayer.dead = playerDead;
    this.player = newPlayer;
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
    if (this.player.x == x && this.player.y == y && this.player.dead) {
      resp = ' x ';
    } else if (this.player.x == x && this.player.y == y) {
      resp = ' @ ';
    } else if (point.visited) {
      resp = ' - ';
    } else {
      resp = ' . ';
    }
    return resp;
  }
}
