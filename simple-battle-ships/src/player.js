var playerNum = 1;

class Player {
  constructor(pName) {
    this.name = pName || 'Player ' + playerNum;
    playerNum++;
  }

  getName() {
    return this.name;
  }

  setAssignedBoard(board) {
    this.assignedBoard = board;
  }

  getAssignedBoard() {
    return this.assignedBoard;
  }
}

module.exports = Player;
