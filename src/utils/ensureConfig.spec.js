/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
const { expect } = require('chai');
const ensureConfig = require('./ensureConfig');

describe('ensureConfig', () => {
  describe('valid config', () => {
    it(`does nothing with valid string param`, () => {
      const config = {
        stringProp: 'a'
      };

      expect(() => ensureConfig(config, 'stringProp', 'string')).to.not.throw();
    });

    it(`does nothing with valid number param`, () => {
      const config = {
        numberProp: 1000
      };

      expect(() => ensureConfig(config, 'numberProp', 'number')).to.not.throw();
    });

    it(`does nothing with valid boolean param`, () => {
      const config = {
        booleanProp: true
      };

      expect(() => ensureConfig(config, 'booleanProp', 'boolean')).to.not.throw();
    });

    it(`does nothing with valid function param`, () => {
      const config = {
        fnProp() {} // eslint-disable-line no-empty-function
      };

      expect(() => ensureConfig(config, 'fnProp', 'function')).to.not.throw();
    });
  });

  describe('invalid config', () => {
    it(`throws proper error with missing config`, () => {
      const example = (config) => ensureConfig(config, 'prop', 'string');

      expect(() => example())
        .to.throw(Error)
        .with.property('message', 'example requires config object');
    });

    it(`throws proper error with missing property`, () => {
      const example = (config) => ensureConfig(config, 'prop', 'string');

      expect(() => example({}))
        .to.throw(Error)
        .with.property('message', 'example requires "prop" string in config, got undefined');
    });

    it(`throws proper error with invalid property`, () => {
      const example = (config) => ensureConfig(config, 'prop', 'string');

      expect(() => example({
        prop: 1
      }))
        .to.throw(Error)
        .with.property('message', 'example requires "prop" string in config, got number');
    });
  });
});
