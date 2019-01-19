const path = require('path');
const filenamifyUrl = require('filenamify-url');

module.exports = function postImageFolderName({ dataPath, postId }) {
  const folderName = filenamifyUrl(postId);

  return path.join(dataPath, folderName).replace(/\\/g, '/');
};
