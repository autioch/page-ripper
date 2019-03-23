const { ensureConfig } = require('../../utils');

module.exports = function postDbAPI(config) {
  ensureConfig(config, 'db', 'object');

  const { db } = config;

  async function save(postId, images) {
    for (let i = 0; i < images.length; i++) {
      const { imageUrl, fullPath, message } = images[i];

      await db.run('INSERT INTO images (postId, imageUrl, fullPath, message) VALUES (?, ?, ?, ?)', [postId, imageUrl, fullPath, message]);
    }
  }

  return {
    save
  };
};
