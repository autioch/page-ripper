/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { expect } = require('chai');
const dbMock = require('../mock');

describe('DB Wrapper', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`save posts`, async () => {
    await db.savePost({
      id: 'a',
      folderName: 'dataPath/a',
      title: 'some title',
      url: 'http://a.com',
      postInfo: 'json'
    });

    const dbState = await db.all('SELECT * FROM posts');

    expect(dbState).to.deep.equal([{
      id: 'a',
      folderName: 'dataPath/a',
      title: 'some title',
      url: 'http://a.com',
      postInfo: 'json'
    }]);
  });

  it(`save post images`, async () => {
    await db.savePostImages('a', [{
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

  it(`add urls to query`, async () => {
    const toAdd = [
      'http://a.com',
      'http://b.com',
      'http://c.com'
    ];

    await db.addUrlToQueue(toAdd);

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
    const toAdd = [
      'http://a.com',
      'http://b.com',
      'http://c.com'
    ];

    await db.addUrlToQueue(toAdd);
    await db.visitUrl(toAdd[1]);

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
