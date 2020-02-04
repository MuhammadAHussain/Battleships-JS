const emptyBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipPlacedVerticalExpectedBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∧', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '|', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '|', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∨', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipPlacedHorizontalExpectedBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '<', '━', '━', '>', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipHitExpectedBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∧', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '|', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∨', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipMissExpectedBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∧', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '|', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '|', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∨', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'M', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipLastShotExpectedBoard = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '∨', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

const shipDestroyed = [
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', 'X', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
];

module.exports = {
  emptyBoard,
  shipPlacedVerticalExpectedBoard,
  shipPlacedHorizontalExpectedBoard,
  shipHitExpectedBoard,
  shipMissExpectedBoard,
  shipLastShotExpectedBoard,
  shipDestroyed
}