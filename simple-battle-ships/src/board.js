const { ORIENTATIONS, ERRORMESSAGES, SUCCESS } = require('./lib/enums');
const { objectEquality } = require('./lib/objectEquality');

var board;
var ships;

const allShipsDestroyed = () =>
  ships.reduce((allShipsDestroyed, ship) => allShipsDestroyed && ship.getIsSunk(), true);

const coordinatesInsideBoard = (x, y) => ((x) < board.length && (y) < board.length) && (x > 0 && y > 0);

const coordinatesTypeOf = (x, y) => Number.isInteger(x) && Number.isInteger(y)

const validatePosition = (x, y, shipPlaced, orientation) => {

  const coordinatesNumbers = coordinatesTypeOf(x, y);

  if (coordinatesNumbers === false) {
    return {
      status: false,
      message: ERRORMESSAGES.INVALIDCOORDINATES
    }
  }

  const isOrientationValid = Object.values(ORIENTATIONS).includes(orientation);

  if (isOrientationValid === false) {
    return {
      status: false,
      message: ERRORMESSAGES.ORIENTATION
    };
  }

  if (shipPlaced) {
    return {
      status: false,
      message: ERRORMESSAGES.PLACED
    }
  }

  const endCoordinates = orientation === ORIENTATIONS.VERTICAL ? { x: x + 3, y } : { x, y: y + 3 }

  const areCoordinatesInsideBoard = coordinatesInsideBoard(x, y) && coordinatesInsideBoard(endCoordinates.x, endCoordinates.y)

  if (areCoordinatesInsideBoard === false) {
    return {
      status: false,
      message: ERRORMESSAGES.OUTOFBOUNDS
    }
  }

  const areCoordinatesAvailable = coordinatesAvailable(x, y, orientation);

  if (areCoordinatesAvailable === false) {
    return {
      status: false,
      message: ERRORMESSAGES.ANOTHERSHIP
    }
  }

  return {
    status: true
  }
}

const coordinatesAvailable = (x, y, orientation) => {
  const axis = orientation === ORIENTATIONS.VERTICAL;

  for (let i = 0; i < 4; i++) {
    if (board[x][y] !== '~') {
      return false;
    }
    axis ? x++ : y++;
  }

  return true;

}

const findShip = (target) => {
  for (let ship of ships) {
    const coordinates = ship.getCoordinates().map(elem => elem.coordinates)
    const shipHasCoordinates = coordinates.some(elem => objectEquality(elem, target));
    if (shipHasCoordinates) {
      return ship;
    }
  }
}

const setShipHitCoordinate = (ship, coordinates) => {
  const coordinateIndex = ship.getCoordinates().
    map(elem => elem.coordinates).findIndex(elem => objectEquality(elem, coordinates));

  ship.setIsHitForCoordinate(coordinateIndex);

  return ship.getIsSunk();
}

const validTarget = (x, y) => {

  const areCoordinatesNumbers = coordinatesTypeOf(x, y);

  if (areCoordinatesNumbers === false) {
    return {
      status: false,
      message: ERRORMESSAGES.INVALIDCOORDINATES
    }
  }

  const areCoordinatesInsideBoard = coordinatesInsideBoard(x, y);

  if (areCoordinatesInsideBoard === false) {
    return {
      status: false,
      message: ERRORMESSAGES.OUTOFBOUNDS
    }
  }

  const atCoordinate = board[x][y];

  if (atCoordinate === 'M' || atCoordinate === 'X') {
    return {
      status: false,
      message: ERRORMESSAGES.ALREADYSHOT
    }
  }

  return {
    status: true
  }
}

class Board {
  constructor() {
    board = [];
    ships = [];
    this.initialiseArray();
  }

  initialiseArray() {
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i][j] = '~';
      }
    }
  }

  getBoard() {
    return board;
  }

  getShips() {
    return ships;
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

    const { status, message } = validatePosition(x, y, shipPlaced, orientation);

    const isVertical = orientation === ORIENTATIONS.VERTICAL;

    if (status === false) {
      return { status, message }
    }

    const shipLength = ship.getLength();
    const front = isVertical ? '\u2227' : '\u003C';
    const middle = isVertical ? '|' : '\u2501';
    const back = isVertical ? '\u2228' : '\u003E';

    for (let index = 0; index < shipLength; index++) {
      if (index === 0) {
        board[x][y] = front;
        ship.setCoordinates({ x, y }, index);
      } else if (index === shipLength - 1) {
        board[x][y] = back;
        ship.setCoordinates({ x, y }, index);
      } else {
        board[x][y] = middle;
        ship.setCoordinates({ x, y }, index);
      }
      isVertical ? x++ : y++;
    }

    ships.push(ship);

    return {
      status: true,
      message: SUCCESS.PLACED
    };
  }

  shootShip(coordinates) {
    const x = coordinates.x - 1;
    const y = coordinates.y - 1;

    const { status, message } = validTarget(x, y);

    if (status === false) {
      return {
        status,
        message
      }
    }

    const indexValue = board[x][y];

    if (indexValue === '~') {
      board[x][y] = 'M';
      return {
        status: true,
        message: SUCCESS.MISS
      }
    }

    const ship = findShip({ x, y });

    const shipIsSunk = setShipHitCoordinate(ship, { x, y });

    board[x][y] = 'X';

    if (shipIsSunk) {
      return {
        status: true,
        message: `${SUCCESS.DESTROYED} ${ship.getName()} has sunk!`
      }
    }

    return {
      status: true,
      message: `${SUCCESS.HIT} ${ship.getName()} is at ${ship.getHealth()}% health`
    }
  }

  getAllShipDestroyed() {
    return allShipsDestroyed()
  };
}

module.exports = Board;
