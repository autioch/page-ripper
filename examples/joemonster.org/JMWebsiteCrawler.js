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
  constructor(config) {
    super(config);
    this.counter = 0;
  }

  scan(postUrl) {
    qbLog.fetch(postUrl);
    this.counter++; // eslint-disable-line no-plusplus

    return this.PostDownloader
      .downloadPost(postUrl)
      .catch((err) => qbLog.fail(err.message))
      .tap((postInfo) => this.enqueueUrls(this.getUrlsToEnqueue(postInfo, postUrl)))
      .tap((postInfo) => this.reportCounter(postInfo))
      .then(() => this.loop(postUrl), () => this.loop(postUrl));
  }

  reportCounter(postInfo) {
    const postDate = postInfo ? postInfo.addedDate : '< No post info >';

    if (this.counter % 100 === 0) {
      qbLog.notice(`${this.counter} urls crawled. Post date = ${postDate}.`);
    }
  }

  getUrlsToEnqueue(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    if (!postInfo) {
      console.warn('Missing post info!');

      return [];
    }
    if (postInfo.prev) {
      return [`http://joemonster.org${postInfo.prev}`];
    }

    return [];
  }

  endLoop(postUrl) {
    qbLog.info(`${this.counter} urls crawled. Last url:`);
    qbLog.empty(postUrl);
  }
};
