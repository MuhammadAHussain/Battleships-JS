const { ORIENTATIONS, ERRORMESSAGES } = require('./enums');
const { objectEquality } = require('./objectEquality');

const allShipsDestroyed = (ships) =>
  ships.reduce((allShipsDestroyed, ship) => allShipsDestroyed && ship.getIsSunk(), true);

const coordinatesInsideBoard = (x, y) => ((x) < 10 && (y) < 10) && (x >= 0 && y >= 0);

const coordinatesTypeOf = (x, y) => Number.isInteger(x) && Number.isInteger(y)

const validatePosition = (x, y, shipPlaced, orientation, board) => {

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

  const areCoordinatesAvailable = coordinatesAvailable(x, y, orientation, board);

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

const coordinatesAvailable = (x, y, orientation, board) => {
  const axis = orientation === ORIENTATIONS.VERTICAL;

  for (let i = 0; i < 4; i++) {
    if (board[x][y] !== '~') {
      return false;
    }
    axis ? x++ : y++;
  }

  return true;

}

const findShip = (target, ships) => {
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

const validTarget = (x, y, board) => {

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

  if (atCoordinate === 'M' || atCoordinate === '\u2717') {
    return {
      status: false,
      message: ERRORMESSAGES.ALREADYSHOT
    }
  }

  return {
    status: true
  }
}

module.exports = {
  allShipsDestroyed,
  findShip,
  validatePosition,
  setShipHitCoordinate,
  validTarget
}