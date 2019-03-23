/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
const { expect } = require('chai');
const { queueFactory } = require('./queue');
const crawlFactory = require('./crawl');
const dbMock = require('../db/mock');

const mockPostDownloader = (postInfo = {}) => ({
  downloadPost: () => new Promise((res) => setTimeout(() => res(postInfo), 10))
});

describe('crawl', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    if (db.db.open) {
      await db.close();
    }
  });

  describe('setup', () => {
    it(`requires valid configuration`, () => {
      expect(() => crawlFactory({
        db,
        downloader: mockPostDownloader(),
        queue: queueFactory({
          db,
          queuedItems: [],
          visitedItems: []
        })
      })).to.not.throw();
    });
  });

  describe('loop', () => {
    it('will do nothing with empty queue', async () => {
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader(),
        queue: queueFactory({
          db,
          queuedItems: [],
          visitedItems: []
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(0);
      expect(db.db.open).to.equal(false);
    });

    it('will do nothing if all queued items are already visited', async () => {
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader(),
        queue: queueFactory({
          db,
          queuedItems: ['a'],
          visitedItems: ['a', 'b']
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(0);
      expect(db.db.open).to.equal(false);
    });

    it('will loop once with single item and no nextUrls', async () => {
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader({
          id: '1',
          nextUrls: []
        }),
        requestPause: 0,
        queue: queueFactory({
          db,
          queuedItems: ['a'],
          visitedItems: []
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(1);
      expect(db.db.open).to.equal(false);
    });

    it('will loop as many times as queue is long', async () => {
      const loopCount = 10;
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader({
          id: 'mock',
          nextUrls: []
        }),
        requestPause: 0,
        queue: queueFactory({
          db,
          queuedItems: new Array(loopCount).fill(null).map((_, index) => index.toString()),
          visitedItems: []
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(loopCount);
      expect(db.db.open).to.equal(false);
    });

    it('will loop once for duplicated url', async () => {
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader({
          id: 'mock',
          nextUrls: ['a', 'a']
        }),
        requestPause: 0,
        queue: queueFactory({
          db,
          queuedItems: ['first'],
          visitedItems: []
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(2);
      expect(db.db.open).to.equal(false);
    });

    it('will loop for all urls', async () => {
      const crawl = crawlFactory({
        db,
        downloader: mockPostDownloader({
          id: 'mock',
          nextUrls: ['a', 'b', 'c', 'first', 'c']
        }),
        requestPause: 0,
        queue: queueFactory({
          db,
          queuedItems: ['first'],
          visitedItems: []
        })
      });

      const result = await crawl.start();

      expect(result).to.equal(4);
      expect(db.db.open).to.equal(false);
    });
  });
});