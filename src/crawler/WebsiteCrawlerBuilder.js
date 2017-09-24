const DefaultFileSaver = require('../utils/FileSaver');
const DefaultIdGenerator = require('../utils/IdGenerator');
const DefaultEnqueuer = require('../utils/Enqueuer');
const DefaultPostDownloader = require('./post/PostDownloader');
const DefaultPostInfoFetcher = require('./post/PostInfoFetcher');
const DefaultPostInfoParser = require('./post/PostInfoParser');
const DefaultWebsiteCrawler = require('./WebsiteCrawler');

module.exports = function WebsiteCrawlerBuilder({
  Enqueuer = DefaultEnqueuer,
  FileSaver = DefaultFileSaver,
  IdGenerator = DefaultIdGenerator,
  PostDownloader = DefaultPostDownloader,
  PostInfoFetcher = DefaultPostInfoFetcher,
  PostInfoParser = DefaultPostInfoParser,
  WebsiteCrawler = DefaultWebsiteCrawler,
  requestPause = 1000, // eslint-disable-line no-magic-numbers
  rootPath,
  visited = [],
  queued = []
}) {
  return new WebsiteCrawler({
    requestPause,
    Enqueuer: new Enqueuer({
      visited,
      queued
    }),
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
