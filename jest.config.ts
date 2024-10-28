import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      babelConfig: true,
    },
  },
  transformIgnorePatterns: [],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx,js,jsx}',
    '!components/**/node_modules/**',
    '!components/style/**',
  ],
  // testEnvironment: 'jsdom',
};

export default config;
