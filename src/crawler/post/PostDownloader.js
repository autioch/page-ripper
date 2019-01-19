const cheerio = require('cheerio');
const postDownloaderDb = require('./postDownloaderDb');

module.exports = function postDownloader({ fetchPost, parsePost, idBuilder, db }) {
  if (!fetchPost) {
    throw Error('postDownloader requires fetchPost.');
  }

  if (!parsePost) {
    throw Error('postDownloader requires parsePost.');
  }

  if (!idBuilder) {
    throw Error('postDownloader requires idBuilder.');
  }

  if (!db) {
    throw Error('postDownloader requires db.');
  }

  const dbAPI = postDownloaderDb({
    db
  });

  async function downloadPost(url) {
    const result = await fetchPost(url);

    if (result.error) {
      return result;
    }

    const $ = cheerio.load(result.body);
    const postInfo = parsePost($, url, result.body);
    const uniqueId = idBuilder.buildId(postInfo.id);

    postInfo.id = uniqueId;

    dbAPI.add({
      id: uniqueId,
      url,
      postInfo: JSON.stringify(postInfo)
    });

    idBuilder.markIdAsUsed(uniqueId);

    return postInfo;
  }

  return {
    downloadPost
  };
};
