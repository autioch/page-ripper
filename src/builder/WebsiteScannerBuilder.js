const DefaultFileSaver = require('../FileSaver');
const DefaultPostDownloader = require('../post/PostDownloader');
const DefaultPostIdAssigner = require('../post/PostIdAssigner');
const DefaultPostInfoFetcher = require('../post/PostInfoFetcher');
const DefaultPostInfoParser = require('../post/PostInfoParser');
const DefaultWebsiteScanner = require('../website/WebsiteScanner');

module.exports = function WebsiteScannerBuilder({
  FileSaver = DefaultFileSaver,
  PostIdAssigner = DefaultPostIdAssigner,
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
      PostIdAssigner: new PostIdAssigner(),
      PostInfoFetcher: new PostInfoFetcher(),
      PostInfoParser: new PostInfoParser()
    })
  });
};
