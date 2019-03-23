const qbLog = require('qb-log');
const { ensureConfig } = require('../utils');
const downloadImages = require('./images/download');

const REQUEST_PAUSE = 1000;

qbLog({
  crawl: {
    prefix: 'CRAWL',
    formatter: qbLog._chalk.cyan // eslint-disable-line no-underscore-dangle
  }
});

module.exports = function crawlFactory(config) {
  ensureConfig(config, 'downloader', 'object');
  ensureConfig(config, 'queue', 'object');
  ensureConfig(config, 'db', 'object');

  const { downloader, queue, db, requestPause = REQUEST_PAUSE } = config;
  let loopCount = 0;
  let resolve;

  async function visit(postUrl) {
    qbLog.crawl(loopCount + 1);

    const postInfo = await downloader.downloadPost(postUrl);
    const { folderName, imageUrls = [], nextUrls = [] } = postInfo;

    await queue.add(nextUrls);
    await downloadImages(config.dataPath, folderName, imageUrls);
    await queue.visit(postUrl);

    loopCount++; // eslint-disable-line no-plusplus
  }

  async function loop() {
    const postUrl = queue.next();

    if (!postUrl) {
      resolve(loopCount);

      return;
    }

    await visit(postUrl);

    setTimeout(loop, requestPause);
  }

  async function finish() {
    await db.close();

    return loopCount;
  }

  function start() {
    const prom = new Promise((res) => {
      resolve = res;
    }).then(finish, finish);

    loop();

    return prom;
  }

  return {
    start
  };
};