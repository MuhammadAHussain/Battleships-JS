let coordinates;

class Coordinate {
	constructor(x, y) {
		coordinates = {
			x,
			y
		};
	}

	getCoordinates() {
		return coordinates;
	}
}

module.exports = Coordinate;
