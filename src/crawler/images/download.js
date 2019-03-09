const fs = require('fs');
const path = require('path');
const getImageNames = require('./getImageNames');
const request = require('request');
const qbLog = require('qb-log');

const noop = () => undefined;// eslint-disable-line no-undefined
const HANG_DELAY = 10000;

qbLog({
  image: {
    prefix: 'IMAGE',
    formatter: qbLog._chalk.green // eslint-disable-line no-underscore-dangle
  }
});

qbLog({
  imageError: {
    prefix: 'IMAGE ERROR',
    formatter: qbLog._chalk.red // eslint-disable-line no-underscore-dangle
  }
});

function saveImage(imageInfo, index) {
  const { imageUrl, fullPath } = imageInfo;

  return new Promise((resolve, reject) => {
    const fail = (err) => {
      qbLog.imageError(err.message);
      qbLog.empty(index, ' ', imageUrl);
      reject(err);
      clearTimeout(hangTimeout); // eslint-disable-line no-use-before-define
    };

    const hangTimeout = setTimeout(() => fail(new Error('Image timeout ')), HANG_DELAY);

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
        fail(new Error(`Image loading error - ${res.statusCode}`));
      } else {
        fail(new Error(`Image loading error - empty body`));
      }
    });
  })
    .catch(noop);
}

module.exports = async function downloadImages(dataPath, folderName, imageUrls) {
  if (!imageUrls.length || !folderName) {
    return Promise.resolve();
  }

  qbLog.image('Start', imageUrls.length);

  const absoluteFolderPath = path.join(dataPath, folderName);
  const imageInfos = getImageNames(absoluteFolderPath, imageUrls);

  if (imageInfos.length && !fs.existsSync(absoluteFolderPath)) { // eslint-disable-line no-sync
    await fs.promises.mkdir(absoluteFolderPath);
  }

  const promises = imageInfos.map(saveImage);

  return Promise.all(promises).then(() => qbLog.image('Done'));
};
