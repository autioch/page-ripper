/* eslint-disable max-len */
const { join } = require('path');

const rootPath = join(__dirname, 'data', 'jm');
const dataPath = join(rootPath, 'assets');
const dbPath = join(rootPath, 'db.sqlite');
const parsePost = require('./data/jm/parsePost/parsePost');

const startingPages = [
  'https://joemonster.org/art/46032/Mistrzowie_Internetu_CLXXXIII_Jak_pewna_Sylwia_zaplanowala_plec_dziecka'
];

module.exports = {
  dataPath,
  dbPath,
  startingPages,
  parsePost
};
