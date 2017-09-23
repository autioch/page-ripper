/* eslint-env mocha */
/* eslint max-nested-callbacks: [2, 4] */
const { expect } = require('chai');
const IdGenerator = require('../../../src/utils/IdGenerator');
const testCases = require('./IdGenerator.testCases');

describe('IdGenerator creation', () => {
  it(`can be constructed without arguments`, () => {
    expect(() => new IdGenerator()).to.not.throw();
  });

  it(`can be constructed with empty config object`, () => {
    expect(() => new IdGenerator({})).to.not.throw();
  });

  it(`can be constructed with empty seenIds`, () => {
    expect(() => new IdGenerator({
      seenIds: []
    })).to.not.throw();
  });

  it(`can be constructed with valid seenIds`, () => {
    expect(() => new IdGenerator({
      seenIds: [1, 'a']
    })).to.not.throw();
  });

  it(`will throw when passed repeating seenIds`, () => {
    expect(() => new IdGenerator({
      seenIds: ['a', 'a']
    })).to.throw();
  });
});

describe('IdGenerator generateId', () => {
  testCases.forEach((testCase) => {
    describe(`for id ${testCase.id} and seenIds ${testCase.seenIds}`, () => {
      it(`will return ${testCase.newId}`, () => {
        const idGenerator = new IdGenerator({
          seenIds: testCase.seenIds
        });

        const itemInfo = {
          id: testCase.id
        };

        expect(idGenerator.generateId(itemInfo).id).to.equal(testCase.newId);
      });
    });
  });
});
