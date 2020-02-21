const Player = require('../../src/player');
const Board = require('../../src/board');
const { emptyBoard } = require('../fixtures/boardFixtures');

describe('player', () => {
  beforeEach(() => {
    return (player_one = new Player('tester_one'));
  });

  describe('getName', () => {
    describe('given that a name is chosen when the object is created', () => {

      it('should have the value of name', () => {
        expect(player_one.getName()).toEqual('tester_one');
      });
    });

    describe('given that a name is not chosen when the object is created', () => {
      beforeEach(() => {
        return (player_one = new Player());
      });

      it('should store Player 1 when no name is passed to object', () => {
        expect(player_one.getName()).toEqual('Player 3');
      });
    });
  });

  describe('setAssignedBoard', () => {
    describe('given a board', () => {
      it('should assign it to the player', () => {
        player_one.setAssignedBoard(new Board());
        expect(player_one.getAssignedBoard().getBoard()).toStrictEqual(emptyBoard);
      });
    });
  });
});
