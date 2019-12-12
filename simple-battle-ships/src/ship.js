const coordinate = require('../src/coordinate.js');

var name;
var length;
var health;
var isSunk;
var orientation;
var coordinates;

class Ship {
  constructor(sName) {
    name = sName ? sName : 'Ship ' + Ship.shipNum;
    sName ? Ship.shipNum : Ship.shipNum++;
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

  getDamage() {
    return damage;
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

let updateShipStatus = coordinates => {
  return coordinates.every(elem => elem.isHit === true);
};

Ship.shipNum = 1;

module.exports = Ship;
