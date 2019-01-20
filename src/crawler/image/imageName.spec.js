/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const imageName = require('./imageName');
const testCases = require('./imageName.testCases');

describe('imageName', () => {
  testCases.forEach((testCase) => {
    it(testCase.description || 'test case', () => {
      const result = imageName(testCase.input);

      expect(result).to.deep.equal(testCase.output);
    });
  });
});
