const config = require('../config');
const setupDb = require('../../db');

// const log = require('qb-log');
const fs = require('fs').promises;

// const { pick, groupBy } = require('lodash');

(async () => {
  const { db } = await setupDb(config.dbPath);

  // const results = await db.all(`SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'`);

  const results = await db.all(`select * from posts_old`);

  // const details = results.map((result) => {
  //   const info = JSON.parse(result.postInfo);
  //
  //   return pick(info, ['id', 'url', 'folderName', 'title']);
  // });
  // const grouped = groupBy(results, 'title');
  // const duplicates = Object.entries(grouped).filter(([, values]) => values.length > 1);

  await fs.writeFile('./dump.json', JSON.stringify(results, null, '  '));

  await db.close();
})();
