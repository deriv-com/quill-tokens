/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'babel',
  silent: true,
  collectCoverage: false,
  coverageReporters: ['json', 'html'],
};

module.exports = config;
