const { uniq } = require('lodash');
const dbAPIFactory = require('./dbAPI');
const { ensureConfig } = require('../../utils');

const setDict = (obj, key) => Object.assign(obj, {
  [key]: true
});

const filterByDict = (arr, dict) => uniq(arr).filter((item) => !dict[item]);

module.exports = function queueFactory(config) {
  ensureConfig(config, 'db', 'object');

  const { visitedItems = [], queuedItems = [], db } = config;

  const dbAPI = dbAPIFactory({
    db
  });

  const visited = visitedItems.reduce((obj, item) => setDict(obj, item), {});
  let queued = filterByDict(queuedItems, visited);

  async function visit(item) {
    setDict(visited, item);

    await dbAPI.visit(item);

    queued = queued.filter((arrItem) => arrItem !== item);

    return queued.slice();
  }

  function next() {
    if (!queued.length) {
      return null;
    }

    return queued[0];
  }

  async function add(items) {
    const toAdd = filterByDict(items, visited).filter((item) => !queued.includes(item));

    await dbAPI.add(toAdd);
    queued.push(...toAdd);
  }

  return {
    visit,
    next,
    add
  };
};
