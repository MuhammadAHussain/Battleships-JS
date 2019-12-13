const Player = require('../src/player');

describe('Player', () => {
	describe('given that an argument is passed when object is created', () => {
		beforeEach(() => {
			return (player_one = new Player('tester_one'));
		});

		it('should have the value of name', () => {
			expect(player_one.getName()).toEqual('tester_one');
		});
	});

	describe('given that an argument is NOT passed when an object is created', () => {
		beforeEach(() => {
			return (player_one = new Player());
		});

		it('should store Player 1 when no name is passed to object', () => {
			expect(player_one.getName()).toEqual('Player 1');
		});
	});
});
