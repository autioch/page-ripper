const { dataPath } = require('../../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  async getPostImages(db, postId) {
    const [row] = await db.all('SELECT folderName from posts where id = ?', [postId]);
    const { folderName } = row;
    const fullPath = path.join(dataPath, folderName);

    const anyImages = await fs.existsSync(fullPath); // eslint-disable-line no-sync
    let images = [];

    if (anyImages) {
      images = await fs.promises.readdir(fullPath);
    }

    return images.map((image) => ({
      id: image,
      title: image
    }));
  },

  async getPostImagePath(db, postId, imageId) {
    const [row] = await db.all('SELECT folderName from posts where id = ?', [postId]);
    const { folderName } = row;
    const postImagePath = path.join(dataPath, folderName, imageId);

    return postImagePath;
  }
};
