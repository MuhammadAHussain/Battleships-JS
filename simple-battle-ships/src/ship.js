var name;
var length;
var health;
var isSunk;
var orientation;
var coordinates;
var shipNum = 1;

const updateShipStatus = (coordinates) => {
  return coordinates.every((elem) => elem.isHit === true) && health === 0;
};

const updateHealth = () => {
  health = Math.ceil((coordinates.filter(elem => elem.isHit === false).length / coordinates.length) * 100);
}

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

  setOrientation(newOrientation) {
    orientation = newOrientation;
  }

  setCoordinates(shipCoordinates, index = 0) {
    if (isSunk === false) {
      coordinates[index] = {
        coordinates: shipCoordinates,
        isHit: false
      };
    }
  }

  setIsHitForCoordinate(index) {
    if (isSunk === false) {
      coordinates[index].isHit = true;
      updateHealth();
      isSunk = updateShipStatus(coordinates);
    }
  }
}

module.exports = Ship;
