const fs = require('fs');
const path = require('path');
const imageName = require('./imageName');
const { ensureConfig } = require('../../utils');
const saveImage = require('./saveImage');
const qbLog = require('qb-log');

qbLog({
  imageError: {
    prefix: 'IMAGE_ERROR',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  }
});

module.exports = function imageDownload(config) {
  ensureConfig(config, 'dataPath', 'string');

  const { dataPath } = config;

  async function download({ folderName, imageUrls }) {
    if (!imageUrls.length || !folderName) {
      return Promise.resolve();
    }

    const absoluteFolderPath = path.join(dataPath, folderName);

    const imageInfos = imageName({
      folderName: absoluteFolderPath,
      imageUrls
    });

    if (!imageInfos.length) {
      return Promise.resolve();
    }

    if (!fs.existsSync(absoluteFolderPath)) { // eslint-disable-line no-sync
      await fs.promises.mkdir(absoluteFolderPath);
    }

    const promises = imageInfos.map((info) => saveImage.image({
      url: info.imageUrl,
      dest: info.fullPath
    }).catch((err) => {
      qbLog.imageError(info.imageUrl);
      qbLog.empty(err.message);
    }));

    return Promise.all(promises);
  }

  return {
    download
  };
};
