const REQUEST_PAUSE = 500;
const qbLog = require('qb-log');

qbLog({
  visit: {
    prefix: 'VISIT',
    formatter: qbLog._chalk.cyan // eslint-disable-line no-underscore-dangle
  }
});

module.exports = function crawl(config) {
  const { downloader, queue, db, requestPause = REQUEST_PAUSE, logDetails = false } = config;
  let loopCount = 0;
  let resolve;

  if (!downloader) {
    throw Error('crawl requires downloader.');
  }

  if (!queue) {
    throw Error('crawl requires queue.');
  }

  if (!db) {
    throw Error('crawl requires queue.');
  }

  async function finish() {
    await db.close();

    return loopCount;
  }

  const prom = new Promise((res) => {
    resolve = res;
  }).then(finish, finish);

  async function visit(postUrl) {
    logDetails && qbLog.visit(loopCount + 1, postUrl); // eslint-disable-line no-unused-expressions

    const { nextUrls = [] } = await downloader.downloadPost(postUrl);

    await queue.add(nextUrls);
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

  function start() {
    loop();

    return prom;
  }

  return {
    start
  };
};
