const qbLog = require('qb-log');
const connect = require('./src/connect');
const install = require('./src/install');
const update = require('./src/update');
const Wrapper = require('./src/wrapper');
const prepareLastState = require('./src/prepareLastState');

async function isInstalled(db) {
  const info = await db.all('SELECT * FROM sqlite_master');

  return !!info.length;
}

qbLog({
  install: {
    prefix: 'INSTALL',
    formatter: qbLog._chalk.cyan // eslint-disable-line no-underscore-dangle
  }
});

module.exports = async function setupDb(dbPath) {
  const rawDb = await connect(dbPath);
  const db = new Wrapper(rawDb);
  const isReady = await isInstalled(db);

  if (!isReady) {
    qbLog.install('Database');

    await install(db);

    qbLog.install('Done');
  }

  qbLog.install('Update database');
  await update(db);
  qbLog.install('Done');

  const { existingIds, visitedItems, queuedItems } = await prepareLastState(db);

  return {
    db,
    existingIds,
    queuedItems,
    visitedItems
  };
};
