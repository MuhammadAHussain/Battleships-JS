module.exports = {
	resetMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/simple-battle-ships/src/**/*.js'],
	coverageReporters: ['html', 'lcov', 'text'],
	moduleFileExtensions: ['js', 'json', 'node'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['config']
};
