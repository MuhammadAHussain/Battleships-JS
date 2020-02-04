const Board = require('../../src/board');
const Ship = require('../../src/ship');
const { emptyBoard,
  shipPlacedVerticalExpectedBoard,
  shipPlacedHorizontalExpectedBoard,
  shipHitExpectedBoard,
  shipMissExpectedBoard,
  shipLastShotExpectedBoard,
  shipDestroyed
} = require('../fixtures/boardFixtures');

jest.mock('../../src/ship');

describe('Board', () => {
  beforeEach(() => {
    Ship.prototype.getLength.mockReturnValue(4);
    Ship.prototype.getCoordinates.mockReturnValue(0);
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
    beforeEach(() => {
      return (ship_one = new Ship('ship_one'));
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
        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
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


    describe('given an null ship argument', () => {
      it('should not place the ship on the board and return false', () => {
        expect(board.getBoard()).toStrictEqual(emptyBoard);

        const expectResult = {
          status: false,
          message: 'Ship could not be placed'
        }
        expect(board.placeShip(null, { x: 5, y: 4 })).toStrictEqual(expectResult);
        expect(board.getBoard()).toStrictEq
      });
    });

    describe('given a ship with invalid coordinates', () => {
      describe('given coordinates which are not numbers', () => {
        it('should not place a ship and return a message', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 'hello', y: 'world' }, 'horizontal')).toStrictEqual({
            status: false,
            message: 'Coordinates are invalid'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });
      });

      describe('given coordinates that are not integer values', () => {
        it('should not place a ship and return a message', () => {
          expect(board.getBoard()).toStrictEqual(emptyBoard);

          expect(board.placeShip(ship_one, { x: 5.5, y: 4.5 }, 'horizontal')).toStrictEqual({
            status: false,
            message: 'Coordinates are invalid'
          });

          expect(board.getBoard()).toStrictEqual(emptyBoard);
        });
      });

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

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

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

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          expect(board.placeShip(ship_two, { x: 3, y: 4 })).toStrictEqual({
            status: false,
            message: 'Found another ship at that location'
          });

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

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

          expect(board.placeShip(ship_two, { x: 2, y: 4 })).toStrictEqual({
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

  describe('shootShip', () => {
    beforeEach(() => {
      const ship_one = new Ship();
      Ship.prototype.getLength.mockReturnValue(4);
      Ship.prototype.getCoordinates
        .mockReturnValue([
          { coordinates: { x: 2, y: 3 }, isHit: false },
          { coordinates: { x: 3, y: 3 }, isHit: false },
          { coordinates: { x: 4, y: 3 }, isHit: false },
          { coordinates: { x: 5, y: 3 }, isHit: false }
        ])
        .mockReturnValueOnce(0)
      Ship.prototype.getHealth.mockReturnValueOnce(75);
      Ship.prototype.getName.mockReturnValue('Ship 1');
      board.placeShip(ship_one, { x: 3, y: 4 });
    });

    afterEach(() => {
      jest.resetAllMocks();
      board = undefined;
    });

    describe('given coordinates where a ship is located', () => {
      it('should hit the ship and reduce its health', () => {
        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Hit! Ship 1 is at 75% health'
        }

        expect(board.shootShip({ x: 4, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipHitExpectedBoard);
      });
    });

    describe('given coordinates where no ship is located', () => {
      it('should not hit a ship and return miss message', () => {
        expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Miss'
        }

        expect(board.shootShip({ x: 7, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard);
      });
    });

    describe('given coordinates that been used previously', () => {
      describe('given coordinates where a ship is located', () => {
        beforeEach(() => {
          board.shootShip({ x: 4, y: 4 });
        });
        it('should not allow the missile to hit and return a message', () => {
          expect(board.getBoard()).toStrictEqual(shipHitExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Target has already been hit!'
          }

          expect(board.shootShip({ x: 4, y: 4 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipHitExpectedBoard);

          setIsHitCoordinateMock = Ship.mock.instances[0].setIsHitForCoordinate

          expect(setIsHitCoordinateMock.mock.calls[0][0]).toBe(1);
        });
      });

      describe('given coordinates where a ship is not located', () => {
        beforeEach(() => {
          board.shootShip({ x: 7, y: 4 });
        });
        it('should not allow the missile to hit and return a message', () => {
          expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Target has already been hit!'
          }

          expect(board.shootShip({ x: 7, y: 4 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipMissExpectedBoard);

          setIsHitCoordinateMock = Ship.mock.instances[0].setIsHitForCoordinate

          expect(setIsHitCoordinateMock.mock.calls.length).toBe(0);
        });
      });
    });

    describe('given the coordinates are invalid', () => {
      describe('given that the coordinates are not integer values', () => {
        it('should not shoot a missile on the board', () => {
          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Coordinates are invalid'
          }

          expect(board.shootShip({ x: 'hello', y: 'world' })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
        });
      });

      describe('given that the coordinates are float values', () => {
        it('should not shoot a missile on the board', () => {
          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Coordinates are invalid'
          }

          expect(board.shootShip({ x: 4.5, y: 6.5 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
        });
      });

      describe('given that the x coordinate is out of bounds', () => {
        it('should not shoot a missile on the board', () => {
          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Coordinates out of bounds'
          }

          expect(board.shootShip({ x: 11, y: 4 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
        });
      });

      describe('given that the y coordinate is out of bounds', () => {
        it('should not shoot a missile on the board', () => {
          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Coordinates out of bounds'
          }

          expect(board.shootShip({ x: 4, y: 11 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
        });
      });

      describe('given that both x and y coordinates are out of bounds', () => {
        it('should not shoot a missile on the board', () => {
          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);

          const expectedResult = {
            status: false,
            message: 'Coordinates out of bounds'
          }

          expect(board.shootShip({ x: 0, y: 0 })).toStrictEqual(expectedResult);

          expect(board.getBoard()).toStrictEqual(shipPlacedVerticalExpectedBoard);
        });
      });
    });

    describe('given a ship which is on low health', () => {
      beforeEach(() => {
        Ship.prototype.getIsSunk.mockReturnValue(true);
        board.shootShip({ x: 3, y: 4 });
        board.shootShip({ x: 4, y: 4 });
        board.shootShip({ x: 5, y: 4 });
      });

      it('should sink the ship and return sink message', () => {
        expect(board.getBoard()).toStrictEqual(shipLastShotExpectedBoard);

        const expectedResult = {
          status: true,
          message: 'Hit! Ship 1 has sunk!'
        }

        expect(board.shootShip({ x: 6, y: 4 })).toStrictEqual(expectedResult);

        expect(board.getBoard()).toStrictEqual(shipDestroyed);
      });
    });

    describe('given all the ships on the board are destroyed', () => {
      beforeEach(() => {
        Ship.prototype.getIsSunk.mockReturnValue(false);
        board.shootShip({ x: 3, y: 4 });
        board.shootShip({ x: 4, y: 4 });
        board.shootShip({ x: 5, y: 4 });
      });

      it('should set allShipDestroyed to true', () => {
        expect(board.getAllShipDestroyed()).toEqual(false);

        expect(board.shootShip({ x: 6, y: 4 }));

        expect(board.getBoard()).toStrictEqual(shipDestroyed);

        Ship.prototype.getIsSunk.mockReturnValue(true);

        expect(board.getAllShipDestroyed()).toEqual(true);
      });
    });
  });
});
