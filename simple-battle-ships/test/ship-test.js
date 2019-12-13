const ship = require('../src/ship.js');

const expectedCoordinates = [
	{coordinates: {x: 11, y: 10}, isHit: false},
	{coordinates: {x: 12, y: 10}, isHit: false},
	{coordinates: {x: 13, y: 10}, isHit: false},
];

describe('ship', () => {
	beforeEach(() => {
		return (ship_one = new ship('ship_one'));
	});
	describe('getName', () => {
		describe('given a name is passed as an argument when object is created', () => {
			it('should return the value of variable name', () => {
				expect(ship_one.getName()).toEqual('ship_one');
			});
		});

		describe('given that a name is NOT passed as an argument when object is created', () => {
			beforeEach(() => {
				return (ship_one = new ship());
			});

			it('should return the default name stored', () => {
				expect(ship_one.getName()).toEqual('Ship 1');
			});
		});
	});

	describe('getCoordinates', () => {
		beforeEach(() => {
			return (ship_one = new ship());
		});

		it('should not have any coordinates when a new ship object is created', () => {
			expect(ship_one.getCoordinates()).toEqual([]);
		});
	});

	describe('setCoordinates', () => {
		it('should be able to set coordinates for a ship', () => {
			ship_one.setCoordinates({x: 11, y: 10}, 0);
			ship_one.setCoordinates({x: 12, y: 10}, 1);
			ship_one.setCoordinates({x: 13, y: 10}, 2);

			expect(ship_one.getCoordinates()).toEqual(expectedCoordinates);
		});

		describe('getHealth', () => {
			beforeEach(() => {
				ship_one.setCoordinates({x: 11, y: 10}, 0);
				ship_one.setCoordinates({x: 12, y: 10}, 1);
				ship_one.setCoordinates({x: 13, y: 10}, 2);
			});

			it('should get the health of a ship', () => {
				expect(ship_one.getHealth()).toEqual(100);
			});
		});

		describe('setHealth', () => {
			beforeEach(() => {
				ship_one.setCoordinates({x: 11, y: 10}, 0);
				ship_one.setCoordinates({x: 12, y: 10}, 1);
				ship_one.setCoordinates({x: 13, y: 10}, 2);
			});

			it('should set the health of a ship', () => {
				expect.assertions(2);
				expect(ship_one.getHealth()).toEqual(100);
				ship_one.setHealth(75);
				expect(ship_one.getHealth()).toEqual(75);
			});
		});
	});

	describe('setIsHitForCoordinate', () => {
		beforeEach(() => {
			ship_one.setCoordinates({x: 11, y: 10}, 0);
			ship_one.setCoordinates({x: 12, y: 10}, 1);
			ship_one.setCoordinates({x: 13, y: 10}, 2);
		});

		it('should be able to hit a coordinate and check if a ship has sunk', () => {
			expect.assertions(2);

			const hitCoordinate = {coordinates: {x: 11, y: 10}, isHit: true};

			expect(ship_one.getCoordinates()).toEqual(expectedCoordinates);

			ship_one.setIsHitForCoordinate(0);

			expect(ship_one.getCoordinates()[0]).toEqual(hitCoordinate);
		});

		describe('given that a part of a ship is hit', () => {
			it('should check if the ship has sunk', () => {
				expect(ship_one.getIsSunk()).toEqual(false);
			});
		});
	});

	describe('getOrientation', () => {
		it('should be able to get a ships orientation', () => {
			expect(ship_one.getOrientation()).toEqual('vertical');
		});
	});

	describe('setOrientation', () => {
		it('should be able to set a ships orientation', () => {
			expect.assertions(2);
			expect(ship_one.getOrientation()).toEqual('vertical');

			ship_one.setOrientation('horizontal');

			expect(ship_one.getOrientation()).toEqual('horizontal');
		});
	});
});
