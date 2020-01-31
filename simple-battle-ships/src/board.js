const { ORIENTATIONS, ERRORMESSAGES, SUCCESS } = require('./lib/enums');

var board;

const validateCoordinates = (x, y) =>
  (x - 1) <= board.length && (y - 1) <= board.length;

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

  const endCoordinates = orientation === 'vertical' ? { x: startCoordinates.x + 3, y: startCoordinates.y } : { x: startCoordinates.x, y: startCoordinates.y + 3 }

  const isCoordinateValid = validateCoordinates(startCoordinates.x, startCoordinates.y) && validateCoordinates(endCoordinates.x, endCoordinates.y)

  if (isCoordinateValid === false) {
    return {
      status: false,
      message: ERRORMESSAGES.OUTOFBOUNDS
    }
  }

  return {
    status: true,
    message: SUCCESS
  }
}
class Board {
  constructor() {
    board = [];
    this.initialiseArray();
  }

  initialiseArray() {
    for (let i = 0; i < 10; i++) {
      board.push([0]);
      for (let j = 0; j < 10; j++) {
        board[i][j] = -1;
      }
    }
  }

  getBoard() {
    return board;
  }

  placeShip(ship, coordinates, orientation = 'vertical') {
    const shipPlaced = ship.getCoordinates().length > 0;

    const isShipPlacementValid = validatePosition(coordinates, shipPlaced, orientation);

    if (isShipPlacementValid.status === false) {
      return isShipPlacementValid
    }

    const shipLength = ship.getLength();
    const front = orientation === 'vertical' ? '\u2227' : '\u2225';
    const back = orientation === 'vertical' ? '\u2228' : '\u2226';

    const changeAxis = orientation === 'vertical' ? 'y' : 'x';

    for (let index = 0; index < shipLength; index++) {
      if (index === 0) {
        board[coordinates.y - 1][coordinates.x - 1] = front;
        ship.setCoordinates(coordinates, index);
      } else if (index === shipLength - 1) {
        board[coordinates.y - 1][coordinates.x - 1] = back;
        ship.setCoordinates(coordinates, index);
      } else {
        board[coordinates.y - 1][coordinates.x - 1] = '|';
        ship.setCoordinates(coordinates, index);
      }
      coordinates[changeAxis]++;
    }

    return {
      status: true,
      message: SUCCESS
    };
  }
}

module.exports = Board;
