/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const getImageNames = require('./getImageNames');
const testCases = require('./getImageNames.testCases');

describe('getImageNames', () => {
  testCases.forEach((testCase, index) => {
    it(testCase.description || `test case ${index}`, () => {
      const result = getImageNames(testCase.input.folderName, testCase.input.imageUrls);

      expect(result).to.deep.equal(testCase.output);
    });
  });
});
