const DefaultWebsiteDownloader = require('../website/WebsiteDownloader');
const DefaultPostDetailsFetcher = require('../detail/DetailsFetcher');
const DefaultPostImageDownloader = require('../detail/ImageDownloader');

module.exports = function WebsiteDownloaderBuilder({
  WebsiteDownloader = DefaultWebsiteDownloader,
  PostDetailsFetcher = DefaultPostDetailsFetcher,
  PostImageDownloader = DefaultPostImageDownloader,
  requestPause = 1000, // eslint-disable-line no-magic-numbers
  rootPath
}) {
  return new WebsiteDownloader({
    requestPause,
    PostDetailsFetcher: new PostDetailsFetcher({
      rootPath,
      PostImageDownloader: new PostImageDownloader({
        rootPath
      })
    })
  });
};
