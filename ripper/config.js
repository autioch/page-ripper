/* eslint-disable max-len */
const { join } = require('path');

const rootPath = join(__dirname, '..', 'data', 'jm');
const dataPath = join(rootPath, 'assets');
const dbPath = join(rootPath, 'db.sqlite');
const parsePost = require('./parsePost/jm/parsePost');

const startingPages = [];

module.exports = {
  dataPath,
  dbPath,
  rootPath,
  startingPages,
  parsePost
};
