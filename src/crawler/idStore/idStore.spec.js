/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const idStoreFactory = require('./idStore');

describe('idStoreFactory', () => {
  describe('setup', () => {
    it(`constructs without arguments`, () => {
      expect(idStoreFactory).to.not.throw();
    });

    it('accepts defaultId parameter', () => {
      expect(() => idStoreFactory({
        defaultId: 'TEST'
      })).to.not.throw();
    });

    it('accepts existingIds parameter', () => {
      expect(() => idStoreFactory({
        existingIds: ['a']
      })).to.not.throw();
    });

    it('accepts existingIds parameter', () => {
      expect(() => idStoreFactory({
        existingIds: ['a']
      })).to.not.throw();
    });
  });

  describe('marking used ids', () => {
    it('can mark id as used', () => {
      const builder = idStoreFactory();

      expect(() => builder.use('1')).to.not.throw();
    });
  });

  describe('building new id', () => {
    it('generates new id based on post info', () => {
      const builder = idStoreFactory();
      const newId = builder.uniquify('a');

      expect(newId).to.equal('a');
    });

    it('returns new unique id', () => {
      const builder = idStoreFactory({
        existingIds: ['a']
      });

      const newId = builder.uniquify('a');

      expect(newId).to.equal('a__2');
    });

    it('returns default id when no id is provided', () => {
      const builder = idStoreFactory({});

      const newId = builder.uniquify(null);

      expect(newId).to.equal('MISSING');
    });

    it('returns unique default id when no id is provided', () => {
      const builder = idStoreFactory({
        existingIds: ['MISSING', 'MISSING__2']
      });

      const newId = builder.uniquify(null);

      expect(newId).to.equal('MISSING__3');
    });
  });
});
