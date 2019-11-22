const player = require('../src/player');

describe('player', () => {
  describe('given that an argument is passed when object is created', () => {
    beforeEach(() => {
      return (player_one = new player('tester_one'));
    });

    it('should have the value of name', () => {
      expect(player_one.getName()).toEqual('tester_one');
    });
  });

  describe('given that an argument is NOT passed when an object is created', () => {
    beforeEach(() => {
      return (player_one = new player());
    });

    it('should store Player 1 when no name is passed to object', () => {
      expect(player_one.getName()).toEqual('Player 1');
    });
  });
});
