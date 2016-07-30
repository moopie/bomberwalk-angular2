import { Game, GameConfig, GameObjectType, Pos } from './game'

describe('Game world creation tests', () => {
  it('should create the world properly', () => {
    let config = new GameConfig();
    config.DebugMode = true;
    let game = new Game([
      ['@', ' ', '0'],
      [' ', ' ', '>']
    ], config);
    expect(game.lookAt(new Pos(0, 0))).toBe(GameObjectType.PlayerStart, 'should be an empty player slot');
    expect(game.lookAt(new Pos(0, 2))).toBe(GameObjectType.Bomb, 'should be a bomb');
    expect(game.lookAt(new Pos(1, 0))).toBe(GameObjectType.EmptySpace, 'should be empty');
    expect(game.lookAt(new Pos(1, 2))).toBe(GameObjectType.Exit, 'should be an exit');
  });
  it('should make threats invisible', () => {
    let game = new Game([
      ['@', ' ', '0'],
      [' ', ' ', '>']
    ]);
    expect(game.lookAt(new Pos(0, 0))).toBe(GameObjectType.PlayerStart, 'should be an empty player slot');
    expect(game.lookAt(new Pos(0, 2))).toBe(GameObjectType.Unknown, 'should be unknown');
    expect(game.lookAt(new Pos(1, 0))).toBe(GameObjectType.Unknown, 'should be unknown');
    expect(game.lookAt(new Pos(1, 2))).toBe(GameObjectType.Unknown, 'should be unknown');
  });
});
