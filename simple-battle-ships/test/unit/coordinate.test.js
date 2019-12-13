const Coordinate = require('../src/coordinate');

describe('Coordinate', () => {
	beforeEach(() => {
		return (coordinates = new Coordinate(0, 0));
	});

	describe('getCoordinates', () => {
		describe('given that a coodinate object has been created', () => {
			it('should be able to get the coordinate', () => {
				const expectedCoordinates = {x: 0, y: 0};

				expect(coordinates.getCoordinates()).toEqual(expectedCoordinates);
			});
		});
	});
});
