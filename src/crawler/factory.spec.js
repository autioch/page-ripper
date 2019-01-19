/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
const { expect } = require('chai');
const crawlerFactory = require('./factory');
const dbMock = require('../db/mock');

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
        db,
        dataPath: 'tmp'
      })).to.not.throw();
    });
  });
});
