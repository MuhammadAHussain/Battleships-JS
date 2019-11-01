const coordinate = require('../src/coordinate.js');

var name;
// var width;
// var damage;
var length;
var health;
var isSunk;
var orientation;
var coordinates;

class Ship {
  constructor(sName) {
    name = sName ? sName : 'Ship ' + Ship.shipNum;
    sName ? Ship.shipNum : Ship.shipNum++;
    // width = 1;
    length = 4;
    // damage = 100 / height;
    health = 100;
    isSunk = false;
    orientation = 'vertical';
    // coordinates.push([0]);
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
