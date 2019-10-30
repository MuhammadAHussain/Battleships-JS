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

    getScore() {
        return this.score;
    }

    setScore(points) {
        this.score += points; 
    }

}

module.exports.Player;