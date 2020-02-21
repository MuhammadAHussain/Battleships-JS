const { ORIENTATIONS, ERRORMESSAGES, SUCCESS } = require('./lib/enums');

const {
  allShipsDestroyed,
  findShip,
  validatePosition,
  setShipHitCoordinate,
  validTarget
} = require('../src/lib/positionValidation');

const xSymbol = "\u2717";

class Board {
  constructor(owner) {
    this.placementBoard = [];
    this.targetBoard = [];
    this.ships = [];
    this.player = owner;
    this.initialiseArray();
  }

  initialiseArray() {
    for (let i = 0; i < 10; i++) {
      this.placementBoard.push([]);
      this.targetBoard.push([]);
      for (let j = 0; j < 10; j++) {
        this.placementBoard[i][j] = '~';
        this.targetBoard[i][j] = '~';
      }
    }
  }

  getBoard() {
    return this.targetBoard;
  }

  getPlacementBoard() {
    return this.placementBoard;
  }

  getShips() {
    return this.ships;
  }

  placeShip(ship, coordinates, orientation = ORIENTATIONS.VERTICAL) {
    let x = coordinates.x - 1;
    let y = coordinates.y - 1;

    if (ship === undefined || ship === null) {
      return {
        status: false,
        message: ERRORMESSAGES.NOSHIP
      }
    }

    const shipPlaced = ship.getCoordinates().length > 0;

    const { status, message } = validatePosition(x, y, shipPlaced, orientation, this.placementBoard);

    if (status === false) {
      return { status, message }
    }

    const isVertical = orientation === ORIENTATIONS.VERTICAL;

    const shipLength = ship.getLength();
    const front = isVertical ? '\u2227' : '\u003C';
    const middle = isVertical ? '|' : '\u2501';
    const back = isVertical ? '\u2228' : '\u003E';

    for (let index = 0; index < shipLength; index++) {
      if (index === 0) {
        this.placementBoard[x][y] = front;
        ship.setCoordinates({ x, y }, index);
      } else if (index === shipLength - 1) {
        this.placementBoard[x][y] = back;
        ship.setCoordinates({ x, y }, index);
      } else {
        this.placementBoard[x][y] = middle;
        ship.setCoordinates({ x, y }, index);
      }
      isVertical ? x++ : y++;
    }

    this.ships.push(ship);

    return {
      status: true,
      message: SUCCESS.PLACED
    };
  }

  shootShip(coordinates) {
    const x = coordinates.x - 1;
    const y = coordinates.y - 1;

    const { status, message } = validTarget(x, y, this.targetBoard);

    if (status === false) {
      return {
        status,
        message
      }
    }

    const indexValue = this.placementBoard[x][y];

    if (indexValue === '~') {
      this.targetBoard[x][y] = 'M';
      return {
        status: true,
        message: SUCCESS.MISS
      }
    }

    const ship = findShip({ x, y }, this.ships);

    const shipIsSunk = setShipHitCoordinate(ship, { x, y });

    this.targetBoard[x][y] = xSymbol;

    if (shipIsSunk) {
      return {
        status: true,
        message: `${SUCCESS.DESTROYED} ${ship.getName()} belonging to ${this.player.getName()} has sunk!`
      }
    }

    return {
      status: true,
      message: `${SUCCESS.HIT} ${ship.getName()} belonging to ${this.player.getName()} is at ${ship.getHealth()}% health`
    }
  }

  getPlayer() {
    return this.player;
  }

  setAssignedPlayer(player) {
    this.assignedPlayer = player;
  }

  getAssignedPlayer() {
    return this.assignedPlayer;
  }

  getAllShipDestroyed() {
    return allShipsDestroyed(this.ships);
  };
}

module.exports = Board;
