const sqlite3 = require('sqlite3');
const install = require('./install');
const update = require('./update');
const Wrapper = require('./wrapper');

module.exports = async function dbMock(installApp = true) {
  const db = new Wrapper(new sqlite3.Database(':memory:'));

  if (installApp) {
    await install(db);
    await update(db);
  }

  return db;
};
