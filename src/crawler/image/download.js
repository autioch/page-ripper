const fs = require('fs');
const imagedownload = require('image-downloader');
const imageName = require('./imageName');

module.exports = function imageDownload() {
  async function download({ folderName, imageUrls }) {
    if (!imageUrls.length || !folderName) {
      return Promise.resolve();
    }

    if (!fs.existsSync(folderName)) { // eslint-disable-line no-sync
      await fs.promises.mkdir(folderName);
    }

    const imageInfos = imageName({
      folderName,
      imageUrls
    });

    const downloadPromises = imageInfos.map(({ imageUrl, fullPath }) => imagedownload.image({
      url: imageUrl,
      dest: fullPath
    }));

    return Promise.all(downloadPromises);
  }

  return {
    download
  };
};
