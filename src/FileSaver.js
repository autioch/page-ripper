const fs = require('bluebird').promisifyAll(require('fs'));
const path = require('path');
const FilenameGenerator = require('./FilenameGenerator');

module.exports = class FileSaver extends FilenameGenerator {
  saveFile(originalFilename, fileContents, fileExtension) {
    const fileName = this.generateFilename(originalFilename, fileExtension);

    return this.writeFile(fileName, fileContents, fileExtension);
  }

  writeFile(fileName, fileContents, fileExtension) {
    const absoluteFileName = path.join(this.rootPath, `${fileName}.${fileExtension}`);

    return fs.writeFileAsync(absoluteFileName, fileContents);
  }
};
