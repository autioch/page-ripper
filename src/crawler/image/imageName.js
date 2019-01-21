const path = require('path');
const { idStoreFactory } = require('../idStore');
const filenamify = require('filenamify');

function getImageId(imageUrl) {
  const [, , , ...rest] = imageUrl.split('/');
  const imagePath = filenamify(rest.join('_'), {
    replacement: '_'
  });

  const imageExt = path.extname(imagePath);
  const imageId = imagePath.substr(0, imagePath.length - imageExt.length);

  return {
    imageId,
    imageExt
  };
}

function getImageFileName(imageUrl, idStore) {
  const { imageId, imageExt } = getImageId(imageUrl);

  const id = idStore.uniquify(imageId);

  idStore.add(id);

  return `${id}${imageExt}`;
}

module.exports = function imageName({ folderName, imageUrls }) {
  const idStore = idStoreFactory();

  return imageUrls
    .map((imageUrl) => {
      const fileName = getImageFileName(imageUrl, idStore).replace(/\//g, '_').replace(/\\/g, '_');
      const fullPath = path.join(folderName, fileName).replace(/\\/g, '/');

      return {
        imageUrl,
        fullPath
      };
    })
    .filter((info) => !!path.extname(info.fullPath));
};
