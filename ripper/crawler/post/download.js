const cheerio = require('cheerio');
const { ensureConfig, filenamify } = require('../../utils');
const qbLog = require('qb-log');
const { log } = require('../../utils');
const { omit } = require('lodash');

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

    const extraDetails = omit(postInfo, ['id', 'folderName', 'title']);

    await db.savePost({
      id: postInfo.id,
      url,
      folderName: postInfo.folderName,
      title: postInfo.title,
      postInfo: JSON.stringify(extraDetails)
    });

    idStore.add(postInfo.id);

    return postInfo;
  }

  return {
    downloadPost
  };
};
