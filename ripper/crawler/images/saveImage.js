const fs = require('fs');
const qbLog = require('qb-log');
const request = require('request');

const HANG_DELAY = 10000;

module.exports = function saveImage(imageInfo) {
  const { imageUrl, fullPath } = imageInfo;
  let isAwaiting = true;

  const result = (err) => {
    err && qbLog.imageError(err.message); // eslint-disable-line no-unused-expressions

    return {
      imageUrl,
      fullPath,
      message: err ? err.message : ''
    };
  };

  return new Promise((resolve) => {
    const done = (err) => resolve(result(err));
    const hangTimeout = setTimeout(() => {
      isAwaiting = false;
      done(new Error('Request timeout'));
    }, HANG_DELAY);

    request({
      url: imageUrl,
      dest: fullPath,
      encoding: null,
      timeout: HANG_DELAY
    }, (err, res, body) => {
      if (!isAwaiting) {
        return;
      }

      clearTimeout(hangTimeout);

      if (err) {
        done(err);
      } else if (res.statusCode !== 200 && res.statusCode !== 201) { // eslint-disable-line no-magic-numbers
        done(new Error(res.statusCode));
      } else if (body) {
        fs.writeFile(fullPath, body, 'binary', done);
      } else {
        done(new Error(`Empty body`));
      }
    });
  }).catch(result);
};
