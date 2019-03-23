/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
const { expect } = require('chai');
const pageRipper = require('./pageRipper');

describe('pageRipper', () => {
  it('requires valid config', () => {
    expect(() => pageRipper({
      dataPath: '',
      dbPath: ':memory:',
      parsePost: () => 'a'
    })).to.not.throw();
  });
});
