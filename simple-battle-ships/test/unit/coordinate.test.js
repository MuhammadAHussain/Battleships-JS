const coordinate = require('../../src/coordinate');

describe('coordinate', () => {
  beforeEach(() => {
    return (coordinates = new coordinate(0, 0));
  });

  describe('getCoordinates', () => {
    describe('given that a coodinate object has been created', () => {
      it('should be able to get the coordinate', () => {
        const expectedCoordinates = { x: 0, y: 0 };

        expect(coordinates.getCoordinates()).toEqual(expectedCoordinates);
      });
    });
  });
});
