const path = require('path');
const download = require('image-downloader');
const FilenameGenerator = require('../FilenameGenerator');

module.exports = class ImageDownloader extends FilenameGenerator {
  downloadImage(imageUrl, folderPath) {
    const imageExtension = path.extname(imageUrl);
    const imageName = imageUrl.substr(0, imageUrl.length - imageExtension.length);
    const fileName = this.generateFilename(path.join(folderPath, imageName), imageExtension);

    return download.image({
      url: imageUrl,
      dest: fileName
    });
  }
};
