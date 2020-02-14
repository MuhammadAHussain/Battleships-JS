const ORIENTATIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}

const ERRORMESSAGES = {
  ORIENTATION: 'Invalid orientation',
  PLACED: 'Ship has already been placed',
  OUTOFBOUNDS: 'Coordinates out of bounds',
  ANOTHERSHIP: 'Found another ship at that location',
  NOSHIP: 'Ship could not be placed',
  INVALIDCOORDINATES: 'Coordinates are invalid',
  ALREADYSHOT: 'Target has already been hit!'
}

const SUCCESS = {
  PLACED: 'Ship has been placed',
  HIT: 'Hit!',
  MISS: 'Missed!',
  DESTROYED: 'Ship destroyed!'
}

module.exports = {
  ORIENTATIONS,
  ERRORMESSAGES,
  SUCCESS
}