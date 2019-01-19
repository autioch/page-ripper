/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const postDownloadFactory = require('./download');
const { idStoreFactory } = require('../idStore');
const { errorTestCases, validTestCases } = require('./download.testCases');
const dbMock = require('../../db/mock');

const DELAY = 1000;

const mockPostRequest = (result, delay = DELAY) => () => new Promise((res) => setTimeout(() => res(result), delay));
const mockParsePost = (result) => () => result;

describe('crawler post', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('setup', () => {
    it(`requires valid configuration`, () => {
      expect(() => postDownloadFactory({
        db,
        idStore: idStoreFactory(),
        postRequest: mockPostRequest({}),
        parsePost: mockParsePost({})
      })).to.not.throw();
    });

    it('returns API object', () => {
      const downloader = postDownloadFactory({
        db,
        idStore: idStoreFactory(),
        postRequest: mockPostRequest({}),
        parsePost: mockParsePost({})
      });

      expect(downloader).to.be.an('object');
    });
  });

  describe('downloadPost', () => {
    it('is a function with single argument', () => {
      const downloader = postDownloadFactory({
        db,
        idStore: idStoreFactory(),
        postRequest: mockPostRequest({}),
        parsePost: mockParsePost({})
      });

      expect(downloader.downloadPost).to.be.a('function');
      expect(downloader.downloadPost.length).to.equal(1);
    });

    errorTestCases.forEach((testCase) => {
      it(testCase.description, async () => {
        const downloader = postDownloadFactory({
          db,
          idStore: idStoreFactory(),
          postRequest: mockPostRequest(testCase.response),
          parsePost: mockParsePost({})
        });

        const postInfo = await downloader.downloadPost(testCase.response.url);

        expect(postInfo).to.deep.equal(testCase.response);
      });
    });

    validTestCases.forEach((testCase) => {
      it(testCase.description, async () => {
        const downloader = postDownloadFactory({
          db,
          idStore: idStoreFactory({
            existingIds: testCase.existingIds
          }),
          postRequest: mockPostRequest(testCase.response),
          parsePost: mockParsePost(testCase.parseResult)
        });

        const postInfo = await downloader.downloadPost(testCase.response.url);

        expect(postInfo).to.deep.equal(testCase.postInfo);
      });
    });
  });
});
