const { join } = require('path');

const rootPath = __dirname;
const dataPath = join(rootPath, 'data');
const dbPath = join(dataPath, 'db.sqlite');
const startingPage = 'https://joemonster.org/art/45375/Demotywatory_CCCIX_mistrz_Sebastian_dal_pokaz';

module.exports = {
  rootPath,
  dataPath,
  dbPath,
  startingPage
};
