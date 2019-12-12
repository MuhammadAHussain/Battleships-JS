var coordinates;

class coordinate {
  constructor(x, y) {
    coordinates = {
      x,
      y,
    };
  }

  getCoordinates() {
    return coordinates;
  }
}

module.exports = coordinate;
