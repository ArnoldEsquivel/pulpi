/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The root directory that Jest should scan for tests and modules within
  rootDir: "../",

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>"
  ],

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};

module.exports = config;
