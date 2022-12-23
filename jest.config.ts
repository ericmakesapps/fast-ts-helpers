// eslint-disable-next-line import/no-anonymous-default-export
export default {
	clearMocks: true,
	collectCoverage: true,
	// collectCoverageFrom: ["src/**/*.{js,ts}"],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: -10
		}
	},
	testEnvironment: "jsdom",
	modulePathIgnorePatterns: ["<rootDir>/lib"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
}
