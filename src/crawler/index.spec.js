/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
const { expect } = require('chai');
const crawlerFactory = require('./index');
const dbMock = require('../db/mock');

// const mockPostDownloader = (postInfo) => ({
//   downloadPost: () => new Promise((res) => setTimeout(() => res(postInfo), 10))
// });

describe('crawlerFactory', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('setup', () => {
    it(`requires valid configuration`, () => {
      expect(() => crawlerFactory({
        parsePost: () => 'a',
        db
      })).to.not.throw();
    });
  });
});
