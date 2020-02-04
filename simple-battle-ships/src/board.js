const { ORIENTATIONS, ERRORMESSAGES, SUCCESS } = require('./lib/enums');

var board;
var ships;

const coordinatesInsideBoard = (x, y) =>
  ((x - 1) <= board.length && (y - 1) <= board.length) && (x >= 0 && y >= 0);

const validatePosition = (startCoordinates, shipPlaced, orientation) => {
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

  const endCoordinates = orientation === ORIENTATIONS.VERTICAL ? { x: startCoordinates.x + 3, y: startCoordinates.y } : { x: startCoordinates.x, y: startCoordinates.y + 3 }

  const areCoordinatesInsideBoard = coordinatesInsideBoard(startCoordinates.x, startCoordinates.y) && coordinatesInsideBoard(endCoordinates.x, endCoordinates.y)

  if (areCoordinatesInsideBoard === false) {
    return {
      status: false,
      message: ERRORMESSAGES.OUTOFBOUNDS
    }
  }

  const areCoordinatesAvailable = coordinatesAvailable(startCoordinates, orientation);

  if (areCoordinatesAvailable === false) {
    return {
      status: false,
      message: ERRORMESSAGES.ANOTHERSHIP
    }
  }

  return {
    status: true,
    message: SUCCESS
  }
}

const coordinatesAvailable = (startCoordinates, orientation) => {
  let x = startCoordinates.x - 1;
  let y = startCoordinates.y - 1;

  const axis = orientation === ORIENTATIONS.VERTICAL;

  for (let i = 0; i < 4; i++) {
    if (board[x][y] !== '~') {
      return false;
    }
    axis ? x++ : y++;
  }

  return true;

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
    const shipPlaced = ship.getCoordinates().length > 0;

    const isShipPlacementValid = validatePosition(coordinates, shipPlaced, orientation);

    const isVertical = orientation === ORIENTATIONS.VERTICAL;

    if (isShipPlacementValid.status === false) {
      return isShipPlacementValid
    }

    const shipLength = ship.getLength();
    const front = isVertical ? '\u2227' : '\u003C';
    const middle = isVertical ? '|' : '\u2501';
    const back = isVertical ? '\u2228' : '\u003E';

    let x = coordinates.x - 1;
    let y = coordinates.y - 1;

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
      message: SUCCESS
    };
  }
}

module.exports = Board;
