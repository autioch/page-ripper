const fs = require('bluebird').promisifyAll(require('fs'));
const path = require('path');
const fileExists = require('file-exists');

module.exports = class FileSaver {
  constructor({ rootPath }) {
    this.setRootPath(rootPath);
  }

  setRootPath(rootPath) {
    this.rootPath = rootPath;
  }

  saveFile(fileName, fileContents) {
    const fullPath = path.join(this.rootPath, fileName);

    if (this.fileExists(fullPath)) {
      throw Error('Attempted to save a file with a name that already exists.');
    }

    return this.writeFile(fileName, fileContents);
  }

  writeFile(fullPath, fileContents) {
    return fs.writeFileAsync(fullPath, fileContents);
  }

  fileExists(fullPath) {
    return fileExists.sync(fullPath);
  }
};
