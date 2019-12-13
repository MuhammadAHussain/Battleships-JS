const Board = require('../src/board');
const Ship = require('../src/ship');

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
		return (newBoard = new Board());
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

	describe('placeShip', () => {
		describe('given a ship with coordinates', () => {
			it('should place the ship on the board', () => {
				const ship_one = new Ship('ship_one');

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

				expect(newBoard.getBoard()).toEqual(emptyBoard);
				newBoard.placeShip(ship_one, {x: 3, y: 4});
				console.log(newBoard.getBoard());
				expect(newBoard.getBoard()).toEqual(expectedBoard);
			});
		});
	});
});
