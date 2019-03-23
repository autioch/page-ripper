const { uniq } = require('lodash');

function parseImageUrl(imageUrl) {
  if (!imageUrl) {
    return false;
  }

  if (imageUrl.startsWith('/')) {
    return `http://joemonster.org${imageUrl}`;
  }

  return imageUrl;
}

module.exports = function parseImages(postImageUrls = [], commentLinks = []) {
  const imageUrls = postImageUrls.concat(commentLinks).map(parseImageUrl).filter((imageUrl) => !!imageUrl);

  return uniq(imageUrls).sort();
};
