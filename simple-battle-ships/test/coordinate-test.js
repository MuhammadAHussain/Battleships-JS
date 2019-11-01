const coordinate = require('../src/coordinate.js');

describe('coordinates will be used for ships and shots fired', () => {
  describe('be able to create new coordinates, set and get existing coordinates', () => {
    beforeEach(() => {
      return (coordinates = new coordinate());
    });

    it('should be able to create a new coordinate obejct', () => {
      expect(coordinates).not.toBeNull();
    });

    it('should be able to set and retrieve coordinates', () => {
      expect(coordinates.getCoordinates()).toStrictEqual({ x: 0, y: 0 });
      coordinates.setCoordinates({ x: 2, y: 1 });
      expect(coordinates.getCoordinates()).toStrictEqual({ x: 2, y: 1 });
    });
  });
});
