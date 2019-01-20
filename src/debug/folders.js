const config = require('../../config');
const setupDb = require('../db');

// const log = require('qb-log');
const fs = require('fs').promises;
const _ = require('lodash');

(async () => {
  const { db } = await setupDb(config.dbPath);

  const results = await db.all(`select postInfo from posts order by id, url`);

  const details = results.map((result) => {
    const info = JSON.parse(result.postInfo);

    return _.pick(info, ['id', 'url', 'folderName', 'title']);
  });

  const grouped = _.groupBy(details, 'folderName');
  const duplicates = Object.entries(grouped).filter(([, values]) => values.length > 1);

  await fs.writeFile('./dump.json', JSON.stringify(duplicates, null, '  '));

  await db.close();
})();
