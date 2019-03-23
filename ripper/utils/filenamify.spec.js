/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const filenamify = require('./filenamify');
const testCases = require('./filenamify.testCases');

describe('util filenamify', () => {
  testCases.forEach((testCase) => {
    if (typeof testCase === 'string') {
      it(`does not throw for ${testCase}`, () => {
        filenamify(testCase);
      });

      return;
    }
    it('produces valid folder name', () => {
      const result = filenamify(testCase.input);

      expect(result).to.deep.equal(testCase.output);
    });
  });
});
