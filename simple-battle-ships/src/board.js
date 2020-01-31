let grid;
class board {
  constructor() {
    grid = [];
    this.initialiseArray();
  }

  initialiseArray() {
    for (let i = 0; i < 10; i++) {
      grid.push([0]);
      for (let j = 0; j < 10; j++) {
        grid[i][j] = -1;
      }
    }
  }

  getBoard() {
    return grid;
  }
}

module.exports = board;
