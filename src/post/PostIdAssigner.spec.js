/* eslint-env mocha */
/* eslint max-nested-callbacks: [2, 4] */
const { expect } = require('chai');
const PostIdAssigner = require('./PostIdAssigner');
const testCases = require('./PostIdAssigner.testCases');

describe('PostIdAssigner creation', () => {
  it(`can be constructed without arguments`, () => {
    expect(() => new PostIdAssigner()).to.not.throw();
  });

  it(`can be constructed with empty config object`, () => {
    expect(() => new PostIdAssigner({})).to.not.throw();
  });

  it(`can be constructed with empty seenIdsArray`, () => {
    expect(() => new PostIdAssigner({
      seenIdsArray: []
    })).to.not.throw();
  });

  it(`can be constructed with valid seenIdsArray`, () => {
    expect(() => new PostIdAssigner({
      seenIdsArray: [1, 'a']
    })).to.not.throw();
  });

  it(`will throw when passed repeating seenIds`, () => {
    expect(() => new PostIdAssigner({
      seenIdsArray: ['a', 'a']
    })).to.throw();
  });
});

describe('PostIdAssigner assignPostId', () => {
  testCases.forEach((testCase) => {
    describe(`for id ${testCase.id} and seenIds ${testCase.seenIds}`, () => {
      it(`will return ${testCase.newId}`, () => {
        const postIdAssigner = new PostIdAssigner({
          seenIdsArray: testCase.seenIds
        });
        const post = {
          id: testCase.id
        };

        expect(postIdAssigner.assignPostId(post)).to.equal(testCase.newId);
      });
    });
  });
});
