const { ensureConfig } = require('../../utils');

module.exports = function postDbAPI(config) {
  ensureConfig(config, 'db', 'object');

  const { db } = config;

  async function save(post) {
    const { id, url, postInfo } = post;

    await db.run('INSERT INTO posts (id, url, postInfo) VALUES (?, ?, ?)', [id, url, postInfo]);
  }

  return {
    save
  };
};
