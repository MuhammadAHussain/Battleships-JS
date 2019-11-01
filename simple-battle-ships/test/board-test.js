const sinon = require('sinon');
const { expect } = require('chai');
const board = require('../src/board.js');
const player = require('../src/player.js');
const ship = require('../src/ship.js');

describe('board will be able keep track of ships', () => {
  beforeEach(() => {
    return (newBoard = new board());
  });
  describe('create board object with a default grid', () => {
    it('should be to create a board object', () => {
      expect(newBoard.getBoard()).to.not.be.null;
      // console.log(newBoard.getBoard());
      expect(newBoard.getBoard().length).deep.equal(10);
    });
  });

  // describe('be able to place a ship and get the ship\'s location on the board', () => {
  //   let ship_one;
  //   beforeEach(() => {
  //     ship_one = new ship();
  //     ship_one.setCoordinates({ x: 4, y: 5 });
  //   });

  //   it.only('should be able to place ships', () => {
  //     const emptyBoard = [
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //       [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  //     ];
  //     expect(newBoard.getBoard()).deep.equal(emptyBoard);
  //     newBoard.placeShip(ship_one);


  //   });
  // });
});
