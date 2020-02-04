const Board = require('../../src/board');
const Ship = require('../../src/ship');
const { emptyBoard, shipPlaceVerticalExpectedBoard, shipPlacedHorizontalExpectedBoard } = require('../fixtures/boardFixtures');

jest.mock('../../src/ship');

describe('Board', () => {
  beforeEach(() => {
    return (board = new Board());
  });

  afterEach(() => {
    board = undefined;
    jest.resetAllMocks();
  });

  describe('initialiseArray', () => {
    it('should be to create a board object', () => {
      expect.assertions(2);
      expect(board.getBoard()).not.toBeNull();
      expect(board.getBoard().length).toEqual(10);
    });
  });

  describe('getBoard', () => {
    it('should retrieve the board', () => {
      expect(board.getBoard()).toStrictEqual(emptyBoard);
    });
  });

  describe('placeShip', () => {
    let ship_one;

    beforeEach(() => {
      ship_one = new Ship('ship_one');
      Ship.prototype.getLength.mockReturnValue(4);
      Ship.prototype.getCoordinates.mockReturnValue(0);
    });

    afterEach(() => {
      ship_one = undefined;
    });

    describe('given a ship with coordinates', () => {
      it('should place the ship on the board', () => {
        expect.assertions(5);

        expect(board.getBoard()).toStrictEqual(emptyBoard);
        expect(board.placeShip(ship_one, { x: 3, y: 4 })).toEqual({
          status: true,
          message: 'Ship has been placed'
        });
        expect(Ship.prototype.setCoordinates).toHaveBeenCalledTimes(4);
        expect(board.getBoard()).toStrictEqual(shipPlaceVerticalExpectedBoard);
        expect(board.getShips().length).toEqual(1);
      });
    });

    describe('given a ship with coordinates and an orientation', () => {

      it('should place the ship on the board in the horizontal orientation', () => {
        expect.assertions(5);

        expect(board.getBoard()).toStrictEqual(emptyBoard);

        expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual({
          status: true,
          message: 'Ship has been placed'
        });
        expect(Ship.prototype.setCoordinates).toHaveBeenCalledTimes(4);
        expect(board.getBoard()).toStrictEqual(shipPlacedHorizontalExpectedBoard);
        expect(board.getShips().length).toEqual(1);
      });
    });

    describe('given a ship with coordinates and an invalid orientation', () => {
      it('should not place the ship and return a message', () => {

        expect(board.getBoard()).toStrictEqual(emptyBoard);

        const expectResult = {
          status: false,
          message: 'Invalid orientation'
        }

        expect(board.placeShip(ship_one, { x: 5, y: 4 }, 'diagonal')).toStrictEqual(expectResult);
        expect(board.getBoard()).toStrictEqual(emptyBoard);
      });
    });

    describe('given a ship with out of bounds coordinates', () => {

      describe('given the x coordinate is more than 10', () => {
        it('should not place a ship on the board with an horizontal orientation', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 11, y: 10 }, 'horizontal')).toStrictEqual({
            status: false,
            message: 'Coordinates out of bounds'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });

        it('should not place a ship on the board with an vertical orientation', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 11, y: 10 })).toStrictEqual({
            status: false,
            message: 'Coordinates out of bounds'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });
      });

      describe('given the x coordinate is less than 0', () => {
        it('should not place a ship on the board with an horizontal orientation', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: -1, y: -1 }, 'horizontal')).toStrictEqual({
            status: false,
            message: 'Coordinates out of bounds'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });

        it('should not place a ship on the board with an vertical orientation', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: -1, y: -1 })).toStrictEqual({
            status: false,
            message: 'Coordinates out of bounds'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });
      });
    });

    describe('given a ship that has already been placed', () => {

      describe('given the same ship with different coordinates', () => {
        it('should not move the ship to the new coordinates', () => {

          expect.assertions(4);

          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 3, y: 4 })).toStrictEqual({
            status: true,
            message: 'Ship has been placed'
          });

          expect(board.getBoard()).toStrictEqual(shipPlaceVerticalExpectedBoard);

          const expectResult = {
            status: false,
            message: 'Ship has already been placed'
          }

          Ship.prototype.getCoordinates.mockReturnValue([{}, {}, {}, {}]);

          expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual(expectResult);

        });
      });

      describe('given a second ship with the same coordinates', () => {

        it('should not place the second ship', () => {
          const ship_two = new Ship('ship_two');

          expect.assertions(7);

          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 3, y: 4 })).toStrictEqual({
            status: true,
            message: 'Ship has been placed'
          });

          expect(board.getBoard()).toStrictEqual(shipPlaceVerticalExpectedBoard);

          expect(board.placeShip(ship_two, { x: 3, y: 4 })).toStrictEqual({
            status: false,
            message: 'Found another ship at that location'
          });

          expect(board.getBoard()).toStrictEqual(shipPlaceVerticalExpectedBoard);

          const expectedShipNameAndNum = {
            name: ship_one.getName(),
            num: ship_one.getShipNum()
          }

          const ships = board.getShips();

          expect(ships.length).toEqual(1);

          const shipNameAndNumResult = {
            name: ships[0].getName(),
            num: ships[0].getShipNum()
          }

          expect(shipNameAndNumResult).toStrictEqual(expectedShipNameAndNum);

        });
      });

      describe('given a second ship with coordinates that cross a placed ship', () => {
        it('should not place the second ship', () => {
          const ship_two = new Ship('ship_two');

          expect.assertions(7);

          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual({
            status: true,
            message: 'Ship has been placed'
          });

          expect(board.getBoard()).toStrictEqual(shipPlacedHorizontalExpectedBoard);

          expect(board.placeShip(ship_two, { x: 5, y: 0 })).toStrictEqual({
            status: false,
            message: 'Found another ship at that location'
          });

          expect(board.getBoard()).toStrictEqual(shipPlacedHorizontalExpectedBoard);

          const expectedShipNameAndNum = {
            name: ship_one.getName(),
            num: ship_one.getShipNum()
          }

          const ships = board.getShips();

          expect(ships.length).toEqual(1);

          const shipNameAndNumResult = {
            name: ships[0].getName(),
            num: ships[0].getShipNum()
          }

          expect(shipNameAndNumResult).toStrictEqual(expectedShipNameAndNum);

        });
      });
    });
  });
});
