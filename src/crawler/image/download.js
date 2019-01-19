const download = require('image-downloader');

module.exports = function imageDownload({ imageUrl, fullPath }) {
  return download.image({
    url: imageUrl,
    dest: fullPath
  });
};
