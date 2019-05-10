/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const dbAPIFactory = require('./dbAPI');
const dbMock = require('../../../db/mock');

describe('crawler images db API', () => {
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

  it(`save images`, async () => {
    const dbAPI = dbAPIFactory({
      db
    });

    await dbAPI.save('a', [{
      imageUrl: 'b',
      fullPath: 'c',
      message: ''
    }, {
      imageUrl: 'b2',
      fullPath: 'c2',
      message: 'error'
    }]);

    const dbState = await db.all('SELECT * FROM images');

    expect(dbState).to.deep.equal([{
      postId: 'a',
      imageUrl: 'b',
      fullPath: 'c',
      message: ''
    }, {
      postId: 'a',
      imageUrl: 'b2',
      fullPath: 'c2',
      message: 'error'
    }]);
  });
});
