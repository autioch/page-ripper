const qbLog = require('qb-log');
const connect = require('./connect');
const install = require('./install');
const Wrapper = require('./wrapper');
const prepareLastState = require('./prepareLastState');

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

module.exports = async function setup(dbPath) {
  const rawDb = await connect(dbPath);
  const db = new Wrapper(rawDb);
  const isReady = await isInstalled(db);

  if (!isReady) {
    qbLog.install('Database');

    await install(db);

    qbLog.install('Done');
  }

  const { existingIds, visitedItems, queuedItems } = prepareLastState(db);

  return {
    db,
    existingIds,
    queuedItems,
    visitedItems
  };
};
