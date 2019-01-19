/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const prepareLastState = require('./prepareLastState');
const dbMock = require('../db/mock');

describe('db prepareLastState', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`returns empty arrays for fresh database`, async() => {
    const result = await prepareLastState(db);

    expect(result.queuedItems.length).to.equal(0);
    expect(result.visitedItems.length).to.equal(0);
    expect(result.existingIds.length).to.equal(0);
  });

  it(`returns valid query items`, async () => {
    const toAdd = [
      'http://a.com',
      'http://b.com',
      'http://c.com'
    ];

    for (let i = 0; i < toAdd.length; i++) {
      await db.run('INSERT INTO queue (url, isVisited) VALUES (?, ?)', [toAdd[i], 0]); // eslint-disable-line no-await-in-loop
    }

    const result = await prepareLastState(db);

    expect(result.queuedItems).to.deep.equal([{
      url: 'http://a.com'
    }, {
      url: 'http://b.com'
    }, {
      url: 'http://c.com'
    }]);
  });

  it(`returns valid existingIds`, async () => {
    const toAdd = [{
      id: 'a',
      url: 'http://a.com',
      postInfo: 'json'
    }, {
      id: 'b',
      url: 'http://b.com',
      postInfo: 'json'
    }, {
      id: 'c',
      url: 'http://c.com',
      postInfo: 'json'
    }];

    for (let i = 0; i < toAdd.length; i++) {
      await db.run('INSERT INTO posts (id, url, postINfo) VALUES (?, ?, ?)', [toAdd[i].id, toAdd[i].url, toAdd[i].postInfo]); // eslint-disable-line no-await-in-loop
    }

    const result = await prepareLastState(db);

    expect(result.existingIds).to.deep.equal([{
      id: 'a'
    }, {
      id: 'b'
    }, {
      id: 'c'
    }]);
  });

  it(`returns valid visitedItems`, async () => {
    const toAdd = [{
      id: 'a',
      url: 'http://a.com',
      postInfo: 'json'
    }, {
      id: 'b',
      url: 'http://b.com',
      postInfo: 'json'
    }, {
      id: 'c',
      url: 'http://c.com',
      postInfo: 'json'
    }];

    for (let i = 0; i < toAdd.length; i++) {
      await db.run('INSERT INTO posts (id, url, postINfo) VALUES (?, ?, ?)', [toAdd[i].id, toAdd[i].url, toAdd[i].postInfo]); // eslint-disable-line no-await-in-loop
    }

    const result = await prepareLastState(db);

    expect(result.visitedItems).to.deep.equal([{
      url: 'http://a.com'
    }, {
      url: 'http://b.com'
    }, {
      url: 'http://c.com'
    }]);
  });
});
