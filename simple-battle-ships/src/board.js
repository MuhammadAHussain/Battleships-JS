let grid;
class board {
  constructor() {
    grid = [];
    this.initialiseArray();
  }

  initialiseArray() {
    for (let i = 0; i < 10; i++) {
      grid.push([0]);
      for (let j = 0; j < 10; j++) {
        grid[i][j] = -1;
      }
    }
  }

	getBoard() {
		return board;
	}

	placeShip(ship, coordinates, orientation = 'vertical') {
		const shipLength = ship.getLength();

		if (orientation === 'vertical') {
			for (let index = 0; index < shipLength; index++) {
				if (ship.getCoordinates().length === 0) {
					board[coordinates.y - 1][coordinates.x - 1] = '\u2227';
					ship.setCoordinates(coordinates, index);
				} else if (index === shipLength - 1) {
					board[coordinates.y - 1][coordinates.x - 1] = '\u2228';
					ship.setCoordinates(coordinates, index);
				} else {
					board[coordinates.y - 1][coordinates.x - 1] = '|';
					ship.setCoordinates(coordinates, index);
				}
				coordinates['y']++;
			}
		} else {
			for (let index = 0; index < shipLength; index++) {
				if (ship.getCoordinates().length === 0) {
					board[coordinates.y - 1][coordinates.x - 1] = '\u2225';
					ship.setCoordinates(coordinates, index);
				} else if (index === shipLength - 1) {
					board[coordinates.y - 1][coordinates.x - 1] = '\u2226';
					ship.setCoordinates(coordinates, index);
				} else {
					board[coordinates.y - 1][coordinates.x - 1] = '|';
					ship.setCoordinates(coordinates, index);
				}
				coordinates['x']++;
			}
		}
	}
}

module.exports = board;
