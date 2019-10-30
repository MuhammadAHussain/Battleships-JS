class Player {

    static number = 1;

    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    constructor() {
        this.name = "Player " + number;
        number++;
    }

    //The player may not need to track the score as that would be the boards responsibility.

    // getScore() {
    //     return this.score;
    // }

    // setScore(points) {
    //     this.score = points; 
    // }

}

module.exports.Player;