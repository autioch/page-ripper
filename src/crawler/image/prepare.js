const path = require('path');
const idBuilderFactory = require('../idBuilder');
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

function getImageFileName(imageUrl, idBuilder) {
  const { imageId, imageExt } = getImageId(imageUrl);

  const id = idBuilder.buildId(imageId);

  idBuilder.markIdAsUsed(id);

  return `${id}${imageExt}`;
}

module.exports = function imagePrepare({ folderPath, imageUrls }) {
  const idBuilder = idBuilderFactory();

  return imageUrls.map((imageUrl) => {
    const fileName = getImageFileName(imageUrl, idBuilder);
    const fullPath = path.join(folderPath, fileName).replace(/\\/g, '/');

    return {
      imageUrl,
      fullPath
    };
  });
};
