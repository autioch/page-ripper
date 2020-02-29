const qbLog = require('qb-log');
const pageRipper = require('./pageRipper');

module.exports = pageRipper;

if (require.main === module) {
  const config = require('../config');

  pageRipper(config).then(
    (crawler) => crawler.start(),
    (err) => qbLog.error(err.message)
  );
}
