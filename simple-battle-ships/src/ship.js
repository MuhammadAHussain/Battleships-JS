var name;
var length;
var health;
var isSunk;
var orientation;
var coordinates;
var shipNum = 1;

class Ship {
  constructor(sName) {
    name = sName || 'Ship ' + shipNum;
    shipNum++;
    length = 4;
    health = 100;
    isSunk = false;
    orientation = 'vertical';
    coordinates = [];
  }

  getName() {
    return name;
  }

  getHealth() {
    return health;
  }

  getLength() {
    return length;
  }

  getOrientation() {
    return orientation;
  }

  getIsSunk() {
    return isSunk;
  }

  getCoordinates() {
    return coordinates;
  }

  getShipNum() {
    return shipNum;
  }

  setHealth(newHealth) {
    health = newHealth;
  }

  setOrientation(newOrientation) {
    orientation = newOrientation;
  }

  setCoordinates(shipCoordinates, index = 0) {
    coordinates[index] = {
      coordinates: shipCoordinates,
      isHit: false
    };
  }

  setIsHitForCoordinate(index) {
    if (isSunk === false) {
      coordinates[index].isHit = true;
      isSunk = updateShipStatus(coordinates);
    }
  }
}

const updateShipStatus = (coordinates) => {
  return coordinates.every((elem) => elem.isHit === true);
};

module.exports = Ship;
