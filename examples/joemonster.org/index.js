const path = require('path');
const PageRipper = require('../../index');
const JMPostInfoParser = require('./JMPostInfoParser');
const JMWebsiteCrawler = require('./JMWebsiteCrawler');
const qbLog = require('./qbLog');

const visitedUrls = require('./config/visitedUrls.json');
const { lastUrl } = require('./config/lastUrl.json');

const crawler = new PageRipper.Crawler.WebsiteCrawlerBuilder({
  requestPause: 1000, // eslint-disable-line no-magic-numbers
  rootPath: path.join('e:', 'joemonster'),
  visitedUrls,
  WebsiteCrawler: JMWebsiteCrawler,
  PostInfoParser: JMPostInfoParser
});

crawler
  .start(lastUrl)
  .then((postUrl) => {
    qbLog.info(`${crawler.counter} urls crawled. Last url:`);
    qbLog.empty(postUrl);

    crawler.saveState(postUrl);
  });
