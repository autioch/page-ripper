/* eslint-disable no-console */
const { dbPath } = require('./config');
const setupDb = require('../db');

(async() => {
  const { db, queuedItems, visitedItems, existingIds } = await setupDb(dbPath);

  console.log('queued', queuedItems.length);
  console.log('visitedItems', visitedItems.length);
  console.log('existingIds', existingIds.length);

  db.close();
})();
