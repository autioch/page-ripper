const { ensureConfig } = require('../../utils');

module.exports = function postDbAPI(config) {
  ensureConfig(config, 'db', 'object');

  const { db } = config;

  async function save(post) {
    const { id, url, folderName, postInfo } = post;

    await db.run('INSERT INTO posts (id, url, folderName, postInfo) VALUES (?, ?, ?,  ?)', [id, url, folderName, postInfo]);
  }

  return {
    save
  };
};
