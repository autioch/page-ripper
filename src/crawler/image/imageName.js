const path = require('path');
const { idStoreFactory } = require('../idStore');
const { filenamify } = require('../../utils');

function prepareImage(imageUrl, folderName, idStore) {
  const imagePath = filenamify(imageUrl);
  const imageExt = path.extname(imagePath);
  const imageId = path.basename(imagePath, imageExt);
  const id = idStore.uniquify(imageId);

  idStore.add(id);

  return {
    imageUrl,
    fullPath: path.join(folderName, `${id}${imageExt}`)
  };
}

module.exports = function imageName(folderName, imageUrls) {
  const idStore = idStoreFactory();

  return imageUrls.map((imageUrl) => prepareImage(imageUrl, folderName, idStore));
};
