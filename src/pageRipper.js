const setupDb = require('./db');
const crawlerFactory = require('./crawler');
const { ensureConfig } = require('./utils');

module.exports = async function pageRipper(config) {
  ensureConfig(config, 'dataPath', 'string');
  ensureConfig(config, 'dbPath', 'string');
  ensureConfig(config, 'parsePost', 'function');

  const { dataPath, dbPath, parsePost, startingPages, requestPause } = config;
  const { db, queuedItems, visitedItems, existingIds } = await setupDb(dbPath);

  if (startingPages) {
    queuedItems.unshift(...startingPages);
  }

  const crawler = crawlerFactory({
    db,
    requestPause,
    queuedItems,
    visitedItems,
    existingIds,
    parsePost,
    dataPath
  });

  process.on('SIGINT', () => {
    if (db.db.open) {
      db.close();
    }
  });

  return crawler;
};
