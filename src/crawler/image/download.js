const fs = require('fs');
const imagedownload = require('image-downloader');
const folderName = require('./folderName');
const imageName = require('./imageName');
const { ensureConfig } = require('../../utils');

module.exports = function imageDownload(config) {
  ensureConfig(config, 'dataPath', 'string');
  const { dataPath } = config;

  async function download({ postId, imageUrls }) {
    if (!imageUrls.length) {
      return Promise.resolve();
    }

    const folderPath = folderName({
      dataPath,
      postId
    });

    if (!fs.existsSync(folderPath)) { // eslint-disable-line no-sync
      await fs.promises.mkdir(folderPath);
    }

    const imageInfos = imageName({
      folderPath,
      imageUrls
    });

    const downloadPromises = imageInfos.map(({ imageUrl, fullPath }) => imagedownload.image({
      url: imageUrl,
      dest: fullPath
    }));

    return Promise.all(downloadPromises);
  }

  return {
    download
  };
};
