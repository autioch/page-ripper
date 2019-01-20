/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const dbAPIFactory = require('./dbAPI');
const dbMock = require('../../db/mock');

describe('crawler post db API', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`constructs properly`, () => {
    expect(() => dbAPIFactory({
      db
    })).to.not.throw();
  });

  it(`save posts`, async () => {
    const dbAPI = dbAPIFactory({
      db
    });

    await dbAPI.save({
      id: 'a',
      folderName: 'dataPath/a',
      url: 'http://a.com',
      postInfo: 'json'
    });

    const dbState = await db.all('SELECT * FROM posts');

    expect(dbState).to.deep.equal([{
      id: 'a',
      folderName: 'dataPath/a',
      url: 'http://a.com',
      postInfo: 'json'
    }]);
  });
});
