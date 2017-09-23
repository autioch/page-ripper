const DefaultFileSaver = require('../utils/FileSaver');
const DefaultIdGenerator = require('../utils/IdGenerator');
const DefaultPostDownloader = require('./post/PostDownloader');
const DefaultPostInfoFetcher = require('./post/PostInfoFetcher');
const DefaultPostInfoParser = require('./post/PostInfoParser');
const DefaultWebsiteCrawler = require('../website/WebsiteCrawler');

module.exports = function WebsiteCrawlerBuilder({
  FileSaver = DefaultFileSaver,
  IdGenerator = DefaultIdGenerator,
  PostDownloader = DefaultPostDownloader,
  PostInfoFetcher = DefaultPostInfoFetcher,
  PostInfoParser = DefaultPostInfoParser,
  WebsiteScanner = DefaultWebsiteCrawler,
  requestPause = 1000, // eslint-disable-line no-magic-numbers
  rootPath
}) {
  return new WebsiteScanner({
    requestPause,
    PostDownloader: new PostDownloader({
      FileSaver: new FileSaver({
        rootPath
      }),
      IdGenerator: new IdGenerator(),
      PostInfoFetcher: new PostInfoFetcher(),
      PostInfoParser: new PostInfoParser()
    })
  });
};
