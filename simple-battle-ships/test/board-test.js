const sinon = require('sinon');
const board = require('../src/board.js');
const player = require('../src/player.js');
const ship = require('../src/ship.js');

describe('board will be able keep track of ships', () => {
  describe('create board object with a default grid', () => {
    it('should be to create a board object', () => {
      const newBoard = new board();

      expect(newBoard.getBoard()).toEqual(expectedOutcome);
    });
  });
});

