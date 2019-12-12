var name;
var score;

class Player {
  constructor(pName) {
    name = pName ? pName : 'Player ' + Player.playerNum;
    pName ? Player.playerNum : Player.playerNum++;
    score = 0;
  }

  getName() {
    return name;
  }
}

Player.playerNum = 1;

module.exports = Player;
