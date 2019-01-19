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

module.exports = async function setup(config) {
  const { dbPath, startingPage } = config;
  const rawDb = await connect(dbPath);
  const db = new Wrapper(rawDb);
  const isReady = await isInstalled(db);

  if (!isReady) {
    qbLog.install('Database');

    await install(db);
  }

  const { visitedItems, queuedItems, existingIds } = prepareLastState(db);

  queuedItems.unshift(startingPage);

  return {
    db,
    queuedItems,
    visitedItems,
    existingIds
  };
};
