const fs = require('fs');
const path = require('path');
const getImageNames = require('./getImageNames');
const qbLog = require('qb-log');
const saveImage = require('./saveImage');

qbLog({
  imageStart: {
    prefix: 'IMAGE START',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  },
  imageDone: {
    prefix: 'IMAGE DONE',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  },
  imageError: {
    prefix: 'IMAGE ERROR',
    formatter: qbLog._chalk.red // eslint-disable-line no-underscore-dangle
  }
});

module.exports = async function downloadImages({ postId, db, dataPath, folderName, imageUrls }) {
  if (!imageUrls.length || !folderName) {
    return Promise.resolve();
  }

  qbLog.imageStart(imageUrls.length);

  const absoluteFolderPath = path.join(dataPath, folderName);
  const imageInfos = getImageNames(absoluteFolderPath, imageUrls);

  if (imageInfos.length && !fs.existsSync(absoluteFolderPath)) { // eslint-disable-line no-sync
    await fs.promises.mkdir(absoluteFolderPath);
  }

  const promises = imageInfos.map(saveImage);
  const allImages = await Promise.all(promises);

  await db.savePostImages(postId, allImages);

  qbLog.imageDone();

  return allImages;
};
