let name;

class Player {
  constructor(pName) {
    name = pName || 'Player ' + Player.playerNum;
    pName ? Player.playerNum : Player.playerNum++;
  }

  getName() {
    return name;
  }
}

Player.playerNum = 1;

module.exports = Player;
