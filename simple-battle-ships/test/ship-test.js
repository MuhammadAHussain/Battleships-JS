const ship = require('../src/ship.js');

describe('should create a ship object and access it methods', () => {
  it('should create a ship object and have the same name as the one that is passed', () => {
    const ship_one = new ship('ship_one');
    expect(ship_one.getName()).toEqual('ship_one');
  });

  it('should create a ship object with a default name if no name argument is passed', () => {
    const ship_one = new ship();
    expect(ship_one.getName()).toEqual('Ship 1');
  });

  beforeEach(() => {
    return (ship_one = new ship('ship_one'));
  });

  it('should be able to access a ships health and damage the ships health', () => {
    expect(ship_one.getHealth()).toEqual(100);
    ship_one.setHealth(75);
    expect(ship_one.getHealth()).toEqual(75);
  });

  it('should be able to check if a ship has sunk and update the ships isSunk variable', () => {
    expect(ship_one.getIsSunk()).toEqual(false);
    ship_one.setIsSunk(true);
    expect(ship_one.getIsSunk()).toEqual(true);
  });
});
