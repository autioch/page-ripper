/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const enqueuerDb = require('./enqueuerDb');
const dbMock = require('../db/mock');

describe('cawler enqueuerDb', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`constructs properly`, () => {
    expect(() => enqueuerDb({
      db
    })).to.not.throw();
  });

  it(`add urls to query`, async () => {
    const dbAPI = enqueuerDb({
      db
    });

    const toAdd = [
      'http://a.com',
      'http://b.com',
      'http://c.com'
    ];

    await dbAPI.add(toAdd);

    const dbState = await db.all('SELECT * FROM queue');

    expect(dbState).to.deep.equal([{
      isVisited: 0,
      url: 'http://a.com'
    }, {
      isVisited: 0,
      url: 'http://b.com'
    }, {
      isVisited: 0,
      url: 'http://c.com'
    }]);
  });

  it(`marks visited urls`, async () => {
    const dbAPI = enqueuerDb({
      db
    });

    const toAdd = [
      'http://a.com',
      'http://b.com',
      'http://c.com'
    ];

    await dbAPI.add(toAdd);
    await dbAPI.visit(toAdd[1]);

    const dbState = await db.all('SELECT * FROM queue');

    expect(dbState).to.deep.equal([{
      isVisited: 0,
      url: 'http://a.com'
    }, {
      isVisited: 1,
      url: 'http://b.com'
    }, {
      isVisited: 0,
      url: 'http://c.com'
    }]);
  });
});
