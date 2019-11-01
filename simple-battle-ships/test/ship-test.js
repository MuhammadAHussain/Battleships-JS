const ship = require('../src/ship.js');
const { expect } = require('chai');

describe('create a ship object and check the methods can be accessed', () => {
  it('should create a ship object and have the same name as the one that is passed', () => {
    const ship_one = new ship('ship_one');
    expect(ship_one.getName()).equal('ship_one');
  });

  it('should create a ship object with a default name if no name argument is passed', () => {
    const ship_one = new ship();
    expect(ship_one.getName()).equal('Ship 1');
  });

  it('should not have any coordinates when a new ship object is created', () => {
    const ship_one = new ship();
    expect(ship_one.getCoordinates()).deep.equal([]);
  });

  describe('be able to set and get a ships coordinates', () => {
    beforeEach(() => {
      return (ship_one = new ship('ship_one'));
    });

    it('should be able to place a ship at some coordinates', () => {
      ship_one.setCoordinates({ x: 11, y: 10 }, 0);
      ship_one.setCoordinates({ x: 12, y: 10 }, 1);
      ship_one.setCoordinates({ x: 13, y: 10 }, 2);

      testCoordinates = [
        { coordinates: { x: 11, y: 10 }, isHit: false },
        { coordinates: { x: 12, y: 10 }, isHit: false },
        { coordinates: { x: 13, y: 10 }, isHit: false }
      ];

      expect(ship_one.getCoordinates()).deep.equal(testCoordinates);
    });

    beforeEach(() => {
      ship_one.setCoordinates({ x: 11, y: 10 }, 0);
      ship_one.setCoordinates({ x: 12, y: 10 }, 1);
      ship_one.setCoordinates({ x: 13, y: 10 }, 2);
    });

    it('should be able to access a ships health and damage the ships health', () => {
      expect(ship_one.getHealth()).equal(100);
      ship_one.setHealth(75);
      expect(ship_one.getHealth()).equal(75);
    });

    it('should be able to hit a coordinate and check if a ship has sunk', () => {
      testCoordinates = [
        { coordinates: { x: 11, y: 10 }, isHit: false },
        { coordinates: { x: 12, y: 10 }, isHit: false },
        { coordinates: { x: 13, y: 10 }, isHit: false }
      ];

      expect(ship_one.getCoordinates()).deep.equal(testCoordinates);

      ship_one.setIsHitForCoordinate(0);

      const hitCoordinate = { coordinates: { x: 11, y: 10 }, isHit: true };

      expect(ship_one.getCoordinates()[0]).deep.equal(hitCoordinate);

      expect(ship_one.getIsSunk()).equal(false);
    });

    it('should be able to get a ships orientation and set the orientation', () => {
      expect(ship_one.getOrientation()).equal('vertical');

      ship_one.setOrientation('horizontal');

      expect(ship_one.getOrientation()).equal('horizontal');
    });
  });
});
