const path = require('path');
const PageRipper = require('../../index');
const JMPostInfoParser = require('./JMPostInfoParser');
const JMWebsiteCrawler = require('./JMWebsiteCrawler');

const URL = 'http://joemonster.org/art/31873/Ostrzezenia_oczywiste_az_do_bolu';

const crawler = new PageRipper.Crawler.WebsiteCrawlerBuilder({
  requestPause: 1000, // eslint-disable-line no-magic-numbers
  rootPath: path.join('e:', 'joemonster'),
  WebsiteCrawler: JMWebsiteCrawler,
  PostInfoParser: JMPostInfoParser
});

crawler.scan(URL);
