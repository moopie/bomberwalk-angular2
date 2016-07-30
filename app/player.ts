import { IGameObject, Pos, GameObjectType, Game } from './game'

export class Player implements IGameObject {
  constructor(game: Game) {}
  left() {}
  right() {}
  up() {}
  down() {}
  getPos(): Pos { return new Pos(); }
  getType(): GameObjectType { return GameObjectType.Player; }
  toString(): string { return '@'; }
};
