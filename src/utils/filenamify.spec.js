/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const filenamify = require('./filenamify');
const testCases = require('./filenamify.testCases');

describe('util filenamify', () => {
  testCases.forEach((testCase) => {
    it('produces valid folder name', () => {
      const result = filenamify(testCase.input);

      expect(result).to.deep.equal(testCase.output);
    });
  });
});
