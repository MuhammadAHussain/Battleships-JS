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
    coordinates = new coordinate();
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
    return coordinates.getCoordinates();
  }

  setIsSunk(status) {
    isSunk = status;
  }

  setHealth(newHealth) {
    health = newHealth;
  }

  setOrientation(newOrientation) {
    orientation = newOrientation;
  }

  setCoordinates(coordinates) {
    coordinates.setCoordinates(coordinates);
  }
}

Ship.shipNum = 1;

module.exports = Ship;
