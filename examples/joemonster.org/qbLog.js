/* eslint no-underscore-dangle: 0 */
const qbLog = require('qb-log')('simple');

qbLog({
  fetch: {
    prefix: 'FETCH',
    formatter: qbLog._chalk.cyan
  },
  done: {
    prefix: 'DONE',
    formatter: qbLog._chalk.cyan
  },
  fail: {
    prefix: 'FAIL',
    formatter: qbLog._chalk.red
  }
});

module.exports = qbLog;
