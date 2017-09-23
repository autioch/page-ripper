const fileExists = require('file-exists');
const path = require('path');
const download = require('image-downloader');

module.exports = class ImageDownloader {
  constructor({ rootPath }) {
    this.rootPath = rootPath;
  }

  generateFilename(originalFilename, fileExtension) {
    let currentIndex = 1;
    let fileName = originalFilename;

    while (this.fileExists(fileName, fileExtension)) {
      currentIndex = currentIndex + 1;
      fileName = this.getRepeatedFileName(originalFilename, currentIndex);
    }

    return fileName;
  }

  getRepeatedFileName(originalFilename, currentIndex) {
    return `${originalFilename} (${currentIndex})`;
  }

  fileExists(fileName, fileExtension) {
    return fileExists.sync(path.join(this.rootPath, `${fileName}.${fileExtension}`));
  }

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
