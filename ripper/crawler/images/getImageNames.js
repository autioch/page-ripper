const path = require('path');
const idStoreFactory = require('../idStore');
const { filenamify } = require('../../utils');

module.exports = function getImageNames(folderName, imageUrls) {
  const idStore = idStoreFactory();

  return imageUrls.map((imageUrl) => {
    const imageExt = path.extname(imageUrl);
    const imageFolder = path.dirname(imageUrl);
    const imageName = path.basename(imageUrl, imageExt);
    const imagePath = path.join(imageFolder, imageName);
    const imageId = filenamify(imagePath);
    const id = idStore.uniquify(imageId);

    idStore.add(id);

    return {
      imageUrl,
      fullPath: path.join(folderName, `${id}${imageExt}`)
    };
  });
};
