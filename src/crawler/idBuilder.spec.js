/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const idBuilder = require('./idBuilder');

describe('idBuilder', () => {
  describe('setup', () => {
    it(`constructs without arguments`, () => {
      expect(idBuilder).to.not.throw();
    });

    it('accepts defaultId parameter', () => {
      expect(() => idBuilder({
        defaultId: 'TEST'
      })).to.not.throw();
    });

    it('accepts existingIds parameter', () => {
      expect(() => idBuilder({
        existingIds: ['a']
      })).to.not.throw();
    });

    it('accepts existingIds parameter', () => {
      expect(() => idBuilder({
        existingIds: ['a']
      })).to.not.throw();
    });
  });

  describe('marking used ids', () => {
    it('can mark id as used', () => {
      const builder = idBuilder();

      expect(() => builder.markIdAsUsed('1')).to.not.throw();
    });
  });

  describe('building new id', () => {
    it('generates new id based on post info', () => {
      const builder = idBuilder();
      const newId = builder.buildId('a');

      expect(newId).to.equal('a');
    });

    it('returns new unique id', () => {
      const builder = idBuilder({
        existingIds: ['a']
      });

      const newId = builder.buildId('a');

      expect(newId).to.equal('a__2');
    });

    it('returns default id when no id is provided', () => {
      const builder = idBuilder({});

      const newId = builder.buildId(null);

      expect(newId).to.equal('MISSING');
    });

    it('returns unique default id when no id is provided', () => {
      const builder = idBuilder({
        existingIds: ['MISSING', 'MISSING__2']
      });

      const newId = builder.buildId(null);

      expect(newId).to.equal('MISSING__3');
    });
  });
});
