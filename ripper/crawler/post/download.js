const cheerio = require('cheerio');
const dbAPIFactory = require('./dbAPI');
const { ensureConfig, filenamify } = require('../../utils');
const qbLog = require('qb-log');
const { log } = require('../../utils');

qbLog({
  post: {
    prefix: 'POST',
    formatter: qbLog._chalk.magenta // eslint-disable-line no-underscore-dangle
  },
  postError: {
    prefix: 'POST ERROR',
    formatter: qbLog._chalk.red // eslint-disable-line no-underscore-dangle
  },
  postVisited: {
    prefix: 'POST VISITED',
    formatter: qbLog._chalk.magenta // eslint-disable-line no-underscore-dangle
  },
  postSave: {
    prefix: 'POST SAVE',
    formatter: qbLog._chalk.magenta // eslint-disable-line no-underscore-dangle
  }
});

function getFolderName(postInfo) {
  const suggestedFolderName = filenamify(postInfo.folderName);

  if (suggestedFolderName !== null) {
    return suggestedFolderName;
  }

  return `__ _${postInfo.id}`;
}

module.exports = function postDownloadFactory(config) {
  ensureConfig(config, 'requestPost', 'function');
  ensureConfig(config, 'parsePost', 'function');
  ensureConfig(config, 'idStore', 'object');
  ensureConfig(config, 'db', 'object');

  const { requestPost, parsePost, idStore, db } = config;

  const dbAPI = dbAPIFactory({
    db
  });

  async function downloadPost(url) {
    qbLog.post(url);
    const result = await requestPost(url);

    if (result.error) {
      qbLog.postError(result.error);
      log('Failed to download post', url, result.error);

      return result;
    }

    const $ = cheerio.load(result.body);
    const postInfo = parsePost($, url, result.body);

    if (idStore.has(postInfo.id)) {
      qbLog.postVisited();

      return {};
    }

    postInfo.folderName = getFolderName(postInfo);

    qbLog.postSave();
    await dbAPI.save({
      id: postInfo.id,
      url,
      folderName: postInfo.folderName,
      postInfo: JSON.stringify(postInfo)
    });

    idStore.add(postInfo.id);

    return postInfo;
  }

  return {
    downloadPost
  };
};
