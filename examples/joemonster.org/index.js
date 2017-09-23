const path = require('path');
const PageRipper = require('../../index');
const JMPostInfoParser = require('./JMPostInfoParser');
const JMWebsiteCrawler = require('./JMWebsiteCrawler');

const crawler = new PageRipper.Crawler.WebsiteCrawlerBuilder({
  requestPause: 1000, // eslint-disable-line no-magic-numbers
  rootPath: path.join(__dirname, 'data'),
  WebsiteCrawler: JMWebsiteCrawler,
  PostInfoParser: JMPostInfoParser
});

crawler.scan('http://joemonster.org/art/40801/7_intrygujacych_zakazow_z_roznych_stron_swiata');
