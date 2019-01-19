const fs = require('fs').promises;
const imageDownload = require('image-downloader');
const folderName = require('./folderName');
const imageName = require('./imageName');
const { ensureConfig } = require('../../utils');

module.exports = function crawlerImageDownload(config) {
  ensureConfig(config, 'dataPath', 'string');
  const { dataPath } = config;

  async function download({ postId, imageUrls }) {
    const folderPath = folderName({
      dataPath,
      postId
    });

    if (!fs.existsSync(folderPath)) { // eslint-disable-line no-sync
      await fs.mkdir(folderPath);
    }

    const imageInfos = imageName({
      folderPath,
      imageUrls
    });

    const downloadPromises = imageInfos.map(({ imageUrl, fullPath }) => imageDownload.image({
      url: imageUrl,
      dest: fullPath
    }));

    return Promise.all(downloadPromises);
  }

  return {
    download
  };
};
