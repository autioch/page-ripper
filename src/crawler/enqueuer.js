const { uniq } = require('lodash');
const enqueuerDb = require('./enqueuerDb');

const setDict = (obj, key) => Object.assign(obj, {
  [key]: true
});

const extract = (arr, dict) => uniq(arr).filter((item) => !dict[item]);

module.exports = function enqueuer(config) {
  const { visitedItems = [], queuedItems = [], db } = config;

  const dbAPI = enqueuerDb({
    db
  });

  if (!db) {
    throw Error('enqueuer requires db.');
  }

  const visited = visitedItems.reduce((obj, item) => setDict(obj, item), {});
  let queued = extract(queuedItems, visited);

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
    const toAdd = extract(items, visited).filter((item) => !queued.includes(item));

    await dbAPI.add(toAdd);
    queued.push(...toAdd);
  }

  return {
    visit,
    next,
    add
  };
};
