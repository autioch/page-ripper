const cheerio = require('cheerio');
const dbAPIFactory = require('./dbAPI');
const { ensureConfig } = require('../../utils');

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
    const uniqueId = idStore.uniquify(postInfo.id);

    postInfo.id = uniqueId;

    await dbAPI.save({
      id: uniqueId,
      url,
      postInfo: JSON.stringify(postInfo)
    });

    idStore.use(uniqueId);

    return postInfo;
  }

  return {
    downloadPost
  };
};
