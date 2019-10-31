var name;
// var width;
var height;
// var damage;
var health;
var isSunk;

class Ship {
  constructor(sName) {
    name = sName ? sName : 'Ship ' + Ship.shipNum;
    sName ? Ship.shipNum : Ship.shipNum++;
    // width = 1;
    height = 4;
    // damage = 100 / height;
    health = 100;
    isSunk = false;
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

  getHeight() {
    return height;
  }

  getIsSunk() {
    return isSunk;
  }

  setIsSunk(status) {
    isSunk = status;
  }

  setHealth(newHealth) {
    health = newHealth;
  }
}

Ship.shipNum = 1;

module.exports = Ship;
