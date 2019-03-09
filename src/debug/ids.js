const config = require('../../config');
const setupDb = require('../db');

// const log = require('qb-log');
const fs = require('fs').promises;

// const { groupBy } = require('lodash');

(async () => {
  const { db } = await setupDb(config.dbPath);

  // const results = await db.all(`select id, url, folderName from posts order by id, url, folderName`);
  const results = await db.all(`select url, isVisited from queue`);

  await fs.writeFile('./dump.json', JSON.stringify(results, null, '  '));

  await db.close();
})();
