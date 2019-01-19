const setupDb = require('./db');
const crawlerFactory = require('./crawler');
const { ensureConfig } = require('./utils');

module.exports = async function pageRipper(config) {
  ensureConfig(config, 'dataPath', 'string');
  ensureConfig(config, 'dbPath', 'string');
  ensureConfig(config, 'parsePost', 'function');

  const { dataPath, dbPath, parsePost, startingPage } = config;
  const { db, queuedItems, visitedItems, existingIds } = await setupDb(dbPath);

  if (startingPage) {
    queuedItems.unshift(startingPage);
  }

  const crawler = crawlerFactory({
    db,
    queuedItems,
    visitedItems,
    existingIds,
    parsePost,
    dataPath
  });

  return crawler;
};
