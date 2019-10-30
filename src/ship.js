class Ship {

    constructor(name) {
        this.name = name;
        this.width = 1;
        this.height = 4;
        this.health = 1;
        this.isSunk = false;
    }

    getHealth() {
        return this.health;
    }

    setHealth(hitDamage) {
        this.health - hitDamage;
    }

    setIsAlive(status) {
        this.status = status;
    }

}

module.exports.Ship;