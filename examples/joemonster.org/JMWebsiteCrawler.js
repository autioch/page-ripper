const PageRipper = require('../../index');
const qbLog = require('qb-log');
const fs = require('bluebird').promisifyAll(require('fs'));

const REPORT_AMOUNT = 50;

module.exports = class JMWebsiteCrawler extends PageRipper.Crawler.WebsiteCrawler {
  constructor(config) {
    super(config);
    this.counter = 0;
  }

  crawl(postUrl) {
    qbLog.fetch(postUrl);

    return super.crawl(postUrl).tap((postInfo) => this.reportCounter(postInfo, postUrl));
  }

  getUrlsToEnqueue(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    if (postInfo.prev) {
      return [`http://joemonster.org${postInfo.prev}`];
    }

    return [];
  }

  reportCounter(postInfo, postUrl) {
    this.counter++; // eslint-disable-line no-plusplus

    const postDate = postInfo && postInfo.addedDate ? postInfo.addedDate.split(' ')[0] : '< No post info >';

    if (this.counter % REPORT_AMOUNT === 0) {
      qbLog.debug(`${postDate} ${this.counter} urls.`);
      this.saveState(postUrl);
    }
  }

  saveState(postUrl) {
    const fileNameVisited = `./config/visitedUrls_${new Date().toJSON()}.json`;
    const fileContentsVisited = JSON.stringify(this.Enqueuer.visited, null, '  ');

    const fileNameLastUrl = `./config/lastUrl_${new Date().toJSON()}.json`;
    const fileContentsLastUrl = JSON.stringify({
      lastUrl: postUrl
    }, null, '  ');

    fs.writeFileAsync(fileNameVisited.replace(/:/gi, ' '), fileContentsVisited);
    fs.writeFileAsync(fileNameLastUrl.replace(/:/gi, ' '), fileContentsLastUrl);
  }
};
