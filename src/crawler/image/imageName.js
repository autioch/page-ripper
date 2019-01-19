const path = require('path');
const { idStoreFactory } = require('../idStore');
const filenamifyUrl = require('filenamify-url');

function getImageId(imageUrl) {
  const [, , , ...rest] = imageUrl.split('/');
  const imagePath = filenamifyUrl(rest.join('_'), {
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

  idStore.use(id);

  return `${id}${imageExt}`;
}

module.exports = function imageName({ folderPath, imageUrls }) {
  const idStore = idStoreFactory();

  return imageUrls.map((imageUrl) => {
    const fileName = getImageFileName(imageUrl, idStore);
    const fullPath = path.join(folderPath, fileName).replace(/\\/g, '/');

    return {
      imageUrl,
      fullPath
    };
  });
};
