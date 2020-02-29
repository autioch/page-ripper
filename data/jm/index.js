const { join } = require('path');

module.exports = {
  dataPath: join(__dirname, 'assets'),
  dbPath: join(__dirname, 'db.sqlite'),
  rootPath: __dirname,
  startingPages: [],
  parsePost: require(__dirname, 'parsePost')
};
