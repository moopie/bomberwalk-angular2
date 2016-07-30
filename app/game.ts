export interface IGameObject {
  getType(): GameObjectType;
  toString(): string;
}

export class GameObject implements IGameObject {
  constructor(public type: GameObjectType){}
  getType():GameObjectType{
      return this.type;
  }
  toString(): string {
    return "test";
  }
}

export enum GameObjectType {
  EmptySpace,
  PlayerStart,
  Player,
  Bomb,
  Exit,
  Unknown
}

export enum GameState {
  LostRound,
  WonRound,
  InProgress
}

export class GameConfig {
  public DebugMode: boolean;
  public AllowCustomMaps: boolean;
}

export class Pos {
  constructor (public x: number = 0, public y: number = 0){
  }
}

export class Cell {
  constructor(private pos: Pos, private contains: Array<IGameObject>){}
  getPos(): Pos { return this.pos; }
  getContents(): Array<IGameObject> { return this.contains; }
  removeItem(item: IGameObject): boolean {
    let idx = this.contains.findIndex((i) => {
      return i == item;
    });
    let deleted = false;
    if (idx != -1) {
      this.contains.splice(idx, 1);
      deleted = true;
    }
    return deleted;
  }
  addItem(item: IGameObject): boolean {
    this.contains.push(item);
    return true;
  }
}

const defaultConfig = new GameConfig();
defaultConfig.DebugMode = true;
defaultConfig.AllowCustomMaps = true;

export class Game {
  private _worldMap: Cell[][];
  constructor(map: Array<Array<string>> = null, private config: GameConfig = defaultConfig){
    if (map != null && config.AllowCustomMaps) {
      for (let row in map) {
        this._worldMap.push([]);
        for (let col in map[row]) {
          switch (map[+row][+col]) {
            case ' ':
            case '':
              let emptySpace = new GameObject(GameObjectType.EmptySpace);
              this._worldMap[row].push(new Cell(new Pos(+row, +col), [emptySpace]));
              break;
            case '0':
              let bomb = new GameObject(GameObjectType.Bomb);
              this._worldMap[row].push(new Cell(new Pos(+row, +col), [bomb]));
              break;
            case '@':
              let playerStart = new GameObject(GameObjectType.PlayerStart);
              this._worldMap[row].push(new Cell(new Pos(+row, +col), [playerStart]));
              break;
            case '>':
              let exit = new GameObject(GameObjectType.Exit);
              this._worldMap[row].push(new Cell(new Pos(+row, +col), [exit]));
              break;
            default:
              let space = new GameObject(GameObjectType.EmptySpace);
              this._worldMap[row].push(new Cell(new Pos(+row, +col), [space]));
              break;
          }
        }
      }
    }
    else {
    }
  };
  left(item: IGameObject) {}
  right(item: IGameObject) {}
  up(item: IGameObject) {}
  down(item: IGameObject) {}
  lookAt(loc: Pos): IGameObject { return null; }
  register(player: IGameObject): Pos { return new Pos(); }
  getState(obj: IGameObject) : GameState { return GameState.InProgress; }
}
