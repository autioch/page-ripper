const fs = require('fs');
const path = require('path');

const cases = [
  require('./19143'),
  require('./22133'),
  require('./28741'),
  require('./40836'),
  require('./42474')
];

cases.forEach((testCase) => {
  testCase.htm = fs.readFileSync(path.join(__dirname, `${testCase.id}.htm`));// eslint-disable-line no-sync
});

module.exports = cases;
