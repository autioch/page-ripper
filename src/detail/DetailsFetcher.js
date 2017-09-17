const fs = require('fs');
const path = require('path');

module.exports = class DetailsFetcher {
  constructor({ rootPath, PostImageDownloader }) {
    this.PostImageDownloader = PostImageDownloader;
    this.rootPath = rootPath;
  }

  fetchPostDetails(postInfo) {
    const detailsFolderPath = postInfo.id.toString();

    return fs
      .mkdirAsync(detailsFolderPath)
      .then(() => this.savePostInfo(detailsFolderPath, postInfo))
      .then(() => this.fetchImages(detailsFolderPath, postInfo));
  }

  savePostInfo(detailsFolderPath, postInfo) {
    const detailsData = JSON.stringify(postInfo, null, '  ');
    const detailsPath = path.join(detailsFolderPath, 'postInfo.json');

    return fs.writeFileAsync(detailsPath, detailsData, 'utf8');
  }

  fetchImages(detailsFolderPath, postInfo) {
    const imagePromises = this
      .getImageUrlsToDownload(postInfo)
      .map((imageUrl) => this.PostImageDownloader.downloadImage(imageUrl, detailsFolderPath));

    return Promise.all(imagePromises);
  }

  getImageUrlsToDownload(postInfo) {
    return postInfo.images;
  }
};
