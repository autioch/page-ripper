const fileExists = require('file-exists');
const path = require('path');

module.exports = class FilenameGenerator {
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
};
