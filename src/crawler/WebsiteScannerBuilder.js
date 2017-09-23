const DefaultFileSaver = require('../FileSaver');
const DefaultPostDownloader = require('../post/PostDownloader');
const DefaultIdGenerator = require('../utils/IdGenerator');
const DefaultPostInfoFetcher = require('../post/PostInfoFetcher');
const DefaultPostInfoParser = require('../post/PostInfoParser');
const DefaultWebsiteScanner = require('../website/WebsiteScanner');

module.exports = function WebsiteScannerBuilder({
  FileSaver = DefaultFileSaver,
  IdGenerator = DefaultIdGenerator,
  PostInfoFetcher = DefaultPostInfoFetcher,
  PostInfoParser = DefaultPostInfoParser,
  PostDownloader = DefaultPostDownloader,
  WebsiteScanner = DefaultWebsiteScanner,
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
