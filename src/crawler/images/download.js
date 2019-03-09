const fs = require('fs');
const path = require('path');
const getImageNames = require('./getImageNames');
const request = require('request');
const qbLog = require('qb-log');

const noop = () => {};// eslint-disable-line no-empty-function

qbLog({
  image: {
    prefix: 'IMAGE',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  }
});

qbLog({
  imageError: {
    prefix: 'IMAGE_ERROR',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  }
});

function saveImage(imageInfo, index) {
  const { imageUrl, fullPath } = imageInfo;

  qbLog.image(index, ' ', imageUrl);

  return new Promise((resolve, reject) => {
    const fail = (err) => {
      qbLog.imageError(imageUrl);
      qbLog.empty(err.message);
      reject(err);
    };

    request({
      url: imageUrl,
      dest: fullPath,
      encoding: null
    }, (err, res, body) => {
      if (err) {
        fail(err);

        return;
      }

      if (body && (res.statusCode === 200 || res.statusCode === 201)) { // eslint-disable-line no-magic-numbers
        fs.writeFile(fullPath, body, 'binary', (err2) => {
          if (err2) {
            fail(err2);

            return;
          }

          resolve();
        });
      } else if (body) {
        fail(new Error(`Image loading error - ${res.statusCode}`));
      } else {
        fail(new Error(`Image loading error - empty body`));
      }
    });
  }).catch(noop);
}

module.exports = async function downloadImages(dataPath, folderName, imageUrls) {
  if (!imageUrls.length || !folderName) {
    return Promise.resolve();
  }

  const absoluteFolderPath = path.join(dataPath, folderName);
  const imageInfos = getImageNames(absoluteFolderPath, imageUrls);

  if (imageInfos.length && !fs.existsSync(absoluteFolderPath)) { // eslint-disable-line no-sync
    await fs.promises.mkdir(absoluteFolderPath);
  }

  const promises = imageInfos.map(saveImage);

  return Promise.all(promises);
};
