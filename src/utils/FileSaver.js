const fs = require('bluebird').promisifyAll(require('fs'));
const path = require('path');
const fileExists = require('file-exists');
const Bluebird = require('bluebird');

function createFolder(folderPath, callback) {
  fs.mkdir(folderPath, (err) => {
    if (!err) {
      return callback();
    }

    if (err.code === 'EEXIST') {
      return callback();
    }

    if (err.code !== 'ENOENT') {
      return callback(err);
    }

    /* Try creating parent folder. */
    return createFolder(path.dirname(folderPath), (nestedErr) => {
      if (nestedErr) {
        return callback(nestedErr);
      }

      /* Then try again. */
      return createFolder(folderPath, callback);
    });
  });
}

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
      console.warn('Attempted to save a file with a name that already exists.');

      return Bluebird.resolve();
    }

    return this
      .createFolder(path.dirname(fullPath))
      .then(() => this.writeFile(fullPath, fileContents));
  }

  createFolder(folderPath) {
    return new Bluebird((resolve, reject) => {
      createFolder(path.resolve(folderPath), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(folderPath);
        }
      });
    });
  }

  writeFile(fullPath, fileContents) {
    return fs.writeFileAsync(fullPath, fileContents);
  }

  fileExists(fullPath) {
    return fileExists.sync(fullPath);
  }
};
