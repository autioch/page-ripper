const { uniq } = require('lodash');
const { ensureConfig } = require('../../utils');
const qbLog = require('qb-log');

const setDict = (obj, key) => Object.assign(obj, {
  [key]: true
});

qbLog({
  queueAdd: {
    prefix: 'QUEUE ADD',
    formatter: qbLog._chalk.grey // eslint-disable-line no-underscore-dangle
  },
  queueInit: {
    prefix: 'QUEUE INIT',
    formatter: qbLog._chalk.grey // eslint-disable-line no-underscore-dangle
  }
});

const filterByDict = (arr, dict) => uniq(arr).filter((item) => !dict[item]);

module.exports = function queueFactory(config) {
  ensureConfig(config, 'db', 'object');
  ensureConfig(config, 'visitedItems', 'array');
  ensureConfig(config, 'queuedItems', 'array');

  const { visitedItems = [], queuedItems = [], db } = config;

  const visited = visitedItems.reduce((obj, item) => setDict(obj, item), {});
  let queued = filterByDict(queuedItems, visited);

  qbLog.queueInit(`visited ${visitedItems.length}, queued ${queued.length}`);

  async function visit(item) {
    setDict(visited, item);

    await db.visitUrl(item);

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

    qbLog.queueAdd(`${toAdd.length} from ${items.length}`);

    await db.addUrlToQueue(toAdd);
    queued.push(...toAdd);
  }

  return {
    visit,
    next,
    add
  };
};
