import type { JestConfigWithTsJest } from 'ts-jest'
const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setEnvVars.ts']
}

export default jestConfig
