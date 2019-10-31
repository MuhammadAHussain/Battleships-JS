const player = require('../src/player');

describe('should check if a player object can be created and can access its methods', () => {
  it('should have the players name if passed as argument', () => {
    const player_one = new player('tester_one');
    expect(player_one.getName()).toEqual('tester_one');
    // expect(player_one.getScore()).toEqual(0);
  });

  it('should store Player 1 when no name is passed to object', () => {
    const player_one = new player();
    expect(player_one.getName()).toEqual('Player 1');
    // expect(player_one.getScore()).toEqual(0);
  });
});
