const fs = require('fs');
const path = require('path');

const loadHtm = (fileName) => fs.readFileSync(path.join(__dirname, `${fileName}.htm`)); // eslint-disable-line no-sync

const cases = [
  require('./Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw'),
  require('./Najtrudniejsze pytanie'),
  require('./Zamienił domowe podwórko w fajną miejscówkę do letniego odpoczynku')
];

cases.forEach((testCase) => {
  testCase.htm = loadHtm(testCase.htm);
});

module.exports = cases;
