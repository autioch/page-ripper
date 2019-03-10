const fs = require('fs');
const path = require('path');
const getImageNames = require('./getImageNames');
const request = require('request');
const qbLog = require('qb-log');
const { log } = require('../../utils');

const noop = () => undefined;// eslint-disable-line no-undefined
const HANG_DELAY = 10000;

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

function saveImage(imageInfo) {
  const { imageUrl, fullPath } = imageInfo;

  return new Promise((resolve, reject) => {
    const fail = (err) => {
      qbLog.imageError(err.message);
      log('Image error', JSON.stringify(imageInfo), err.message);
      reject(err);
      clearTimeout(hangTimeout); // eslint-disable-line no-use-before-define
    };

    const hangTimeout = setTimeout(() => fail(new Error('Timeout ')), HANG_DELAY);

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
          clearTimeout(hangTimeout);
        });
      } else if (body) {
        fail(new Error(res.statusCode));
      } else {
        fail(new Error(`Empty body`));
      }
    });
  })
    .catch(noop);
}

module.exports = async function downloadImages(dataPath, folderName, imageUrls) {
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

  return Promise.all(promises).then(() => qbLog.imageDone());
};
