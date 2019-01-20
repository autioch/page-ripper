/* eslint-env mocha */
/* eslint max-nested-callbacks: [2, 5] */
const { expect } = require('chai');
const cheerio = require('cheerio');
const parsePost = require('./parsePost');
const testCases = require('./testCases');

describe('JM parsePost', () => {
  testCases.forEach((testCase, index) => {
    let result = {
      id: 'a',
      nextUrls: [],
      imageUrls: []
    };

    describe(`${index} setup`, () => {
      it('parses without throwing', () => {
        const $ = cheerio.load(testCase.htm);

        expect(() => {
          result = parsePost($, testCase.url, testCase.htm);
        }).to.not.throw();
      });

      it('returns an id', () => {
        expect(result.id).to.equal(testCase.id);
      });

      it('returns folderName', () => {
        expect(result.folderName).to.deep.equal(testCase.folderName);
      });

      it('returns list of nextUrls', () => {
        expect(result.nextUrls).to.deep.equal(testCase.nextUrls);
      });

      it('returns list of imageUrls', () => {
        expect(result.imageUrls).to.deep.equal(testCase.imageUrls);
      });
    });

    describe(`${index} extras`, () => {
      it('returns title', () => {
        expect(result.title).to.deep.equal(testCase.title);
      });

      it('returns author', () => {
        expect(result.author).to.deep.equal(testCase.author);
      });

      it('returns addedDate', () => {
        expect(result.addedDate).to.deep.equal(testCase.addedDate);
      });

      it('returns tags', () => {
        expect(result.tags).to.deep.equal(testCase.tags);
      });

      it('returns comments', () => {
        expect(result.comments.comments.length).to.deep.equal(testCase.commentCount);
      });

      it('returns comment links', () => {
        expect(result.comments.links).to.deep.equal(testCase.commentLinks);
      });
    });
  });
});
