const { join } = require('path');

const rootPath = join(__dirname, 'data', 'jm');
const dataPath = join(rootPath, 'assets');
const dbPath = join(rootPath, 'db.sqlite');
const parsePost = require('./data/jm/parsePost/parsePost');

const startingPage = 'https://joemonster.org/art/45375/Demotywatory_CCCIX_mistrz_Sebastian_dal_pokaz';

// const startingPage = '';

module.exports = {
  dataPath,
  dbPath,
  startingPage,
  parsePost
};
