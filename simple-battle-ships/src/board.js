let board;
class Board {
	constructor() {
		board = [];
		this.initialiseArray();
	}

	initialiseArray() {
		for (let i = 0; i < 10; i++) {
			board.push([0]);
			for (let j = 0; j < 10; j++) {
				board[i][j] = -1;
			}
		}
	}

	getBoard() {
		return board;
	}

	placeShip(ship, coordinates, orientation = 'vertical') {
		const shipLength = ship.getLength();
		for (let x = 0; x < shipLength; x++) {
			if (ship.getCoordinates().length === 0) {
				board[coordinates.y - 1][coordinates.x - 1] = '\u2227';
				ship.setCoordinates(coordinates, x);
			} else if (x === shipLength - 1) {
				board[coordinates.y - 1][coordinates.x - 1] = '\u2228';
				ship.setCoordinates(coordinates, x);
			} else {
				board[coordinates.y - 1][coordinates.x - 1] = '|';
				ship.setCoordinates(coordinates, x);
			}
			coordinates['y']++;
		}
	}
}

module.exports = Board;
