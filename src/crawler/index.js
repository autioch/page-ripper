const crawl = require('./crawl');
const { postDownloadFactory, postRequest } = require('./post');
const { idStoreFactory } = require('./idStore');
const { queueFactory } = require('./queue');

module.exports = function crawlerFactory(config) {
  const {
    parsePost,
    db,
    existingIds = [],
    defaultId = 'MISSING',
    visitedItems = [],
    queuedItems = []
  } = config;

  const idStore = idStoreFactory({
    defaultId,
    existingIds
  });

  const downloader = postDownloadFactory({
    idStore,
    parsePost,
    postRequest,
    db
  });

  const queue = queueFactory({
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
