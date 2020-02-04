const ORIENTATIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}

const ERRORMESSAGES = {
  ORIENTATION: 'Invalid orientation',
  PLACED: 'Ship has already been placed',
  OUTOFBOUNDS: 'Coordinates out of bounds',
  ANOTHERSHIP: 'Found another ship at that location'
}

const SUCCESS = 'Ship has been placed'

module.exports = {
  ORIENTATIONS,
  ERRORMESSAGES,
  SUCCESS
}