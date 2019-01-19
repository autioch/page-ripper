const config = require('../config');
const setupDb = require('./db');
const crawlerFactory = require('./crawler');

(async () => {
  const { db, queuedItems, visitedItems, existingIds } = await setupDb(config);

  const crawler = crawlerFactory({
    parsePost: (text) => text,
    db,
    existingIds,
    visitedItems,
    queuedItems
  });

  crawler.start();
})();
