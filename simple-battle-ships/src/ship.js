var shipNum = 1;

const updateShipStatus = (coordinates, health) => {
  return coordinates.every((elem) => elem.isHit === true) && health === 0;
};

class Ship {
  constructor(sName) {
    this.name = sName || 'Ship ' + shipNum;
    shipNum++;
    this.length = 4;
    this.health = 100;
    this.isSunk = false;
    this.orientation = 'vertical';
    this.coordinates = [];
  }

  getName() {
    return this.name;
  }

  getHealth() {
    return this.health;
  }

  getLength() {
    return this.length;
  }

  getOrientation() {
    return this.orientation;
  }

  getIsSunk() {
    return this.isSunk;
  }

  getCoordinates() {
    return this.coordinates;
  }

  setOrientation(newOrientation) {
    this.orientation = newOrientation;
  }

  setHealth() {
    this.health = Math.ceil((this.coordinates.filter(elem => elem.isHit === false).length / this.coordinates.length) * 100);
  }

  setCoordinates(shipCoordinates, index = 0) {
    if (this.isSunk === false) {
      this.coordinates[index] = {
        coordinates: shipCoordinates,
        isHit: false
      };
    }
  }

  setIsHitForCoordinate(index) {
    if (this.isSunk === false) {
      this.coordinates[index].isHit = true;
      this.setHealth();
      this.isSunk = updateShipStatus(this.coordinates, this.getHealth());
    }
  }
}

module.exports = Ship;
