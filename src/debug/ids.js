const config = require('../../config');
const setupDb = require('../db');

// const log = require('qb-log');
const fs = require('fs').promises;
const _ = require('lodash');

(async () => {
  const { db } = await setupDb(config.dbPath);

  const results = await db.all(`select id, url from posts order by id, url`);

  const grouped = _.groupBy(results, 'url');
  const duplicates = Object.entries(grouped).filter(([, values]) => values.length > 1);

  await fs.writeFile('./dump.json', JSON.stringify(duplicates, null, '  '));

  await db.close();
})();
