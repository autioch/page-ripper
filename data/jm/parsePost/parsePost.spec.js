/* eslint-env mocha */
/* eslint max-nested-callbacks: [2, 4] */
const { expect } = require('chai');
const cheerio = require('cheerio');
const parsePost = require('./parsePost');
const testCases = require('./testCases');

describe('JM parsePost', () => {
  testCases.forEach((testCase) => {
    let result = {
      id: 'a',
      nextUrls: [],
      imageUrls: []
    };

    it('parses without throwing', () => {
      const $ = cheerio.load(testCase.htm);

      expect(() => {
        result = parsePost($, testCase.url, testCase.htm);
      }).to.not.throw();
    });

    it('returns an id', () => {
      expect(result.id).to.equal(testCase.id);
    });

    it('returns list of nextUrls', () => {
      expect(result.nextUrls).to.deep.equal(testCase.nextUrls);
    });

    it('returns list of imageUrls', () => {
      expect(result.imageUrls).to.deep.equal(testCase.imageUrls);
    });
  });
});
