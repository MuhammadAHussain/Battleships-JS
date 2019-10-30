class Ship {

    constructor(name) {
        this.name = name;
        this.width = 1;
        this.height = 4;
        this.damage = 100/this.height;
        this.health = 100;
        this.isSunk = false;
    }

    getHealth() {
        return this.health;
    }

    getDamage() {
        return this.damage;
    }

    setHealth(hitDamage) {
        this.health -= hitDamage;
    }

    setIsAlive(status) {
        this.status = status;
    }

}

module.exports.Ship;