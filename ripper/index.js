const pageRipper = require('./pageRipper');
const qbLog = require('qb-log');

module.exports = pageRipper;

if (require.main === module) {
  const config = require('./config');

  pageRipper(config).then(
    (crawler) => crawler.start(),
    (err) => qbLog.error(err.message)
  );
}
