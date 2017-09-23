/* eslint no-underscore-dangle: 0 */
const PageRipper = require('../../index');
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

module.exports = class JMWebsiteCrawler extends PageRipper.Crawler.WebsiteCrawler {
  scan(postUrl) {
    qbLog.fetch(postUrl);

    return this.PostDownloader
      .downloadPost(postUrl)
      .tap(() => qbLog.done(postUrl))
      .catch((err) => qbLog.fail(err.message))
      .then((postInfo) => this.loop(postInfo, postUrl));
  }

  getUrlsToEnqueue(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    if (postInfo.prev) {
      return [`http://joemonster.org${postInfo.prev}`];
    }

    return [];
  }
};
