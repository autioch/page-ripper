/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const imagePrepare = require('./prepare');
const testCases = require('./prepare.testCases');

describe('image prepare', () => {
  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      const result = imagePrepare(testCase.input);

      expect(result).to.deep.equal(testCase.output);
    });
  });
});
