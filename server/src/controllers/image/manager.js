const { dataPath } = require('../../../../config');
const fs = require('fs');
const path = require('path');

module.exports = {

  /* TODO This is reading directly from the file system.
   * Instead it should read from the images table that has been added recently.
   *  */
  async getPostImages(db, postId) {
    //   const images = await db.getPostImages(postId);
    //
    //   return images;
    const folderName = await db.getPostFolderName(postId);
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
    const folderName = await db.getPostFolderName(postId);

    return path.join(dataPath, folderName, imageId);
  },

  async hideImage(db, postId, imageId) {
    await db.hideImage(postId, imageId);
  }
};
