var grid;
var hitsAndMisses;
class board {
  constructor() {
    // hits = [[]];
    // misses = [[]];
    grid = [];
    this.initialiseArray();
  }

  initialiseArray() {
    for (var i = 0; i < 10; i++) {
      grid.push([0]);
      for (var j = 0; j < 10; j++) {
        grid[i][j] = -1;
      }
    }
  }

  getBoard() {
    return grid;
  }
  
  // placeShip(shipCoordinates, shipOrientation = 'vertical') {
  //   if (orientation === 'vertical') {
  //     orientation = shipOrientationl;
  //     for (var i = 0; i < length; i++) {
  //       coordinates[i] = new coordinate().setCoordinates(shipCoordinates);
  //       shipCoordinates.x++;
  //     }
  //   } else {
  //     orientation = shipOrientationl;
  //     for (var i = 0; i < length; i++) {
  //       coordinates[i] = new coordinate().setCoordinates(shipCoordinates);
  //       shipCoordinates.y++;
  //     }
  //   }
  // }
}

module.exports = board;
