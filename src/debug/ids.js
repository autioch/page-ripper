const config = require('../../config');
const setupDb = require('../db');
const { groupBy } = require('lodash');

// const log = require('qb-log');
const fs = require('fs').promises;

(async () => {
  const { db } = await setupDb(config.dbPath);

  // const results = await db.all(`select id, url, folderName from posts order by id, url, folderName`);
  const results = await db.all(`select url, isVisited from queue`);

  const parsed = results.map((result) => result.url.split('/')[4]).sort();

  const grouped = Object.entries(groupBy(parsed)).filter((item) => item[1].length > 1).map((item) => item[0]);

  await fs.writeFile('./dump.json', JSON.stringify(grouped, null, '  '));

  await db.close();
})();
