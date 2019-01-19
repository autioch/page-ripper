const fs = require('fs').promises;
const imagePrepare = require('./prepare');
const imageDownload = require('./download');
const folderName = require('./folderName');

module.exports = function downloadImagesFactory({ dataPath }) {
  return async function downloadImages({ postId, imageUrls }) {
    const folderPath = folderName({
      dataPath,
      postId
    });

    if (!fs.existsSync(folderPath)) { // eslint-disable-line no-sync
      await fs.mkdir(folderPath);
    }

    const imageInfos = imagePrepare({
      folderPath,
      imageUrls
    });

    const downloadPromises = imageInfos.map(imageDownload);

    return Promise.all(downloadPromises);
  };
};
