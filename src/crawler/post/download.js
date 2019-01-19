const cheerio = require('cheerio');
const dbAPIFactory = require('./dbAPI');
const { ensureConfig } = require('../../utils');

module.exports = function postDownloadFactory(config) {
  ensureConfig(config, 'postRequest', 'function');
  ensureConfig(config, 'parsePost', 'function');
  ensureConfig(config, 'idStore', 'object');
  ensureConfig(config, 'db', 'object');

  const { postRequest, parsePost, idStore, db } = config;

  const dbAPI = dbAPIFactory({
    db
  });

  async function downloadPost(url) {
    const result = await postRequest(url);

    if (result.error) {
      return result;
    }

    const $ = cheerio.load(result.body);
    const postInfo = parsePost($, url, result.body);
    const uniqueId = idStore.uniquify(postInfo.id);

    postInfo.id = uniqueId;

    dbAPI.save({
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
