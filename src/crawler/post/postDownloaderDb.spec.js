/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const postDownloaderDb = require('./postDownloaderDb');
const dbMock = require('../../db/mock');

describe('cawler enqueuerDb', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`constructs properly`, () => {
    expect(() => postDownloaderDb({
      db
    })).to.not.throw();
  });

  it(`add posts`, async () => {
    const dbAPI = postDownloaderDb({
      db
    });

    await dbAPI.add({
      id: 'a',
      url: 'http://a.com',
      postInfo: 'json'
    });

    const dbState = await db.all('SELECT * FROM posts');

    expect(dbState).to.deep.equal([{
      id: 'a',
      url: 'http://a.com',
      postInfo: 'json'
    }]);
  });
});
