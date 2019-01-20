const qbLog = require('qb-log');
const { ensureConfig } = require('../utils');

const REQUEST_PAUSE = 500;

qbLog({
  visit: {
    prefix: 'VISIT',
    formatter: qbLog._chalk.cyan // eslint-disable-line no-underscore-dangle
  }
});

module.exports = function crawlFactory(config) {
  ensureConfig(config, 'downloader', 'object');
  ensureConfig(config, 'imageDownload', 'object');
  ensureConfig(config, 'queue', 'object');
  ensureConfig(config, 'db', 'object');

  const { downloader, imageDownload, queue, db, requestPause = REQUEST_PAUSE, logDetails = false } = config;
  let loopCount = 0;
  let resolve;

  async function visit(postUrl) {
    logDetails && qbLog.visit(loopCount + 1, postUrl); // eslint-disable-line no-unused-expressions

    const postInfo = await downloader.downloadPost(postUrl);
    const { folderName, imageUrls = [], nextUrls = [] } = postInfo;

    await queue.add(nextUrls);
    await queue.visit(postUrl);

    imageDownload.download({
      folderName,
      imageUrls
    });

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
