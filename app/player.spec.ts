import { Player } from './player'
import { Game, GameState } from './game'

describe('Player movement test', () => {
  it('should move', () => {
    let game = new Game([
      ['@', ' ', ' ']
    ]);
    let player = new Player(game);
    player.right();
    let pos = player.getPos();
    player.right();
    expect(player.getPos() != pos).toEqual(true, 'player moved');
  });
  it('should win the game', () => {
    let game = new Game([
      ['@', ' ', '>']
    ]);
    let player = new Player(game);
    player.right();
    player.right();
    expect(game.getState(player) == GameState.WonRound).toEqual(true, 'player won');
  });
  it('should lose game', () => {
    let game = new Game([
      ['@', ' ', '0']
    ]);
    let player = new Player(game);
    player.right();
    player.right();
    expect(game.getState(player) == GameState.LostRound).toEqual(true, 'player lost');
  });
  it('should not move when hit obstacle', () => {
    let game = new Game([
      ['@', ' ', ' ']
      ['@', ' ', '>']
    ]);
    let player = new Player(game);
    player.right();
    player.right();
    let pos = player.getPos();
    player.right();
    expect(player.getPos() == pos).toEqual(true, 'player didn\'t move');
  })
});
