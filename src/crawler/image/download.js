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

function saveImageWrapped(url, dest) {
  return saveImage
    .image({
      url,
      dest
    })
    .catch((err) => {
      qbLog.imageError(url);
      qbLog.empty(err.message);
    });
}

module.exports = function imageDownload(config) {
  ensureConfig(config, 'dataPath', 'string');

  const { dataPath } = config;

  async function download({ folderName, imageUrls }) {
    if (!imageUrls.length || !folderName) {
      return Promise.resolve();
    }

    const absoluteFolderPath = path.join(dataPath, folderName);
    const imageInfos = imageName(absoluteFolderPath, imageUrls);

    if (imageInfos.length && !fs.existsSync(absoluteFolderPath)) { // eslint-disable-line no-sync
      await fs.promises.mkdir(absoluteFolderPath);
    }

    const promises = imageInfos.map((info) => saveImageWrapped(info.imageUrl, info.fullPath));

    return Promise.all(promises);
  }

  return {
    download
  };
};
