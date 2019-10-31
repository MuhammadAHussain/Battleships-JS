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

  //The player may not need to track the score as that would be the boards responsibility.

//   getScore() {
//     return score;
//   }

  // setScore(points) {
  //     this.score = points;
  // }
}

Player.playerNum = 1;

module.exports = Player;
