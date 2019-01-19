const crawl = require('./crawl');
const postDownloader = require('./post/postDownloader');
const fetchPost = require('./post/fetchPost');
const idBuilderFactory = require('./idBuilder');
const enqueuer = require('./enqueuer');

module.exports = function crawlerFactory(config) {
  const {
    parsePost,
    db,
    existingIds = [],
    defaultId = 'MISSING',
    visitedItems = [],
    queuedItems = []
  } = config;

  const idBuilder = idBuilderFactory({
    defaultId,
    existingIds
  });

  const downloader = postDownloader({
    idBuilder,
    parsePost,
    fetchPost,
    db
  });

  const queue = enqueuer({
    visitedItems,
    queuedItems,
    db
  });

  const crawler = crawl({
    downloader,
    queue,
    db
  });

  return crawler;
};
