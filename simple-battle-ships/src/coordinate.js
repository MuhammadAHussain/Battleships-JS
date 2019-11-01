var coordinates;

class coordinate {
  constructor() {
    coordinates = {
      x: 0,
      y: 0
    };
  }

  getCoordinates() {
    return coordinates;
  }

  setCoordinates(newCoordinates) {
    coordinates = newCoordinates;
  }
}

module.exports = coordinate;
