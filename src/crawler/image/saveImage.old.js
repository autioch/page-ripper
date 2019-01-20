/* eslint-disable no-magic-numbers */
const request = require('request');
const fs = require('fs');

module.exports = (options = {}) => new Promise((resolve, reject) => {
  const { imageUrl, fullPath } = options;

  request({
    url: imageUrl
  }, (err, res, body) => {
    if (err) {
      reject(err);

      return;
    }

    if (!body) {
      reject(new Error(`Image loading error - empty body. URL: ${imageUrl}`));

      return;
    }

    if (res.statusCode !== 200 && res.statusCode !== 201) {
      reject(new Error(`Image loading error - ${res.statusCode}. URL: ${imageUrl}`));

      return;
    }

    fs.writeFile(fullPath, body, 'binary', (err2) => {
      if (err2) {
        reject(err2);
      } else {
        resolve();
      }
    });
  });
})
;
