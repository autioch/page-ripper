const crawlFactory = require('./crawl');
const { idStoreFactory } = require('./idStore');
const { imageDownloadFactory } = require('./image');
const { postDownloadFactory, requestPost } = require('./post');
const { queueFactory } = require('./queue');
const { ensureConfig } = require('../utils');

module.exports = function crawlerFactory(config) {
  ensureConfig(config, 'dataPath', 'string');
  ensureConfig(config, 'db', 'object');
  ensureConfig(config, 'parsePost', 'function');

  const {
    parsePost,
    db,
    dataPath,
    existingIds = [],
    defaultId = 'MISSING',
    visitedItems = [],
    queuedItems = []
  } = config;

  return crawlFactory({
    db,
    downloader: postDownloadFactory({
      db,
      parsePost,
      requestPost,
      idStore: idStoreFactory({
        defaultId,
        existingIds
      })
    }),
    queue: queueFactory({
      db,
      visitedItems,
      queuedItems
    }),
    imageDownload: imageDownloadFactory({
      dataPath
    })
  });
};
