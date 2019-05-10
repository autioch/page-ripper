const { ensureConfig } = require('../../utils');

module.exports = function postDbAPI(config) {
  ensureConfig(config, 'db', 'object');

  const { db } = config;

  async function save(post) {
    const { id, url, title, folderName, postInfo } = post;

    await db.run('INSERT INTO posts (id, url, title, folderName, postInfo) VALUES (?, ?, ?, ?, ?)', [id, url, title, folderName, postInfo]);
  }

  return {
    save
  };
};
