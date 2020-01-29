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

// const setCoordinates = (Ship.prototype.setCoordinates = jest.fn());

describe('Board', () => {
	beforeEach(() => {
		return (newBoard = new board());
	});
	afterEach(() => {
		jest.clearAllMocks();
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
			expect(newBoard.getBoard()).toStrictEqual(emptyBoard);
		});
	});

	describe('placeShip', () => {
		let ship_one;
		beforeEach(() => {
			ship_one = new Ship('ship_one');
		});

		afterEach(() => {
			ship_one = undefined;
		});

		describe('given a ship with coordinates', () => {
			it('should place the ship on the board', () => {
				const expectedBoard = [
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, '\u2227', -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, '|', -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, '|', -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, '\u2228', -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
				];

				expect(newBoard.getBoard()).toStrictEqual(emptyBoard);
				newBoard.placeShip(ship_one, { x: 3, y: 4 });
				expect(newBoard.getBoard()).toStrictEqual(expectedBoard);
			});
		});
		describe('given a ship with coordinates and an orientation', () => {
			it('should place the ship on the board in the horizontal orientation', () => {
				const expectedBoard = [
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, '\u2225', '|', '|', '\u2226', -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
				];

				// expect(setCoordinates).toHaveBeenCalledTimes(3);

				expect(newBoard.getBoard()).toEqual(emptyBoard);

				expect(newBoard.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toEqual(true);
				expect(newBoard.getBoard()).toEqual(expectedBoard);
			});
		});
		describe('given a ship with coordinates and an invalid orientation', () => {
			it('should not place the ship and return false', () => {

				expect(newBoard.getBoard()).toStrictEqual(emptyBoard);
			});
		});
	});
});
