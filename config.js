/* eslint-disable max-len */
const { join } = require('path');

const rootPath = join(__dirname, 'data', 'jm');
const dataPath = join(rootPath, 'assets');
const dbPath = join(rootPath, 'db.sqlite');
const parsePost = require('./data/jm/parsePost/parsePost');

const startingPages = [
];

module.exports = {
  dataPath,
  dbPath,
  startingPages,
  parsePost
};
