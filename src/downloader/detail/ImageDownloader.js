const path = require('path');
const download = require('image-downloader');

module.exports = class ImageDownloader {
  constructor({ IdGenerator }) {
    this.IdGenerator = IdGenerator;
  }

  downloadImages(postInfo, postFolder) {
    this.IdGenerator.setSeenIds([]);

    const imageUrlsToDownload = this.getImageUrlsToDownload(postInfo);

    return Promise.all(imageUrlsToDownload.map((imageUrl) => this.fetchAndDownload(postFolder, imageUrl)));
  }

  getImageUrlsToDownload(postInfo) {
    return postInfo.images;
  }

  getImageFileName(postFolder, imageUrl) {
    const imageExtension = path.extname(imageUrl);

    const imageName = imageUrl.substr(0, imageUrl.length - imageExtension.length);

    const { id } = this.IdGenerator.generateId({
      id: imageName
    });

    return path.join(postFolder, `${id}.${imageExtension}`);
  }

  fetchAndDownload(postFolder, imageUrl) {
    const fileName = this.getImageFileName(postFolder, imageUrl);

    return download.image({
      url: imageUrl,
      dest: fileName
    });
  }
};
