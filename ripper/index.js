const { join } = require('path');
const qbLog = require('qb-log');
const pageRipper = require('./pageRipper');

module.exports = pageRipper;

if (require.main === module) {
  const config = join(__dirname, '..', 'data', 'jm');

  pageRipper(config).then(
    (crawler) => crawler.start(),
    (err) => qbLog.error(err.message)
  );
}
