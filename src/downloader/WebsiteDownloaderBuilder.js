const DefaultWebsiteDownloader = require('./WebsiteDownloader');
const DefaultPostDetailsFetcher = require('./detail/DetailsFetcher');
const DefaultPostImageDownloader = require('./detail/ImageDownloader');
const DefaultIdGenerator = require('../utils/IdGenerator');
const DefaultFileSaver = require('../utils/FileSaver');

module.exports = function WebsiteDownloaderBuilder({
  WebsiteDownloader = DefaultWebsiteDownloader,
  PostDetailsFetcher = DefaultPostDetailsFetcher,
  PostImageDownloader = DefaultPostImageDownloader,
  IdGenerator = DefaultIdGenerator,
  FileSaver = DefaultFileSaver,
  requestPause = 1000, // eslint-disable-line no-magic-numbers
  rootPath
}) {
  return new WebsiteDownloader({
    requestPause,
    PostDetailsFetcher: new PostDetailsFetcher({
      FileSaver: new FileSaver({
        rootPath
      }),
      PostImageDownloader: new PostImageDownloader({
        IdGenerator: new IdGenerator()
      })
    })
  });
};
