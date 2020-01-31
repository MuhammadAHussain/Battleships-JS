const Board = require('../../src/board');
const Ship = require('../../src/ship');

jest.mock('../../src/ship');

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

describe('Board', () => {
	beforeEach(() => {
		return (board = new Board());
	});

	afterEach(() => {
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

				expect(board.getBoard()).toStrictEqual(emptyBoard);
				expect(board.placeShip(ship_one, { x: 3, y: 4 })).toEqual({
					status: true,
					message: 'Ship has been placed'
				});
				expect(Ship.prototype.setCoordinates).toHaveBeenCalledTimes(4);
				expect(board.getBoard()).toStrictEqual(expectedBoard);
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

				expect(board.getBoard()).toStrictEqual(emptyBoard);

				expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual({
					status: true,
					message: 'Ship has been placed'
				});
				expect(Ship.prototype.setCoordinates).toHaveBeenCalledTimes(4);
				expect(board.getBoard()).toStrictEqual(expectedBoard);
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
		describe('given a ship that has already been placed', () => {

			it('should not move the ship to the new coordinates', () => {
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

				expect(board.getBoard()).toStrictEqual(emptyBoard);

				expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual({
					status: true,
					message: 'Ship has been placed'
				});

				expect(board.getBoard()).toStrictEqual(expectedBoard);

				const expectResult = {
					status: false,
					message: 'Ship has already been placed'
				}

				Ship.prototype.getCoordinates.mockReturnValue([{}, {}, {}, {}]);

				expect(board.placeShip(ship_one, { x: 3, y: 4 }, 'horizontal')).toStrictEqual(expectResult);

			});
		});

		describe('given a ship with out of bounds coordinates', () => {
			it('should not place a ship on the board', () => {
				expect(board.getBoard()).toStrictEqual(emptyBoard);

				expect(board.placeShip(ship_one, { x: 11, y: 10 }, 'horizontal')).toStrictEqual({
					status: false,
					message: 'Coordinates out of bounds'
				});

				expect(board.getBoard()).toStrictEqual(emptyBoard);
			});
		});
	});
});
