/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const folderName = require('./folderName');
const testCases = require('./folderName.testCases');

describe('image folder name', () => {
  testCases.forEach((testCase) => {
    it('produces valid folder name', () => {
      const result = folderName({
        dataPath: testCase.dataPath,
        postId: testCase.postId
      });

      expect(result).to.deep.equal(testCase.folderName);
    });
  });
});
