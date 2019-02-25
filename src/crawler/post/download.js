const cheerio = require('cheerio');
const dbAPIFactory = require('./dbAPI');
const { ensureConfig, filenamify } = require('../../utils');

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
    const result = await requestPost(url);

    if (result.error) {
      return result;
    }

    const $ = cheerio.load(result.body);
    const postInfo = parsePost($, url, result.body);

    if (idStore.has(postInfo.id)) {
      return {};
    }

    postInfo.folderName = filenamify(postInfo.folderName);

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
