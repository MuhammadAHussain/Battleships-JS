const Board = require('../../src/board');
const Ship = require('../../src/ship');
const Player = require('../../src/player');
const { emptyBoard,
  shipPlacedVerticalExpectedBoard,
  shipPlacedHorizontalExpectedBoard,
  shipHitExpectedBoard,
  shipMissExpectedBoard,
  shipLastShotExpectedBoard,
  shipDestroyed
} = require('../fixtures/boardFixtures');


describe('board', () => {
  let ship_one;
  let board;
  let player_one;

  beforeEach(() => {
    ship_one = new Ship('ship_one');
    player_one = new Player();
    board = new Board(player_one);
  });

  afterEach(() => {
    board = undefined;
    ship = undefined;
  });

  describe('getPlayer', () => {
    it('should return the player the board belongs to', () => {
      expect(board.getPlayer().getName()).toStrictEqual('Player 1');
    });
  });

  describe('placeShip', () => {
    describe('given a ship and coordinates', () => {
      it('should place the ship on the board', () => {
        expect(board.getBoard()).toStrictEqual(emptyBoard);

        const expectResult = {
          status: true,
          message: 'Ship has been placed'
        }

        expect(board.placeShip(ship_one, { x: 3, y: 4 })).toStrictEqual(expectResult);

        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
      });
    });

    describe('given a ship and coordinates and orientation', () => {
      it('should place the ship on the board', () => {
        expect(board.getBoard()).toStrictEqual(emptyBoard);

        const expectResult = {
          status: true,
          message: 'Ship has been placed'
        }

        expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual(expectResult);

        expect(board.getBoard()).toStrictEqual(shipPlacedHorizontalExpectedBoard);
      });
    });

    describe('given an empty ship object and coordinates', () => {
      it('should not place the ship on the board', () => {
        expect(board.getBoard()).toStrictEqual(emptyBoard);

        const expectedResult = {
          status: false,
          message: 'Ship could not be placed'
        }

        expect(board.placeShip(undefined, { x: 3, y: 4 }, 'horizontal')).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(emptyBoard);
      });
    });
  });

  describe('shootShip', () => {
    beforeEach(() => {
      board.placeShip(ship_one, { x: 3, y: 4 });
    });

    describe('given coordinates where a ship is located', () => {
      it('should shoot the ship and mark the spot with an X', () => {
        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Hit! ship_one belonging to Player 5 is at 75% health'
        }

        expect(board.shootShip({ x: 4, y: 4 })).toStrictEqual(expectedResult);


        expect(board.getBoard()).toStrictEqual(shipHitExpectedBoard)
      });
    });

    describe('given coordinates where a ship is not located', () => {
      it('should shoot the ship and mark the spot with an M', () => {
        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Missed!'
        }

        expect(board.shootShip({ x: 7, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard)
      });
    });

    describe('given coordinates that has been used before', () => {
      beforeEach(() => {
        board.shootShip({ x: 7, y: 4 });
      });
      it('should not give back a success message', () => {
        expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard);

        const expectedResult = {
          status: false,
          message: 'Target has already been hit!'
        }

        expect(board.shootShip({ x: 7, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard)
      });
    });

    describe('given coordinates to a ship on low health', () => {
      beforeEach(() => {
        board.shootShip({ x: 3, y: 4 });
        board.shootShip({ x: 4, y: 4 });
        board.shootShip({ x: 5, y: 4 });
      });
      it('should shoot and sink the ship', () => {
        expect(board.getBoard()).toStrictEqual(shipLastShotExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Ship destroyed! ship_one belonging to Player 8 has sunk!'
        }

        expect(board.shootShip({ x: 6, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipDestroyed)
      });

      it('should change allShipDestroyed to true once all ships are destroyed', () => {
        expect(board.getAllShipDestroyed()).toEqual(false);

        board.shootShip({ x: 6, y: 4 })

        expect(board.getAllShipDestroyed()).toEqual(true)
      });
    });
  });
});