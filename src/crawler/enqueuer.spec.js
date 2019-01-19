/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const enqueuer = require('./enqueuer');
const dbMock = require('../db/mock');

describe('enqueuer', () => {
  let db;

  beforeEach(async () => {
    db = await dbMock();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('setup', () => {
    it(`requires db option`, () => {
      expect(() => enqueuer({
        db
      })).to.not.throw();
    });

    it('accepts visitedItems option', () => {
      expect(() => enqueuer({
        db,
        visitedItems: ['a']
      })).to.not.throw();
    });

    it('accepts queuedItems option', () => {
      expect(() => enqueuer({
        db,
        queuedItems: ['a']
      })).to.not.throw();
    });
  });

  describe('next id', () => {
    it('can provide next id in the queue', () => {
      const queue = enqueuer({
        db,
        queuedItems: ['a']
      });

      const nextId = queue.next();

      expect(nextId).to.equal('a');
    });

    it('will proide if queue is empty', () => {
      const queue = enqueuer({
        db,
        queuedItems: []
      });

      const nextId = queue.next();

      expect(nextId).to.equal(null);
    });
  });

  describe('adding to queue', () => {
    it('allows adding new ids to queue', async () => {
      const queue = enqueuer({
        db,
        queuedItems: []
      });

      await queue.add(['added', 'yet another']);
      const nextId = queue.next();

      expect(nextId).to.equal('added');
    });
  });

  describe('visting items', () => {
    it('removes only visited item from queue', async () => {
      const queue = enqueuer({
        db,
        queuedItems: ['a']
      });

      const remainingCount = await queue.visit('a');

      expect(remainingCount).to.deep.equal([]);
    });

    it('removes any visited item from queue', async () => {
      const queue = enqueuer({
        db,
        queuedItems: ['a', 'b', 'c']
      });

      const remainingCount = await queue.visit('b');

      expect(remainingCount).to.deep.equal(['a', 'c']);
    });
  });
});
