/* eslint-disable max-len */
const { join } = require('path');

const rootPath = join(__dirname, '..', 'data', 'jm');
const dataPath = join(rootPath, 'assets');
const dbPath = join(rootPath, 'db.sqlite');
const port = 9090;

module.exports = {
  dataPath,
  dbPath,
  rootPath,
  port
};
