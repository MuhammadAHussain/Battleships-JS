const board = require('../../src/board.js');

const emptyBoard = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

describe('board-test', () => {
  beforeEach(() => {
    return (newBoard = new board());
  });
  describe('initialiseArray', () => {
    it('should be to create a board object', () => {
      expect.assertions(2);
      expect(newBoard.getBoard()).not.toBeNull();
      expect(newBoard.getBoard().length).toEqual(10);
    });
  });

  describe('getBoard', () => {
    it('should retrieve the board', () => {
      expect(newBoard.getBoard()).toEqual(emptyBoard);
    });
  });
});
