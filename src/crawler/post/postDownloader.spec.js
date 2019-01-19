/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const postDownloader = require('./postDownloader');
const idBuilder = require('../idBuilder');
const { errorTestCases, validTestCases } = require('./postDownloader.testCases');
const dbMock = require('../../db/mock');

const DELAY = 1000;

const mockFetchPost = (result, delay = DELAY) => () => new Promise((res) => setTimeout(() => res(result), delay));
const mockParsePost = (result) => () => result;

describe('postDownloader', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('setup', () => {
    it(`requires valid configuration`, () => {
      expect(() => postDownloader({
        db,
        idBuilder: idBuilder(),
        fetchPost: mockFetchPost({}),
        parsePost: mockParsePost({})
      })).to.not.throw();
    });

    it('returns API object', () => {
      const downloader = postDownloader({
        db,
        idBuilder: idBuilder(),
        fetchPost: mockFetchPost({}),
        parsePost: mockParsePost({})
      });

      expect(downloader).to.be.an('object');
    });
  });

  describe('downloadPost', () => {
    it('is a function with single argument', () => {
      const downloader = postDownloader({
        db,
        idBuilder: idBuilder(),
        fetchPost: mockFetchPost({}),
        parsePost: mockParsePost({})
      });

      expect(downloader.downloadPost).to.be.a('function');
      expect(downloader.downloadPost.length).to.equal(1);
    });

    errorTestCases.forEach((testCase) => {
      it(testCase.description, async () => {
        const downloader = postDownloader({
          db,
          idBuilder: idBuilder(),
          fetchPost: mockFetchPost(testCase.response),
          parsePost: mockParsePost({})
        });

        const postInfo = await downloader.downloadPost(testCase.response.url);

        expect(postInfo).to.deep.equal(testCase.response);
      });
    });

    validTestCases.forEach((testCase) => {
      it(testCase.description, async () => {
        const downloader = postDownloader({
          db,
          idBuilder: idBuilder({
            existingIds: testCase.existingIds
          }),
          fetchPost: mockFetchPost(testCase.response),
          parsePost: mockParsePost(testCase.parseResult)
        });

        const postInfo = await downloader.downloadPost(testCase.response.url);

        expect(postInfo).to.deep.equal(testCase.postInfo);
      });
    });
  });
});
