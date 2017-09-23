const fs = require('fs');
const path = require('path');

module.exports = class DetailsFetcher {
  constructor({ rootPath, ImageDownloader, FileSaver }) {
    this.ImageDownloader = ImageDownloader;
    this.FileSaver = FileSaver;
    this.rootPath = rootPath;
  }

  fetchPostDetails(postInfo) {
    const postFolder = this.getPostFolder(postInfo);

    return fs
      .mkdirAsync(postFolder)
      .then(() => this.savePostInfo(postFolder, postInfo))
      .then(() => this.ImageDownloader.downloadImages(postFolder, postInfo));
  }

  getPostFolder(postInfo) {
    return postInfo.id.toString();
  }

  savePostInfo(postFolder, postInfo) {
    const detailsData = JSON.stringify(postInfo, null, '  ');
    const detailsPath = path.join(postFolder, 'postInfo.json');

    return this.FileSaver.saveFile(detailsPath, detailsData);
  }
};
